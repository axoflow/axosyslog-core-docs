---
title: "stomp: Publishing messages using STOMP"
weight:  6100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `stomp()` driver sends messages to servers (message brokers) using the [Simple (or Streaming) Text Oriented Message Protocol (STOMP)](http://stomp.github.io/), formerly known as TTMP. {{% param "product.abbrev" %}} supports version 1.0 of the STOMP protocol. The {{% param "product.abbrev" %}} `stomp()` driver supports persistence.

The name-value pairs selected with the `value-pairs()` option will be sent as STOMP headers, while the body of the STOMP message is empty by default (but you can add custom content using the `body()` option). Publishing the name-value pairs as headers makes it possible to use the Headers exchange-type and subscribe only to interesting log streams.

For the list of available parameters, see {{% xref "/docs/chapter-destinations/configuring-destinations-stomp/reference-destination-stomp/_index.md" %}}.


## Declaration:

```c

    stomp( host("<stomp-server-address>") );

```



## Example: Using the stomp() driver {#example-using-stomp}

The following example shows the default values of the available options.

```c

    destination d_stomp {
        stomp(
            host("localhost")
            port(61613)
            destination("/topic/syslog")
            body("")             # optional, empty by default
            persistent(yes)
            ack(no)
            username("user")     # optional, empty by default
            password("password") # optional, empty by default
            value-pairs(scope(selected-macros, nv-pairs, sdata))
        );
    };

```

