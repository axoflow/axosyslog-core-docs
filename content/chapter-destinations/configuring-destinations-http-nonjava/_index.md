---
title: "http: Posting messages over HTTP without Java"
weight:  2100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Version 3.8 of {{% param "product.abbrev" %}} can directly post log messages to web services using the HTTP protocol, without having to use Java. The current implementation has the following limitations:

  - Only the PUT and the POST methods are supported.

HTTPS connection, as well as password- and certificate-based authentication is supported.

If the server returns a status code beginning with 2 (for example, 200), {{% param "product.abbrev" %}} assumes the message was successfully sent. For other response codes, see {{% xref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" %}}. You can override the behavior of {{% param "product.abbrev" %}} using the `response-action()` option.


## Example: Client certificate authentication with HTTPS

```shell
   destination d_https {
        http(
            [...]
            tls(
            ca-file("/<path-to-certificate-directory>/ca-crt.pem")
            ca-dir("/<path-to-certificate-directory>/")
            cert-file("/<path-to-certificate-directory>/server-crt.pem")
            key-file("/<path-to-certificate-directory>/server-key.pem")
                )
            [...]
        );
    };
```



## Declaration:

```shell
   destination d_http {
        http(
            url("<web-service-IP-or-hostname>")
            method("<HTTP-method>")
            user-agent("<USER-AGENT-message-value>")
            user("<username>")
            password("<password>")
        );
    };
```


{{% include-headless "chunk/destination-http-proxy-settings.md" %}}

{{% include-headless "chunk/destination-http-proxy-settings2.md" %}}

{{% include-headless "chunk/destination-http-proxy-settings3.md" %}}

{{< include-headless "chunk/destination-http-proxy-settings4.md" >}}


## Example: Sending log data to a web service {#example-destination-http-nonjava}

The following example defines an `http` destination.

```shell
   destination d_http {
        http(
            url("http://127.0.0.1:8000")
            method("PUT")
            user-agent("syslog-ng User Agent")
            user("user")
            password("password")
            headers("HEADER1: header1", "HEADER2: header2")
            body("${ISODATE} ${MESSAGE}")
        );
    };
    
    log {
        source(s_file);
        destination(d_http);
        flags(flow-control);
    };
```


You can also use the http() destination to [forward log messages to Splunk using {{% param "product.abbrev" %}}]({{< relref "/chapter-destinations/syslog-ng-with-splunk/_index.md" >}}).
