---
title: "Example use case: using the $DESTIP, the $DESTPORT, and the $PROTO macros"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes scenarios when {{% param "product.companyabbrev" %}} recommends using the $DESTIP, the $DESTPORT, and the $PROTO macros.

Using the $DESTIP, the $DESTPORT, and the $PROTO macros is relevant when multiple sources are configured to receive messages on the {{% param "product.abbrev" %}} side. In this case, the hostname and IP address on the sender's side and the {{% param "product.abbrev" %}} side is the same, and at a later point in the pipeline, {{% param "product.abbrev" %}} can not by default specify which source received the message. The $DESTIP, the $DESTPORT, and the $PROTO macros solve this issue by specifying the local IP address and local port of the original message source, and the protocol used on the original message source on the {{% param "product.abbrev" %}} side.


## When to use the $DESTIP, the $DESTPORT, and the $PROTO macros

{{% param "product.companyabbrev" %}} recommends using the $DESTIP, the $DESTPORT, and the $PROTO macros in either of the following scenarios:

  - Your appliance sends out log messages through both UDP and TCP.

  - The format of the UDP log messages and the TCP log messages is different, and instead of using complex filters, you want to capture either of them, preferably with the simplest possible filter.

  - The IP addresses on the sender's side and the {{% param "product.abbrev" %}} side are the same, therefore the `netmask()` option doesn't work in your configuration.

  - The hostnames on the sender's side and the {{% param "product.abbrev" %}} side are the same, therefore the `host()` option doesn't work in your configuration.



## Macros: $DESTIP, $DESTPORT, and $PROTO

To solve either of the challenges listed previously, {{% param "product.name" %}} supports the following macros that you can include in your configuration:

  - [`$DESTIP`]({{< relref "/docs/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md#macro-destip" >}})

  - [`$DESTPORT`]({{< relref "/docs/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md#macro-destport" >}})

  - [`$PROTO`]({{< relref "/docs/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md#macro-proto" >}})



## Configuration and output

The following configuration example illustrates how you can use the $DESTIP, the $DESTPORT, and the $PROTO macros in your {{% param "product.abbrev" %}} configuration.


## Example: using the $DESTIP, the $DESTPORT, and the $PROTO macros in your configuration

The $DESTIP, the $DESTPORT, and the $PROTO macros in your {{% param "product.abbrev" %}} configuration:

```c
   log{ 
      source{ 
        network(localip(10.12.15.215) port(5555) transport(udp)); 
      };
    
    destination { 
      file("/dev/stdout" template("destip=$DESTIP destport=$DESTPORT proto=$PROTO\n")); 
      };
    };
```

With these configuration settings, the macros will specify the local IP, the local port, and the protocol information of the source from which the message originates as follows:

```c
   destip=10.12.15.215 destport=5555 proto=17
```


