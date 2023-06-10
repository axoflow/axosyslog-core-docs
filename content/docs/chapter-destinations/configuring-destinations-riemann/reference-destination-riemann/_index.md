---
title: "riemann() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `riemann()` driver sends metrics or events to a [Riemann](http://riemann.io/) monitoring system.

The `riemann()` destination has the following options:


## attributes()

|          |                                                |
| -------- | ---------------------------------------------- |
| Type:    | parameter list of the `value-pairs()` option |
| Default: |                                                |

*Description:* The `attributes()` option adds extra metadata to the Riemann event, that can be displayed on the Riemann dashboard. To specify the metadata to add, use the syntax of the `value-pairs()` option. For details on using `value-pairs()`, see {{% xref "/docs/chapter-concepts/concepts-value-pairs/_index.md" %}}.



## description()

|          |                            |
| -------- | -------------------------- |
| Type:    | template, macro, or string |
| Default: |                            |

*Description:* The value to add as the description field of the Riemann event.

{{% include-headless "chunk/option-destination-diskbuffer.md" %}}



## event-time() {#riemann-option-event-time}

|          |                            |
| -------- | -------------------------- |
| Type:    | template, macro, or string |
| Default: | ${UNIXTIME}                |

*Description:* Instead of the arrival time into Riemann, {{% param "product.abbrev" %}} can also send its own timestamp value.

This can be useful if Riemann is inaccessible for a while, and the messages are collected in the disk buffer until Riemann is accessible again. In this case, it would be difficult to differentiate between messages based on the arrival time only, because this would mean that there would be hundreds of messages with the same arrival time. This issue can be solved by using this option.

The `event-time()` option takes an optional parameter specifying whether the time format is in seconds or microseconds. For example:

```c
   event-time("$(* $UNIXTIME 1000000)" microseconds)
    event-time("12345678" microseconds)
    event-time("12345678" seconds)
    event-time("12345678")
```

In case the parameter is omitted, {{% param "product.abbrev" %}} defaults to the seconds version. In case the `event-time()` option is omitted altogether, {{% param "product.abbrev" %}} defaults to the seconds version with `$UNIXTIME`.

Note that the time format parameter requires:

  - riemann-c-client 1.10.0 or newer
    
    In older versions of riemann-c-client, the microseconds option is not available.
    
    In case your distribution does not contain a recent enough version of riemann-c-client and you wish to use microseconds, install a new version from [](https://github.com/algernon/riemann-c-client).
    
    If you installed the new version in a custom location (instead of the default one), make sure that you append the directory of the pkg-config file (`.pc` file) to the environment variable `export PKG_CONFIG_PATH=...`.
    
    After calling `configure`, you should see the following message in the case of successful installation:
    
    ```c
        [...]
         Riemann destination (module): yes, microseconds: yes
        [...]
    
    ```

  - Riemann 2.13 or newer
    
    Older versions of Riemann cannot handle microseconds. No error will be indicated, however, the time of the event will be set to the timestamp when the message arrived to Riemann.



## Example: Example event-time() option

```c
   destination d_riemann {
       riemann(
       server("127.0.0.1")
       port(5555)
       event-time("${UNIXTIME}")
       [...]
       );
    };
```


{{% include-headless "chunk/option-destination-batch-bytes.md" %}}


{{% include-headless "chunk/option-destination-batch-lines.md" %}}

If an error occurs while sending the messages to the server, {{% param "product.abbrev" %}} will try to resend every message from the batch. If it does not succeed (you can set the number of retry attempts in the `retries()` option), {{% param "product.abbrev" %}} drops every message in the batch.


{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

{{< include-headless "chunk/option-destination-hook.md" >}}

## host() {#riemann-option-host}

|          |                            |
| -------- | -------------------------- |
| Type:    | template, macro, or string |
| Default: | ${HOST}                    |

*Description:* The value to add as the host field of the Riemann event.

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

## metric()

|          |                            |
| -------- | -------------------------- |
| Type:    | template, macro, or string |
| Default: |                            |

*Description:* The numeric value to add as the metric field of the Riemann event. If possible, include type-hinting as well, otherwise the Riemann server will interpret the value as a floating-point number. The following example specifies the SEQNUM macro as an integer.

```c
   metric(int("$SEQNUM"))
```


## port() {#riemann-option-port}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 5555   |

*Description:* The port number of the Riemann server.

{{% include-headless "chunk/option-destination-retries.md" %}}



## server()

|          |                        |
| -------- | ---------------------- |
| Type:    | hostname or IP address |
| Default: | 127.0.0.1              |

*Description:* The hostname or IP address of the Riemann server.



## service()

|          |                            |
| -------- | -------------------------- |
| Type:    | template, macro, or string |
| Default: | ${PROGRAM}                 |

*Description:* The value to add as the service field of the Riemann event.



## state()

|          |                            |
| -------- | -------------------------- |
| Type:    | template, macro, or string |
| Default: |                            |

*Description:* The value to add as the state field of the Riemann event.

## tags()

|          |                                          |
| -------- | ---------------------------------------- |
| Type:    | string list                              |
| Default: | the tags already assigned to the message |

*Description:* The list of tags to add as the tags field of the Riemann event. If not specified {{% param "product.abbrev" %}} automatically adds the tags already assigned to the message. If you set the `tags()` option, only the tags you specify will be added to the event.

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

## timeout()

|          |                    |
| -------- | ------------------ |
| Type:    | number [seconds] |
| Default: |                    |

*Description:* The value (in seconds) to wait for an operation to complete, and attempt to reconnect the Riemann server if exceeded. By default, the timeout is disabled.



## ttl()

|          |                            |
| -------- | -------------------------- |
| Type:    | template, macro, or number |
| Default: |                            |

*Description:* The value (in seconds) to add as the ttl (time-to-live) field of the Riemann event.



## type()

|          |                 |
| -------- | --------------- |
| Type:    | tcp | tls | udp |
| Default: | tcp             |

*Description:* The type of the network connection to the Riemann server: TCP, TLS, or UDP. For TLS connections, set the `ca-file()` option to authenticate the Riemann server, and the `cert-file()` and `key-file()` options if the Riemann server requires authentication from its clients.



## Declaration 1:

```c
   destination d_riemann {
        riemann(
            server("127.0.0.1")
            port(5672)
            type(
               "tls"
               ca-file("ca")
               cert-file("cert") 
               key-file("key")
            )
        );
    };
```

An alternative way to specify TLS options is to group them into a `tls()` block. This allows you to separate them and ensure better readability.



## Declaration 2:

```c
   destination d_riemann {
        riemann(
            server("127.0.0.1")
            port(5672)
            type("tls")
            tls(
                ca-file("ca")
                cert-file("cert") 
                key-file("key")
            )
        );
    };
```

Make sure that you specify TLS options either using `type()` or using the `tls()` block. Avoid mixing the two methods. In case you do specify TLS options in both ways, the one that comes later in the configuration file will take effect.

*ca-file()*


Type:

path to a CA certificate in PEM format

Default:

*Description:* Path to the CA certificate in PEM format that signed the certificate of the Riemann server. When establishing TLS connection, {{% param "product.abbrev" %}} verifies the certificate of the Riemann server using this CA.

*Alternative 1:*

```c
   type(
        "tls"
        ca-file("/opt/syslog-ng/etc/syslog-ng/riemann-cacert.pem")
        )
```

*Alternative 2:*

```c
   riemann(
        .
        .
        type("tls")
     tls(
                ca-file("/opt/syslog-ng/etc/syslog-ng/riemann-cacert.pem")
        )
```

This option was called `cacert()` up until (and including) {{% param "product.abbrev" %}} version 3.12.

*cert-file()*

Type:

path to a certificate in PEM format

Default:

*Description:* Path to the a certificate file in PEM format. When establishing TLS connection, {{% param "product.abbrev" %}} authenticates on the Riemann server using this certificate and the matching private key set in the `key-file()` option.

{{% include-headless "chunk/destination-riemann-tls-description.md" %}}

This option was called `cert()` in {{% param "product.abbrev" %}} version 3.7.

*key-file()*

Type:

path to a private key file

Default:

*Description:* Path to the private key of the certificate file set in the `cert-file()` option. When establishing TLS connection, {{% param "product.abbrev" %}} authenticates on the Riemann server using this private key and the matching certificate set in the `cert-file()` option.

{{% include-headless "chunk/destination-riemann-tls-description.md" %}}

This option was called `key()` in {{% param "product.abbrev" %}} version 3.7.
