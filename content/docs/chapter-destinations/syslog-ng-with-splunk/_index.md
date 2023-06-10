---
title: "Splunk: Sending log messages to Splunk"
weight:  5700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Although {{% param "product.abbrev" %}} currently does not have any built-in integration with Splunk, the existing message-formatting features and flexibility of {{% param "product.abbrev" %}} allows you to forward your log messages to Splunk. In {{% param "product.abbrev" %}} version {{% conditional-text include-if="ose" %}}3.8{{% /conditional-text %}} or later, you can use the [`http()`]({{< relref "/docs/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}}) destination. In earlier versions, you can use the [`program()`]({{< relref "/docs/chapter-destinations/configuring-destinations-program/_index.md" >}}) destination.

For details on forwarding log messages to Splunk with {{% param "product.abbrev" %}} see the following posts on the Splunk blog:

  - [syslog-ng and HEC: Scalable Aggregated Data Collection in Splunk](https://www.splunk.com/blog/2017/03/30/syslog-ng-and-hec-scalable-aggregated-data-collection-in-splunk.html)

  - [Using Syslog-ng with Splunk](https://www.splunk.com/blog/2016/03/11/using-syslog-ng-with-splunk/)

Note that the {{% param "product.pe" %}} application has a dedicated Splunk destination. For details, see [splunk-hec: Sending messages to Splunk HTTP Event Collector](http://support.oneidentity.com/technical-documents/syslog-ng-premium-edition/administration-guide/sending-and-storing-log-messages-destinations-and-destination-drivers/splunk-hec-sending-messages-to-splunk-http-event-collector).
