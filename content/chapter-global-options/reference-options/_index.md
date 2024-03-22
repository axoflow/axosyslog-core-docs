---
title: "Global options reference"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The following options can be specified in the options statement, as described in {{% xref "/chapter-global-options/options/_index.md" %}}.


## bad-hostname() {#global-option-bad-hostname}

|                  |                    |
| ---------------- | ------------------ |
| Accepted values: | regular expression |
| Default:         | no                 |

*Description:* A regexp containing hostnames which should not be handled as hostnames.



## chain-hostnames() {#global-options-chain-hostnames}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | `yes`, `no` |
| Default:         | `no`           |

*Description:* Enable or disable the chained hostname format. If a client sends the log message directly to the {{% param "product.abbrev" %}} server, the `chain-hostnames()` option is enabled on the server, and the client sends a hostname in the message that is different from its DNS hostname (as resolved from DNS by the {{% param "product.abbrev" %}} server), then the server can append the resolved hostname to the hostname in the message (separated with a `/` character) when the message is written to the destination.

For example, consider a client-server scenario with the following hostnames: `client-hostname-from-the-message`, `client-hostname-resolved-on-the-server`, `server-hostname`. The hostname of the log message written to the destination depends on the `keep-hostname()` and the `chain-hostnames()` options. How `keep-hostname()` and `chain-hostnames()` options are related is described in the following table.

<table class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit" style="WIDTH: 100%; mc-table-style: url('../../Resources/TableStyles/RuledTableWithHeading_VerticallyRuled_DoNotEdit.css')" cellspacing="0">
<thead>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Head-Header1">
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadE-Column1-Header1" rowspan="2" colspan="2">
<p></p></th>
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadD-Column1-Header1" colspan="2">keep-hostname() setting on the server</th></tr>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Head-Header1">
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadE-Column1-Header1">yes </th>
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadD-Column1-Header1">no </th></tr></thead>
<tbody>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1" rowspan="2"><i style="FONT-STYLE: normal">chain-hostnames() setting on the server</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1"><i style="FONT-STYLE: normal">yes</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1">client-hostname-from-the-message </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyD-Column1-Body1">client-hostname-from-the-message/client-hostname-resolved-on-the-server </td></tr>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyB-Column1-Body1"><i style="FONT-STYLE: normal">no</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyB-Column1-Body1">client-hostname-from-the-message </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyA-Column1-Body1">client-hostname-resolved-on-the-server </td></tr></tbody>
<colgroup>
<col class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Column-Column1" style="WIDTH: 0.3in"></colgroup></table>

If the log message is forwarded to the {{% param "product.abbrev" %}} server via a {{% param "product.abbrev" %}} relay, the hostname depends on the settings of the `keep-hostname()` and the `chain-hostnames()` options both on the {{% param "product.abbrev" %}} relay and the {{% param "product.abbrev" %}} server.

For example, consider a client-relay-server scenario with the following hostnames: `client-hostname-from-the-message`, `client-hostname-resolved-on-the-relay`, `client-hostname-resolved-on-the-server`, `relay-hostname-resolved-on-the-server`. How `keep-hostname()` and `chain-hostnames()` options are related is described in the following table.

<table class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit" style="WIDTH: 100%; mc-table-style: url('../../Resources/TableStyles/RuledTableWithHeading_VerticallyRuled_DoNotEdit.css')" cellspacing="0">
<thead>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Head-Header1">
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadE-Column1-Header1" rowspan="4" colspan="4">
<p></p>
<p></p></th>
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadD-Column1-Header1" colspan="4">chain-hostnames() setting on the server</th></tr>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Head-Header1">
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadE-Column1-Header1" colspan="2">yes</th>
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadD-Column1-Header1" colspan="2">no</th></tr>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Head-Header1">
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadE-Column1-Header1" colspan="2">keep-hostname() setting on the server</th>
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadD-Column1-Header1" colspan="2">keep-hostname() setting on the server</th></tr>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Head-Header1">
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadE-Column1-Header1">yes</th>
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadE-Column1-Header1">no</th>
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadE-Column1-Header1">yes</th>
<th class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-HeadD-Column1-Header1">no</th></tr></thead>
<tbody>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1" rowspan="4"><i style="FONT-STYLE: normal">chain-hostnames() setting on the relay</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1" rowspan="2"><i style="FONT-STYLE: normal">yes</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1" rowspan="2"><i style="FONT-STYLE: normal">keep-hostname() setting on the relay</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1"><i style="FONT-STYLE: normal">yes</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1">client-hostname-from-the-message </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1">client-hostname-from-the-message / relay-hostname-resolved-on-the-server </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1">client-hostname-from-the-message </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyD-Column1-Body1" rowspan="4">relay-hostname-resolved-on-the-server </td></tr>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1"><i style="FONT-STYLE: normal">no</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1">client-hostname-from-the-message / client-hostname-resolved-on-the-relay </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1">client-hostname-from-the-message / client-hostname-resolved-on-the-relay / relay-hostname-resolved-on-the-server </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1">client-hostname-from-the-message / client-hostname-resolved-on-the-relay </td></tr>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1" rowspan="2"><i style="FONT-STYLE: normal">no</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1" rowspan="2"><i style="FONT-STYLE: normal">keep-hostname() setting on the relay</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1"><i style="FONT-STYLE: normal">yes</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1">client-hostname-from-the-message </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1">client-hostname-from-the-message / relay-hostname-resolved-on-the-server </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyE-Column1-Body1">client-hostname-from-the-message </td></tr>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyB-Column1-Body1"><i style="FONT-STYLE: normal">no</i> </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyB-Column1-Body1">client-hostname-resolved-on-the-relay </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyB-Column1-Body1">client-hostname-resolved-on-the-relay / relay-hostname-resolved-on-the-server </td>
<td class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-BodyB-Column1-Body1">client-hostname-resolved-on-the-relay </td></tr></tbody>
<colgroup>
<col class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Column-Column1" style="WIDTH: 0.3in"></colgroup></table>

{{% include-headless "chunk/pe-para-chain-hostnames.md" %}}


## check-hostname() {#global-option-check-hostname}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | `yes`, `no` |
| Default:         | `no`           |

*Description:* Enable or disable checking whether the hostname contains valid characters.



## create-dirs() {#global-option-create-dirs}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | `yes`, `no` |
| Default:         | `no`           |

*Description:* Enable or disable directory creation for destination files and sockets.



## custom-domain() {#global-option-custom-domain}

{{% alert title="Note" color="info" %}}

This global option works only if the `use-fqdn()` global option is set to `yes`.

{{% /alert %}}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | string           |
| Default:         | `empty string` |

*Description:* Use this option to specify a custom domain name that is appended after the short hostname to receive the fully qualified domain name (FQDN). This option affects every outgoing message: eventlog sources, file sources, MARK messages and internal messages of {{% param "product.abbrev" %}}.

  - If the hostname is a short hostname, the custom domain name is appended after the hostname (for example, `mypc` becomes `mypc.customcompany.local`).

  - If the hostname is an FQDN, the domain name part is replaced with the custom domain name (for example, if the FQDN in the forwarded message is `mypc.mycompany.local` and the custom domain name is `customcompany.local`, the hostname in the outgoing message becomes `mypc.customcompany.local`).



## dir-group() {#global-option-dir-group}

|                  |         |
| ---------------- | ------- |
| Accepted values: | groupid |
| Default:         | root    |

*Description:* The default group for newly created directories.



## dir-owner() {#global-option-dir-owner}

|                  |        |
| ---------------- | ------ |
| Accepted values: | userid |
| Default:         | root   |

*Description:* The default owner of newly created directories.



## dir-perm() {#global-option-dir-perm}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | permission value |
| Default:         | \-1              |

{{% include-headless "chunk/option-description-destination-file-dir-perm.md" %}}

Starting with version 3.16, the default value of this option is -1, so {{% param "product.abbrev" %}} does not change the ownership, unless explicitly configured to do so.



## dns-cache() {#global-option-dns-cache}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | `yes`, `no` |
| Default:         | `yes`          |

*Description:* Enable or disable DNS cache usage.

{{< include-headless "chunk/p-keep-hostname.md" >}}



## dns-cache-expire() {#global-option-dns-cache-expired}

|                  |        |
| ---------------- | ------ |
| Accepted values: | number |
| Default:         | 3600   |

*Description:* Number of seconds while a successful lookup is cached.



## dns-cache-expire-failed() {#global-option-dns-cache-expire-failed}

|                  |        |
| ---------------- | ------ |
| Accepted values: | number |
| Default:         | 60     |

*Description:* Number of seconds while a failed lookup is cached.



## dns-cache-hosts() {#global-option-dns-cache-hosts}

|                  |          |
| ---------------- | -------- |
| Accepted values: | filename |
| Default:         | unset    |

*Description:* Name of a file in `/etc/hosts` format that contains static IP->hostname mappings. Use this option to resolve hostnames locally without using a DNS. Note that any change to this file triggers a reload in `syslog-ng` and is instantaneous.



## dns-cache-size() {#global-option-dns-cache-size}

|                  |                     |
| ---------------- | ------------------- |
| Accepted values: | number of hostnames |
| Default:         | 1007                |

*Description:* Number of hostnames in the DNS cache.



## file-template() {#global-option-file-template}

|                  |        |
| ---------------- | ------ |
| Accepted values: | string |
| Default:         |        |

*Description:* Specifies a template that file-like destinations use by default. For example:

```shell
   template t_isostamp { template("$ISODATE $HOST $MSGHDR$MSG\n"); };
    
    options { file-template(t_isostamp); };
```



## flush-lines() {#global-option-flush-lines}

|                  |        |
| ---------------- | ------ |
| Accepted values: | number |
| Default:         | 100    |

{{% include-headless "chunk/option-description-destination-flush-lines.md" %}}


{{< include-headless "chunk/option-destination-frac-digits.md" >}}


## group() {#global-option-group}

|                  |         |
| ---------------- | ------- |
| Accepted values: | groupid |
| Default:         | root    |

*Description:* The default group of output files. By default, `syslog-ng` changes the privileges of accessed files (for example, `/dev/null`) to `root.root 0600`. To disable modifying privileges, use this option with the `-1` value.



## jvm-options()

|          |      |
| -------- | ---- |
| Type:    | list |
| Default: | N/A  |

*Description:* Specify the Java Virtual Machine (JVM) settings of your Java destination from the {{% param "product.abbrev" %}} configuration file.

For example:

```shell
   jvm-options("-Xss1M -XX:+TraceClassLoading")
```


{{< include-headless "chunk/option-source-keep-hostname.md" >}}

{{< include-headless "chunk/option-source-keep-timestamp.md" >}}


## log-fifo-size() {#global-option-log-fifo-size}

|                  |                   |
| ---------------- | ----------------- |
| Accepted values: | number (messages) |
| Default:         | 10000             |

*Description:* The number of messages that the output queue can store.

## log-level() {#global-options-log-level}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | `default`, `verbose`, `debug`, `trace` |
| Default:         | `default`        |

*Description:* Controls {{% param "product.abbrev" %}}'s own internal log level. Corresponds to setting the internal log level using `syslog-ng-ctl` or the command line options of `syslog-ng` (the `-d`, `-v`, and `-t` ). Setting the log level in the configuration makes it easier to control logging in containerized environments where changing command line options is more problematic.

Available in {{% param "product.abbrev" %}} 4.0 and later.

{{< include-headless "chunk/internal-log-levels.md" >}}

```shell
    options {
      log-level(debug);
    };
```

## log-msg-size() {#global-option-log-msg-size}

|                  |                |
| ---------------- | -------------- |
| Accepted values: | number (bytes) |
| Default:         | 65536          |

{{% include-headless "chunk/option-description-log-msg-size.md" %}}



## mark() (DEPRECATED)

|                  |        |
| ---------------- | ------ |
| Accepted values: | number |
| Default:         | 1200   |

*Description:* The `mark-freq()` option is an alias for the deprecated `mark()` option. This is retained for compatibility with AxoSyslog version 1.6.x.


{{% include-headless "chunk/option-destination-mark-freq.md" %}}

{{< include-headless "chunk/option-destination-mark-mode.md" >}}

{{< include-headless "chunk/option-source-normalize-hostnames.md" >}}


## on-error() {#global-option-typecasting-on-error}


| Accepted values:  | `drop-message`, `drop-property`, `fallback-to-string`, `silently-drop-message`, `silently-drop-property`, `silently-fallback-to-string` |
|--------------|-----------|
| Default:     | `drop-message` |

{{% include-headless "chunk/option-description-destination-on-error.md" %}}



## owner() {#global-option-owner}

|                  |        |
| ---------------- | ------ |
| Accepted values: | userid |
| Default:         | root   |

*Description:* The default owner of output files. If set, `syslog-ng` changes the owner of accessed files (for example, `/dev/null`) to this value, and the permissions to the value set in the `perm()` option.

Starting with version 3.16, the default value of this option is -1, so {{% param "product.abbrev" %}} does not change the ownership, unless explicitly configured to do so.



## pass-unix-credentials() {#global-option-pass-unix-credentials}

|                  |        |
| ---------------- | ------ |
| Accepted values: | yes|no |
| Default:         | yes    |

*Description:* Enable {{% param "product.abbrev" %}} to collect UNIX credential information (that is, the PID, user ID, and group of the sender process) for messages received using UNIX domain sockets. Available only in {{% param "product.name" %}} 3.7 and later. Note that collecting UNIX credential information from sockets in high-traffic environments can be resource intensive, therefore `pass-unix-credentials()` can be disabled globally, or separately for each source.



## perm() {#global-option-perm}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | permission value |
| Default:         | 0600             |

*Description:* The default permission for output files. If set, `syslog-ng` changes the permissions of accessed files (for example, `/dev/null`) to this value, and the onwer to the value set in the `owner()` option.

Starting with version 3.16, the default value of this option is -1, so {{% param "product.abbrev" %}} does not change the permissions, unless explicitly configured to do so.



## proto-template() {#global-option-proto-template}

|                  |                                                 |
| ---------------- | ----------------------------------------------- |
| Accepted values: | name of a template                              |
| Default:         | The default message format of the used protocol |

*Description:* Specifies a template that protocol-like destinations (for example, network() and syslog()) use by default. For example:

```shell
   template t_isostamp { template("$ISODATE $HOST $MSGHDR$MSG\n"); };
    
    options { proto-template(t_isostamp); };
```



## recv-time-zone() {#global-option-recv-time-zone}

|                  |                                              |
| ---------------- | -------------------------------------------- |
| Accepted values: | name of the timezone, or the timezone offset |
| Default:         | local timezone                               |

*Description:* Specifies the time zone associated with the incoming messages, if not specified otherwise in the message or in the source driver. For details, see also {{% xref "/chapter-concepts/timezone-handling/_index.md" %}} and {{% xref "/chapter-concepts/timezone-handling/example-timezones/_index.md" %}}.

{{% include-headless "chunk/para-timezone-format.md" %}}



{{% include-headless "chunk/option-destination-send-timezone.md" %}}

{{% include-headless "chunk/para-timezone-format.md" %}}

## stats() {#global-option-stats}

Available in {{% param "product.abbrev" %}} 4.1 and later.

*Description:* The `stats()` option is a collection of statistics-related options.

```shell
options {
    stats(
        freq(1)
        level(1)
        lifetime(1000)
        max-dynamics(10000)
        syslog-stats(yes)
    );
};
```

### freq() {#global-option-stats-freq}

|                  |        |
| ---------------- | ------ |
| Accepted values: | number |
| Default:         | 600    |

*Description:* The period between two STATS messages in seconds. STATS are log messages sent by `syslog-ng`, containing statistics about dropped log messages. Set to `0` to disable the STATS messages.

### level() {#global-option-stats-level}

|                  |                               |
| ---------------- | ----------------------------- |
| Accepted values: | `0` | `1` | `2` | `3` |
| Default:         | `0`                         |

*Description:* Specifies the detail of statistics {{% param "product.abbrev" %}} collects about the processed messages.

{{% include-headless "chunk/option-stats-level-description.md" %}}

Note that level 2 and 3 increase the memory requirements and CPU load. For details on message statistics, see {{% xref "/chapter-log-statistics/_index.md" %}}.

### max-dynamics() {#global-option-stats-max-dynamics}

|                  |         |
| ---------------- | ------- |
| Accepted values: | number  |
| Default:         | `N/A` |

Available in {{% param "product.abbrev" %}} 4.1 and later.

*Description:* To avoid performance issues or even overloading {{% param "product.abbrev" %}} (for example, if a script starts to send logs from different IP addresses to {{% param "product.abbrev" %}}), you might want to limit the number of registered dynamic counters in the message statistics. For details on message statistics, see {{% xref "/chapter-log-statistics/_index.md" %}}.

- Unlimited dynamic counters:

    If you do not use this option, dynamic counters will not be limited. This can be useful in cases where you are extremely interested in dynamic counters, and use these statistics extensively.

    {{% alert title="Warning" color="warning" %}}
In some cases, there might be even millions of dynamic counters
    {{% /alert %}}

- Limited dynamic counter clusters:

    To limit dynamic counters, enter a number, and only a maximum of `<number>` counters will be registered in the statistics.

    In practice, this means dynamic counter clusters. A program name produces one dynamic counter cluster, that can include several counters, such as `processed`, `stamp`, and so on.

    **Example: Limiting dynamic counter clusters 1:**

    If you set `stats-max-dynamics()` to `1`, and 2 programs send messages, only one of these programs will be tracked in the dynamic counters, but it will have more than one counters.

    **Example: Limiting dynamic counter clusters 2:**

    If you have 500 clients, and set `stats-max-dynamics()` to `1000`, you will have enough number of counters reserved for these clients, but at the same time, you limit the use of your resources and therefore protect your system from being overloaded.

- No dynamic counters:

    To disable dynamic counters completely, set the value of this option to `0`. This is the recommended value if you do not use statistics, or if you are not interested in dynamic counters in particular (for example, the number of logs arriving from programs).

{{% alert title="Note" color="info" %}}
If you set a lower value to `stats-max-dynamics()` (or, any limiting value, if this option has not been configured before) and restart {{% param "product.abbrev" %}}, the changes will only be applied after `stats-freq()` time has passed. That is, the previously allocated dynamic clusters will only be removed after this time.
{{% /alert %}}

### syslog-stats() {#global-option-stats-syslog-stats}

|                  |        |
| ---------------- | ------ |
| Accepted values: | `yes`, `no`, `auto` |
| Default:         | `auto` |

Available in {{% param "product.abbrev" %}} 4.1 and later.

*Description:* Changes the behavior of counting messages based on different syslog fields, like `SEVERITY`, `FACILITY`, `HOST`.

Possible values:

- `yes`: Enable syslog stats.
- `no`: Disable syslog stats.
- `auto`: Use the setting of the old [`stats-level()` option](#global-option-stats-level).

## stats-freq()

Deprecated legacy option. Use [`stats(freq())`](#global-option-stats-syslog-stats) instead.

## stats-level() {#global-option-stats-level-deprecated}

Deprecated legacy option. Use [`stats(level())`](#global-option-stats-level) instead.

## stats-max-dynamics() {#global-option-stats-max-dynamics}

Deprecated legacy option. Use [`stats(max-dynamics())`](#global-option-stats-max-dynamics) instead.

## sync() or sync-freq() (DEPRECATED)

|                  |                   |
| ---------------- | ----------------- |
| Accepted values: | number (messages) |
| Default:         | 0                 |

*Description:* Obsolete aliases for `flush-lines()`



## threaded() {#global-option-threaded}

|                  |        |
| ---------------- | ------ |
| Accepted values: | yes|no |
| Default:         | yes    |

*Description:* Enable {{% param "product.abbrev" %}} to run in multithreaded mode and use multiple CPUs. Available only in {{% param "product.name" %}} 3.3 and later. Note that setting `threaded(no)` does not mean that {{% param "product.abbrev" %}} will use only a single thread. For details, see {{% xref "/chapter-multithreading/_index.md" %}}.



## time-reap() {#global-option-time-reap}

{{% include-headless "chunk/option-description-destination-time-reap.md" %}}


{{% include-headless "chunk/option-source-time-reopen.md" %}}


## time-sleep() (DEPRECATED)

|                  |        |
| ---------------- | ------ |
| Accepted values: | number |
| Default:         | 0      |

*Description:* The time to wait in milliseconds between each invocation of the `poll()` iteration.


{{% include-headless "chunk/option-destination-timezone.md" %}}


## trim-large-messages() {#global-option-trim-large-messages}

|                  |        |
| ---------------- | ------ |
| Accepted values: | yes|no |
| Default:         | no     |

{{% include-headless "chunk/option-description-trim-large-messages.md" %}}



## ts-format() {#global-option-ts-format}

|                  |                                               |
| ---------------- | --------------------------------------------- |
| Accepted values: | `rfc3164` | `bsd` | `rfc3339` | `iso` |
| Default:         | `rfc3164`                                   |

*Description:* Specifies the timestamp format used when AxoSyslog itself formats a timestamp and nothing else specifies a format (for example: `STAMP` macros, internal messages, messages without original timestamps). For details, see also {{% xref "/chapter-concepts/timezone-handling/example-timezones/_index.md" %}}.

By default, timestamps include only seconds. To include fractions of a second (for example, milliseconds) use the `frac-digits()` option.

{{< include-headless "wnt/note-ts-format-network.md" >}}


{{< include-headless "chunk/option-source-use-dns.md" >}}

{{< include-headless "chunk/option-source-use-fqdn.md" >}}


## use-rcptid() {#global-option-use-rcptid}

|                  |          |
| ---------------- | -------- |
| Accepted values: | `yes | no` |
| Default:         | `no`       |

{{% include-headless "chunk/option-description-use-rcptid.md" %}}

This option is deprecated, use the `use-uniqid()` option instead.



## use-uniqid() {#global-use-uniqid}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | `yes`, `no` |
| Default:         | `no`           |

*Description:* This option enables generating a globally unique ID. It is generated from the HOSTID and the RCPTID in the format of HOSTID@RCPTID. It has a fixed length: 16+@+8 characters. You can include the unique ID in the message by using the macro. For details, see [UNIQID]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" >}}).

Enabling this option automatically generates the HOSTID. The HOSTID is a persistent, 32-bits-long cryptographically secure pseudo random number, that belongs to the host that the AxoSyslog is running on. If the persist file is damaged, the HOSTID might change.

Enabling this option automatically enables the RCPTID functionality. For details, see [RCPTID]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" >}})

