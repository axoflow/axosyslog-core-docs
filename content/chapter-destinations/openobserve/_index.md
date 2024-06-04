---
title: Send messages to OpenObserve
linktitle: "openobserve-log: Send messages to OpenObserve"
weight:  3620
driver: "openobserve-log()"
short_description: "Send messages to OpenObserve"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.5.0, {{% param "product_name" %}} can send messages to [OpenObserve](https://openobserve.ai/docs/api/ingestion/logs/json/) using its [Logs Ingestion - JSON API](https://openobserve.ai/docs/api/ingestion/logs/json/). This API accepts multiple records in batch in JSON format.

## Prerequisites

- An [OpenObserve account](https://openobserve.ai/) for {{% param "product_name" %}}, or
- a [self-hosted OpenObserve deployment](https://openobserve.ai/docs/quickstart/#self-hosted-installation).
- To configure {{% param "product_name" %}}, you'll need the username, password, the name of your organization, and the name of the OpenObserve stream where you want to send your data.

Minimal configuration:

```sh
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
destination d_openobserve {
  openobserve-log(
    url("http://openobserve-endpoint")
    port(5080)
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

> Note: The `openobserve-log()` destination automatically configures some of these `http()` destination options as required by the OpenObserve Ingest API.

<!-- FIXME xinclude the http options instead of just linking them
  body_prefix("[")
  body_suffix("]")
  delimiter(",")
  workers(4)
  batch_lines(100)
  batch_timeout(1000)
  timeout(10)
  headers("Connection: keep-alive")
   -->

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
