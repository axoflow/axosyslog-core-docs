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

## What {{% param "product.name" %}} is {#what-axosyslog-is}

{{< include-headless "axosyslog-intro.md" >}}

The {{% param "product.name" %}} application is a flexible and highly scalable data processing, observability, and system logging application that is ideal for creating centralized and trusted logging and observability solutions and telemetry pipelines, supporting on-premises, cloud-native, and hybrid environments.

Unlike a traditional syslog daemon, {{% param "product.abbrev" %}} is actively developed with frequent releases that add modern protocols, integrations, and processing features — see {{% xref "/whats-new/_index.md" %}}.

Among others, {{% param "product.abbrev" %}} allows you the following.

### Process and transform data with FilterX

{{% param "product.abbrev" %}} includes [FilterX]({{< relref "/filterx/_index.md" >}}), a powerful data processing engine for parsing, filtering, enriching, and reshaping log and observability data with a concise, expressive language. FilterX makes it easy to work with structured data formats like JSON, and to build sophisticated pipelines that go far beyond traditional syslog processing.

### Collect and forward data using OpenTelemetry and modern protocols

{{% param "product.abbrev" %}} natively supports the [OpenTelemetry protocol (OTLP)]({{< relref "/chapter-sources/opentelemetry/_index.md" >}}) to receive and forward logs, metrics, and traces, so you can integrate {{% param "product.abbrev" %}} into modern observability and telemetry pipelines. To move data efficiently between {{% param "product.abbrev" %}} nodes, use the [`axosyslog-otlp()` drivers]({{< relref "/chapter-destinations/destination-syslog-ng-otlp/_index.md" >}}). {{% param "product.abbrev" %}} also fully supports the traditional syslog protocols — legacy BSD syslog (RFC3164) and the enhanced RFC5424 — as well as delivering data over HTTP in JavaScript Object Notation (JSON) to popular SIEMs and analytics engines.

### Build observability and telemetry pipelines

{{% param "product.abbrev" %}} is a building block for end-to-end observability pipelines that exposes [detailed metrics]({{< relref "/chapter-log-statistics/metrics-reference/_index.md" >}}) about its own operation, so you can monitor the health and throughput of your pipeline.

### Run natively in cloud-native and Kubernetes environments

The {{% param "product.abbrev" %}} application is the ideal choice to collect logs and observability data in massively heterogeneous environments that use several different operating systems, and it runs natively in containerized and [Kubernetes]({{< relref "/chapter-sources/configuring-sources-kubernetes/_index.md" >}}) environments. You can deploy it using the official [Helm charts]({{< relref "/install/helm/_index.md" >}}).

### Flexible data extraction and processing

Most log messages are inherently unstructured, which makes them difficult to process. To overcome this problem, {{% param "product.abbrev" %}} comes with a huge set of [built-in parsers]({{< relref "/chapter-parsers/_index.md" >}}), which you can combine to build very complex things.

### Filter and classify

The {{% param "product.abbrev" %}} application can sort the incoming log messages based on their content and various parameters like the source host, application, and priority. You can create directories, files, and database tables dynamically using macros. [Complex filtering]({{< relref "/chapter-routing-filters/_index.md" >}}) using logical operators offers almost unlimited flexibility to forward only the important data to the selected destinations.

### Parse and rewrite

The {{% param "product.abbrev" %}} application can segment the incoming data to named fields or columns, and also modify the values of these fields. You can process [JSON messages, key-value pairs, and more]({{< relref "/chapter-parsers/_index.md" >}}).

To get the most information out of your data, {{% param "product.abbrev" %}} allows you to [correlate multiple log messages]({{< relref "/chapter-correlating-log-messages/_index.md" >}}) and aggregate the extracted information into a single message. You can also [use external information to enrich your log data]({{< relref "/chapter-enrich-data/_index.md" >}}).

### Store data in big-data and cloud destinations

The data that your organization has to process, store, and review increases daily, so many organizations use big data and cloud solutions for their logs. To accommodate this huge amount of data, {{% param "product.abbrev" %}} natively supports storing log messages and observability data in destinations like [Elasticsearch]({{< relref "/chapter-destinations/configuring-destinations-elasticsearch-http/_index.md" >}})/[OpenSearch]({{< relref "/chapter-destinations/destination-opensearch/_index.md" >}})/[OpenObserve]({{< relref "/chapter-destinations/openobserve/_index.md" >}}), modern analytics services like [ClickHouse]({{< relref "/chapter-destinations/clickhouse/_index.md" >}}) and [Microsoft Sentinel and Azure Monitor]({{< relref "/chapter-destinations/azure-monitor/_index.md" >}}), and cloud storage solutions like [Google BigQuery]({{< relref "/chapter-destinations/google-bigquery/_index.md" >}}), [Google Pub/Sub]({{< relref "/chapter-destinations/google-pubsub/_index.md" >}}) and [Amazon S3]({{< relref "/chapter-destinations/destination-s3/_index.md" >}}).

### Message queue support

Large organizations increasingly rely on queuing infrastructure to transfer their data. For that purpose, {{% param "product.abbrev" %}} supports [Apache Kafka]({{< relref "/chapter-destinations/configuring-destinations-kafka-c/_index.md" >}}), the [Advanced Message Queuing Protocol (AMQP)]({{< relref "/chapter-destinations/configuring-destinations-amqp/_index.md" >}}), [MQTT]({{< relref "/chapter-destinations/destination-mqtt-intro/_index.md" >}}) and the [Simple Text Oriented Messaging Protocol (STOMP)]({{< relref "/chapter-destinations/configuring-destinations-stomp/_index.md" >}}).

### SQL, NoSQL, and monitoring

Storing your log messages in a database allows you to easily search and query the messages and interoperate with log analyzing applications. The {{% param "product.abbrev" %}} application supports the following databases: [MongoDB]({{< relref "/chapter-destinations/configuring-destinations-mongodb/_index.md" >}}), [MSSQL, MySQL, Oracle, PostgreSQL, and SQLite]({{< relref "/chapter-destinations/configuring-destinations-sql/_index.md" >}}).

{{% param "product.abbrev" %}} also allows you to extract the information you need from your data, and directly send it to your [Graphite]({{< relref "/chapter-destinations/configuring-destinations-graphite/_index.md" >}}), [Redis]({{< relref "/chapter-destinations/configuring-destinations-redis/_index.md" >}}), or [Riemann]({{< relref "/chapter-destinations/configuring-destinations-riemann/_index.md" >}}) monitoring system.

### Secure and reliable data transfer

The {{% param "product.abbrev" %}} application enables you to send log messages and other observability data from your hosts to remote servers using the latest protocol standards. You can collect and store your data centrally on dedicated solutions, like log servers or SIEMs. Transfer your log messages and observability data using traditional and modern, reliable protocols to ensure that no messages are lost.

### Disk-based message buffering

To minimize the risk of losing important log messages, the {{% param "product.abbrev" %}} application can store messages on the local hard disk if the central log server or the network connection becomes unavailable. The {{% param "product.abbrev" %}} application automatically sends the stored messages to the server when the connection is reestablished, in the same order the messages were received. The disk buffer is persistent – no messages are lost even if {{% param "product.abbrev" %}} is restarted.

### Secure logging using TLS

Log messages may contain sensitive information that should not be accessed by third parties. Therefore, {{% param "product.abbrev" %}} supports the Transport Layer Security (TLS) protocol to encrypt the communication. TLS also allows you to authenticate your clients and the logserver using X.509 certificates.

### IPv4 and IPv6 support

The {{% param "product.abbrev" %}} application can operate in both IPv4 and IPv6 network environments, and can receive and send messages to both types of networks.

## What {{% param "product.name" %}} is not {#what-axosyslog-is-not}

The {{% param "product.name" %}} application is not log analysis software. It can filter log messages and select only the ones matching certain criteria. It can even convert the messages and restructure them to a predefined format, or parse the messages and segment them into different fields. But {{% param "product.name" %}} cannot interpret and analyze the meaning behind the messages, or recognize patterns in the occurrence of different messages.

## Why do you need {{% param "product.name" %}} {#why-do-you-need-axosyslog}

Log messages contain information about the events happening on the hosts. Monitoring system events is essential for security and system health monitoring reasons.

The original syslog protocol separates messages based on the priority of the message and the facility sending the message. These two parameters alone are often inadequate to consistently classify messages, as many applications might use the same facility, and the facility itself is not even included in the log message. To make things worse, many log messages contain unimportant information. The AxoSyslog application helps you to select only the really interesting messages, and forward them to a central server.

Company policies or other regulations often require log messages to be archived. Storing the important messages in a central location greatly simplifies this process.

Beyond traditional centralized logging, {{% param "product.name" %}} acts as the collection and processing layer of a modern observability and security pipeline. It ingests logs, metrics, and traces, processes and enriches them with [FilterX]({{< relref "/filterx/_index.md" >}}), and routes them — over the [OpenTelemetry protocol]({{< relref "/chapter-sources/opentelemetry/_index.md" >}}), HTTP, or traditional syslog — to both legacy stores and modern backends such as OpenSearch, ClickHouse, Microsoft Sentinel, and cloud storage. This lets you feed your SIEM, observability platform, and long-term archive from a single, vendor-neutral pipeline.

## Who uses {{% param "product.name" %}} {#who-uses-axosyslog}

The {{% param "product.name" %}} application is used worldwide by companies and institutions who collect and manage the logs of several hosts, and want to store them in a centralized, organized way. Using {{% param "product.name" %}} is particularly advantageous for:

- Platform engineering and site reliability (SRE) teams running containerized and Kubernetes workloads
- Security and SOC teams that feed logs into a SIEM
- Observability teams building telemetry pipelines for logs, metrics, and traces
- Cloud-native organizations operating in hybrid and multi-cloud environments
- Internet Service Providers
- Financial institutions and companies requiring policy compliance
- Server, web, and application hosting companies
- Datacenters
- Wide area network (WAN) operators
- Server farm administrators.
