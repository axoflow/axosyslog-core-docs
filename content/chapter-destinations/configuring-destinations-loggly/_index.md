---
title: "loggly: Send logs to Loggly"
weight:  2700
driver: "loggly()"
short_description: "Send logs to Loggly"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `loggly()` destination sends log messages to the [Loggly](https://www.loggly.com/) Logging-as-a-Service provider. You can send log messages over TCP, or encrypted with TLS.


## Declaration:

```shell
   loggly(token());
```


## Example: Using the loggly() driver {#example-destination-loggly}

To use the loggly() destination, the only mandatory parameter is your user token. The following example sends every log from the `system()` source to your Loggly account.

```shell
   log {
        source { system(); };
        destination { loggly(token("<USER-TOKEN-AS-PROVIDED-BY-LOGGLY>")); };
    };
```

The following example uses TLS encryption. Before using it, download the CA certificate of Loggly and copy it to your hosts (for example, into the `/etc/ssl/certs/` directory.

```shell
   log {
        destination {
            loggly(token("<USER-TOKEN-AS-PROVIDED-BY-LOGGLY>") port(6514)
                tls(peer-verify(required-trusted) ca-dir('/etc/ssl/certs'))
            );
        };
    };
```

The following example parses the access logs of an Apache webserver from a file and sends them to Loggly in JSON format.

```shell
   log {
        source { file("/var/log/apache2/access.log" flags(no-parse)); };
        parser { apache-accesslog-parser(); };
        destination {
            loggly(token("<USER-TOKEN-AS-PROVIDED-BY-LOGGLY>")
               tag(apache)
               template("$(format-json .apache.* timestamp=${ISODATE})"));
        };
    }
```


To use the `loggly()` driver, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```shell
   @include "scl.conf"
```

The `loggly()` driver is actually a reusable configuration snippet configured to send log messages using the `tcp()` driver using a template. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/loggly/loggly.conf).

