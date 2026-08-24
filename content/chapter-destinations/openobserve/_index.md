---
title: Send messages to OpenObserve
linktitle: "openobserve-log: Send messages to OpenObserve"
weight:  3620
driver: "openobserve-log()"
short_description: "Send messages to OpenObserve"
dest_type: http
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
{{< include-headless "banner-new-to-axosyslog.md" >}}

Starting with version 4.5.0, {{% param "product_name" %}} can send messages to [OpenObserve](https://openobserve.ai/docs/api/ingestion/logs/json/) using its [Logs Ingestion - JSON API](https://openobserve.ai/docs/api/ingestion/logs/json/). This API accepts multiple records in batch in JSON format.

## Prerequisites

- An [OpenObserve account](https://openobserve.ai/) for {{% param "product_name" %}}, or
- a [self-hosted OpenObserve deployment](https://openobserve.ai/docs/quickstart/#self-hosted-installation).
- To configure {{% param "product_name" %}}, you'll need the username, password, the name of your organization, and the name of the OpenObserve stream where you want to send your data.

Minimal configuration:

```sh
@include "scl.conf"
# ...

destination d_openobserve {
  openobserve-log(
    url("http://your-openobserve-endpoint")
    organization("your-organization")
    stream("your-example-stream")
    user("root@example.com")
    password("V2tsn88GhdNTKxaS")
  );
};
```

Example configuration:

```sh
@include "scl.conf"
# ...

destination d_openobserve {
  openobserve-log(
    url("https://api.openobserve.ai")
    port(443)
    organization("your-organization")
    stream("your-example-stream")
    user("root@example.com")
    password("V2tsn88GhdNTKxaS")
  );
};
```

This driver is actually a reusable configuration snippet configured to send log messages using the `http()` driver using a template. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/openobserve/openobserve.conf).

## Options

The following options are specific to the `openobserve-log()` destination. But since this destination is based on the `http()` destination, you can use the [options of the `http()` destination]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}) as well if needed.

> Note: The `openobserve-log()` destination automatically configures some of these `http()` destination options as required by the OpenObserve Ingest API. The following sections list these options with the defaults that the `openobserve-log()` destination sets. You can override any of them.

## batch-lines()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `100` |

*Description:* For details, see [`batch-lines()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#batch-lines) of the `http()` destination. The `openobserve-log()` destination changes the default value of the underlying `http()` destination from `1` to `100`.

## batch-timeout()

|          |                            |
| -------- | -------------------------- |
| Type:    | time in milliseconds |
| Default: | `0` |

*Description:* For details, see [`batch-timeout()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#batch-timeout) of the `http()` destination. The `openobserve-log()` destination changes the default value of the underlying `http()` destination from `-1` (disabled) to `0`.

## body-prefix()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"["` |

*Description:* For details, see [`body-prefix()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-body-prefix) of the `http()` destination. The `openobserve-log()` destination sets it to `[` to send the batch as a JSON array, while the underlying `http()` destination leaves it empty.

## body-suffix()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"]"` |

*Description:* For details, see [`body-suffix()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-body-suffix) of the `http()` destination. The `openobserve-log()` destination sets it to `]` to send the batch as a JSON array, while the underlying `http()` destination leaves it empty.

## delimiter()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `","` |

*Description:* For details, see [`delimiter()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-delimiter) of the `http()` destination. The `openobserve-log()` destination changes the default value of the underlying `http()` destination from a newline character to a comma, so that the messages of a batch form a valid JSON array.

## headers()

|          |                            |
| -------- | -------------------------- |
| Type:    | string list |
| Default: | `"Connection: keep-alive"` |

*Description:* For details, see [`headers()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#headers) of the `http()` destination. The `openobserve-log()` destination sets the `Connection: keep-alive` header, while the underlying `http()` destination sends no extra headers by default.

## organization()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"default"` |

*Description:* The name of the [OpenObserve organization](https://openobserve.ai/docs/user-guide/organizations/) where {{% param "product_name" %}} sends the data.

## password()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The password for the username specified in the `user()` option.

## port()

|          |                            |
| -------- | -------------------------- |
| Type:    | integer |
| Default: | `5080` |

*Description:* The port number of the server.

## record()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"--scope rfc5424 --exclude DATE --key ISODATE @timestamp=${ISODATE}"` |

*Description:* A JSON object representing key-value pairs sent to OpenObserve, formatted as [{{% param "product_name" %}} value-pairs]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md" >}}). By default, the `openobserve-log()` destination sends the RFC5424 fields as attributes. If you want to send different fields, override the default content of the `record()` field.

## stream()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"default"` |

*Description:* The [OpenObserve stream](https://openobserve.ai/docs/user-guide/streams/) where {{% param "product_name" %}} sends the data, for example, `your-example-stream`.

## timeout()

|          |                            |
| -------- | -------------------------- |
| Type:    | time in seconds |
| Default: | `10` |

*Description:* For details, see [`timeout()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#http-options-timeout) of the `http()` destination. The `openobserve-log()` destination changes the default value of the underlying `http()` destination from `0` (no timeout) to `10`.

## user()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The username of the account, for example, `root@example.com`.

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The base URL of the OpenObserve Ingest API. The actual URL is constructed from the base URL and some other options of the destination: `url():port()/api/organization()/stream()/_json`

## workers()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `4` |

*Description:* For details, see [`workers()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#workers) of the `http()` destination. The `openobserve-log()` destination changes the default value of the underlying `http()` destination from `1` to `4`.
