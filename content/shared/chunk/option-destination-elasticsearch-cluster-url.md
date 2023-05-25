---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## cluster-url()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* Specifies the URL or the Elasticsearch cluster, for example, **cluster-url("http://192.168.10.10:9200")")**.

{{% include-headless "chunk/para-elasticsearch-loadbalancing.md" %}}

For example:

```c

    destination d_elasticsearch {
      elasticsearch2(
        client-lib-dir("/usr/share/elasticsearch/lib/")
        index("syslog-${YEAR}.${MONTH}.${DAY}")
        type("syslog")
        time-zone("UTC")
        client-mode("http")
        cluster-url("http://node01:9200 http://node02:9200")
      );
    };

```

