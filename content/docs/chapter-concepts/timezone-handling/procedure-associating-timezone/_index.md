---
title: "Assigning timezone to the message"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

When {{% param "product.abbrev" %}} receives a message, it assigns timezone information to the message using the following algorithm.

1.  The sender application or host specifies the timezone of the messages. If the incoming message includes a timezone it is associated with the message. Otherwise, the local timezone is assumed.

2.  Specify the `time-zone()` parameter for the source driver that reads the message. This timezone will be associated with the messages only if no timezone is specified within the message itself. Each source defaults to the value of the [`recv-time-zone()`]({{< relref "/docs/chapter-global-options/reference-options/_index.md" >}}) global option. It is not possible to override only the timezone information of the incoming message, but setting the `keep-timestamp()` option to `no` allows {{% param "product.abbrev" %}} to replace the full timestamp (timezone included) with the time the message was received.
    
    {{% alert title="Note" color="info" %}}
When processing a message that does not contain timezone information, the {{% param "product.abbrev" %}} application will use the timezone and daylight-saving that was effective when the timestamp was generated. For example, the current time is `2011-03-11` (March 11, 2011) in the `EU/Budapest` timezone. When daylight-saving is active (summertime), the offset is `+02:00`. When daylight-saving is inactive (wintertime) the timezone offset is `+01:00`. If the timestamp of an incoming message is `2011-01-01`, the timezone associated with the message will be `+01:00`, but the timestamp will be converted, because 2011-01-01 meant winter time when daylight saving is not active but the current timezone is `+02:00`.
    {{% /alert %}}

3.  Specify the timezone in the destination driver using the `time-zone()` parameter. Each destination driver might have an associated timezone value`: syslog-ng` converts message timestamps to this timezone before sending the message to its destination (file or network socket). Each destination defaults to the value of the [`send-time-zone()`]({{< relref "/docs/chapter-global-options/reference-options/_index.md" >}}) global option.
    
    {{% alert title="Note" color="info" %}}
A message can be sent to multiple destination zones. The `syslog-ng` application converts the timezone information properly for every individual destination zone.
    {{% /alert %}}
    
    {{% alert title="Warning" color="warning" %}}
If {{% param "product.abbrev" %}} sends the message is to the destination using the legacy-syslog protocol (RFC3164) which does not support timezone information in its timestamps, the timezone information cannot be encapsulated into the sent timestamp, so {{% param "product.abbrev" %}} will convert the hour:min values based on the explicitly specified timezone.
    {{% /alert %}}

4.  If the timezone is not specified, local timezone is used.

5.  When macro expansions are used in the destination filenames, the local timezone is used. (Also, if the timestamp of the received message does not contain the year of the message, {{% param "product.abbrev" %}} uses the local year.)
    
    {{< include-headless "wnt/note-rewrite-timezone.md" >}}
