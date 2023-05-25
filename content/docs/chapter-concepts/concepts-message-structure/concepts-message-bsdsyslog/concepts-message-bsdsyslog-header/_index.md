---
title: "The HEADER message part"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes the <span class="code">HEADER</span> message part of a syslog message, according to the [legacy-syslog or BSD-syslog protocol](https://tools.ietf.org/search/rfc3164).

For further details about the <span class="code">MSG</span> and <span class="code">PRI</span> parts of a syslog message, see the following sections:

  - `[MSG]({{< relref "/docs/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-msg/_index.md" >}})`

  - `[PRI]({{< relref "/docs/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-pri/_index.md" >}})`


## The HEADER message part

The <span class="code">HEADER</span> message part contains a timestamp and the hostname (without the domain name) or the IP address of the device. The timestamp field is the local time in the *Mmm dd hh:mm:ss* format, where:

  - *Mmm* is the English abbreviation of the month: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec.

  - *dd* is the day of the month on two digits. If the day of the month is less than 10, the first digit is replaced with a space. (for example, *Aug 7*.)

  - *hh:mm:ss* is the local time. The hour (hh) is represented in a 24-hour format. Valid entries are between 00 and 23, inclusive. The minute (mm) and second (ss) entries are between 00 and 59 inclusive.


{{% alert title="Note" color="info" %}}

The {{% productparam "name" %}} ({{% productparam "abbrev" %}}) application supports other timestamp formats as well, like ISO, or the PIX extended format. For details, see the `ts-format()` option in {{% xref "/docs/chapter-global-options/reference-options/_index.md" %}}.

{{% /alert %}}
