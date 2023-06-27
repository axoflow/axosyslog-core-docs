---
title: "What AxoSyslog is"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% include-headless "chunk/syslog-ng-definition.md" %}}

Among others, {{% param "product.abbrev" %}} allows you the following.


## Secure and reliable log transfer

The {{% param "product.abbrev" %}} application enables you to send the log messages of your hosts to remote servers using the latest protocol standards. You can collect and store your log data centrally on dedicated log servers. Transfer log messages using the TCP protocol ensures that no messages are lost.



## Disk-based message buffering

To minimize the risk of losing important log messages, the {{% param "product.abbrev" %}} application can store messages on the local hard disk if the central log server or the network connection becomes unavailable. The AxoSyslog application automatically sends the stored messages to the server when the connection is reestablished, in the same order the messages were received. The disk buffer is persistent – no messages are lost even if AxoSyslog is restarted.



## Secure logging using TLS

Log messages may contain sensitive information that should not be accessed by third parties. Therefore, {{% param "product.abbrev" %}} supports the Transport Layer Security (TLS) protocol to encrypt the communication. TLS also allows you to authenticate your clients and the logserver using X.509 certificates.



## Flexible data extraction and processing

Most log messages are inherently unstructured, which makes them difficult to process. To overcome this problem, {{% param "product.abbrev" %}} comes with a set of built-in parsers, which you can combine to build very complex things.



## Filter and classify

The {{% param "product.abbrev" %}} application can sort the incoming log messages based on their content and various parameters like the source host, application, and priority. You can create directories, files, and database tables dynamically using macros. Complex filtering using regular expressions and boolean operators offers almost unlimited flexibility to forward only the important log messages to the selected destinations.



## Parse and rewrite

The {{% param "product.abbrev" %}} application can segment log messages to named fields or columns, and also modify the values of these fields. You can process JSON messages, key-value pairs, and more.

To get the most information out of your log data, {{% param "product.abbrev" %}} allows you to correlate log messages and aggregate the extracted information into a single message. You can also use external information to enrich your log data.



## Big data clusters

The log data that your organization has to process, store, and review increases daily, so many organizations use big data solutions for their logs. To accomodate this huge amount of data, {{% param "product.abbrev" %}} natively supports storing log messages in HDFS files and Elasticsearch clusters.



## Message queue support

Large organizations increasingly rely on queuing infrastructure to transfer their data. For that purpose, {{% param "product.abbrev" %}} supports Apache Kafka, the Advanced Message Queuing Protocol (AMQP), and the Simple Text Oriented Messaging Protocol (STOMP).



## SQL, NoSQL, and monitoring

Storing your log messages in a database allows you to easily search and query the messages and interoperate with log analyzing applications. The AxoSyslog application supports the following databases: MongoDB, MSSQL, MySQL, Oracle, PostgreSQL, and SQLite.

{{% param "product.abbrev" %}} also allows you to extract the information you need from your log data, and directly send it to your Graphite, Redis, or Riemann monitoring system.



## Wide protocol and platform support



## syslog protocol standards

AxoSyslog not only supports legacy BSD syslog (RFC3164) and the enhanced RFC5424 protocols but also JavaScript Object Notation (JSON) and journald message formats.



## Heterogeneous environments

The {{% param "product.abbrev" %}} application is the ideal choice to collect logs in massively heterogeneous environments using several different operating systems and hardware platforms, including Linux, Unix, BSD, Sun Solaris, HP-UX, and AIX.



## IPv4 and IPv6 support

The AxoSyslog application can operate in both IPv4 and IPv6 network environments, and can receive and send messages to both types of networks.

