---
title: "elasticsearch-http: Sending messages to Elasticsearch HTTP Bulk API"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Version 3.21 of {{% param "product.abbrev" %}} can directly post log messages to an Elasticsearch deployment using the Elasticsearch Bulk API over the HTTP and Secure HTTP (HTTPS) protocols.

HTTPS connection, as well as password- and certificate-based authentication is supported. The content of the events is sent in JSON format.


## Declaration:

```c
   d_elasticsearch_http {
        elasticsearch-http(
            index("<elasticsearch-index-to-store-messages>")
            url("https://your-elasticsearch-server1:9200/_bulk" "https://your-elasticsearch-server2:9200/_bulk")
            type("<type-of-the-index>")
        );
    };

```


{{% include-headless "chunk/destination-elastic-http-type.md" %}}

{{% include-headless "chunk/destination-http-proxy-settings.md" %}}

{{% include-headless "chunk/destination-http-proxy-settings2.md" %}}

{{% include-headless "chunk/destination-http-proxy-settings3.md" %}}

{{% include-headless "chunk/destination-http-proxy-settings4.md" %}}


## Example: Sending log data to Elasticsearch {#example-destination-elasticsearch-http}

The following example defines a `elasticsearch-http()` destination, with only the required options.

```c
   destination d_elasticsearch_http {
        elasticsearch-http(
            index("<name-of-the-index>")
            type("<type-of-the-index>")
            url("http://my-elastic-server:9200/_bulk")
        );
    };
    
    
    log {
        source(s_file);
        destination(d_elasticsearch_http);
        flags(flow-control);
    };

```

The following example uses mutually-authenticated HTTPS connection, templated index, and also sets the `type()` and some other options.

```c
   destination d_elasticsearch_https {
        elasticsearch-http(
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


This driver is actually a reusable configuration snippet configured to send log messages using the `tcp()` driver using a template. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/tree/master/scl/elasticsearch).
