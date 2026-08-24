---
title: Send messages to Elasticsearch data streams
linktitle: "elasticsearch-datastream: Send messages to Elasticsearch data streams"
weight:  850
driver: "elasticsearch-datastream()"
short_description: "Send messages to Elasticsearch data streams"
dest_type: http
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.8.0, {{% param "product_name" %}} can send messages and metrics to [Elasticsearch data streams](https://www.elastic.co/guide/en/elasticsearch/reference/current/data-streams.html) to store your log and metrics data as time series data.

Minimal configuration:

```sh
@include "scl.conf"
# ...

destination d_elastic_data_stream {
  elasticsearch-datastream(
    url("https://elastic-endpoint:9200/my-data-stream/_bulk")
    user("elastic")
    password("ba253DOn434Tc0pY22OI")
  );
};
```

This driver is actually a reusable configuration snippet configured to send log messages using the `http()` driver using a template. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/elasticsearch/elastic-datastream.conf).

## Prerequisites

Username and password for an account that can send data to Elasticsearch data streams.

## Options

Usually you just set the `url()`, `user()`, and `password()` options.

Since this destination is based on the `http()` destination, you can use the [options of the `http()` destination]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}) if needed. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/elasticsearch/elastic-datastream.conf).

> Note: The `elasticsearch-datastream()` destination automatically configures some of these `http()` destination options as required by the Elasticsearch Bulk API. The following sections list these options with the defaults that the `elasticsearch-datastream()` destination sets. You can override any of them.

## record()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"--scope rfc5424 --exclude DATE --key ISODATE @timestamp=${ISODATE}"` |

*Description:* A JSON object representing the key-value pairs sent to the Elasticsearch data stream, formatted as [{{% param "product_name" %}} value-pairs]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md" >}}). By default, the `elasticsearch-datastream()` destination sends the RFC5424 fields. If you want to send different fields, override the default content of the `record()` option.

## batch-lines()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `100` |

*Description:* For details, see [`batch-lines()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#batch-lines) of the `http()` destination. The `elasticsearch-datastream()` destination changes the default value of the underlying `http()` destination from `1` to `100`.

## body-suffix()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `a newline character` |

*Description:* For details, see [`body-suffix()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-body-suffix) of the `http()` destination. The `elasticsearch-datastream()` destination appends a newline character to the body as required by the Elasticsearch Bulk API, while the underlying `http()` destination leaves it empty.

## headers()

|          |                            |
| -------- | -------------------------- |
| Type:    | string list |
| Default: | `Content-Type: application/x-ndjson` |

*Description:* For details, see [`headers()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#headers) of the `http()` destination. The `elasticsearch-datastream()` destination sets the `Content-Type: application/x-ndjson` header as required by the Elasticsearch Bulk API, while the underlying `http()` destination sends no extra headers by default.

## method()

|          |                            |
| -------- | -------------------------- |
| Type:    | `POST` or `PUT` |
| Default: | `PUT` |

*Description:* For details, see [`method()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#method) of the `http()` destination. The `elasticsearch-datastream()` destination changes the default value of the underlying `http()` destination from `POST` to `PUT`.

## timeout()

|          |                            |
| -------- | -------------------------- |
| Type:    | time in seconds |
| Default: | `10` |

*Description:* For details, see [`timeout()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#http-options-timeout) of the `http()` destination. The `elasticsearch-datastream()` destination changes the default value of the underlying `http()` destination from `0` (no timeout) to `10`.

## workers()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `4` |

*Description:* For details, see [`workers()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#workers) of the `http()` destination. The `elasticsearch-datastream()` destination changes the default value of the underlying `http()` destination from `1` to `4`.
