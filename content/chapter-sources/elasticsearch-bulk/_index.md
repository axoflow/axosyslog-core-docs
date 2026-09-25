---
title: "elasticsearch-bulk: Receive messages from Elastic clients"
linktitle: Elasticsearch Bulk API
weight:  450
driver: "elasticsearch-bulk()"
short_description: "Receive messages from clients of the Elasticsearch Bulk API"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{< product >}} 4.28 and later.

The `elasticsearch-bulk()` source implements the [Elasticsearch Bulk API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk). Elastic Agent, Beats, and other clients of the Bulk API can send their events to {{< product >}} by pointing their Elasticsearch output at this source, so you can process and route the events before forwarding them to Elasticsearch or to another destination.

{{% alert title="Note" color="info" %}}
This driver is a reusable configuration snippet. For details on such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}.
{{% /alert %}}

## Example: Receiving events from Beats

```shell
source s_es {
  elasticsearch-bulk(
    port(9200)
    auth-token("ApiKey <key>")
    version("8.15.0")
  );
};
```

Configure the Elasticsearch output of your client to point at this address, for example, in a Filebeat configuration:

```yaml
output.elasticsearch:
  hosts: ["http://<IP-of-AxoSyslog>:9200"]
  api_key: "<key>"
```

## How the messages are processed

The body of a bulk request is a sequence of action lines, each followed by a document line. {{< product >}} handles the actions as follows:

| Action | Result |
| ------ | ------ |
| `index`, `create` | The document line becomes a log message, and the action line is stored in `${.es_bulk.action}`. {{< product >}} acknowledges the item with status `201`. |
| `update`, `delete` | {{< product >}} skips the action and acknowledges the item with status `200`, so the client does not resend it. |
| An action without a document line | {{< product >}} rejects the item with status `400`, so the client drops a pair it could never parse instead of resending it. |

Because bulk documents are JSON and not syslog messages, this source doesn't parse the documents as syslog. The whole document line becomes the `${MESSAGE}` of the log message.

{{< product >}} treats a request as a bulk request if its method is `POST` or `PUT`, and its path ends with `/_bulk`. It answers the requests of the clients as follows:

| Request | Response |
| ------- | -------- |
| A bulk request | `200 OK`, with a bulk acknowledgment body that lists the status of every item. |
| `GET /_license` | The license response that the Elastic clients expect. |
| Any other `GET` request | The version handshake, which reports the version set in [`version()`](#version). |
| Any other request | `200 OK` |
| The [`auth-token()`](#auth-token) option is set, and the `Authorization` header of the request is missing or doesn't match. | `401 Unauthorized` |

Every response includes the `X-Elastic-Product: Elasticsearch` header, which the Elastic clients require.

The source accepts `gzip` and `deflate` compressed request bodies, and the [`max-request-size()`](#max-request-size) limit applies to the decompressed body as well.

## elasticsearch-bulk() source options {#options}

The `elasticsearch-bulk()` source has the following options.

{{< include-headless "chunk/option-http-source-auth-token.md" >}}

{{< include-headless "chunk/option-source-chain-hostnames.md" >}}

{{< include-headless "chunk/option-source-check-hostname.md" >}}

{{< include-headless "chunk/option-source-check-program.md" >}}

{{< include-headless "chunk/option-source-default-facility.md" >}}

{{< include-headless "chunk/option-source-default-severity.md" >}}

{{< include-headless "chunk/option-source-dns-cache.md" >}}

{{< include-headless "chunk/option-source-host-override.md" >}}

{{< include-headless "chunk/option-source-idle-timeout.md" >}}

{{< include-headless "chunk/option-source-internal.md" >}}

{{< include-headless "chunk/option-http-source-ip.md" >}}

{{< include-headless "chunk/option-source-ip-freebind.md" >}}

{{< include-headless "chunk/option-source-ip-protocol.md" >}}

{{< include-headless "chunk/option-ip-tos.md" >}}

{{< include-headless "chunk/option-ip-ttl.md" >}}

{{< include-headless "chunk/option-source-keep-alive.md" >}}

{{< include-headless "chunk/option-source-keep-hostname.md" >}}

{{< include-headless "chunk/option-source-keep-timestamp.md" >}}

{{< include-headless "chunk/option-source-listen-backlog.md" >}}

{{< include-headless "chunk/option-source-log-fetch-limit.md" >}}

{{< include-headless "chunk/option-http-source-log-iw-size.md" >}}

{{< include-headless "chunk/option-source-log-msg-size.md" >}}

{{< include-headless "chunk/option-source-log-prefix.md" >}}

{{< include-headless "chunk/option-http-source-max-connections.md" >}}

{{< include-headless "chunk/option-http-source-max-request-size.md" >}}

{{< include-headless "chunk/option-source-normalize-hostnames.md" >}}

{{< include-headless "chunk/option-persist-name.md" >}}

{{< include-headless "chunk/option-http-source-port.md" >}}

{{< include-headless "chunk/option-source-program-override.md" >}}

{{< include-headless "chunk/option-source-read-old-records.md" >}}

{{< include-headless "chunk/option-source-sdata-prefix.md" >}}

{{< include-headless "chunk/option-so-broadcast.md" >}}

{{< include-headless "chunk/option-source-so-keepalive.md" >}}

{{< include-headless "chunk/option-source-so-rcvbuf.md" >}}

{{< include-headless "chunk/option-so-sndbuf.md" >}}

{{< include-headless "chunk/option-source-tags.md" >}}

{{< include-headless "chunk/option-tcp-keepalive-intvl.md" >}}

{{< include-headless "chunk/option-tcp-keepalive-probes.md" >}}

{{< include-headless "chunk/option-tcp-keepalive-time.md" >}}

{{< include-headless "chunk/option-source-time-zone.md" >}}

{{< include-headless "chunk/option-http-source-tls.md" >}}

{{< include-headless "chunk/option-http-source-transport.md" >}}

{{< include-headless "chunk/option-source-use-dns.md" >}}

{{< include-headless "chunk/option-source-use-fqdn.md" >}}

{{< include-headless "chunk/option-source-use-syslogng-pid.md" >}}

## version() {#version}

|          |         |
| -------- | ------- |
| Type:    | string  |
| Default: | `8.15.0` |

*Description:* The Elasticsearch version that {{< product >}} reports to the clients in the version handshake. The Elastic clients refuse a server whose major and minor version is older than their own, unless you enable the `allow_older_versions` option on the client side. Set this option to the version your clients expect.
