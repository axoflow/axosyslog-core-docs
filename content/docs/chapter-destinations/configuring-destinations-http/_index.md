---
title: "Posting messages over HTTP"
weight:  1900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Version {{% conditional-text include-if="ose" %}}3.7{{% /conditional-text %}} of {{% param "product.abbrev" %}} can directly post log messages to web services using the HTTP protocol. Error and status messages received from the HTTP server are forwarded to the internal logs of {{% param "product.abbrev" %}}. The current implementation has the following limitations:

  - Only HTTP connections are supported, HTTPS is not.

  - This destination requires Java. For an `http` destination that does not use Java, see {{% xref "/docs/chapter-destinations/configuring-destinations-http-nonjava/_index.md" %}}.


## Declaration:

```c

    java(
        class-path("/syslog-ng/install_dir/lib/syslog-ng/java-modules/*.jar")
        class-name("org.syslog_ng.http.HTTPDestination")
    
        option("url", "http://<server-address>:<port-number>")
    
    );

```



## Example: Sending log data to a web service {#example-destination-http}

The following example defines an `http` destination.

```c

    destination d_http {
        java(
            class-path("/syslog-ng/install_dir/lib/syslog-ng/java-modules/*.jar")
            class-name("org.syslog_ng.http.HTTPDestination")
    
            option("url", "http://192.168.1.1:80")
        );
    };
    
    log
        { source(s_file); destination(d_http); flags(flow-control); };

```


{{% include-headless "wnt/note-jvm-reload.md" %}}
