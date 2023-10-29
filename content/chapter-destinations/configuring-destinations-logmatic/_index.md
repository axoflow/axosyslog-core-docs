---
title: "logmatic: Send logs to Logmatic.io"
weight:  2900
driver: "logmatic()"
short_description: "Send logs to Logmatic.io"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `logmatic()` destination sends log messages to the [Logmatic.io](https://logmatic.io/) Logging-as-a-Service provider. You can send log messages over TCP, or encrypted with TLS.


## Declaration:

```shell
   logmatic(token());
```


## Example: Using the logmatic() driver {#example-destination-logmatic}

To use the logmatic() destination, the only mandatory parameter is your user token. The following example sends every log from the `system()` source to your Logmatic.io account.

```shell
   log {
        source { system(); };
        destination { logmatic(token("<API-KEY-AS-PROVIDED-BY-LOGMATIC.IO>")); };
    };
```

The following example uses TLS encryption. Before using it, download the CA certificate of Logmatic.io and copy it to your hosts (for example, into the `/etc/ssl/certs/` directory.

```shell
   log {
        destination {
            logmatic(token("<API-KEY-AS-PROVIDED-BY-LOGMATIC.IO>") port(6514)
                tls(peer-verify(required-trusted) ca-dir('/etc/ssl/certs'))
            );
        };
    };
```

The following example parses the access logs of an Apache webserver from a file and sends them to Logmatic.io in JSON format.

```shell
   log {
        source { file("/var/log/apache2/access.log" flags(no-parse)); };
        parser { apache-accesslog-parser(); };
        destination {
            logmatic(token("<API-KEY-AS-PROVIDED-BY-LOGMATIC.IO>")
               tag(apache)
               template("$(format-json .apache.* timestamp=${ISODATE})"));
        };
    }
```


To use the `logmatic()` driver, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```shell
   @include "scl.conf"
```

The `logmatic()` driver is actually a reusable configuration snippet configured to send log messages using the `tcp()` driver using a template. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/logmatic/logmatic.conf).

