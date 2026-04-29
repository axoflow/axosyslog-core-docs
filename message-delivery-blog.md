---
title: "Message delivery guarantees in security data pipelines"
description: "How delivery guarantees, flow control, and buffers behave in security data pipelines across UDP, TCP, HTTP, gRPC, OpenTelemetry Collector, Kafka, and AxoSyslog."
tags: [message-delivery, reliability, flow-control, axosyslog, opentelemetry, kafka]
---

A security data pipeline that silently drops messages is worse than one that fails loudly. And yet most teams operate pipelines built on two comforting assumptions that rarely hold up under pressure: "TCP is reliable" and "the SIEM acknowledged it, so we are done."

Neither assumption survives a close look. Delivery guarantees depend on the entire chain (every hop, every buffer, every crash path) not only on the transport protocol. This post walks through the theory of message delivery guarantees, the specific reasons they're hard to implement, and how the common protocols (UDP, TCP, HTTP, gRPC) and applications (OpenTelemetry Collector, Apache Kafka, and AxoSyslog) in security pipelines actually behave. After reading the post, you can look at your own pipeline and say what guarantee level you are running at.

## Message delivery guarantee

Message delivery guarantee means that you know a message has successfully reached its final destination. If it got lost somewhere, the source should know about it so it can take action, for example, resend the lost message.

Multiple nodes in a pipeline (edge → router → destination) build an acknowledgement chain. Until the message reaches the destination, every node is waiting for acknowledgement from its next hop about the messages it sent, and sending acknowledgements to the previous hop about the messages it received. The message travels downstream to the destination, and when it arrives, the acknowledgement travels upstream back to the source.

```text
              messages (downstream) ──▶

   ┌────────┐             ┌────────┐             ┌─────────────┐
   │  Edge  │ ─── msg ──▶ │ Router │ ─── msg ──▶ │ Destination │
   │ source │             │        │             │    (SIEM)   │
   └────────┘ ◀── ACK ─── └────────┘ ◀── ACK ─── └─────────────┘

              ◀── acknowledgements (upstream)
```

*Figure 1. Messages travel downstream; acknowledgements travel back upstream. The end-to-end guarantee holds only if every hop in the chain participates.*

Message delivery guarantee (or the lack of it) has four levels. Different protocols offer different levels. The examples below refer to end-to-end behavior when the application layer does nothing extra on top of the transport — not the transport protocol's behavior in isolation.

  1. **No guarantee (fire & forget):** The source gets no feedback about the message after it leaves the device. Example: UDP.
  2. **At most once:** The source gets an acknowledgement that the message was received by the next hop, but the message can still be lost further down the pipeline. No duplication is allowed. Example: plain syslog over TCP.
  3. **At least once:** The source gets an acknowledgement when the message was delivered, but the message might be duplicated. Example: HTTP with retries.
  4. **Exactly once:** The source gets an acknowledgement when the message was delivered and no duplicates are produced. This is the holy grail — and much harder to achieve end-to-end than at-least-once. For more on why UDP and TCP fall short in real deployments, see the [`syslog-over-UDP` writeups on axoflow.com](https://axoflow.com/tag/syslog-over-udp/).

### Application-level acknowledgement (ACK)

Messages travel between nodes as bytes over the wire, but there is a difference between the bytes reaching the next node and the next node actually processing the message and forwarding it downstream. Stronger guarantees mean longer acknowledgement delays:

  1. **No acknowledgement (like UDP):** no ACK, no delay.
  2. **Network-level only (like plain TCP):** The data is guaranteed to reach the next node's TCP receive buffer, but there is no guarantee that the application on the next node has read it.
  3. **Per-hop application ACK:** The next node has read and interpreted the data, but there is no guarantee that it successfully forwarded it downstream.
  4. **End-to-end application ACK:** Every node waits for the next node to confirm successful processing before acknowledging to its predecessor, all the way back to the source.

Different nodes in a pipeline often run different applications (with different acknowledgement guarantees) and use different protocols, for example: `edge → UDP → relay → gRPC → router → HTTP → SIEM`.

**The end-to-end delivery guarantee between the edge and the destination is bounded by the weakest link in the chain.**

## Flow control and backpressure

When a sender produces data faster than the receiver can process it, you need to manage the data rate between nodes to avoid losing data. This is called flow control.

When the receiver can't keep up, backpressure builds up. The receiver's processing limit propagates upstream to every previous node, so each node needs a buffer to absorb transient backpressure. If the problem persists, eventually all buffers fill up and the whole stream slows down.

Slow processing can be caused by:

- physical limits of the node, like slow CPU or disk/network I/O, or
- logical limits, like full buffers, or waiting for message delivery acknowledgement from downstream through several hops.

## Why implementing message delivery guarantee is difficult

### In-application acknowledgement

A message pipeline application usually performs multiple processing steps, for example, classification, parsing, filtering, and normalization.

A naive implementation acknowledges the message as soon as one step hands it to the next step, but this immediately breaks the ACK chain between the source and the final destination. To keep the end-to-end ACK chain intact, the application needs in-application message ACK.

Consider a `filter` step that decides whether to pass a message downstream or drop it:

- If the filter ACKs the message as soon as it hands it to the next step, and the next step later fails, the ACK has already propagated upstream even though the message is lost.
- If the filter drops the message, it never reaches the destination, so the drop itself must be ACKed — otherwise the source thinks the message is still in transit.

[Multiple destinations](#multiple-destinations) make this harder. If a message goes to two destinations, the application can only ACK upstream after both destinations have confirmed delivery. This requires tracking message ownership across pipeline branches, for example with reference counting.

In general, in-application acknowledgement requires the application to track message ownership through every processing step. This is non-trivial to implement correctly, especially with filtering, branching, and parallel processing.

### Buffers and persistence

The ACK chain can be long, which can cause serious backpressure upstream. Buffers absorb transient backpressure. There are three main kinds:

1. **In-application, in-memory buffer:** Limited by RAM and doesn't necessarily survive graceful or ungraceful shutdowns.
2. **In-application, disk-based buffer:** Limited by disk (usually larger but much slower than RAM), can survive both graceful and ungraceful shutdowns.
3. **Separate service (like Apache Kafka):** A separate solution that does much more than buffering, and is often used in addition to in-application buffers.

Disk buffers have pros and cons. Writing everything to disk protects against ungraceful shutdowns (when the application or the node crashes), but it's much slower than memory buffers and can become a bottleneck on their own. They also safely decouple the end-to-end acknowledgement chain.

Assume that:

- pipeline nodes are never permanently down, only temporarily, and
- every node writes every message to a disk buffer, so it can survive temporary downtime.

Under these assumptions, messages in the disk buffer are safe: eventually every message in the buffer is processed and sent to the destination. As soon as a message is in a "safe place" where it will be handled eventually, the source can consider it sent. Whether this happens or not depends on the middle node: it can acknowledge the message upstream as soon as it lands in the disk buffer.

This loosens the guarantee slightly, but splits the acknowledgement chain into smaller parts, improving flow control and backpressure while greatly reducing acknowledgement delay.

### Multiple destinations

Real pipelines often fan out to multiple destinations for a single source. Is the message considered delivered:

- when it arrives at one destination, or
- only when it reaches every destination?

The second option is more difficult and has side-effects that surprise most people the first time they hit them.

Consider an edge source, a router, and two destinations. The router receives a message and has a receiving-side buffer; it sends the message to two destinations, so there are two sending-side buffers.

One destination can process the message immediately, but the other one is slow. As a result:

1. The router's sending-side buffer for the slow destination fills up.
2. Backpressure propagates back to the router's receiving buffer, eventually stopping the source.
3. The router has already delivered every available message to the fast destination,
4. but receives no new messages from the source because of the backpressure caused by the slow destination.

In short: the slow destination halts the fast destination.

### Bulk messages and acknowledgement

Now consider one source and one destination where the source sends messages in bulk, for example, a 100-message batch in a single HTTP request.

The router processes messages in parallel: 10 threads process 10 messages each. Some threads finish sooner, some later, so acknowledgements arrive out of order. The router is sometimes waiting for acknowledgement for earlier messages while already holding acknowledgements for later ones.

The router can only acknowledge the batch upstream when every message in the batch can be acknowledged. This is difficult to implement.

In most cases, bulk acknowledgement (even without parallel processing) is why many applications can't guarantee exactly-once delivery.

For example, if the application shuts down ungracefully after the destination has acknowledged only part of the batch, on restart it requests the entire batch from the source, potentially duplicating some messages. If individual ACKs are persisted and survive the crash, the router knows which messages it still needs, but persisting per-message ACKs requires an ACK lookup per message, which is CPU intensive.

### Load balancing

Load balancing distributes incoming traffic across multiple application instances for throughput or high availability. In this context, it complicates the bulk-ACK problem by spreading it across multiple instances.

The node splits its input stream into multiple streams processed by different application instances, but the acknowledgements still have to be synced back to the single input stream.

```text
                           ┌──────────────┐
                      ┌──▶ │  Instance A  │ ──┐
                      │    └──────────────┘   │
  ┌────────┐   ┌──────┴┐   ┌──────────────┐   │   ┌─────────────┐
  │ Source │──▶│  LB   │─▶ │  Instance B  │ ──┼──▶│ Destination │
  └────────┘   └──────┬┘   └──────────────┘   │   └─────────────┘
       ▲              │    ┌──────────────┐   │
       │              └──▶ │  Instance C  │ ──┘
       │                   └──────────────┘
       │
       └────── merged ACK stream ◀────── (shared ACK state)

  When one instance restarts, it must know which messages the
  others already ACKed — otherwise the replay duplicates data.
```

*Figure 2. One input stream, several worker instances, one merged ACK stream — with shared state across instances.*

To guarantee delivery and minimize duplication, instances need to share the state of message acknowledgements. When one instance restarts, it doesn't know what the others have already processed, making the restart-and-replay problem significantly harder than in the single-instance case.

## What delivery guarantees does your protocol offer?

Here is how the common data pipeline protocols map onto the four guarantee levels described earlier.

| Protocol     | Transport ACK | Application-level ACK | Flow control         | Load balancing             | End-to-end level                          |
| ------------ | ------------- | --------------------- | -------------------- | -------------------------- | ----------------------------------------- |
| syslog/UDP   | None          | None                  | None                 | Trivial (L4)               | 1 — fire & forget                         |
| syslog/TCP   | Network       | None                  | TCP sliding window   | Hard (byte stream)         | 2 — at-most-once                          |
| HTTP REST    | Network       | Response code         | Client-side + 429/503| Easy (L7)                  | 3 — at-least-once (with retries)          |
| gRPC/OTLP    | Network       | Per-request           | HTTP/2 + built-in    | gRPC-aware LB needed       | 3 — at-least-once, partial-success support |

The sections below walk through each protocol in more detail.

### syslog/UDP

UDP is pure fire & forget. The sender has no idea whether the message reached the receiver. There is no flow control either: if the receiver is overwhelmed, it drops packets without a trace. Sending syslog over UDP is the simplest and fastest option, but provides zero delivery guarantees and is routinely unreliable in practice (see the [`syslog-over-UDP` blogs](https://axoflow.com/tag/syslog-over-udp/) for real-world failure modes).

Because UDP is stateless and each packet is independent, it can be load balanced trivially at the network level.

### syslog/TCP

TCP provides a network-level guarantee: the data is guaranteed to reach the next node's TCP receive buffer. TCP's sliding-window mechanism also provides flow control: if the receiver's buffer fills up, the sender is slowed down automatically.

However, there is no application-level ACK. Once the data is in the next node's TCP receive buffer, the sender considers it sent, but the receiving application might not have read it yet, might crash before processing it, or might fail to forward it. Effectively, syslog/TCP provides at-most-once delivery end-to-end.

Load balancing TCP is hard. TCP is a continuous byte stream, so a load balancer has to understand syslog message framing to split the stream into individual messages and route them independently. This isn't widely supported.

### HTTP REST

HTTP is a common way to send data from routers to SIEMs and similar destinations.

The HTTP response serves as the application-level ACK from the next hop. If the router supports retries when a send fails, HTTP provides at-least-once delivery.

Batching (sending multiple messages in a single HTTP request for performance) introduces the bulk-ACK problem: if the destination processes part of a batch and then crashes, the router doesn't know which messages were processed, so it resends the whole batch and duplicates data.

Flow control is typically handled on the client side by limiting concurrent requests or waiting for a response before sending the next batch. Destinations can signal backpressure with response codes such as 429 (too many requests) or 503 (service unavailable), but how client applications handle these responses depends entirely on the implementation.

HTTP requests are self-contained, so standard L7 load balancing works well.

### gRPC/OTLP

gRPC provides application-level ACK per hop: the next node acknowledges the request after it has been received and accepted. OTLP supports partial-success responses, letting the server acknowledge only a subset of records in a batch, which helps with the bulk-ACK problem.

Flow control is built into gRPC at the transport level, so a slow receiver slows down the sender automatically.

gRPC can be load balanced at L7, but it requires a gRPC-aware load balancer because multiple requests are multiplexed over a single long-lived HTTP/2 connection.

## How real applications handle delivery

A protocol can only set the upper bound of the delivery guarantee, the application on each hop decides what actually happens. Remember, the end-to-end guarantee is still bounded by the weakest link: a router sending over UDP is still fire & forget.

### OpenTelemetry Collector

OpenTelemetry Collector (OTelCol) is a common element of many data pipelines, and several SIEMs ship their own branded version as an agent.

```text
                   ┌──────────────────────────────────┐
                   │      OpenTelemetry Collector     │
                   │                                  │
                   │  ┌──────────┐   ┌────────────┐   │
  ┌────────┐ data ─┼─▶│ Receiver │──▶│  Exporter  │───┼── data ──▶ ┌──────────┐
  │ Sender │       │  │          │   │   queue    │   │            │ Next hop │
  │        │◀──ACK─┼──┤          │   │            │   │            └──────────┘
  └────────┘       │  └──────────┘   └────────────┘   │
                   │                       ▲          │
                   └───────────────────────┼──────────┘
                                           │
                                           └── ACK sent upstream when data
                                               lands in the queue — not when
                                               Next hop confirms delivery.

    If the collector crashes after ACKing upstream but
    before the exporter flushes the queue → data is lost.
```

*Figure 3. OTelCol acknowledges upstream at the exporter queue, not at actual delivery to the next hop. Anything in-flight in the queue at crash time is lost — this is the at-most-once default.*

OTelCol sends an acknowledgement to the upstream sender when the data is enqueued in its exporter's internal sending queue, not when delivery to the next hop is confirmed. This gives at-most-once delivery by default: if the collector crashes after sending the ACK upstream but before forwarding the data, the data is lost.

OTelCol has an optional persistent queue backed by a write-ahead log. Enabling it gets you close to at-least-once delivery, but in-flight items at the time of a crash can be duplicated on restart. The persistent queue is also limited to single-instance deployments, making it unsuitable for horizontally scaled setups.

OTelCol doesn't have in-application ACK. The pipeline is a synchronous call chain with no per-message ownership tracking across processing steps.

Backpressure is handled by the `memory_limiter` processor, which rejects incoming data when memory exceeds a threshold. Without it, a slow or unavailable destination either causes drops when the queue fills up or stalls the whole pipeline.

### Apache Kafka

Kafka is a separate service that acts as a large buffer, decoupling producers from consumers.

On the producer side, the delivery guarantee is configurable:

- `acks=0` is fire & forget,
- `acks=1` waits for the leader to confirm,
- `acks=all` waits for all replicas.

On the consumer side, progress is tracked by committing offsets back to Kafka. This is bulk ACK by nature: committing an offset means all messages up to that point are considered processed. That is precisely the dynamic described in the bulk-ACK section above, and the main reason exactly-once delivery is complex on Kafka. Kafka does support exactly-once through idempotent producers and transactions, but it requires careful configuration and has performance implications.

Kafka's partitioning and consumer group model handles flow control naturally: slow consumers simply lag behind, and producers are throttled when broker storage fills up.

### AxoSyslog

AxoSyslog has in-application ACK across its standard sources and destinations. Messages are tracked through the pipeline with reference counting, so every processing step (including filter drops) participates in the ACK chain. Filter drops are ACKed immediately because they represent intentional, complete processing.

Flow control is configurable per log path. With flow control on, the source driver stops reading from the source when an internal limit (`log-iw-size`) is reached, propagating backpressure all the way back to the source. With flow control off, messages are read and processed but dropped before the destination queue, so backpressure never reaches the source.

AxoSyslog supports both in-memory and disk buffers. The disk buffer acts as a safe place: once a message is written to it, AxoSyslog can ACK the source and break the end-to-end ACK chain into smaller parts, as described in the [Buffers and persistence](#buffers-and-persistence) section.

The end-to-end delivery guarantee depends on both the transport and the buffer configuration. AxoSyslog supports several transport protocols, and the one you use sets the upper bound:

- UDP is fire & forget,
- TCP is at-most-once,
- HTTP (commonly used to send data to SIEMs) is at-least-once, and
- gRPC/OTLP allows stronger guarantees.

Internally, AxoSyslog aims for exactly-once, but edge cases arise depending on whether you use a memory or disk buffer and how the application shuts down.

## Takeaways

- Your end-to-end guarantee is bounded by the weakest link in the transport and the app-level ACK behavior of every hop, not just the one you trust most.

- TCP feels reliable, but plain syslog-over-TCP is at-most-once end-to-end because there is no application-level ACK.
- HTTP with retries gets you at-least-once, at the cost of potential duplication when batches crash partway through.
- Disk buffers trade a strict end-to-end ACK chain for much better backpressure handling, but have performance costs. For most security pipelines, that's the right tradeoff.
- Exactly-once end-to-end is rarely achievable in practice. Aim for at-least-once and make the downstream side idempotent.

If you want to see how this plays out in a real pipeline, the [AxoSyslog flow-control documentation](https://axoflow.com/docs/axosyslog-core/chapter-routing-filters/concepts-flow-control/) walks through the same mechanics with concrete configuration examples.
