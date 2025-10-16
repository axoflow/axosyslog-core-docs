---
title: Send messages to Elasticsearch data streams
linktitle: "elasticsearch-datastream: Send messages to Elasticsearch data streams"
weight:  850
driver: "elasticsearch-datastream()"
short_description: "Send messages to Elasticsearch data streams"
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

Since this destination is based on the `http()` destination, you can use the [options of the `http()` destination]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}) if needed.
<!-- FIXME xinclude the http options instead of just linking them -->
