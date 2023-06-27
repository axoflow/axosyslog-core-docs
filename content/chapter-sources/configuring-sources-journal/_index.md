---
title: "systemd-journal: Collecting messages from the systemd-journal system log storage"
weight:  4300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `systemd-journal()` source is used on various Linux distributions, such as RHEL (from RHEL7) and CentOS. The `systemd-journal()` source driver can read the structured name-value format of the journald system service, making it easier to reach the custom fields in the message. By default, {{% param "product.abbrev" %}} adds the `.journald.` prefix to the name of every parsed value. For a list and description of name-value pairs that journald provides, see the documentation of journald for your platform (for example, `man systemd.journal-fields`).

The `systemd-journal()` source driver is designed to read only local messages through the <span>systemd-journal</span> API. It is not possible to set the location of the journal files, or the directories.

{{% alert title="Note" color="info" %}}

The `log-msg-size()` option is not applicable for this source. Use the `max-field-size()` option instead.

{{% /alert %}} {{% alert title="Note" color="info" %}}

This source will not handle the following cases:

  - Corrupted journal file

  - Incorrect journal configuration

  - Any other journald-related bugs

{{% /alert %}} {{% alert title="Note" color="info" %}}

If you are using RHEL-7, the default source in the configuration is `systemd-journal()` instead of `unix-dgram("/dev/log")` and `file("/proc/kmsg")`. If you are using `unix-dgram("/dev/log")` or `unix-stream("/dev/log")` in your configuration as a source, {{% param "product.abbrev" %}} will revert to using `systemd-journal()` instead.

{{% /alert %}}

{{% alert title="Warning" color="warning" %}}

Only one `systemd-journal()` source can be configured in the configuration file. If there is more than one `systemd-journal()` source configured, {{% param "product.abbrev" %}} will not start.

{{% /alert %}}


## Declaration:

```c
   systemd-journal(options);
```



## Example: Sending all fields through syslog protocol using the systemd-journal() driver {#example-source-journal-allfields}

To send all fields through the syslog protocol, enter the prefix in the following format: "`.SDATA.<name>`".

```c
   @version: {{% param "product.techversion" %}}
    
    source s_journald {
        systemd-journal(prefix(".SDATA.journald."));
    };
    
    destination d_network {
        syslog("server.host");
    };
    
    log {
        source(s_journald);
        destination(d_network);
    };
```



## Example: Filtering for a specific field using the systemd-journal() driver {#example-source-journal-filtering}

```c
   @version: {{% param "product.techversion" %}}
    
    source s_journald {
        systemd-journal(prefix(".SDATA.journald."));
    };
    
    filter f_uid {"${.SDATA.journald._UID}" eq "1000"};
    
    destination d_network {
        syslog("server.host");
    };
    
    log {
        source(s_journald);
        filter(f_uid);
        destination(d_network);
    };
```



## Example: Sending all fields in value-pairs using the systemd-journal() driver {#example-source-journal-valuepairs}

```c
   @version: {{% param "product.techversion" %}}
    
    source s_local {
        systemd-journal(prefix("journald."));
    };
    
    destination d_network {
        network("server.host" template("$(format_json --scope rfc5424 --key journald.*)\n"));
    };
    
    log {
        source(s_local);
        destination(d_network);
    };
```


The journal contains credential information about the process that sent the log message. The {{% param "product.abbrev" %}} application makes this information available in the following macros:

{{% include-headless "chunk/journald-credential-macros.md" %}}
