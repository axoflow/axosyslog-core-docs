---
title: Send messages to Falcon LogScale
linktitle: "logscale: Send messages to Falcon LogScale"
weight:  2950
driver: "logscale()"
short_description: "Send messages to Falcon LogScale"
dest_type: http
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.3.0, {{% param "product_name" %}} can send messages to [Falcon LogScale](https://library.humio.com/) using its [Ingest Structured Data API](https://library.humio.com/integrations/api-ingest.html#api-ingest-structured-data). That way you don’t have to parse the data on Falcon LogScale, because {{% param "product_name" %}} already sends it in a structured format that LogScale understands and can show in a structured manner as separate columns. For a tutorial on using this destination in Kubernetes, see the [From syslog-ng to LogScale: structured logs from any source](https://axoflow.com//blog/from-syslog-ng-to-logscale-structured-logs-from-any-source) blog post.

## Prerequisites

- Create an [Ingest token](https://library.humio.com/falcon-logscale-self-hosted/ingesting-data-tokens.html) for {{% param "product_name" %}} to use in the `token()` option of the destination. This token is specific to a LogScale repository.

## Ingest Structured Data API

The `logscale()` destination feeds LogScale via the [Ingest Structured Data API](https://library.humio.com/integrations/api-ingest.html#api-ingest-structured-data).

Minimal configuration:

```sh
@include "scl.conf"
# ...

destination d_logscale {
  logscale(
    token("your-logscale-ingest-token")
  );
};
```

This driver is actually a reusable configuration snippet configured to send log messages using the `http()` driver using a template. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/logscale/logscale.conf).

## Options

The `logscale()` destination has the following options. Some of them (for example, `attributes()`, `rawstring()`, `timestamp()`, and `token()`) are specific to LogScale, the rest are inherited from the underlying [`http()` destination]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}).

{{% alert title="Note" color="info" %}}
The `logscale()` destination automatically configures some of the `http()` destination options as required by the LogScale Ingest Structured Data API. The following sections list these options with the defaults that the `logscale()` destination sets, and note where these differ from the `http()` defaults. You can override any of them.
{{% /alert %}}

## accept-encoding()

|          |                            |
| -------- | -------------------------- |
| Type:    | `"identity"`, `"gzip"`, `"deflate"`, `"all"` |
| Default: | N/A (disabled) |

*Description:* For details, see [`accept-encoding()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#accept-encoding) of the `http()` destination.

## accept-redirects()

|          |                            |
| -------- | -------------------------- |
| Type:    | `yes` or `no` |
| Default: |  |

*Description:* For details, see [`accept-redirects()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#accept-redirects) of the `http()` destination.

## attributes()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"--scope rfc5424 --exclude MESSAGE --exclude DATE --leave-initial-dot"` |

*Description:* A JSON object representing key-value pairs for the LogScale Event, formatted as [{{% param "product_name" %}} value-pairs]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md" >}}). By default, the `logscale()` destination sends the RFC5424 fields as attributes. If you want to send different fields, override the default template.

## batch-bytes()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `1024kB` |

*Description:* For details, see [`batch-bytes()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-batch-bytes) of the `http()` destination. The `logscale()` destination changes the default value of the underlying `http()` destination from none to `1024kB`.

{{% include-headless "chunk/option-destination-batch-idle-timeout.md" %}}

## batch-lines()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `1000` |

*Description:* For details, see [`batch-lines()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#batch-lines) of the `http()` destination. The `logscale()` destination changes the default value of the underlying `http()` destination from `1` to `1000`.

## batch-timeout()

|          |                            |
| -------- | -------------------------- |
| Type:    | time in milliseconds |
| Default: | `0` |

*Description:* For details, see [`batch-timeout()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#batch-timeout) of the `http()` destination. The `logscale()` destination changes the default value of the underlying `http()` destination from `-1` (disabled) to `0`.

## body-prefix()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `[{"events":[` |

*Description:* For details, see [`body-prefix()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-body-prefix) of the `http()` destination. The `logscale()` destination sets it to `[{"events":[` to send the batch in the format that the Ingest Structured Data API expects, while the underlying `http()` destination leaves it empty.

## body-suffix()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `]}]` |

*Description:* For details, see [`body-suffix()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-body-suffix) of the `http()` destination. The `logscale()` destination sets it to `]}]` to close the format that the Ingest Structured Data API expects, while the underlying `http()` destination leaves it empty.

{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

## ca-file()

|          |                            |
| -------- | -------------------------- |
| Type:    | filename |
| Default: | none |

*Description:* For details, see [`ca-file()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-ca-file) of the `http()` destination.

{{% include-headless "chunk/option-destination-tls-cert-file.md" %}}

{{% include-headless "chunk/option-destination-tls-cipher-suite.md" %}}

## content-compression()

|          |                            |
| -------- | -------------------------- |
| Type:    | `"identity"`, `"gzip"`, `"deflate"` |
| Default: | `"identity"` |

*Description:* For details, see [`content-compression()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#content-compression) of the `http()` destination.

## content-type()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"application/json"` |

*Description:* The content-type of the HTTP request.

## delimiter()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `,` |

*Description:* For details, see [`delimiter()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-delimiter) of the `http()` destination. The `logscale()` destination changes the default value of the underlying `http()` destination from a newline character to a comma, so that the events of a batch form a valid JSON array.

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

## extra-headers()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* Extra headers for the HTTP request.

{{% include-headless "chunk/option-destination-threaded-flags.md" %}}

## flush-bytes() (DEPRECATED)

*Description:* Deprecated alias of [`batch-bytes()`](#batch-bytes), which the `logscale()` destination sets to `1024kB`. Use `batch-bytes()` instead.

## flush-lines() (DEPRECATED)

*Description:* Deprecated alias of [`batch-lines()`](#batch-lines), which the `logscale()` destination sets to `1000`. Use `batch-lines()` instead.

{{% include-headless "chunk/option-destination-flush-on-worker-key-change.md" %}}

## flush-timeout() (DEPRECATED)

*Description:* Deprecated alias of [`batch-timeout()`](#batch-timeout), which the `logscale()` destination sets to `0`. Use `batch-timeout()` instead.

## force-content-compression()

|          |                            |
| -------- | -------------------------- |
| Type:    | `yes` or `no` |
| Default: | `no` |

*Description:* For details, see [`force-content-compression()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#force-content-compression) of the `http()` destination.

{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{< include-headless "chunk/option-hook-commands.md" >}}

{{% include-headless "chunk/option-destination-tls-key-file.md" %}}

{{% include-headless "chunk/option-destination-local-timezone.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

## method()

|          |                            |
| -------- | -------------------------- |
| Type:    | `POST` or `PUT` |
| Default: | `POST` |

*Description:* For details, see [`method()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#method) of the `http()` destination. The LogScale Ingest Structured Data API expects `POST` requests.

{{< include-headless "chunk/option-destination-tls-ocsp-stapling-verify.md" >}}

{{< include-headless "chunk/option-destination-on-error.md" >}}

## password()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* For details, see [`password()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#password) of the `http()` destination. Note that the `logscale()` destination authenticates with the `token()` option, not with a username and password.

{{< include-headless "chunk/option-peer-verify-simple.md" >}}

{{% include-headless "chunk/option-persist-name.md" %}}

{{% include-headless "chunk/option-dest-http-proxy.md" %}}

## rawstring()

|          |                            |
| -------- | -------------------------- |
| Type:    | template |
| Default: | `${MESSAGE}` |

*Description:* Accepts a template that you can use to format the [LogScale event](https://library.humio.com/integrations/api-ingest.html#api-ingest-more-events).

## response-action()

|          |                            |
| -------- | -------------------------- |
| Type:    | list |
| Default: | N/A |

*Description:* For details, including the default action taken for each HTTP status code, see [`response-action()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#response-action) of the `http()` destination.

{{% include-headless "chunk/option-destination-http-response-adapter.md" %}}

{{% include-headless "chunk/option-destination-retries.md" %}}

{{% include-headless "chunk/option-destination-send-timezone.md" %}}

## ssl-version()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | none, uses the libcurl default |

*Description:* For details, see [`ssl-version()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-ssl-version) of the `http()` destination.

{{% include-headless "chunk/option-destination-template-escape.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}

{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

Note that `time-zone()` converts the timestamps of the message, while the [`timezone()`](#timezone) option sets the timezone field of the LogScale event.

## timeout()

|          |                            |
| -------- | -------------------------- |
| Type:    | time in seconds |
| Default: | `10` |

*Description:* For details, see [`timeout()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#http-options-timeout) of the `http()` destination. The `logscale()` destination changes the default value of the underlying `http()` destination from `0` (no timeout) to `10`.

## timestamp()

|          |                            |
| -------- | -------------------------- |
| Type:    | template |
| Default: | `${S_ISODATE}` |

*Description:* The timestamp added to the [LogScale event](https://library.humio.com/integrations/api-ingest.html#api-ingest-more-events).

## timezone()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* The timezone of the event.

## tls()

*Description:* Instead of setting the TLS options (`ca-dir()`, `ca-file()`, `cert-file()`, `cipher-suite()`, `key-file()`, `ocsp-stapling-verify()`, `peer-verify()`, `ssl-version()`, and `use-system-cert-store()`) one by one, you can collect them into a `tls()` block. For details, see the [options of the `http()` destination]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}).

{{% include-headless "chunk/topic-tls-block-http.md" %}}

## token()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* The [Ingest token](https://library.humio.com/falcon-logscale-self-hosted/ingesting-data-tokens.html) that {{% param "product_name" %}} uses to authenticate to LogScale. This token is specific to a LogScale repository. The `logscale()` destination sends it in the `Authorization: Bearer <token>` HTTP header.

{{% include-headless "chunk/option-destination-ts-format.md" %}}

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"https://cloud.humio.com"` |

*Description:* The URL of the LogScale Ingest API. The `logscale()` destination appends the `/api/v1/ingest/humio-structured` path to the value you set, and passes the result to the [`url()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#url) option of the underlying `http()` destination. Set only the scheme and the host of your LogScale instance, for example, `url("https://logscale.example.com")`.

## use-system-cert-store()

|          |                            |
| -------- | -------------------------- |
| Type:    | `yes` or `no` |
| Default: | `yes` |

*Description:* For details, see [`use-system-cert-store()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#use-system-cert-store) of the `http()` destination. The `logscale()` destination changes the default value of the underlying `http()` destination from `no` to `yes`.

## user()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* For details, see [`user()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#user) of the `http()` destination. Note that the `logscale()` destination authenticates with the `token()` option, not with a username and password.

{{% include-headless "chunk/option-destination-http-user-agent.md" %}}

{{< include-headless "chunk/option-destination-worker-partition-autoscaling.md" >}}

{{< include-headless "chunk/option-destination-worker-partition-buckets.md" >}}

{{< include-headless "chunk/option-destination-http-worker-partition-key.md" >}}

## workers()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `20` |

*Description:* For details, see [`workers()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#workers) of the `http()` destination. The `logscale()` destination changes the default value of the underlying `http()` destination from `1` to `20`.
