---
title: "Batch mode and load balancing"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `opensearch()` destination automatically sends multiple log messages in a single HTTP request, increasing the rate of messages that your Elasticsearch deployment can consume. For details on adjusting and fine-tuning the batch mode, see the following section.

{{% include-headless "chunk/concept-batch-size.md" %}}

## Example: HTTP batch mode {#example-elasticsearch-http-batch-mode}

In the following example, a batch consists of 100 messages, or a maximum of 512 kilobytes, and is sent every 20 seconds (20000 milliseconds).

```shell
   destination d_opensearch {
        opensearch(
            url("http://your-server:9200/_bulk")
            index("<index-to-store-messages>")
            batch-lines(100)
            batch-bytes(512Kb)
            batch-timeout(10000)
        );
    };
```

## Load balancing between multiple indexers

{{< include-headless "chunk/destination-load-balancing-url.md" >}}

## Example: HTTP load balancing

The following destination sends log messages to 3 different indexer nodes. Each node is assigned a separate worker thread. A batch consists of 100 messages, or a maximum of 512 kilobytes, and is sent every 20 seconds (20000 milliseconds).

```shell
   destination d_opensearch {
        opensearch(
            url("http://your-elasticsearch-server1:9200/_bulk" "http://your-elasticsearch-server2:9200/_bulk" "http://your-elasticsearch-server3:9200/_bulk")
            batch-lines(100)
            batch-bytes(512Kb)
            batch-timeout(20000)
            persist-name("opensearch-load-balance")
        );
    };
```

{{% include-headless "chunk/http-load-balance-workers.md" %}}
