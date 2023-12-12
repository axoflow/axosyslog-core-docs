---
title: "Introduction to AxoSyslog"
weight: 100
aliases:
- /chapter-intro/why-do-you-need-syslog-ng/
- /chapter-intro/what-syslog-ng-is-not/
- /chapter-intro/what-syslog-ng-is/
- /chapter-intro/syslog-ng-users/
- /chapter-intro/
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This chapter introduces the {{% param "product.name" %}} application in a non-technical manner, discussing how and why is it useful, and the benefits it offers to an existing IT infrastructure.

## What {{% param "product.name" %}} is {#what-axosyslog-is}

The {{% param "product.name" %}} application is a flexible and highly scalable system logging application that is ideal for creating centralized and trusted logging and observability solutions and telemetry pipelines, supporting on-premises, cloud-native, and hybrid environments.

Among others, {{% param "product.abbrev" %}} allows you the following.

### Secure and reliable data transfer

The {{% param "product.abbrev" %}} application enables you to send log messages and other observability data from your hosts to remote servers using the latest protocol standards. You can collect and store your log data centrally on dedicated log servers. Transfer your log messages and observability data using reliable protocols to ensure that no messages are lost.

### Disk-based message buffering

To minimize the risk of losing important log messages, the {{% param "product.abbrev" %}} application can store messages on the local hard disk if the central log server or the network connection becomes unavailable. The {{% param "product.abbrev" %}} application automatically sends the stored messages to the server when the connection is reestablished, in the same order the messages were received. The disk buffer is persistent – no messages are lost even if {{% param "product.abbrev" %}} is restarted.

### Secure logging using TLS

Log messages may contain sensitive information that should not be accessed by third parties. Therefore, {{% param "product.abbrev" %}} supports the Transport Layer Security (TLS) protocol to encrypt the communication. TLS also allows you to authenticate your clients and the logserver using X.509 certificates.

### Flexible data extraction and processing

Most log messages are inherently unstructured, which makes them difficult to process. To overcome this problem, {{% param "product.abbrev" %}} comes with a huge set of built-in parsers, which you can combine to build very complex things.

### Filter and classify

The {{% param "product.abbrev" %}} application can sort the incoming log messages based on their content and various parameters like the source host, application, and priority. You can create directories, files, and database tables dynamically using macros. Complex filtering using regular expressions and boolean operators offers almost unlimited flexibility to forward only the important log messages to the selected destinations.

### Parse and rewrite

The {{% param "product.abbrev" %}} application can segment log messages to named fields or columns, and also modify the values of these fields. You can process JSON messages, key-value pairs, and more.

To get the most information out of your log data, {{% param "product.abbrev" %}} allows you to correlate multiple log messages and aggregate the extracted information into a single message. You can also use external information to enrich your log data.

### Big data clusters

The log data that your organization has to process, store, and review increases daily, so many organizations use big data solutions for their logs. To accommodate this huge amount of data, {{% param "product.abbrev" %}} natively supports storing log messages and observability data in destinations like HDFS files, Elasticsearch/OpenSearch, and cloud storage solutions like Google Pub/Sub and Amazon S3.

### Message queue support

Large organizations increasingly rely on queuing infrastructure to transfer their data. For that purpose, {{% param "product.abbrev" %}} supports Apache Kafka, the Advanced Message Queuing Protocol (AMQP), and the Simple Text Oriented Messaging Protocol (STOMP).

### SQL, NoSQL, and monitoring

Storing your log messages in a database allows you to easily search and query the messages and interoperate with log analyzing applications. The {{% param "product.abbrev" %}} application supports the following databases: MongoDB, MSSQL, MySQL, Oracle, PostgreSQL, and SQLite.

{{% param "product.abbrev" %}} also allows you to extract the information you need from your log data, and directly send it to your Graphite, Redis, or Riemann monitoring system.

### syslog protocol standards

{{% param "product.abbrev" %}} not only supports legacy BSD syslog (RFC3164) and the enhanced RFC5424 protocols but also JavaScript Object Notation (JSON) and journald message formats.

### Heterogeneous on-premises and cloud-native environments

The {{% param "product.abbrev" %}} application is the ideal choice to collect logs and observability data in massively heterogeneous environments that use several different operating systems and hardware platforms, including Linux, Unix, BSD, Sun Solaris, HP-UX, MacOS, AIX. You can also run it in containerized environments.

### IPv4 and IPv6 support

The {{% param "product.abbrev" %}} application can operate in both IPv4 and IPv6 network environments, and can receive and send messages to both types of networks.

## What {{% param "product.name" %}} is not {#what-axosyslog-is-not}

The {{% param "product.name" %}} application is not log analysis software. It can filter log messages and select only the ones matching certain criteria. It can even convert the messages and restructure them to a predefined format, or parse the messages and segment them into different fields. But {{% param "product.name" %}} cannot interpret and analyze the meaning behind the messages, or recognize patterns in the occurrence of different messages.

## Why do you need {{% param "product.name" %}} {#why-do-you-need-axosyslog}

Log messages contain information about the events happening on the hosts. Monitoring system events is essential for security and system health monitoring reasons.

The original syslog protocol separates messages based on the priority of the message and the facility sending the message. These two parameters alone are often inadequate to consistently classify messages, as many applications might use the same facility, and the facility itself is not even included in the log message. To make things worse, many log messages contain unimportant information. The AxoSyslog application helps you to select only the really interesting messages, and forward them to a central server.

Company policies or other regulations often require log messages to be archived. Storing the important messages in a central location greatly simplifies this process.

## Who uses {{% param "product.name" %}} {#who-uses-axosyslog}

The {{% param "product.name" %}} application is used worldwide by companies and institutions who collect and manage the logs of several hosts, and want to store them in a centralized, organized way. Using {{% param "product.name" %}} is particularly advantageous for:

- Internet Service Providers
- Financial institutions and companies requiring policy compliance
- Server, web, and application hosting companies
- Datacenters
- Wide area network (WAN) operators
- Server farm administrators.
