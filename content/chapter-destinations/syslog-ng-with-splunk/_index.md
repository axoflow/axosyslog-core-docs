---
title: "splunk-hec-event: Send messages to Splunk HEC"
linktitle: Splunk HEC
weight:  5700
driver: "splunk-hec-event()"
short_description: "Send messages to Splunk HEC"
dest_type: http
---

Starting with version 4.2.0, {{% param "product_name" %}} can send messages to the Splunk HTTP Event Collector (HEC).

## Prerequisites

- Enable the HTTP Event Collector (HEC) on your Splunk deployment.
- Create a token for {{% param "product_name" %}} to use in the `token()` option of the destination. When creating the token, use the syslog source type.

For details, see [Set up and use HTTP Event Collector in Splunk Web](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector).

## HEC events API

The `splunk-hec-event()` destination feeds Splunk via the [HEC events API](https://docs.splunk.com/Documentation/Splunk/9.0.4/RESTREF/RESTinput#services.2Fcollector.2Fevent.2F1.0).

Minimal configuration:

```sh
@include "scl.conf"
# ...

destination d_splunk_hec_event {
  splunk-hec-event(
    url("https://localhost:8088")
    token("70b6ae71-76b3-4c38-9597-0c5b37ad9630")
  );
};
```

Additional options include:

```sh
event()
index()
source()
sourcetype()
host()
time()
default-index()
default-source()
default-sourcetype()
fields()
extra-headers()
extra-queries()
content-type()
```

`event()` accepts a template, which declares the content of the log message sent to Splunk. Default value: `${MSG}`

`index()`, `source()`, `host()`, and `time()` accept templates, and declare the respective field of each log message based on the set template.

`default-index()`, `default-source()`, and `default-sourcetype()` accept literal strings, and are used as fallback values if a log message doesn't set these fields. These values are passed to the URL as query parameters, so they don't inflate the body of the HTTP request
for each message in the batch, which saves bandwidth.

`fields()` accepts template, which is passed as additional indexing metadata to Splunk.

`extra-headers()`, `extra-queries()`, and `content-type()` are additional HTTP request options.

## HEC raw API

The `splunk-hec-raw()` destination feeds Splunk via the [HEC raw API](https://docs.splunk.com/Documentation/Splunk/9.0.4/RESTREF/RESTinput#services.2Fcollector.2Fraw.2F1.0).

Minimal configuration:

```sh
@include "scl.conf"
# ...

destination d_splunk_hec_raw {
  splunk-hec-raw(
    url("https://localhost:8088")
    token("70b6ae71-76b3-4c38-9597-0c5b37ad9630")
    channel("05ed4617-f186-4ccd-b4e7-08847094c8fd")
  );
};
```

The options of the `splunk-hec-raw()` destination are similar to the `splunk-hec-event()` destination, but it has a mandatory option: `channel()`. The `channel()` option must be a [globally unique channel identifier (GUID)](https://docs.splunk.com/Documentation/Splunk/9.0.4/Data/FormateventsforHTTPEventCollector#Channel_identifier_header), this ID differentiates the data from different clients. Note that Splunk doesn't generate this ID, you must create it for yourself. When Splunk sees a new channel identifier, it creates a new channel.

Use the `template()` option to set the content of the log message sent to Splunk (and not the `event()` option that is used in the `splunk-hec-event()` destination).

## Options

The `splunk-hec-event()` and `splunk-hec-raw()` destinations are reusable configuration snippets based on the `http()` destination. In addition to the Splunk-specific options listed above, you can use the [options of the `http()` destination]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}) as well. You can find the source of these configuration snippets on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/splunk/splunk.conf).

> Note: Both destinations automatically configure some of these `http()` destination options as required by the Splunk HEC API. The following sections list these options with the defaults that the Splunk destinations set. You can override any of them.

## batch-bytes()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `4096kB` |

*Description:* For details, see [`batch-bytes()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#https-options-batch-bytes) of the `http()` destination. The `splunk-hec-event() and splunk-hec-raw()` destination changes the default value of the underlying `http()` destination from none to `4096kB`.

## batch-lines()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `5000` |

*Description:* For details, see [`batch-lines()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#batch-lines) of the `http()` destination. The `splunk-hec-event() and splunk-hec-raw()` destination changes the default value of the underlying `http()` destination from `1` to `5000`.

## batch-timeout()

|          |                            |
| -------- | -------------------------- |
| Type:    | time in milliseconds |
| Default: | `0` |

*Description:* For details, see [`batch-timeout()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#batch-timeout) of the `http()` destination. The `splunk-hec-event() and splunk-hec-raw()` destination changes the default value of the underlying `http()` destination from `-1` (disabled) to `0`.

## timeout()

|          |                            |
| -------- | -------------------------- |
| Type:    | time in seconds |
| Default: | `10` |

*Description:* For details, see [`timeout()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#http-options-timeout) of the `http()` destination. The `splunk-hec-event() and splunk-hec-raw()` destination changes the default value of the underlying `http()` destination from `0` (no timeout) to `10`.

## use-system-cert-store()

|          |                            |
| -------- | -------------------------- |
| Type:    | `yes` or `no` |
| Default: | `yes` |

*Description:* For details, see [`use-system-cert-store()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#use-system-cert-store) of the `http()` destination. The `splunk-hec-event() and splunk-hec-raw()` destination changes the default value of the underlying `http()` destination from `no` to `yes`.

## workers()

|          |                            |
| -------- | -------------------------- |
| Type:    | number |
| Default: | `8` |

*Description:* For details, see [`workers()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#workers) of the `http()` destination. The `splunk-hec-event() and splunk-hec-raw()` destination changes the default value of the underlying `http()` destination from `1` to `8`.
