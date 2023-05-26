---
title: "The syslog-ng control tool manual page"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


<span id="syslog-ng-ctl.1"></span>

## Name

`syslog-ng-ctl` — Display message statistics and enable verbose, debug and trace modes

## Synopsis

`syslog-ng-ctl [command] [options]`

<span id="syslog-ng-ctl-mandescription"></span>

## Description

{{% alert title="Note" color="info" %}}

The `syslog-ng-ctl` application is distributed with the {{% param "product.ose" %}} system logging application, and is usually part of the {{% param "product.ose" %}} package. The latest version of the {{% param "product.ose" %}} application is available at the [{{% param "product.ose" %}} page](https://syslog-ng.com/).

{{% /alert %}}

This manual page is only an abstract, for the complete documentation of {{% param "product.abbrev" %}}, see the [{{% param "product.abbrev" %}} Documentation page](https://support.oneidentity.com/syslog-ng-premium-edition/technical-documents/)[{{% param "product.abbrev" %}} Documentation page](https://www.syslog-ng.com/).

The `syslog-ng-ctl` application is a utility that can be used to:

- enable/disable various {{% param "product.ose" %}} messages for troubleshooting

- display statistics about the processed messages

- handling password-protected private keys

- display the currently running configuration of {{% param "product.ose" %}}

- reload the configuration of {{% param "product.ose" %}}.

<span id="syslog-ng-ctl"></span>

## Enabling troubleshooting messages

`command [options]`

Use the `syslog-ng-ctl \<command\> --set=on` command to display verbose, trace, or debug messages. If you are trying to solve configuration problems, the verbose (and occasionally trace) messages are usually sufficient. Debug messages are needed mostly for finding software errors. After solving the problem, do not forget to turn these messages off using the `syslog-ng-ctl \<command\> --set=off` Note that enabling debug messages does not enable verbose and trace messages.

Use `syslog-ng-ctl \<command\>` without any parameters to display whether the particular type of messages are enabled or not.

If you need to use a non-standard control socket to access syslog-ng, use the `syslog-ng-ctl \<command\> --set=on --control=\<socket\>` command to specify the socket to use.

- `verbose`
    
    Print verbose messages. If {{% param "product.ose" %}} was started with the `--stderr` or `-e` option, the messages will be sent to `stderr`. If not specified, {{% param "product.ose" %}} will log such messages to its internal source.

- `trace`
    
    Print trace messages of how messages are processed. If {{% param "product.ose" %}} was started with the `--stderr` or `-e` option, the messages will be sent to `stderr`. If not specified, {{% param "product.ose" %}} will log such messages to its internal source.

- `debug`
    
    Print debug messages. If {{% param "product.ose" %}} was started with the `--stderr` or `-e` option, the messages will be sent to `stderr`. If not specified, {{% param "product.ose" %}} will log such messages to its internal source.

## Example

```c
syslog-ng-ctl verbose --set=on
```


<span id="syslog-ng-ctl-query"></span>

## syslog-ng-ctl query

The {{% param "product.ose" %}} application stores various data, metrics, and statistics in a hash table. Every property has a name and a value. For example:

```c
[syslog-ng]
  |       
  |_[destinations]-[network]-[tcp]->[stats]->{received=12;dropped=2}
  |
  |_[sources]-[sql]-[stats]->{received=501;dropped=0}
```

You can query the nodes of this tree, and also use filters to select the information you need. A query is actually a path in the tree. You can also use the `?` and `\*` wildcards. For example:

- Select every property: `\*`

- Select all `dropped` value from every `stats` node: `\*.stats.dropped`

The nodes and properties available in the tree depend on your {{% param "product.ose" %}} configuration (that is, the sources, destinations, and other objects you have configured), and also on your `stats-level()` settings.



<span id="syslog-ng-ctl-query-list"></span>

## The list command

`syslog-ng-ctl query list`

Use the `syslog-ng-ctl query list` command to display the list of metrics that {{% param "product.ose" %}} collects about the processed messages.

An example output:

```c
  center.received.stats.processed
  center.queued.stats.processed
  destination.java.d_elastic#0.java_dst(ElasticSearch,elasticsearch-syslog-ng-test,t7cde889529c034aea9ec_micek).stats.dropped
  destination.java.d_elastic#0.java_dst(ElasticSearch,elasticsearch-syslog-ng-test,t7cde889529c034aea9ec_micek).stats.processed
  destination.java.d_elastic#0.java_dst(ElasticSearch,elasticsearch-syslog-ng-test,t7cde889529c034aea9ec_micek).stats.queued
  destination.d_elastic.stats.processed
  source.s_tcp.stats.processed
  source.severity.7.stats.processed
  source.severity.0.stats.processed
  source.severity.1.stats.processed
  source.severity.2.stats.processed
  source.severity.3.stats.processed
  source.severity.4.stats.processed
  source.severity.5.stats.processed
  source.severity.6.stats.processed
  source.facility.7.stats.processed
  source.facility.16.stats.processed
  source.facility.8.stats.processed
  source.facility.17.stats.processed
  source.facility.9.stats.processed
  source.facility.18.stats.processed
  source.facility.19.stats.processed
  source.facility.20.stats.processed
  source.facility.0.stats.processed
  source.facility.21.stats.processed
  source.facility.1.stats.processed
  source.facility.10.stats.processed
  source.facility.22.stats.processed
  source.facility.2.stats.processed
  source.facility.11.stats.processed
  source.facility.23.stats.processed
  source.facility.3.stats.processed
  source.facility.12.stats.processed
  source.facility.4.stats.processed
  source.facility.13.stats.processed
  source.facility.5.stats.processed
  source.facility.14.stats.processed
  source.facility.6.stats.processed
  source.facility.15.stats.processed
  source.facility.other.stats.processed
  global.payload_reallocs.stats.processed
  global.msg_clones.stats.processed
  global.sdata_updates.stats.processed
              tag..source.s_tcp.stats.processed
```

The `syslog-ng-ctl query list` command has the following options:

- `--reset`
    
    Use `--reset` to set the selected counters to 0 after executing the query.



<span id="syslog-ng-ctl-query-sum"></span>

## Displaying metrics and statistics

`syslog-ng-ctl query get [options]`

The `syslog-ng-ctl query get \<query\>` command lists the nodes that match the query, and their values.

For example, the `destination` query lists the configured destinations, and the metrics related to each destination. An example output:

```c
destination.java.d_elastic#0.java_dst(ElasticSearch,elasticsearch-syslog-ng-test,t7cde889529c034aea9ec_micek).stats.dropped=0
destination.java.d_elastic#0.java_dst(ElasticSearch,elasticsearch-syslog-ng-test,t7cde889529c034aea9ec_micek).stats.processed=0
destination.java.d_elastic#0.java_dst(ElasticSearch,elasticsearch-syslog-ng-test,t7cde889529c034aea9ec_micek).stats.queued=0
destination.d_elastic.stats.processed=0
```

The `syslog-ng-ctl query get` command has the following options:

- `--sum`
    
    Add up the result of each matching node and return only a single number.
    
    For example, the `syslog-ng-ctl query get --sum "destination\*.dropped"` command displays the number of messages dropped by the {{% param "product.ose" %}} instance.

- `--reset`
    
    Use `--reset` to set the selected counters to 0 after executing the query.



<span id="syslog-ng-ctl-stats"></span>

## The stats command

`stats [options]`

Use the `stats` command to display statistics about the processed messages. For details about the displayed statistics, see [The {{% param "product.ose" %}} Administrator Guide](https://www.syslog-ng.com). The `stats` command has the following options:

- `--control=\<socket\>` or `-c`
    
    Specify the socket to use to access {{% param "product.ose" %}}. Only needed when using a non-standard socket.

- `--reset=\<socket\>` or `-r`
    
    Reset all statistics to zero, except for the `queued` counters. (The `queued` counters show the number of messages in the message queue of the destination driver, waiting to be sent to the destination.)

- `--remove-orphans`
    
    Safely removes all counters that are not referenced by any syslog-ng stat producer objects.
    
    The flag can be used to prune dynamic and static counters manually. This is useful, for example, when a templated file destination produces a lot of stats:
    
    ```c
        dst.file;#anon-destination0#0;/tmp/2021-08-16.log;o;processed;253592
        dst.file;#anon-destination0#0;/tmp/2021-08-17.log;o;processed;156
        dst.file;#anon-destination0#0;/tmp/2021-08-18.log;a;processed;961
    ```

    {{% alert title="Note" color="info" %}}
The `stats-lifetime()` can be used to do the same automatically and periodically, but currently stats-lifetime() removes only dynamic counters that have a timestamp field set.
    {{% /alert %}}


## Example

```c
syslog-ng-ctl stats
```

An example output:

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

<span id="syslog-ng-ctl-credentials"></span>

## Handling password-protected private keys

`syslog-ng-ctl credentials [options]`

The `syslog-ng-ctl credentials status` command allows you to query the status of the private keys that {{% param "product.ose" %}} uses in the `network()` and `syslog()` drivers. You can also provide the passphrase for password-protected private keys using the `syslog-ng-ctl credentials add` command. For details on using password-protected keys, see [The syslog-ng Administrator Guide](https://www.syslog-ng.com).



<span id="idm46098617680288"></span>

## Displaying the status of private keys

`syslog-ng-ctl credentials status [options]`

The `syslog-ng-ctl credentials status` command allows you to query the status of the private keys that {{% param "product.ose" %}} uses in the `network()` and `syslog()` drivers. The command returns the list of private keys used, and their status. For example:

```c
  syslog-ng-ctl credentials status
  Secret store status:
  /home/user/ssl_test/client-1/client-encrypted.key SUCCESS
```

If the status of a key is PENDING, you must provide the passphrase for the key, otherwise {{% param "product.ose" %}} cannot use it. The sources and destinations that use these keys will not work until you provide the passwords. Other parts of the {{% param "product.ose" %}} configuration will be unaffected. You must provide the passphrase of the password-protected keys every time {{% param "product.ose" %}} is restarted.

The following log message also notifies you of PENDING passphrases:

```c
Waiting for password; keyfile='private.key'
```

- `--control=\<socket\>` or `-c`
    
    Specify the socket to use to access {{% param "product.ose" %}}. Only needed when using a non-standard socket.



<span id="idm46098617667936"></span>

## Opening password-protected private keys

`syslog-ng-ctl credentials add [options]`

You can add the passphrase to a password-protected private key file using the following command. {{% param "product.ose" %}} will display a prompt for you to enter the passphrase. We recommend that you use this method.

```c
syslog-ng-ctl credentials add --id=<path-to-the-key>
```

Alternatively, you can include the passphrase in the `--secret` parameter:

```c
syslog-ng-ctl credentials add --id=<path-to-the-key> --secret=<passphrase-of-the-key>
```

Or you can pipe the passphrase to the syslog-ng-ctl command, for example:

```c
echo "<passphrase-of-the-key>" | syslog-ng-ctl credentials add --id=<path-to-the-key>
```

- `--control=\<socket\>` or `-c`
    
    Specify the socket to use to access {{% param "product.ose" %}}. Only needed when using a non-standard socket.

- `--id=\<path-to-the-key\>` or `-i`
    
    The path to the password-protected private key file. This is the same path that you use in the `key-file()` option of the {{% param "product.ose" %}} configuration file.

- `--secret=\<passphrase-of-the-key\>` or `-s`
    
    The password or passphrase of the private key.



<span id="syslog-ng-ctl-config"></span>

## Displaying the configuration

`syslog-ng-ctl config [options]`

Use the `syslog-ng-ctl config` command to display the configuration that {{% param "product.ose" %}} is currently running. Note by default, only the content of the main configuration file are displayed, included files are not resolved. To resolve included files and display the entire configuration, use the `syslog-ng-ctl config --preprocessed` command.



<span id="syslog-ng-ctl-reload"></span>

## Reloading the configuration

`syslog-ng-ctl reload [options]`

Use the `syslog-ng-ctl reload` command to reload the configuration file of {{% param "product.ose" %}} without having to restart the {{% param "product.ose" %}} application. The `syslog-ng-ctl reload` works like a SIGHUP.

The `syslog-ng-ctl reload` command returns 0 if the operation was successful, 1 otherwise.



## Files

`/opt/syslog-ng/sbin/syslog-ng-ctl`



## See also

<span class="mcFormatColor" style="color: #04aada;">The syslog-ng.conf manual page</span>

<span class="mcFormatColor" style="color: #04aada;">The syslog-ng manual page</span>

{{% alert title="Note" color="info" %}}

For the detailed documentation of {{% param "product.abbrev" %}} see [{{% param "product.abbrev" %}} Documentation page](https://support.oneidentity.com/syslog-ng-premium-edition/technical-documents/)[{{% param "product.abbrev" %}} Documentation page](https://www.syslog-ng.com/).

If you experience any problems or need help with {{% param "product.abbrev" %}}, visit the [{{% param "product.syslog-ng" %}} mailing list](https://lists.balabit.hu/mailman/listinfo/syslog-ng).

For news and notifications about {{% param "product.abbrev" %}}, visit the [{{% param "product.syslog-ng" %}} blogs](https://syslog-ng.com/blog/).

{{% /alert %}}

