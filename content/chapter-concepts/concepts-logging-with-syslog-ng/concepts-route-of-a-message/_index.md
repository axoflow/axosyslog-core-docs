---
title: "The route of a log message in AxoSyslog"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Purpose:

The following procedure illustrates the route of a log message from its source on the {{% param "product.abbrev" %}} client to its final destination on the central {{% param "product.abbrev" %}} server.

![The route of a log message](fig-syslog-ng-logging-01.png)

## Steps:

1.  A device or application sends a log message to a source on the {{% param "product.abbrev" %}} client. For example, an Apache web server running on Linux enters a message into the `/var/log/apache` file.

2.  The {{% param "product.abbrev" %}} client running on the web server reads the message from its `/var/log/apache` source.

3.  The {{% param "product.abbrev" %}} client processes the first log statement that includes the `/var/log/apache` source.

4.  The {{% param "product.abbrev" %}} client performs optional operations (message filtering, parsing, and rewriting) on the message, for example, it compares the message to the filters of the log statement (if any). If the message complies with all filter rules, {{% param "product.abbrev" %}} sends the message to the destinations set in the log statement, for example, to the remote {{% param "product.abbrev" %}} server.
    
    {{% alert title="Warning" color="warning" %}}
Message filtering, parsing, and rewriting is performed in the order that the operations appear in the log statement.
    {{% /alert %}}

5.  The {{% param "product.abbrev" %}} client processes the next log statement that includes the `/var/log/apache` source, repeating Steps 3-4.

6.  The message sent by the {{% param "product.abbrev" %}} client arrives from a source set in the {{% param "product.abbrev" %}} server.

7.  The {{% param "product.abbrev" %}} server reads the message from its source and processes the first log statement that includes that source.

8.  The {{% param "product.abbrev" %}} server performs optional operations (message filtering, parsing, and rewriting) on the message, for example, it compares the message to the filters of the log statement (if any). If the message complies with all filter rules, {{% param "product.abbrev" %}} sends the message to the destinations set in the log statement.
    
    {{% alert title="Warning" color="warning" %}}
Message filtering, parsing, and rewriting is performed in the order that the operations appear in the log statement.
    {{% /alert %}}

9.  The {{% param "product.abbrev" %}} server processes the next log statement, repeating Steps 7-9.
    
    {{% alert title="Note" color="info" %}}
The {{% param "product.abbrev" %}} application can stop reading messages from its sources if the destinations cannot process the sent messages. This feature is called flow-control and is detailed in {{% xref "/chapter-routing-filters/concepts-flow-control/_index.md" %}}.
    {{% /alert %}}

