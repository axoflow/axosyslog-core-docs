---
title: "elasticsearch2: Sending messages directly to Elasticsearch version 2.0 or higher (DEPRECATED)"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% include-headless "wnt/warning-elasticsearch2-deprecated.md" %}}

Starting with version {{% conditional-text include-if="pe" %}}5.6{{% /conditional-text %}}{{% conditional-text include-if="ose" %}}3.7{{% /conditional-text %}} of {{% productparam "abbrev" %}} can directly send log messages to [Elasticsearch](https://www.elastic.co/products/elasticsearch), allowing you to search and analyze your data in real time, and visualize it with [Kibana](https://www.elastic.co/products/kibana).

Note the following limitations when using the {{% productparam "abbrev" %}} `elasticsearch2` destination:

  - Since {{% productparam "abbrev" %}} uses Java libraries, the `elasticsearch2` destination has significant memory usage.


## Declaration:

```c

    @include "scl.conf"
    
    elasticsearch2(
        index("syslog-ng_${YEAR}.${MONTH}.${DAY}")
        type("test")
        cluster("syslog-ng")
    );

```



## Example: Sending log data to Elasticsearch version 2.x and above {#example-destination-elasticsearch2}

The following example defines an `elasticsearch2` destination that sends messages in transport mode to an Elasticsearch server running on the localhost, using only the required parameters.

```c

    @include "scl.conf"
    
    destination d_elastic {
        elasticsearch2(
            index("syslog-ng_${YEAR}.${MONTH}.${DAY}")
            type("test")
        );
    };

```

The following example sends 10000 messages in a batch, in transport mode, and includes a custom unique ID for each message.

```c

    @include "scl.conf"
    
    options {
        threaded(yes);
        use-uniqid(yes);
    };
    
    source s_syslog {
        syslog();
    };
    
    destination d_elastic {
        elasticsearch2(
            index("syslog-ng_${YEAR}.${MONTH}.${DAY}")
            type("test")
            cluster("syslog-ng")
            client-mode("transport")
            custom-id("${UNIQID}")
            flush-limit("10000")
        );
    };
    
    log {
        source(s_syslog);
        destination(d_elastic);
        flags(flow-control);
    };

```



## Example: Sending log data to Elasticsearch using the HTTP REST API {#example-destination-elasticsearch2-http}

The following example send messages to Elasticsearch over HTTP using its REST API:

```c

    @include "scl.conf"
    
    source s_network {
        network(port(5555));
    };
    
    destination d_elastic {
        elasticsearch2(
            client-mode("http")
            cluster("es-syslog-ng")
            index("x201")
            cluster-url("http://192.168.33.10:9200")
            type("slng_test_type")
            flush-limit("0")
        );
    };
    
    log {
        source(s_network);
        destination(d_elastic);
        flags(flow-control);
    };

```

{{% include-headless "chunk/example-elasticsearch-https-verifycert-clientcert.md" %}}


  - To install the software required for the `elasticsearch2` destination, see {{% xref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/destination-elasticsearch2-prerequisites/_index.md" %}}.

  - For details on how the `elasticsearch2` destination works, see {{% xref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/destination-elasticsearch2-interaction/_index.md" %}}.

  - For the list of options, see {{% xref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/reference-destination-elasticsearch2/_index.md" %}}.

The `elasticsearch2()` driver is actually a reusable configuration snippet configured to receive log messages using the Java language-binding of {{% productparam "abbrev" %}}. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of the elasticsearch configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/elasticsearch/plugin.conf). For details on extending {{% productparam "abbrev" %}} in Java, see the [Getting started with syslog-ng development](https://syslog-ng.gitbooks.io/getting-started/content/chapters/chapter_5/section_2.html) guide.

{{% include-headless "wnt/note-jvm-reload.md" %}}
