---
title: "graphite: Sending metrics to Graphite"
weight:  1300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `graphite()` destination can send metrics to a [Graphite](http://graphite.readthedocs.io/en/latest/index.html) server to store numeric time-series data. There are many ways to feed the Graphite template function with name value pairs. The {{% param "product.abbrev" %}} CSV and PatternDB parsers (for details, see <span class="mcFormatColor" style="color: #04aada;">Using pattern parsers</span>) can parse log messages and generate name value pairs based on message content. The CSV parser (for details, see {{% xref "/chapter-parsers/csv-parser/_index.md" %}}) can be used for logs that have a constant field based structure, like the Apache web server access logs. The <span>patterndb</span> parser can parse information and can extract important fields from free form log messages, as long as patterns describing the log messages are available. Another way is to send JSON-based log messages (for details, see {{% xref "/chapter-parsers/json-parser/_index.md" %}}) to {{% param "product.abbrev" %}}, like running a simple shell script collecting metrics and running it from cron regularly.

To see an example of how the `graphite()` destination is used to collect statistics coming from `syslog-ng`, see the blog post [Collecting syslog-ng statistics to Graphite](https://syslog-ng.com/blog/collecting-syslog-ng-statistics-to-graphite/).


## Declaration:

```c
   graphite(payload());
```



## Example: Using the graphite() driver {#example-destination-graphite}

To use the <span>graphite()</span> destination, the only mandatory parameter is payload, which specifies the value pairs to send to <span>graphite</span>. In the following example any value pairs starting with <span>"monitor."</span> are forwarded to <span>graphite</span>.

```c
   destination d_graphite { graphite(payload("--key monitor.*")); };
```


{{% alert title="Note" color="info" %}}

The `graphite()` destination is only a wrapper around the `network()` destination and the `graphite-output` template function. If you want to fine-tune the TCP parameters, use the `network()` destination instead, as described in [graphite-output]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}).

{{% /alert %}}
