---
title: "The philosophy of AxoSyslog"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Typically, {{% param "product.abbrev" %}} is used to manage log messages and implement centralized logging, where the aim is to collect the log messages of several devices on a single, central log server. The different devices — called {{% param "product.abbrev" %}} clients — all run {{% param "product.abbrev" %}}, and collect the log messages from the various applications, files, and other *sources*. The clients send all important log messages to the remote {{% param "product.abbrev" %}} server, which sorts and stores them.
