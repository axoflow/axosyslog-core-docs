---
title: Send messages to Falcon LogScale
linktitle: "logscale: Send messages to Falcon LogScale"
weight:  2950
driver: "logscale()"
short_description: "Send messages to Falcon LogScale"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.3.0, {{% param "product_name" %}} can send messages to [Falcon LogScale](https://library.humio.com/) using its [Ingest Structured Data API](https://library.humio.com/integrations/api-ingest.html#api-ingest-structured-data). That way you don’t have to parse the data on Falcon LogScale, because {{% param "product_name" %}} already sends it in a structured format that LogScale understands and can show in a structured manner as separate columns. For a tutorial on using this destination in Kubernetes, see the [From syslog-ng to LogScale: structured logs from any source](https://axoflow.com/from-syslog-ng-to-logscale-structured-logs-from-any-source/) blog post.

## Prerequisites

- Create an [Ingest token](https://library.humio.com/falcon-logscale-self-hosted/ingesting-data-tokens.html) for {{% param "product_name" %}} to use in the `token()` option of the destination. This token is specific to a LogScale repository.

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

## attributes()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `"--scope rfc5424 --exclude MESSAGE --exclude DATE --leave-initial-dot"` |

*Description:* A JSON object representing key-value pairs for the LogScale Event, formatted as [{{% param "product_name" %}} value-pairs]({{< relref "/chapter-concepts/concepts-value-pairs/option-value-pairs/_index.md" >}}). By default, the `logscale()` destination sends the RFC5424 fields as attributes. If you want to send different fields, override the default template.

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
