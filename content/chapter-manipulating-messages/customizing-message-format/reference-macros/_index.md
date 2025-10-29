---
title: "Macros of AxoSyslog"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The following macros are available in {{% param "product.abbrev" %}} templates.

{{% alert title="Warning" color="warning" %}}

These macros are available when {{% param "product.abbrev" %}} successfully parses the incoming message as a syslog message, or you use some other parsing method and map the parsed values to these macros.

{{% include-headless "chunk/para-flags-no-parse.md" %}} {{% /alert %}}

## AMPM {#macro-ampm}

*Description:* Typically used together with the [`${HOUR12}`]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" >}}) macro, `${AMPM}` returns the period of the day: AM for hours before mid day and PM for hours after mid day. In reference to a 24-hour clock format, AM is between 00:00-12:00 and PM is between 12:00-24:00. 12AM is midnight. Available in {{% param "product.abbrev" %}} 3.4 and later.

## BSDTAG {#macro-bsdtag}

*Description:* Facility/priority information in the format used by the FreeBSD syslogd: a priority number followed by a letter that indicates the facility. The priority number can range from `0` to `7`. The facility letter can range from `A` to `Y`, where `A` corresponds to facility number zero (LOG_KERN), `B` corresponds to facility 1 (LOG_USER), and so on.

## Custom macros {#macro-custom}

*Description:* CSV parsers and pattern databases can also define macros from the content of the messages, for example, a pattern database rule can extract the username from a login message and create a macro that references the username. For details on using custom macros created with CSV parsers and pattern databases, see {{% xref "/chapter-parsers/_index.md" %}} and {{% xref "/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-filters/_index.md" %}}, respectively.

{{% include-headless "chunk/macro-date.md" %}}

{{% include-headless "chunk/macro-day.md" %}}

## DESTIP

Description: When used, the output specifies the local IP address of the source from which the message originates.

For an example use case when using the macro is recommended, see {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/use-case-3-macros/_index.md" %}}.

## DESTPORT

Description: When used, the output specifies the local port of the source from which the message originates.

For an example use case when using the macro is recommended, see {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/use-case-3-macros/_index.md" %}}.

## FACILITY {#macro-facility}

*Description:* The name of the facility (for example, `kern`) that sent the message.

## FACILITY_NUM {#macro-facility-num}

*Description:* The numerical code of the facility (for example, `0`) that sent the message.

## FILE_NAME {#macro-filename}

*Description:* Name of the log file (including its path) from where {{% param "product.abbrev" %}} received the message (only available if {{% param "product.abbrev" %}} received the message from a [file]({{< relref "/chapter-sources/configuring-sources-file/_index.md" >}}) or a [wildcard-file]({{< relref "/chapter-sources/configuring-sources-wildcard-file/_index.md" >}}) source). If you need only the path or the filename, use the [dirname]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}) and [basename]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}) template functions.

{{% include-headless "chunk/macro-fulldate.md" %}}

## FULLHOST {#macro-fullhost}

*Description:* The name of the source host where the message originates from.

- If the message traverses several hosts and the [`chain-hostnames()`]({{< relref "/chapter-global-options/reference-options/_index.md" >}}) option is on, the first host in the chain is used.
- If the [`keep-hostname()`]({{< relref "/chapter-global-options/reference-options/_index.md" >}}) option is disabled (`keep-hostname(no)`), the value of the `${FULLHOST}` macro will be the DNS hostname of the host that sent the message to {{% param "product.abbrev" %}} (that is, the DNS hostname of the last hop). In this case the `${FULLHOST}` and `${FULLHOST_FROM}` macros will have the same value.
- If the [`keep-hostname()`]({{< relref "/chapter-global-options/reference-options/_index.md" >}}) option is enabled (`keep-hostname(yes)`), the value of the `${FULLHOST}` macro will be the hostname retrieved from the log message. That way the name of the original sender host can be used, even if there are log relays between the sender and the server.

    {{< include-headless "chunk/p-keep-hostname-macro.md" >}}

{{< include-headless "chunk/p-name-resolution.md" >}}

## FULLHOST_FROM {#macro-fullhost-from}

*Description:* The FQDN of the host that sent the message to AxoSyslog as resolved by AxoSyslog using DNS. If the message traverses several hosts, this is the last host in the chain.

The {{% param "product.abbrev" %}} application uses the following procedure to determine the value of the `$FULLHOST_FROM` macro:

1. The {{% param "product.abbrev" %}} application takes the IP address of the host sending the message.
2. If the `use-dns()` option is enabled, {{% param "product.abbrev" %}} attempts to resolve the IP address to a hostname. If it succeeds, the returned hostname will be the value of the `$FULLHOST_FROM` macro. This value will be the FQDN of the host if the `use-fqdn()` option is enabled, but only the hostname if `use-fqdn()` is disabled.
3. If the `use-dns()` option is disabled, or the address resolution fails, the `${FULLHOST_FROM}` macro will return the IP address of the sender host.

{{< include-headless "chunk/p-name-resolution.md" >}}

{{% include-headless "chunk/macro-hour.md" %}}

## HOUR12, C_HOUR12, R_HOUR12, S_HOUR12 {#macro-hour12}

*Description:* The hour of day the message was sent in 12-hour clock format. See also the [`${AMPM}`]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" >}}) macro. 12AM is midnight. Available in {{% param "product.abbrev" %}} 3.4 and later. {{% include-headless "chunk/macro-date-ref.md" %}}

## HOST {#macro-host}

*Description:* The name of the source host where the message originates from.

- If the message traverses several hosts and the [`chain-hostnames()`]({{< relref "/chapter-global-options/reference-options/_index.md" >}}) option is on, the first host in the chain is used.
- If the [`keep-hostname()`]({{< relref "/chapter-global-options/reference-options/_index.md" >}}) option is disabled (`keep-hostname(no)`), the value of the $HOST macro will be the DNS hostname of the host that sent the message to {{% param "product.abbrev" %}} (that is, the DNS hostname of the last hop). In this case the $HOST and $HOST_FROM macros will have the same value.
- If the [`keep-hostname()`]({{< relref "/chapter-global-options/reference-options/_index.md" >}}) option is enabled (`keep-hostname(yes)`), the value of the $HOST macro will be the hostname retrieved from the log message. That way the name of the original sender host can be used, even if there are log relays between the sender and the server.

    {{< include-headless "chunk/p-keep-hostname-macro.md" >}}

{{< include-headless "chunk/p-name-resolution.md" >}}

## HOST_FROM {#macro-host-from}

*Description:* The FQDN of the host that sent the message to AxoSyslog as resolved by AxoSyslog using DNS. If the message traverses several hosts, this is the last host in the chain.

The {{% param "product.abbrev" %}} application uses the following procedure to determine the value of the `$HOST_FROM` macro:

1. The {{% param "product.abbrev" %}} application takes the IP address of the host sending the message.
2. If the `use-dns()` option is enabled, {{% param "product.abbrev" %}} attempts to resolve the IP address to a hostname. If it succeeds, the returned hostname will be the value of the `$HOST_FROM` macro. This value will be the FQDN of the host if the `use-fqdn()` option is enabled, but only the hostname if `use-fqdn()` is disabled.
3. If the `use-dns()` option is disabled, or the address resolution fails, the `${HOST_FROM}` macro will return the IP address of the sender host.

{{< include-headless "chunk/p-name-resolution.md" >}}

## IP-PROTO {#macro-ip-proto}

Available in {{% param "product.abbrev" %}} version 4.5 and later.

The IP protocol version used to retrieve or receive the message. Contains either "4" to indicate IPv4 and "6" to indicate IPv6.

## ISODATE, C_ISODATE, R_ISODATE, S_ISODATE {#macro-isodate}

*Description:* Date of the message in the ISO 8601 compatible standard timestamp format (`yyyy-mm-ddThh:mm:ss+-ZONE`), for example: `2006-06-13T15:58:00.123+01:00`. If possible, it is recommended to use `${ISODATE}` for timestamping. Note that AxoSyslog can produce fractions of a second (for example, milliseconds) in the timestamp by using the `frac-digits()` global or per-destination option. {{% include-headless "chunk/macro-date-ref.md" %}}

{{< include-headless "wnt/n-frac-trunc.md" >}}

## ISOWEEK, C_ISOWEEK, R_ISOWEEK, S_ISOWEEK {#macro-isoweek}

*Description:* The number of week according to the ISO 8601 standard. Note that the `${WEEK}` macro that has been available in returns a non-standard week number that can differ from the value returned by the `${ISOWEEK}` macro. {{% include-headless "chunk/macro-date-ref.md" %}}

Available in 3.24 and later.

## LEVEL_NUM {#macro-level-num}

*Description:* The priority (also called severity) of the message, represented as a numeric value, for example, `3`. For the textual representation of this value, use the `${LEVEL}` macro. See [PRIORITY or LEVEL](#macro-priority) for details.

## LOGHOST {#macro-loghost}

*Description:* The hostname of the computer running {{% param "product.abbrev" %}}.

- In version 3.24 and later: the `${LOGHOST}` macro returns the fully-qualified domain name (FQDN) only if the `use-fqdn()` option is set to yes, and the hostname otherwise.
- In earlier versions: the `${LOGHOST}` macro returns the fully-qualified domain name (FQDN).

## MESSAGE {#macro-message}

*Description:* Text contents of the log message without the program name and pid. The program name and the pid together are available in the [`${MSGHDR}`](#macro-msghdr) macro, and separately in the [${PROGRAM}]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" >}}) and [${PID}]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" >}}) macros.

{{% include-headless "chunk/para-flags-no-parse.md" %}}

The `${MSG}` macro is an alias of the `${MESSAGE}` macro: using `${MSG}` in {{% param "product.abbrev" %}} is equivalent to ${MESSAGE}.

Note that before AxoSyslog version 3.0, the `${MESSAGE}` macro included the program name and the pid. In AxoSyslog 3.0, the `${MESSAGE}` macro became equivalent with the `${MSGONLY}` macro.

{{% include-headless "chunk/macro-min.md" %}}

{{% include-headless "chunk/macro-month.md" %}}

## MONTH_ABBREV, C_MONTH_ABBREV, R_MONTH_ABBREV, S_MONTH_ABBREV {#macro-month-abbrev}

*Description:* The English abbreviation of the month name (3 letters). {{% include-headless "chunk/macro-date-ref.md" %}}

## MONTH_NAME, C_MONTH_NAME, R_MONTH_NAME, S_MONTH_NAME {#macro-month-name}

*Description:* The English name of the month name. {{% include-headless "chunk/macro-date-ref.md" %}}

## MONTH_WEEK, C_MONTH_WEEK, R_MONTH_WEEK, S_MONTH_WEEK {#macro-month-week}

*Description:* The number of the week in the given month (0-5). The week with numerical value 1 is the first week containing a Monday. The days of month before the first Monday are considered week 0. For example, if a 31-day month begins on a Sunday, then the 1st of the month is week 0, and the end of the month (the 30th and 31st) is week 5. {{% include-headless "chunk/macro-date-ref.md" %}}

## MSEC, C_MSEC, R_MSEC, S_MSEC {#macro-msec}

*Description:* The millisecond the message was sent. {{% include-headless "chunk/macro-date-ref.md" %}}

Available in {{% param "product.abbrev" %}} version 3.4 and later.

## MQTT_TOPIC {#macro-mqtt-topic}

*Description:* The [`mqtt()` source]({{< relref "/chapter-sources/source-mqtt/_index.md" >}}) automatically sets the `${MQTT_TOPIC}` name-value pair for the messages it receives. This is useful when the name of the topic contains MQTT wildcards (`$`, `+`, `#`).

Available in {{% param "product.abbrev" %}} version 4.7 and later.

## MSG {#macro-msg}

The `${MSG}` macro is an alias of the `${MESSAGE}` macro, using `${MSG}` in {{% param "product.abbrev" %}} is equivalent to `${MESSAGE}`. For details on this macro, see [MESSAGE](#macro-message).


{{% include-headless "chunk/macro-msghdr.md" %}}

## MSGFORMAT {#macro-msgformat}

Available in {{% param "product.abbrev" %}} version 4.8.1 and later.

*Description:* Stores the original format of the incoming message. Possible values:

- `linux:devkmsg`: Linux kernel message.
- `linux:pacct`: [Linux process accounting log]({{< relref "/chapter-sources/source-pacct/_index.md" >}}) format.
- `raw`: {{% param "product.abbrev" %}} didn't parse the message, for example, because the `no-parse` flag was set.
- `syslog:rfc3164`: Syslog message formatted as RFC3164.
- `syslog:rfc5424`: Syslog message formatted as RFC5424.

## MSGID {#macro-msgid}

*Description:* A string specifying the type of the message in IETF-syslog (RFC5424-formatted) messages. For example, a firewall might use the `${MSGID}` "TCPIN" for incoming TCP traffic and the `${MSGID}` "TCPOUT" for outgoing TCP traffic. By default, {{% param "product.abbrev" %}} does not specify this value, but uses a dash (-) character instead. If an incoming message includes the `${MSGID}` value, it is retained and relayed without modification.

## MSGONLY {#macro-msgonly}

*Description:* Message contents without the program name or pid. Starting with {{% param "product.abbrev" %}} 3.0, the following macros are equivalent: `${MSGONLY}`, `${MSG}`, `${MESSAGE}`. For consistency, use the `${MESSAGE}` macro. For details, see [MESSAGE](#macro-message).

## PEERIP {#macro-peerip}

Available in {{% param "product.abbrev" %}} 4.11 and later. This macro is available when using the [`network()`]({{< relref "/chapter-sources/configuring-sources-network/_index.md" >}}) or the [`syslog()`]({{< relref "/chapter-sources/source-syslog/_index.md" >}}) source, or when using the {{% xref "/chapter-sources/webhook/_index.md" %}} with the `proxy_header()` option set.

*Description:* IP address of the host that sent the message to {{% param "product.abbrev" %}}. In most cases, the `${PEERIP}` and `${PEERPORT}` values are identical to [`${SOURCEIP}`](#macro-sourceip) and [`${SOURCEPORT}`](#macro-sourceport). However, when dealing with proxied protocols, `${PEERIP}` and `${PEERPORT}` contain the proxy's address and port,
while [`${SOURCEIP}`](#macro-sourceip) and [`${SOURCEPORT}`](#macro-sourceport) contain the original source of the message.

## PEERPORT {#macro-peerport}

Available in {{% param "product.abbrev" %}} 4.11 and later. This macro is available when using the [`network()`]({{< relref "/chapter-sources/configuring-sources-network/_index.md" >}}) or the [`syslog()`]({{< relref "/chapter-sources/source-syslog/_index.md" >}}) source.

*Description:* The port of the host that sent the message to {{% param "product.abbrev" %}}. For details, see [`${PEERIP}`](#macro-peerip).

## PID {#macro-pid}

*Description:* The PID of the program sending the message.

## PRI {#macro-pri}

*Description:* The priority and facility encoded as a 2 or 3 digit decimal number as it is present in syslog messages.

## PRIORITY or LEVEL {#macro-priority}

*Description:* The priority (also called severity) of the message, for example, `error`. For the textual representation of this value, use the `${LEVEL}` macro. See [PRIORITY or LEVEL](#macro-priority) for details.

## PROGRAM {#macro-program}

*Description:* The name of the program sending the message. Note that the content of the `${PROGRAM}` variable may not be completely trusted as it is provided by the client program that constructed the message.

## PROTO

*Description:* Returns the [Assigned Internet Protocol Number](https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml) of the protocol used on the source from which the message originates: `6` for TCP-based sources, and `17` for UDP-based sources. See also the [`${PROTO_NAME` macro](#proto-name).

For an example use case when using the macro is recommended, see {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/use-case-3-macros/_index.md" %}}.

## PROTO_NAME {#proto-name}

Available in {{% param "product.name" %}} version 4.16 and newer.

*Description:* Returns the name of the protocol (`tcp` or `udp`) {{% param "product.name" %}} received the message on, if it was a TCP or UDP based protocol. This corresponds to the values `6` and `17` of the [`${PROTO}`](#proto) macro.

## RAWMSG {#macro-rawmsg}

*Description:* The original message as received from the client. Note that this macro is available only in 3.16 and later, and only if AxoSyslog received the message using the [`default-network-drivers()` source]({{< relref "/chapter-sources/source-default-network-drivers/_index.md" >}}), or the source receiving the message has the `store-raw-message` flag set.

## RAWMSG_SIZE {#macro-rawmsg-size}

Available in {{% param "product.name" %}} version 4.2 and newer.

*Description:* The original size of the incoming message in bytes. Might not be available for every source driver.

## RCPTID {#macro-rcptid}

{{% include-headless "chunk/option-description-use-rcptid.md" %}}

## RUNID {#macro-runid}

*Description:* An ID that changes its value every time {{% param "product.abbrev" %}} is restarted, but not when reloaded.

## SDATA, .SDATA.SDID.SDNAME {#macro-sdata}

*Description:* The AxoSyslog application automatically parses the STRUCTURED-DATA part of IETF-syslog messages, which can be referenced in macros. The `${SDATA}` macro references the entire STRUCTURED-DATA part of the message, while structured data elements can be referenced using the `${.SDATA.SDID.SDNAME}` macro.

{{% alert title="Note" color="info" %}}

When using STRUCTURED-DATA macros, consider the following:

- When referencing an element of the structured data, the macro must begin with the dot (.) character. For example, `${.SDATA.timeQuality.isSynced}`.
- The SDID and SDNAME parts of the macro names are case sensitive: `${.SDATA.timeQuality.isSynced}` is not the same as `${.SDATA.TIMEQUALITY.ISSYNCED}`.

{{% /alert %}}

### Example: Using SDATA macros

For example, if a log message contains the following structured data: `[exampleSDID@0 iut="3" eventSource="Application" eventID="1011"][examplePriority@0 class="high"]` you can use macros like: `${.SDATA.exampleSDID@0.eventSource}` — this would return the `Application` string in this case.


{{% include-headless "chunk/macro-sec.md" %}}

## SEQNUM {#macro-seqnum}

*Description:* The `${SEQNUM}` macro contains a sequence number for the log message. The value of the macro depends on the scenario, and can be one of the following:

- If {{% param "product.abbrev" %}} receives a message via the IETF-syslog protocol that includes a sequence ID, this ID is automatically available in the `${SEQNUM}` macro.
- If the message is a Cisco IOS log message using the extended timestamp format, then {{% param "product.abbrev" %}} stores the sequence number from the message in this macro. If you forward this message the IETF-syslog protocol, {{% param "product.abbrev" %}} includes the sequence number received from the Cisco device in the `${.SDATA.meta.sequenceId}` part of the message.

    {{% alert title="Note" color="info" %}}
To enable sequence numbering of log messages on Cisco devices, use the following command on the device (available in IOS 10.0 and later): `service sequence-numbers`. For details, see the manual of your Cisco device.
    {{% /alert %}}

- For locally generated messages (that is, for messages that are received from a local source, and not from the network), {{% param "product.abbrev" %}} calculates a sequence number when sending the message to a destination (it is not calculated for relayed messages).

    - The sequence number is not global, but per-destination. Essentially, it counts the number of messages sent to the destination.
    - This sequence number increases by one for every message sent to the destination. It not lost when {{% param "product.abbrev" %}} is reloaded, but it is reset when {{% param "product.abbrev" %}} is restarted.
    - This sequence number is added to every message that uses the IETF-syslog protocol (`${.SDATA.meta.sequenceId}`), and can be added to BSD-syslog messages using the `${SEQNUM}` macro.

{{% alert title="Note" color="info" %}}
If you need a sequence number for every log message that {{% param "product.abbrev" %}} receives, use the [RCPTID]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" >}}) macro.
{{% /alert %}}

## SOURCE {#macro-source}

*Description:* The identifier of the source statement in the {{% param "product.abbrev" %}} configuration file that received the message. For example, if {{% param "product.abbrev" %}} received the log message from the `source s_local { internal(); };` source statement, the value of the ${SOURCE} macro is `s_local`. This macro is mainly useful for debugging and troubleshooting purposes.

## SOURCEIP {#macro-sourceip}

*Description:* IP address of the host that sent the message to {{% param "product.abbrev" %}}. (That is, the IP address of the host in the `${FULLHOST_FROM}` macro.) Please note that when a message traverses several relays, this macro contains the IP of the last relay.

## SOURCEPORT {#macro-sourceport}

Available in {{% param "product.abbrev" %}} 4.10 and later.

*Description:* The source port of the host that sent the message to {{% param "product.abbrev" %}}.

## STAMP, R_STAMP, S_STAMP {#macro-stamp}

*Description:* A timestamp formatted according to the [`ts-format()`]({{< relref "/chapter-global-options/reference-options/_index.md" >}}) global or per-destination option. {{% include-headless "chunk/macro-date-ref.md" %}}

## SYSUPTIME {#macro-sysuptime}

*Description:* The time elapsed since the {{% param "product.abbrev" %}} instance was started (that is, the uptime of the {{% param "product.abbrev" %}} process). The value of this macro is an integer containing the time in 1/100th of the second.

Available in {{% param "product.abbrev" %}} version 3.4 and later.

## TAG {#macro-tag}

*Description:* The priority and facility encoded as a 2 digit hexadecimal number.

## TAGS {#macro-tags}

*Description:* A comma-separated list of the tags assigned to the message.

{{% alert title="Note" color="info" %}}

Note that the tags are not part of the log message and are not automatically transferred from a client to the server. For example, if a client uses a pattern database to tag the messages, the tags are not transferred to the server. A way of transferring the tags is to explicitly add them to the log messages using a template and the `${TAGS}` macro, or to add them to the structured metadata part of messages when using the IETF-syslog message format.

When sent as structured metadata, it is possible to reference to the list of tags on the central server, and for example, to add them to a database column.

{{% /alert %}}

## TRANSPORT {#macro-transport}

Available in {{% param "product.abbrev" %}} version 4.5 and later.

{{% param "product.abbrev" %}} automatically populates this name-value pair with the "transport" mechanism used to retrieve or receive the message. The exact value depends on the source driver that received the message. Currently the following values are implemented:

- BSD syslog drivers `tcp()`, `udp()` & `network()`

    - `rfc3164+tls`
    - `rfc3164+tcp`
    - `rfc3164+udp`
    - `rfc3164+proxied-tls`
    - `rfc3164+<custom logproto like altp>`

- UNIX domain drivers `unix-dgram()`, `unix-stream()`

    - `unix-stream`
    - `unix-dgram`

- RFC5424-style syslog `syslog()`:

    - `rfc5426`: syslog over udp
    - `rfc5425`: syslog over tls
    - `rfc6587`: syslog over tcp
    - `rfc5424+<custom logproto like altp>`: syslog over a logproto plugin

- Other drivers:

    - `otlp`: `otel()` driver
    - `mqtt`: `mqtt()` driver
    - `hypr-api`: `hypr-audit-source()` driver

- Locally created logs (in version 4.7 and newer):
    - `local+unix-stream`
    - `local+unix-dgram`
    - `local+file`
    - `local+pipe`
    - `local+program`
    - `local+devkmsg`
    - `local+journal`
    - `local+afstreams`
    - `local+openbsd`

{{% include-headless "chunk/macro-tz.md" %}}

{{% include-headless "chunk/macro-tzoffset.md" %}}

{{% include-headless "chunk/macro-unixtime.md" %}}

## .tls.x509 {#macro-tls-x509}

*Description:* When using a transport that uses TLS, these macros contain information about the peer's certificate. That way, you can use information from the client certificate in filenames, database values, or as other metadata. If you clients have their own certificates, then these values are unique per client, but unchangeable by the client. The following macros are available in {{% param "product.abbrev" %}} version 3.9 and later.

- `.tls.x509_cn`: The Common Name of the certificate.
- `.tls.x509_o`: The value of the Organization field.
- `.tls.x509_ou`: The value of the Organization Unit field.
- `.tls.x509_fp`: The key fingerprint of the peer, if the [`trusted-keys()` option]({{< relref "/chapter-encrypted-transport-tls/tlsoptions/_index.md#tls-options-trusted-keys" >}}) is used. Available in version 4.8.1 and later.

## UNIQID {#macro-uniqid}

*Description:* A globally unique ID generated from the HOSTID and the RCPTID in the format of HOSTID@RCPTID. For details, see [use-uniqid()]({{< relref "/chapter-global-options/reference-options/_index.md" >}}) and [RCPTID](#macro-rcptid).

Available in {{% param "product.abbrev" %}} version 3.7 and later.

## USEC, C_USEC, R_USEC, S_USEC {#macro-usec}

*Description:* The microsecond the message was sent. {{% include-headless "chunk/macro-date-ref.md" %}}

Available in {{% param "product.abbrev" %}} version 3.4 and later.

{{% include-headless "chunk/macro-year.md" %}}

{{% include-headless "chunk/macro-week.md" %}}

## WEEK_DAY_ABBREV, C_WEEK_DAY_ABBREV, R_WEEK_DAY_ABBREV, S_WEEK_DAY_ABBREV {#macro-week-day-abbrev}

*Description:* The 3-letter English abbreviation of the name of the day the message was sent, for example, `Thu`. {{% include-headless "chunk/macro-date-ref.md" %}}

## WEEK_DAY, C_WEEK_DAY, R_WEEK_DAY, S_WEEK_DAY {#macro-week-day}

*Description:* The day of the week as a numerical value (1-7). {{% include-headless "chunk/macro-date-ref.md" %}}

## WEEKDAY, C_WEEKDAY, R_WEEKDAY, S_WEEKDAY {#macro-weekday}

*Description:* These macros are deprecated, use [${WEEK_DAY_ABBREV}, ${R_WEEK_DAY_ABBREV}, ${S_WEEK_DAY_ABBREV}]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" >}}) instead. The 3-letter name of the day of week the message was sent, for example, `Thu`. {{% include-headless "chunk/macro-date-ref.md" %}}

## WEEK_DAY_NAME, C_WEEK_DAY_NAME, R_WEEK_DAY_NAME, S_WEEK_DAY_NAME {#macro-week-day-name}

*Description:* The English name of the day. {{% include-headless "chunk/macro-date-ref.md" %}}
