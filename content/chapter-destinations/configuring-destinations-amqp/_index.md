---
title: "amqp: Publish messages using AMQP"
weight:  100
driver: "amqp()"
short_description: "Publish messages using AMQP"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `amqp()` driver publishes messages using the [AMQP (Advanced Message Queuing Protocol)](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol). {{% param "product.abbrev" %}} supports AMQP versions 0.9.1 and 1.0. The {{% param "product.abbrev" %}} `amqp()` driver supports persistence, and every available exchange types.

The name-value pairs selected with the `value-pairs()` option will be sent as AMQP headers, while the body of the AMQP message is empty by default (but you can add custom content using the `body()` option). Publishing the name-value pairs as headers makes it possible to use the Headers exchange-type and subscribe only to interesting log streams. This solution is more flexible than using the `routing-key()` option.

For the list of available parameters, see {{% xref "/chapter-destinations/configuring-destinations-amqp/reference-destination-amqp/_index.md" %}}.


## Declaration:

```shell
   amqp( host("<amqp-server-address>") );
```



## Example: Using the amqp() driver {#example-using-amqp}

The following example shows the default values of the available options.

```shell
   destination d_amqp {
        amqp(
            vhost("/")
            host("127.0.0.1")
            port(5672)
            exchange("syslog")
            exchange-type("fanout")
            routing-key("")
            body("")
            persistent(yes)
            value-pairs(
                scope("selected-macros" "nv-pairs" "sdata")
            )
        );
    };
```

