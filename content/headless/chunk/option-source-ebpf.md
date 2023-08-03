---
---
## ebpf()

Available in {{% param "product.name" %}} version 4.2 and newer.

By default, the kernel chooses the receive socket for a specific UDP randomly based on the source IP/port of the sender. You can customize this algorithm using the [Extended Berkeley Packet Filter (eBPF)](https://ebpf.io/) plugin. The `ebpf()` option changes the kernel’s SO_REUSEPORT algorithm so that all messages are randomly placed into one of the UDP sockets. The decision which UDP socket buffer a datagram is placed is made for every datagram, and not once for every stream. This means that messages are perfectly load-balanced across your set of UDP sockets. While this resolves the imbalance between the sockets and results in perfect load balancing, you will lose ordering between messages from the same sender, which is the price to pay for increased throughput.

```shell
source s_network {
    udp(so-reuseport(1) persist-name("udp1")
        ebpf(reuseport(sockets(4)))
    );
    udp(so-reuseport(1) persist-name("udp2"));
    udp(so-reuseport(1) persist-name("udp3"));
    udp(so-reuseport(1) persist-name("udp4"));
};
```

<!-- FIXME add link to blogpost when published -->