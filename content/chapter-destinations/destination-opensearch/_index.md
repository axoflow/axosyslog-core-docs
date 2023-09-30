---
title: "opensearch: Sending messages to OpenSearch"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Available in {{% param "product.abbrev" %}} version 4.4 and later.

The `opensearch()` destination can directly post log messages to [OpenSearch](https://opensearch.org/) using its HTTP endpoint.

HTTPS connection, as well as password- and certificate-based authentication is supported. The content of the events is sent in JSON format.


## Declaration:

```shell
   d_opensearch {
        opensearch(
            index("<opensearch-index-to-store-messages>")
            url("https://your-opensearch-endpoint:9200/_bulk")
        );
    };
```

{{< include-headless "chunk/option-dest-http-proxy.md" >}}


## Example: Sending log data to Elasticsearch {#example-destination-elasticsearch-http}

The following example defines a `elasticsearch-http()` destination, with only the required options.

```shell
   destination opensearch {
        opensearch(
            index("<name-of-the-index>")
            url("http://my-elastic-server:9200/_bulk")
        );
    };
    
    
    log {
        source(s_file);
        destination(d_opensearch_http);
        flags(flow-control);
    };
```

The following example uses mutually-authenticated HTTPS connection, templated index, and also sets the `type()` and some other options.

```shell
   destination opensearch_https {
        opensearch(
            url("https://node01.example.com:9200/_bulk")
            index("test-${YEAR}${MONTH}${DAY}")
            time-zone("UTC")
            type("test")
            workers(4)
            batch-lines(16)
            timeout(10)
            tls(
                ca-file("ca.pem")
                cert-file("syslog_ng.crt.pem")
                key-file("syslog_ng.key.pem")
                peer-verify(yes)
            )
        );
    };
```

This driver is actually a reusable configuration snippet configured to send log messages using the `http()` driver using a template. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/tree/master/scl/opensearch).
