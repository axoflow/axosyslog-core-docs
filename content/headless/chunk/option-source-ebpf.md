---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
## ebpf()

Available in {{% param "product.name" %}} version 4.2 and newer.

By default, the kernel chooses the receive socket for a specific UDP randomly based on the source IP/port of the sender. You can customize this algorithm using the [Extended Berkeley Packet Filter (eBPF)](https://ebpf.io/) plugin. The `ebpf()` option changes the kernel’s SO_REUSEPORT algorithm so that all messages are randomly placed into one of the UDP sockets. The decision which UDP socket buffer a datagram is placed is made for every datagram, and not once for every stream. This means that messages are perfectly load-balanced across your set of UDP sockets. While this resolves the imbalance between the sockets and results in perfect load balancing, you will lose ordering between messages from the same sender, which is the price to pay for increased throughput.

```shell
source s_network {
    network(
        transport("udp")
        so-reuseport(1) persist-name("udp1")
        ebpf(reuseport(sockets(4)))
    );
    network(transport("udp") so-reuseport(1) persist-name("udp2"));
    network(transport("udp") so-reuseport(1) persist-name("udp3"));
    network(transport("udp") so-reuseport(1) persist-name("udp4"));
};
```

For a detailed introduction, see the [Scaling syslog to 1M EPS with eBPF](https://axoflow.com/scale-syslog-over-udp-with-ebpf/) blog post.
