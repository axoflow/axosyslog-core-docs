---
title: "Log statistics from the internal() source"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

If the [`stats-freq()` global option]({{< relref "/docs/chapter-global-options/reference-options/_index.md" >}}) is higher than 0, {{% param "product.abbrev" %}} periodically sends a log statistics message. This message contains statistics about the received messages, and about any lost messages since the last such message. It includes a `processed` entry for every source and destination, listing the number of messages received or sent, and a `dropped` entry including the IP address of the server for every destination where syslog-ng has lost messages. The `center(received)` entry shows the total number of messages received from every configured sources.

The following is a sample log statistics message for a configuration that has a single source (`s_local`) and a network and a local file destination (`d_network` and `d_local`, respectively). All incoming messages are sent to both destinations.

```c
   Log statistics;
            dropped='tcp(AF_INET(192.168.10.1:514))=6439',
            processed='center(received)=234413',
            processed='destination(d_tcp)=234413',
            processed='destination(d_local)=234413',
            processed='source(s_local)=234413'

```

The statistics include a list of source groups and destinations, as well as the number of processed messages for each. You can control the verbosity of the statistics using the [`stats-level()` global option]({{< relref "/docs/chapter-global-options/reference-options/_index.md" >}}). The following is an example output.

```c
   src.internal;s_all#0;;a;processed;6445
    src.internal;s_all#0;;a;stamp;1268989330
    destination;df_auth;;a;processed;404
    destination;df_news_dot_notice;;a;processed;0
    destination;df_news_dot_err;;a;processed;0
    destination;d_ssb;;a;processed;7128
    destination;df_uucp;;a;processed;0
    source;s_all;;a;processed;7128
    destination;df_mail;;a;processed;0
    destination;df_user;;a;processed;1
    destination;df_daemon;;a;processed;1
    destination;df_debug;;a;processed;15
    destination;df_messages;;a;processed;54
    destination;dp_xconsole;;a;processed;671
    dst.tcp;d_network#0;10.50.0.111:514;a;dropped;5080
    dst.tcp;d_network#0;10.50.0.111:514;a;processed;7128
    dst.tcp;d_network#0;10.50.0.111:514;a;queued;2048
    destination;df_syslog;;a;processed;6724
    destination;df_facility_dot_warn;;a;processed;0
    destination;df_news_dot_crit;;a;processed;0
    destination;df_lpr;;a;processed;0
    destination;du_all;;a;processed;0
    destination;df_facility_dot_info;;a;processed;0
    center;;received;a;processed;0
    destination;df_kern;;a;processed;70
    center;;queued;a;processed;0
    destination;df_facility_dot_err;;a;processed;0

```

The statistics are semicolon separated: every line contains statistics for a particular object (for example, source, destination, tag, and so on). The statistics have the following fields:

To reset the statistics to zero, use the following command: **syslog-ng-ctl stats --reset**
