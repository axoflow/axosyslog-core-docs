---
title: Sending messages to Falcon LogScale
linktitle: "logscale: Sending messages to Falcon LogScale"
weight:  2950
---

Starting with version 4.3.0, {{% param "product_name" %}} can send messages to [Falcon LogScale](https://library.humio.com/) using its [Ingest Structured Data API](https://library.humio.com/integrations/api-ingest.html#api-ingest-structured-data).

## Prerequisites

- Create an [Ingest token](https://library.humio.com/falcon-logscale-self-hosted/ingesting-data-tokens.html) for {{% param "product_name" %}} to use in the `token()` option of the destination. <!-- FIXME When creating the token, [set/do not set a parser](https://library.humio.com/data-analysis/parsers-assigning-to-ingest-tokens.html) for the token. -->

## Ingest Structured Data API

The `logscale()` destination feeds LogScale via the [Ingest Structured Data API](https://library.humio.com/integrations/api-ingest.html#api-ingest-structured-data).

Minimal configuration:

```sh
destination d_logscale {
  logscale(
    token("your-logscale-ingest-token")
  );
};
```

This driver is actually a reusable configuration snippet configured to send log messages using the `http()` driver using a template. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/logscale/logscale.conf).

## Options

The following options are specific to the `logscale()` destination. But since this destination is based on the `http()` destination, you can use the [options of the `http()` destination]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}) as well if needed.
<!-- FIXME xinclude the http options instead of just linking them -->

```sh
url()
rawstring()
timestamp()
timezone()
attributes()
extra-headers()
content-type()
```

## attributes()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"--scope rfc5424 --exclude MESSAGE --exclude DATE --leave-initial-dot"` |

*Description:* A JSON object representing key-value pairs for the LogScale Event, formatted as [{{% param "product_name" %}} value-pairs]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md" >}}).

## content-type()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"application/json"` |

*Description:* The content-type of the HTTP request.

## extra-headers()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: |  |

*Description:* Extra headers for the HTTP request.

## rawstring()

|          |                            |
| -------- | -------------------------- |
| Type:    | template |
| Default: | `${MESSAGE}` |

*Description:* Accepts a template that you can use to format the [LogScale event](https://library.humio.com/integrations/api-ingest.html#api-ingest-more-events).

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

## url()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"https://cloud.humio.com"` |

*Description:* The URL of the LogScale Ingest API.
