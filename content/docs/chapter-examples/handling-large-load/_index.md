---
title: Handling large message load
weight: 200
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section provides tips on optimizing the performance of `syslog-ng`. Optimizing the performance is important for `syslog-ng` hosts that handle large traffic.

- Disable DNS resolution, or resolve hostnames locally. For details, see {{% xref "/docs/chapter-examples/examples-dns/_index.md" %}}.

- Enable flow-control for the TCP sources. For details, see {{% xref "/docs/chapter-routing-filters/concepts-flow-control/_index.md" %}}.

- Do not use the `usertty()` destination driver. Under heavy load, the users are not be able to read the messages from the console, and it slows down `syslog-ng`.

- Do not use regular expressions in our filters. Evaluating general regular expressions puts a high load on the CPU. Use simple filter functions and logical operators instead. For details, see {{% xref "/docs/chapter-manipulating-messages/regular-expressions/_index.md" %}}.

- {{< include-headless "wnt/warning-udp-recvbuf.md" >}}

- Increase the value of the `flush-lines()` parameter. Increasing `flush-lines()` from `0` to `100` can increase the performance of {{% param "product.abbrev" %}} by 100%.
