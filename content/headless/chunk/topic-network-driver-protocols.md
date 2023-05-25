---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
  - UDP is a simple datagram oriented protocol, which provides "best effort service" to transfer messages between hosts. It may lose messages, and no attempt is made to retransmit lost messages. The [BSD-syslog]({{< relref "/docs/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/_index.md" >}}) protocol traditionally uses UDP.
    
    Use UDP only if you have no other choice.

  - TCP provides connection-oriented service: the client and the server establish a connection, each message is acknowledged, and lost packets are resent. TCP can detect lost connections, and messages are lost, only if the TCP connection breaks. When a TCP connection is broken, messages that the client has sent but were not yet received on the server are lost.

  - The syslog-ng application supports TLS (Transport Layer Security, also known as SSL) over TCP. For details, see {{% xref "/docs/chapter-encrypted-transport-tls/tls-serverauth/_index.md" %}}.
