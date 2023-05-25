---
title: "HTTP destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `http` destination of {{% param "product.abbrev" %}} can directly post log messages to web services using the HTTP protocol. The `http` destination has the following options. Some of these options are directly used by the Java code underlying the `http` destination, therefore these options must be specified in the following format:

```c
   option("<option-name>", "<option-value>")

```

For example, `option("url", "http://\<server-address\>:\<port-number\>")`. The exact format to use is indicated in the description of the option.


## Required options

The following options are required: `url()`.



{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}



{{% include-headless "chunk/option-destination-tls-ca-file.md" %}}



{{% include-headless "chunk/option-destination-java-class-name.md" %}}

For the `http` destination, use this option as **class-name("org.syslog_ng.http.HTTPDestination")**.



{{% include-headless "chunk/option-destination-java-class-path.md" %}}

For the `http` destination, include the path to the java modules of {{% param "product.abbrev" %}}, for example, `class-path("/syslog-ng/install_dir/lib/syslog-ng/java-modules/\*.jar")`.


{{% include-headless "chunk/option-destination-hook.md" %}}

{{% include-headless "chunk/option-destination-jvm-options.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}


## method() {#http-option-method}

|          |                                                    |
| -------- | -------------------------------------------------- |
| Type:    | DELETE | HEAD | GET | OPTIONS | POST | PUT | TRACE |
| Default: | PUT                                                |

*Description:* Specifies the HTTP method to use when sending the message to the server. {{% conditional-text include-if="ose" %}}Available in {{% param "product.abbrev" %}} version 3.7.2 and newer.{{% /conditional-text %}}


{{% include-headless "chunk/option-destination-retries.md" %}}

{{% include-headless "chunk/option-destination-template.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}


## url() {#http-option-url}

|          |     |
| -------- | --- |
| Type:    | URL |
| Default: |     |

*Description:* Specifies the hostname or IP address and optionally the port number of the web service that can receive log data via HTTP. Use a colon (**:**) after the address to specify the port number of the server. You can also use macros, templates, and template functions in the URL, for example: `http://host.example.com:8080/${MACRO1}/${MACRO2}/script")`

