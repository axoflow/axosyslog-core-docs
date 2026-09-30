---
title: "ehttp: Receive logs over HTTP"
linktitle: "ehttp() source"
weight:  400
driver: "ehttp()"
short_description: "Receive logs over HTTP or HTTPS"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{< product >}} 4.28 and later.

The `ehttp()` source receives log messages over HTTP or HTTPS. Clients send the messages in the body of an HTTP request, and {{< product >}} answers every accepted request.

Unlike the [`webhook()` source]({{< relref "/chapter-sources/webhook/_index.md" >}}), which is a Python-based configuration snippet, `ehttp()` is implemented natively in {{< product >}}. It is intended to replace `webhook()` in the long run.

{{< alert title="Warning" color="warning" >}}
The `ehttp()` source is experimental. Its name and its options can change in later releases: the driver will be renamed to `http()` once its options are considered stable. Review your configuration when you upgrade {{< product >}}, and do not rely on this source in production yet.
{{< /alert >}}

## Example: Receiving logs over HTTP

The following source accepts JSON payloads on port 8080, requires an authentication token, and answers the requests with a custom response body:

```shell
source s_http {
  ehttp(
    port(8080)
    mode("json")
    auth-token("Bearer s3cr3t")
    response-body('{"status": "received"}')
    flags(no-parse)
  );
};
```

To test the source, you can use `curl` on the host where {{< product >}} is running:

```shell
curl -X POST -H "Authorization: Bearer s3cr3t" --data '{"message": "hello"}' http://127.0.0.1:8080/
```

Note the `flags(no-parse)` option in the example: by default, {{< product >}} parses every extracted message as a syslog message. Use `flags(no-parse)` if the payload is not in syslog format, so that the entire payload becomes the `${MESSAGE}` of the log message.

{{< alert title="Note" color="info" >}}
The `ehttp()` source accepts requests on every URL path, you cannot restrict it to specific endpoints. If you need path-based routing, use the [`webhook()` source]({{< relref "/chapter-sources/webhook/_index.md" >}}) and its `paths()` option.
{{< /alert >}}

## Compressed requests

The `ehttp()` source accepts `gzip` and `deflate` compressed request bodies, and decompresses them based on the `Content-Encoding` header of the request. The [`max-request-size()`](#max-request-size) limit applies to the decompressed body as well.

## Responses and error handling

The `ehttp()` source answers the requests of the clients as follows:

- The request is accepted: `200 OK`, with the body set in [`response-body()`](#response-body), or the `OK` status line if `response-body()` is not set.
- The [`auth-token()`](#auth-token) option is set, but the `Authorization` header of the request is missing or doesn't match: `401 Unauthorized`
- The request is larger than [`max-request-size()`](#max-request-size), or its decompressed body is:  `413 Payload Too Large`
- The `Content-Encoding` of the request is not supported:  `415 Unsupported Media Type`
- The request is not valid HTTP, or its compressed body is corrupt: `400 Bad Request`

If the body of the request cannot be parsed in the configured [`mode()`](#mode), {{< product >}} logs a warning that includes the parse error and the offset where parsing failed, but still answers the request with `200 OK`.

## ehttp() source options {#options}

The `ehttp()` source has the following options.

{{< include-headless "chunk/option-http-source-auth-token.md" >}}

{{< include-headless "chunk/option-source-chain-hostnames.md" >}}

{{< include-headless "chunk/option-source-check-hostname.md" >}}

{{< include-headless "chunk/option-source-check-program.md" >}}

{{< include-headless "chunk/option-source-default-facility.md" >}}

{{< include-headless "chunk/option-source-default-severity.md" >}}

{{< include-headless "chunk/option-source-dns-cache.md" >}}

<!-- encoding() doesn't work for this source -->

{{< include-headless "chunk/option-source-flags.md" >}}

## format() {#format}

|          |         |
| -------- | ------- |
| Type:    | string  |
| Default: | `syslog` |

*Description:* The message format parser that {{< product >}} uses on the extracted messages. In practice the only meaningful value is `syslog`, which is also the default. To skip parsing entirely, use `flags(no-parse)` instead.

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

## mode() {#mode}

|          |         |
| -------- | ------- |
| Type:    | `auto`, `json`, `line-separated` (or `jsonl`), `single` |
| Default: | `auto` |

*Description:* Determines how {{< product >}} splits the body of the request into log messages.

- `auto`: If the body starts with `{` or `[` and parses as JSON, {{< product >}} handles it as `json`, otherwise as `line-separated`.
- `json`: The body is JSON. If it is an array, every element becomes a separate log message. If it is a sequence of concatenated JSON objects (like the payload of the Splunk HTTP Event Collector), every object becomes a separate log message.
- `line-separated` (or `jsonl`): {{< product >}} splits the body on newline characters, and creates a log message from every non-empty line.
- `single`: The entire body becomes a single log message.

The value is case-insensitive, and must be specified as a string, for example, `mode("json")`.

{{< include-headless "chunk/option-source-normalize-hostnames.md" >}}

{{< include-headless "chunk/option-persist-name.md" >}}

{{< include-headless "chunk/option-http-source-port.md" >}}

{{< include-headless "chunk/option-source-program-override.md" >}}

{{< include-headless "chunk/option-source-read-old-records.md" >}}

## response-body() {#response-body}

|          |         |
| -------- | ------- |
| Type:    | template or template function |
| Default: |         |

*Description:* The body that {{< product >}} sends in the `200 OK` response. If you don't set this option, the response body is the `OK` status line.

Because the value is a template, you can include the macros of the received message in the response. {{< product >}} evaluates the template using the first log message extracted from the request, for example:

```shell
response-body('{"status": "received", "host": "${HOST}"}')
```

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

<!-- trim-large-messages() doesn't work for this source -->

{{< include-headless "chunk/option-source-use-dns.md" >}}

{{< include-headless "chunk/option-source-use-fqdn.md" >}}

{{< include-headless "chunk/option-source-use-syslogng-pid.md" >}}
