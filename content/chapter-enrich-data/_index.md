---
title: "Enriching log messages with external data"
weight:  3500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To properly interpret the events that the log messages describe, you must be able to handle log messages as part of a system of events, instead of individual information chunks. The {{% param "product.abbrev" %}} application allows you to import data from external sources to include in the log messages, thus extending, enriching, and complementing the data found in the log message.

The {{% param "product.abbrev" %}} application currently provides the following possibilities to enrich log messages.

  - You can add name-value pairs from an external CSV file. For details, see {{% xref "/chapter-enrich-data/data-enrichment-add-contextual-data/_index.md" %}}.

  - You can resolve the IP addresses from log messages to include GeoIP information in the log messages. For details, see {{% xref "/chapter-enrich-data/geoip-parser/_index.md" %}}.

  - You can write custom Python modules to process the messages and add data from external files or databases. For details, see {{% xref "/chapter-parsers/python-parser/_index.md" %}}.
