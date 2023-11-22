---
title: "The syslog-debun manual page"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Name

`syslog-debun` — `syslog-ng` DEBUg buNdle generator



## Synopsis

`syslog-debun [options]`



<span id="syslog-debun-mandescription"></span>

## Description

{{% alert title="Note" color="info" %}}

The `syslog-debun` application is distributed with the {{% param "product.abbrev" %}} system logging application, and is usually part of the {{% param "product.abbrev" %}} package. 

{{% /alert %}}

The `syslog-debun` tool collects and saves information about your {{% param "product.abbrev" %}} installation, making troubleshooting easier, especially if you ask help about your {{% param "product.abbrev" %}} related problem.



## General Options

- `-r`
    
    Run `syslog-ng-debun`. Using this option is required to actually execute the data collection with `syslog-ng-debun`. It is needed to prevent accidentally running `syslog-ng-debun`.

- `-h`
    
    Display the help page.

- `-l`
    
    Do not collect privacy-sensitive data, for example, process tree, fstab, and so on. If you use with `-d`, then the following parameters will be used for debug mode:`-Fev`

- `-R <directory>`
    
    The directory where {{% param "product.abbrev" %}} is installed instead of `/opt/syslog-ng`.

- `-W <directory>`
    
    Set the working directory, where the debug bundle will be saved. Default value: `/tmp`. The name of the created file is `syslog.debun.${host}.${date}.${3-random-characters-or-pid}.tgz`



## Debug mode options

- `-d`
    
    Start {{% param "product.abbrev" %}} in debug mode, using the `-Fedv --enable-core` options.
    
    {{% alert title="Warning" color="warning" %}}
Using this option under high message load may increase disk I/O during the debug, and the resulting debug bundle can be huge. To exit debug mode, press Enter.
    {{% /alert %}}

- `-D <options>`
    
    Start {{% param "product.abbrev" %}} in debug mode, using the specified command-line options. To exit debug mode, press Enter.

  - `-t <seconds>`
    
    Run {{% param "product.abbrev" %}} in noninteractive debug mode for <span class="code"><seconds></span>, and automatically exit debug mode after the specified number of seconds.

- `-w <seconds>`
    
    Wait <span class="code"><seconds></span> seconds before starting debug mode.



## System call tracing

- `-s`
    
    Enable syscall tracing (`strace -f` or `truss -f`). Note that using `-s` itself does not enable debug mode, only traces the system calls of an already running {{% param "product.abbrev" %}} process. To trace system calls in debug mode, use both the `-s` and `-d` options.



## Packet capture options

Capturing packets requires a packet capture tool on the host. The `syslog-debun` tool attempts to use `tcpdump` on most platforms, except for Solaris, where it uses `snoop`.

- `-i <interface>`
    
    Capture packets only on the specified interface, for example, `eth0`.

- `-p`
    
    Capture incoming packets using the following filter: `port 514 or port 601 or port 53`

- `-P <options>`
    
    Capture incoming packets using the specified filter.

- `-t <seconds>`
    
    Run {{% param "product.abbrev" %}} in noninteractive debug mode for `<seconds>`, and automatically exit debug mode after the specified number of seconds.



<span id="idm46072214735232"></span>

## Examples

```shell
syslog-ng-debun -r
```

Create a simple debug bundle, collecting information about your environment, for example, list packages containing the word: `syslog`, `ldd` of your syslog-binary, and so on.

```shell
syslog-ng-debun -r -l
```

Similar to `syslog-ng-debun -r`, but without privacy-sensitive information. For example, the following is NOT collected: `fstab`, df output, mount info, ip / network interface configuration, DNS resolv info, and process tree.

```shell
syslog-ng-debun -r -d
```

Similar to `syslog-ng-debun -r`, but it also stops {{% param "product.abbrev" %}}, then restarts it in debug mode (`-Fedv --enable-core`). To stop debug mode, press Enter. The output of the debug mode collected into a separate file, and also added to the debug bundle.

```shell
syslog-ng-debun -r -s
```

Trace the system calls (using `strace` or `truss`) of an already running {{% param "product.abbrev" %}} process.

```shell
syslog-ng-debun -r -d -s
```

Restart {{% param "product.abbrev" %}} in debug mode, and also trace the system calls (using `strace` or `truss`) of the {{% param "product.abbrev" %}} process.

```shell
syslog-ng-debun -r -p
```

Run packet capture (`pcap`) with the filter: `port 514 or port 601 or port 53` Also waits for pressing Enter, like debug mode.

```shell
syslog-ng-debun -r -p -t 10
```

Noninteractive debug mode: Similar to `syslog-ng-debun -r -p`, but automatically exit after 10 seconds.

```shell
syslog-ng-debun -r -P "host 1.2.3.4"  -D "-Fev --enable-core"
```

Change the packet-capturing filter from the default to `host 1.2.3.4`. Also change debugging parameters from the default to `-Fev --enable-core`. Since a timeout (`-t`) is not given, waits for pressing Enter.

```shell
syslog-ng-debun -r -p -d -w 5 -t 10
```

Collect `pcap` and debug mode output following this scenario:

- Start packet capture with default parameters (`-p`)
- Wait 5 seconds (`-w 5`)
- Stop {{% param "product.abbrev" %}}
- Start {{% param "product.abbrev" %}} in debug mode with default parameters (`-d`)
- Wait 10 seconds (`-t 10`)
- Stop {{% param "product.abbrev" %}} debugging
- Start {{% param "product.abbrev" %}}
- Stop packet capturing

## Files

`/opt/syslog-ng/bin/loggen`



## See also

[syslog-ng.conf.5]({{< ref "/app-man-syslog-ng/syslog-ng.conf.5.md" >}})

{{< include-headless "chunk/manpage-more-info.md" >}}
