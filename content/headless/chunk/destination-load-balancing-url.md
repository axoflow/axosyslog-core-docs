---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
Starting with version 3.19, you can specify multiple URLs, for example, `url("site1" "site2")`. In this case, {{% param "product.abbrev" %}} sends log messages to the specified URLs in a load-balance fashion. This means that {{% param "product.abbrev" %}} sends each message to only one URL. For example, you can use this to send the messages to a set of ingestion nodes or indexers of your SIEM solution if a single node cannot handle the load. Note that the order of the messages as they arrive on the servers can differ from the order {{% param "product.abbrev" %}} has received them, so use load-balancing only if your server can use the timestamp from the messages. If the server uses the timestamp when it receives the messages, the order of the messages will be incorrect.

{{< include-headless "wnt/warning-http-load-balancing-persist-name.md" >}}

Starting with version {{% param "product.abbrev" %}} version 3.22, you can use any of the following formats to specify multiple URLs:

```c
   url("server1", "server2", "server3"); # comma-separated strings
    url("server1" "server2" "server3"); # space-separated strings
    url("server1 server2 server3"); # space-separated within a single string

```
