---
title: "HDFS destination options"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `hdfs` destination stores the log messages in files on the Hadoop Distributed File System (HDFS). The `hdfs` destination has the following options.

The following options are required: `hdfs-file()`, `hdfs-uri()`. Note that to use `hdfs`, you must add the following line to the beginning of your {{% param "product.abbrev" %}} configuration:

```c

    @include "scl.conf"

```

{{% include-headless "chunk/option-destination-java-class-path.md" %}}

For the `hdfs` destination, include the path to the directory where you copied the required libraries (see {{% xref "/docs/chapter-destinations/configuring-destinations-hdfs/destination-hdfs-prerequisites/_index.md" %}}), for example, `client-lib-dir("/opt/syslog-ng/lib/syslog-ng/java-modules/:/opt/hadoop/libs/")`.

{{% include-headless "chunk/option-destination-diskbuffer.md" %}}

{{% include-headless "chunk/option-destination-frac-digits.md" %}}

{{% include-headless "chunk/option-destination-hdfs-append-enabled.md" %}}


## hdfs-archive-dir() {#hdfs-option-hdfs-archive-dir}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The path where {{% param "product.abbrev" %}} will move the closed log files. If {{% param "product.abbrev" %}} cannot move the file for some reason (for example, {{% param "product.abbrev" %}} cannot connect to the HDFS NameNode), the file remains at its original location. For example, `hdfs-archive-dir("/usr/hdfs/archive/")`.

{{% alert title="Note" color="info" %}}

When `hdfs-append-enabled` is set to **true**, archiving is automatically disabled, and {{% param "product.abbrev" %}} will ignore the `hdfs-archive-dir` option.

{{% /alert %}}



## hdfs-file() {#hdfs-option-hdfs-file}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The path and name of the log file. For example, `hdfs-file("/usr/hdfs/mylogfile.txt")`. {{% param "product.abbrev" %}} checks if the path to the logfile exists. If a directory does not exist {{% param "product.abbrev" %}} automatically creates it.

`hdfs-file()` supports the usage of macros. This means that {{% param "product.abbrev" %}} can create files on HDFS dynamically, using macros in the file (or directory) name.

{{% alert title="Note" color="info" %}}

When a filename resolved from the macros contains a character that HDFS does not support, {{% param "product.abbrev" %}} will not be able to create the file. Make sure that you use macros that do not contain unsupported characters.

{{% /alert %}}


## Example: Using macros in filenames

In the following example, a `/var/testdb_working_dir/$DAY-$HOUR.txt` file will be created (with a UUID suffix):

```c

    destination d_hdfs_9bf3ff45341643c69bf46bfff940372a {
        hdfs(client-lib-dir(/hdfs-libs)
     hdfs-uri("hdfs://hdp2.syslog-ng.example:8020")
     hdfs-file("/var/testdb_working_dir/$DAY-$HOUR.txt"));
    };

```

As an example, if it is the 31st day of the month and it is 12 o'clock, then the name of the file will be `31-12.txt`.




## hdfs-max-filename-length() {#hdfs-option-hdfs-max-filename-length}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 255    |

*Description:* The maximum length of the filename. This filename (including the UUID that {{% param "product.abbrev" %}} appends to it) cannot be longer than what the file system permits. If the filename is longer than the value of `hdfs-max-filename-length`, {{% param "product.abbrev" %}} will automatically truncate the filename. For example, `hdfs-max-filename-length("255")`.



## hdfs-resources() {#hdfs-option-hdfs-resources}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The list of Hadoop resources to load, separated by semicolons. For example, `hdfs-resources("/home/user/hadoop/core-site.xml;/home/user/hadoop/hdfs-site.xml")`.



## hdfs-uri() {#hdfs-option-hdfs-uri}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The URI of the HDFS NameNode is in `hdfs://IPaddress:port` or `hdfs://hostname:port` format. When using MapR-FS, the URI of the MapR-FS NameNode is in `maprfs://IPaddress` or `maprfs://hostname` format, for example: `maprfs://10.140.32.80`. The IP address of the node can be IPv4 or IPv6. For example, `hdfs-uri("hdfs://10.140.32.80:8020")`. The IPv6 address must be enclosed in square brackets (*[]*) as specified by RFC 2732, for example, `hdfs-uri("hdfs://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:8020")`.


{{% include-headless "chunk/option-destination-hook.md" %}}

{{% include-headless "chunk/option-destination-jvm-options.md" %}}


## kerberos-keytab-file() {#hdfs-option-kerberos-keytab-file}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The path to the Kerberos keytab file that you received from your Kerberos administrator. For example, `kerberos-keytab-file("/opt/syslog-ng/etc/hdfs.headless.keytab")`. This option is needed only if you want to authenticate using Kerberos in Hadoop. You also have to set the [`hdfs-option-kerberos-principal()`]({{< relref "/docs/chapter-destinations/configuring-destinations-hdfs/reference-destination-hdfs/_index.md" >}}) option. For details on the using Kerberos authentication with the `hdfs()` destination, see {{% xref "/docs/chapter-destinations/configuring-destinations-hdfs/destination-hdfs-kerberos-authentication/_index.md" %}}.

{{% include-headless "chunk/synopsis-hdfs-kerberos-example.md" %}}

Available in {{% param "product.abbrev" %}} version {{% conditional-text include-if="ose" %}}3.10{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7.0.3{{% /conditional-text %}} and later.



## kerberos-principal() {#hdfs-option-kerberos-principal}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The Kerberos principal you want to authenticate with. For example, `kerberos-principal("hdfs-user@MYREALM")`. This option is needed only if you want to authenticate using Kerberos in Hadoop. You also have to set the [`hdfs-option-kerberos-keytab-file()`]({{< relref "/docs/chapter-destinations/configuring-destinations-hdfs/reference-destination-hdfs/_index.md" >}}) option. For details on the using Kerberos authentication with the `hdfs()` destination, see {{% xref "/docs/chapter-destinations/configuring-destinations-hdfs/destination-hdfs-kerberos-authentication/_index.md" %}}.

{{% include-headless "chunk/synopsis-hdfs-kerberos-example.md" %}}

Available in {{% param "product.abbrev" %}} version {{% conditional-text include-if="ose" %}}3.10{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7.0.3{{% /conditional-text %}} and later.


{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

{{% include-headless "chunk/option-destination-on-error.md" %}}

{{% include-headless "chunk/option-destination-retries.md" %}}

{{% include-headless "chunk/option-destination-template.md" %}}

{{% include-headless "chunk/option-destination-throttle.md" %}}


## time-reap() {#hdfs-option-time-reap}

|                  |                  |
| ---------------- | ---------------- |
| Accepted values: | number (seconds) |
| Default:         | 0 (disabled)     |

*Description:* The time to wait in seconds before an idle destination file is closed. Note that if `hdfs-archive-dir` option is set and **time-reap** expires, archiving is triggered for the affected file.


{{% include-headless "chunk/option-destination-timezone.md" %}}

{{% include-headless "chunk/option-destination-ts-format.md" %}}
