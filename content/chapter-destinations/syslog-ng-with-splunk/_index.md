---
title: "splunk-hec-event: Send messages to Splunk HEC"
linktitle: Splunk HEC
weight:  5700
driver: "splunk-hec-event()"
short_description: "Send messages to Splunk HEC"
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
