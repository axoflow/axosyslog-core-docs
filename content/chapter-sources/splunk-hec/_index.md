---
title: "splunk-hec: Receive messages from Splunk HEC clients"
linktitle: Splunk HEC
weight:  3600
driver: "splunk-hec()"
short_description: "Receive messages sent to the Splunk HTTP Event Collector (HEC)"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{< product >}} 4.28 and later.

The `splunk-hec()` source receives messages from clients that send data to the [Splunk HTTP Event Collector (HEC)](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector), for example, from [Splunk Connect for Syslog (SC4S)](https://splunk.github.io/splunk-connect-for-syslog/main/destinations/). This way you can point your existing HEC clients at {{< product >}} without reconfiguring them, and process or route the messages before forwarding them to Splunk or to another destination.

To send messages to Splunk, use the [`splunk-hec-event()` destination]({{< relref "/chapter-destinations/syslog-ng-with-splunk/_index.md" >}}) instead.

{{% alert title="Note" color="info" %}}
This driver is a reusable configuration snippet. For details on such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}.
{{% /alert %}}

## Prerequisites

- Include the {{< product >}} configuration library in your configuration file: `@include "scl.conf"`
- Install the `http` and `json` modules: the `axosyslog-mod-http` and `axosyslog-mod-json` packages on Debian and derivatives, or the `axosyslog-http` and `axosyslog-json` packages on RHEL and derivatives.

## Example: Receiving HEC events

Minimal configuration:

```shell
@include "scl.conf"

source s_splunk_hec {
  splunk-hec(
    token("a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d")
  );
};
```

To receive the events over HTTPS, configure TLS:

```shell
source s_splunk_hec_tls {
  splunk-hec(
    token("a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d")
    transport(tls)
    tls(
      key-file("/etc/syslog-ng/hec.key")
      cert-file("/etc/syslog-ng/hec.crt")
    )
  );
};
```

To test the source, you can use `curl` on the host where {{< product >}} is running:

```shell
curl -X POST -H "Authorization: Splunk a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" \
  --data '{"time": 1757000000.000, "host": "example-host", "event": "hello from HEC"}' \
  http://127.0.0.1:8088/services/collector
```

{{< product >}} accepts the request and answers it with the response the HEC clients expect:

```json
{"text":"Success","code":0}
```

## How the messages are processed

The `splunk-hec()` source handles the incoming requests as follows:

1. It authenticates the request: the `Authorization` header must be `Splunk <token>`, where `<token>` is the value of the [`token()`](#token) option. {{< product >}} rejects every other request with `401 Unauthorized`.
1. It extracts the events from the body of the request. A request can contain a JSON array of events, or several concatenated JSON objects, and each event becomes a separate log message.
1. It parses each event with the [`json-parser()`]({{< relref "/chapter-parsers/json-parser/_index.md" >}}), and makes the fields available with the prefix set in the [`prefix()`](#prefix) option, for example, `${.splunk.source}` and `${.splunk.sourcetype}`.
1. It maps the standard HEC fields to {{< product >}} macros:

    | HEC field | Macro |
    | --------- | ----- |
    | `event`   | `${MESSAGE}` |
    | `host`    | `${HOST}` |
    | `time`    | The timestamp of the message. {{< product >}} accepts both the `<seconds>.<milliseconds>` and the `<seconds>` epoch formats. |

    {{< product >}} maps a field only if it is present and not empty, otherwise the macro keeps its original value.

1. If the payload is not valid JSON, {{< product >}} parses it as a syslog message instead. This way the source also accepts the raw endpoint of HEC.

The source accepts `gzip` and `deflate` compressed request bodies.

## splunk-hec() source options {#options}

The `splunk-hec()` source has the following options.

{{% alert title="Note" color="info" %}}
The `splunk-hec()` source sets the `mode()`, `auth-token()`, `response-body()`, and `flags()` options of the underlying [`ehttp()` source]({{< relref "/chapter-sources/ehttp/_index.md" >}}). Set the [`token()`](#token) option instead of `auth-token()`. Setting `mode()` or `response-body()` overrides the value the driver uses and breaks compatibility with the HEC clients.
{{% /alert %}}

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

## port() {#port}

|          |         |
| -------- | ------- |
| Type:    | number  |
| Default: | 8088    |

*Description:* The port number to bind to. The default is the default port of the Splunk HTTP Event Collector. Setting [`transport(tls)`](#transport) doesn't change this default. Make sure to enable this port on the firewall of the {{< product >}} host.

## prefix() {#prefix}

|          |          |
| -------- | -------- |
| Type:    | string   |
| Default: | `.splunk.` |

*Description:* The prefix that {{< product >}} inserts before the name of the fields parsed from the event, to avoid collisions with other name-value pairs of the message. For example, with the default prefix, the `sourcetype` field of the event becomes available as `${.splunk.sourcetype}`.

{{< include-headless "chunk/p-parser-prefix.md" >}}

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

## token() {#token}

|          |         |
| -------- | ------- |
| Type:    | string  |
| Default: |         |

*Description:* The HEC token that the clients must send in the `Authorization` header of their requests. This is the token that you would otherwise configure on your Splunk deployment, so you can reuse the token your clients already have.

This option is mandatory: if you don't set it, {{< product >}} rejects every request. Since the token is sent in clear text, use [`transport(tls)`](#transport) to receive the events over HTTPS.

{{< include-headless "chunk/option-http-source-transport.md" >}}

{{< include-headless "chunk/option-source-use-dns.md" >}}

{{< include-headless "chunk/option-source-use-fqdn.md" >}}

{{< include-headless "chunk/option-source-use-syslogng-pid.md" >}}
