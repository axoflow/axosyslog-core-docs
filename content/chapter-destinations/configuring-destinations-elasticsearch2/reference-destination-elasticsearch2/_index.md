---
title: "Elasticsearch2 destination options (DEPRECATED)"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{< include-headless "wnt/warning-elasticsearch2-deprecated.md" >}}

The `elasticsearch2` destination can directly send log messages to [Elasticsearch](https://www.elastic.co/products/elasticsearch), allowing you to search and analyze your data in real time, and visualize it with [Kibana](https://www.elastic.co/products/kibana). The `elasticsearch2` destination has the following options.


## Required options:

The following options are required: `index()`, `type()`. In node mode, either the `cluster()` or the `resource()` option is required as well. Note that to use `elasticsearch2`, you must add the following lines to the beginning of your {{% param "product.abbrev" %}} configuration:

```c
   @include "scl.conf"
```



{{% include-headless "chunk/option-destination-java-class-path.md" %}}

*Description:* Include the path to the directory where you copied the required libraries (see {{% xref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/destination-elasticsearch2-prerequisites/_index.md" %}}), for example, `client-lib-dir(/user/share/elasticsearch-2.2.0/lib)`.



## client-mode() {#elasticsearch2-option-elasticsearch2-client-mode}

|          |                                                                                                                                                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type:    | http | https | transport | node | searchguard |
| Default: | node                                                                                                                                                                                                                                      |

*Description:* Specifies the client mode used to connect to the Elasticsearch server, for example, `client-mode("node")`.

{{% include-headless "chunk/option-destination-elasticsearch-client-mode-description.md" %}}



## cluster() {#elasticsearch2-option-elasticsearch2-cluster}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* Specifies the name or the Elasticsearch cluster, for example, `cluster("my-elasticsearch-cluster")`. Optionally, you can specify the name of the cluster in the Elasticsearch resource file. For details, see [resource()](#elasticsearch2-option-elasticsearch2-resource).


{{% include-headless "chunk/option-destination-elasticsearch-cluster-url.md" %}}


## concurrent-requests() {#elasticsearch2-option-elasticsearch2-concurrent-requests}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 0      |

*Description:* The number of concurrent (simultaneous) requests that {{% param "product.abbrev" %}} sends to the Elasticsearch server. Set this option to 1 or higher to increase performance. When using the `concurrent-requests()` option, make sure that the `flush-limit()` option is higher than one, otherwise it will not have any noticeable effect. For details, see [flush-limit()](#elasticsearch2-option-elasticsearch2-flush-limit).

{{% alert title="Warning" color="warning" %}}

Hazard of data loss! Using the `concurrent-requests()` option increases the number of messages lost in case the Elasticsearch server becomes unaccessible.

{{% /alert %}}



## custom-id() {#elasticsearch2-option-elasticsearch2-custom-id}

|          |                               |
| -------- | ----------------------------- |
| Type:    | template or template function |
| Default: | N/A                           |

*Description:* Use this option to specify a custom ID for the records inserted into Elasticsearch. If this option is not set, the Elasticsearch server automatically generates and ID for the message. For example: `custom-id(${UNIQID})` (Note that to use the `${UNIQID}` macro, the `use-uniqid()` global option must be enabled. For details, see [use-uniqid()]({{< relref "/docs/chapter-global-options/reference-options/_index.md" >}}).)


{{< include-headless "chunk/option-destination-diskbuffer.md" >}}


## flush-limit() {#elasticsearch2-option-elasticsearch2-flush-limit}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 5000   |

*Description:* The number of messages that {{% param "product.abbrev" %}} sends to the Elasticsearch server in a single batch.

{{% include-headless "chunk/option-destination-elasticsearch-flush-limit-description.md" %}}


{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}


## http-auth-type() {#elasticsearch2-option-elasticsearch2-http-auth-type}

|          |                           |
| -------- | ------------------------- |
| Type:    | none | basic | clientcert |
| Default: | none                      |

*Description:* Determines how {{% param "product.abbrev" %}} authenticates to the Elasticsearch server. Depending on the value of this option, you might have to set other options as well. Possible values:

  - `none`: Connect to the Elasticsearch server without authentication.

  - `basic`: Use password authentication. Also set the [`http-auth-type-basic-username`]({{< relref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/reference-destination-elasticsearch2/_index.md" >}}) and [`http-auth-type-basic-password`]({{< relref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/reference-destination-elasticsearch2/_index.md" >}}) options.

  - `clientcert`: Use a certificate to authenticate. The certificate must be available in a Java keystore. Also set the [`java-keystore-filepath`]({{< relref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/reference-destination-elasticsearch2/_index.md" >}}) and [`java-keystore-password`]({{< relref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/reference-destination-elasticsearch2/_index.md" >}}) options.

This option is used only in HTTPS mode: `client-mode("https")`, and is available in {{% param "product.abbrev" %}} version 3.10 and newer.


## Example: HTTPS authentication examples {#elasticsearch2-https-auth-examples}

The following simple examples show the different authentication modes.

{{% include-headless "chunk/example-elasticsearch-https-password.md" %}}

{{% include-headless "chunk/example-elasticsearch-https-clientcert.md" %}}

{{% include-headless "chunk/example-elasticsearch-https-verifycert.md" %}}

{{% include-headless "chunk/example-elasticsearch-https-verifycert-clientcert.md" %}}




## http-auth-type-basic-password() {#elasticsearch2-option-elasticsearch2-http-auth-type-basic-password}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The password to use for password-authentication on the Elasticsearch server. You must also set the [`http-auth-type-basic-username`]({{< relref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/reference-destination-elasticsearch2/_index.md" >}}) option.

This option is used only in HTTPS mode with basic authentication: `client-mode("https")` and `http-auth-type("basic")`, and is available in {{% param "product.abbrev" %}} version 3.10 and newer.

{{% include-headless "chunk/example-elasticsearch-https-password.md" %}}



## http-auth-type-basic-username() {#elasticsearch2-option-elasticsearch2-http-auth-type-basic-username}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The username to use for password-authentication on the Elasticsearch server. You must also set the [`http-auth-type-basic-password`]({{< relref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/reference-destination-elasticsearch2/_index.md" >}}) option.

This option is used only in HTTPS mode with basic authentication: `client-mode("https")` and `http-auth-type("basic")`, and is available in {{% param "product.abbrev" %}} version 3.10 and newer.

{{% include-headless "chunk/example-elasticsearch-https-password.md" %}}



## index() {#elasticsearch2-option-elasticsearch2-index}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* Name of the Elasticsearch index to store the log messages. You can use macros and templates as well.



## java-keystore-filepath() {#elasticsearch2-option-elasticsearch2-java-keystore-filepath}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* Path to the Java keystore file that stores the certificate that {{% param "product.abbrev" %}} uses to authenticate on the Elasticsearch server. You must also set the [`java-keystore-password`]({{< relref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/reference-destination-elasticsearch2/_index.md" >}}) option.

{{% include-headless "chunk/example-elasticsearch-https-java-keystore-import.md" %}}

This option is used only in HTTPS mode with basic authentication: `client-mode("https")` and `http-auth-type("clientcert")`, and is available in {{% param "product.abbrev" %}} version 3.10 and newer.

{{% include-headless "chunk/example-elasticsearch-https-clientcert.md" %}}

{{% include-headless "chunk/example-elasticsearch-https-verifycert-clientcert.md" %}}



## java-keystore-password() {#elasticsearch2-option-elasticsearch2-java-keystore-password}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The password of the Java keystore file set in the [`java-keystore-filepath`]({{< relref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/reference-destination-elasticsearch2/_index.md" >}}) option.

{{% include-headless "chunk/example-elasticsearch-https-java-keystore-import.md" %}}

This option is used only in HTTPS mode with basic authentication: `client-mode("https")` and `http-auth-type("clientcert")`, and is available in {{% param "product.abbrev" %}} version 3.10 and newer.

{{% include-headless "chunk/example-elasticsearch-https-clientcert.md" %}}

{{% include-headless "chunk/example-elasticsearch-https-verifycert-clientcert.md" %}}



## java-truststore-filepath() {#elasticsearch2-option-elasticsearch2-java-truststore-filepath}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* Path to the Java keystore file that stores the CA certificate that {{% param "product.abbrev" %}} uses to verify the certificate of the Elasticsearch server. You must also set the [`java-truststore-password`]({{< relref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/reference-destination-elasticsearch2/_index.md" >}}) option.

If you do not set the `java-truststore-filepath` option, {{% param "product.abbrev" %}} does accepts any certificate that the Elasticsearch server shows. In this case, the identity of the server is not verified, only the connection is encrypted.

{{% include-headless "chunk/example-elasticsearch-https-java-keystore-import.md" %}}

This option is used only in HTTPS mode: `client-mode("https")`, and is available in {{% param "product.abbrev" %}} version 3.10 and newer.

{{% include-headless "chunk/example-elasticsearch-https-verifycert.md" %}}

{{% include-headless "chunk/example-elasticsearch-https-verifycert-clientcert.md" %}}



## java-truststore-password() {#elasticsearch2-option-elasticsearch2-java-truststore-password}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The password of the Java truststore file set in the [`java-truststore-filepath`]({{< relref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/reference-destination-elasticsearch2/_index.md" >}}) option.

{{% include-headless "chunk/example-elasticsearch-https-java-keystore-import.md" %}}

This option is used only in HTTPS mode: `client-mode("https")`, and is available in {{% param "product.abbrev" %}} version 3.10 and newer.

{{% include-headless "chunk/example-elasticsearch-https-verifycert.md" %}}

{{% include-headless "chunk/example-elasticsearch-https-verifycert-clientcert.md" %}}


{{% include-headless "chunk/option-destination-jvm-options.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{< include-headless "chunk/option-destination-on-error.md" >}}


## port() {#elasticsearch2-option-elasticsearch2-port}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 9300   |

*Description:* The port number of the Elasticsearch server. This option is used only in transport mode: `client-mode("transport")`


{{% include-headless "chunk/option-destination-retries.md" %}}


## resource() {#elasticsearch2-option-elasticsearch2-resource}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The list of Elasticsearch resources to load, separated by semicolons. For example, `resource("/home/user/elasticsearch/elasticsearch.yml;/home/user/elasticsearch/elasticsearch2.yml")`.



## server() {#elasticsearch2-option-elasticsearch2-server}

|          |                   |
| -------- | ----------------- |
| Type:    | list of hostnames |
| Default: | 127.0.0.1         |

*Description:* Specifies the hostname or IP address of the Elasticsearch server. When specifying an IP address, IPv4 (for example, `192.168.0.1`) or IPv6 (for example, `[::1]`) can be used as well. When specifying multiple addresses, use space to separate the addresses, for example, `server("127.0.0.1 remote-server-hostname1 remote-server-hostname2")`

This option is used only in transport mode: `client-mode("transport")`

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
        server("node01 node02")
        port(9200)
      );
    };
```



## skip-cluster-health-check() {#elasticsearch2-option-elasticsearch2-skip-cluster-health-check}

|          |        |
| -------- | ------ |
| Type:    | yes|no |
| Default: | no     |

*Description:* By default, when connecting to an Elasticsearch cluster, {{% param "product.abbrev" %}} checks the state of the cluster. If the primary shards of the cluster are not active, {{% param "product.abbrev" %}} will not send messages, but wait for them to become active. To disable this health check and send the messages to Elasticsearch anyway, use the `skip-cluster-health-check(yes)` option in your configuration.


## template() {#elasticsearch2-option-elasticsearch2-template}

|          |                                                                                   |
| -------- | --------------------------------------------------------------------------------- |
| Type:    | template or template function                                                     |
| Default: | $(format-json --scope rfc5424 --exclude DATE --key ISODATE @timestamp=${ISODATE}) |

*Description:* The message as sent to the Elasticsearch server. Typically, you will want to use the command-line notation of the `format-json` template function.

To add a `@timestamp` field to the message, for example, to use with Kibana, include the `@timestamp=${ISODATE}` expression in the template. For example: `template($(format-json --scope rfc5424 --exclude DATE --key ISODATE @timestamp=${ISODATE}))`

For details on formatting messages in JSON format, see [format-json]({{< relref "/docs/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}).

{{% include-headless "chunk/option-destination-throttle.md" %}}


{{% include-headless "chunk/option-destination-timezone.md" %}}

{{% include-headless "chunk/option-destination-elasticsearch-timezone.md" %}}


{{< include-headless "chunk/option-destination-ts-format.md" >}}


## type() {#elasticsearch2-option-elasticsearch2-type}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The type of the index. For example, `type("test")`.

