---
title: Configuring log rotation
weight: 700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application does not rotate logs by itself. To use {{% param "product.abbrev" %}} for log rotation, consider the following approaches:


## Use logrotate together with {{% param "product.abbrev" %}}:

- It is ideal for workstations or when processing fewer logs.

- It is included in most distributions by default.

- Less scripting is required, only `logrotate` has to be configured correctly.

- Requires frequent restart ({{% param "product.abbrev" %}} must be reloaded/restarted when the files are rotated). After rotating the log files, reload {{% param "product.abbrev" %}} using the `syslog-ng-ctl reload` command, or use another method to send a SIGHUP to {{% param "product.abbrev" %}}.

- The statistics collected by {{% param "product.abbrev" %}}, and the correlation information gathered with Pattern Database, are lost with each restart.



## Separate incoming logs based on time, host or other information:

- It is ideal for central log servers, where regular restart of {{% param "product.abbrev" %}} is unfavorable.

- Requires shell scripts or cron jobs to remove old logs.

- It can be done by using macros in the destination name (in the filename, directory name, or the database table name). (For details on using macros, see {{% xref "/chapter-manipulating-messages/customizing-message-format/configuring-macros/_index.md" %}}.)


## Example: File destination for log rotation

This sample file destination configuration stores incoming logs in files that are named based on the current year, month and day, and places these files in directories that are named based on the hostname:

```shell
   destination d_sorted {
        file(
            "/var/log/remote/${HOST}/${YEAR}_${MONTH}_${DAY}.log"
            create-dirs(yes)
        );
    };
```



## Example: Logstore destination for log rotation

This sample logstore destination configuration stores incoming logs in logstores that are named based on the current year, month and day, and places these logstores in directories that are named based on the hostname:

```shell
   destination d_logstore {
        logstore(
            "/var/log/remote/${HOST}/${YEAR}_${MONTH}_${DAY}.lgs"
            compress(9)
            create-dirs(yes)
        );
    };
```



## Example: Command for cron for log rotation

This sample command for `cron` removes files older than two weeks from the `/var/log/remote` directory:

```shell
   find /var/log/remote/ -daystart -mtime +14 -type f -exec rm {} \;
```


