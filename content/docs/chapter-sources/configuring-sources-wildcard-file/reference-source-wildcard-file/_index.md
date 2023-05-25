---
title: "wildcard-file() source options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `wildcard-file()` driver has the following options:


## base-dir() {#source-wildcard-file-base-dir}

|          |                       |
| -------- | --------------------- |
| Type:    | path without filename |
| Default: |                       |

*Description:* The path to the directory that contains the log files to monitor, for example, **base-dir("/var/log")**. To monitor also the subdirectories of the base directory, use the **recursive(yes)** option. For details, see [recursive()](#source-wildcard-file-recursive).

{{% alert title="Warning" color="warning" %}}

{{% include-headless "wnt/warning-wildcard-overlapping-files.md" %}} {{% /alert %}}


{{% include-headless "chunk/synopsis-wildcard-file-source-example.md" %}}

{{% include-headless "chunk/option-source-default-facility.md" %}}

{{% include-headless "chunk/option-source-default-priority.md" %}}

{{% include-headless "chunk/option-source-encoding.md" %}}


## filename-pattern() {#source-wildcard-file-file-pattern}

|          |                       |
| -------- | --------------------- |
| Type:    | filename without path |
| Default: |                       |

*Description:* The filename to read messages from, without the path. You can use the **\*** and **?** wildcard characters, without regular expression and character range support. You cannot use the `\*` and `?` literally in the pattern.

For example, **filename-pattern("\*.log")** matches the `syslog.log` and `auth.log` files, but does not match the `access_log` file. The `filename-pattern("\*log")` pattern matches all three.

  - `\*`
    
    matches an arbitrary string, including an empty string

  - `?`
    
    matches an arbitrary character

{{% alert title="Warning" color="warning" %}}

{{% include-headless "wnt/warning-wildcard-overlapping-files.md" %}} {{% /alert %}}


{{% include-headless "chunk/synopsis-wildcard-file-source-example.md" %}}

{{% include-headless "chunk/option-source-flags.md" %}}

{{% include-headless "chunk/option-source-follow-freq.md" %}}

{{% include-headless "chunk/option-destination-hook.md" %}}

{{% include-headless "chunk/option-source-keep-timestamp.md" %}}

{{% include-headless "chunk/option-source-log-fetch-limit.md" %}}


{{% include-headless "chunk/option-source-file-log-iw-size.md" %}}

When using wildcards in the filenames, {{% productparam "abbrev" %}} attempts to read `log-fetch-limit()` number of messages from each file. For optimal performance, make sure that `log-iw-size()` is greater than `log-fetch-limit()\*max-files()`. Note that to avoid performance problems, if `log-iw-size()/max-files()` is smaller than 100, {{% productparam "abbrev" %}} automatically sets `log-iw-size()` to **max-files()\*100**.


## Example: Initial window size of file sources

If `log-fetch-limit()` is 100, and your wildcard file source has 200 files, then `log-iw-size()` should be at least 20000.



{{% include-headless "chunk/option-source-log-msg-size.md" %}}

{{% include-headless "chunk/option-source-log-prefix.md" %}}


## max-files() {#source-wildcard-file-max-files}

|          |         |
| -------- | ------- |
| Type:    | integer |
| Default: | 100     |

*Description:* Limits the number of files that the wildcard-file source monitors.

{{% include-headless "chunk/para-wildcard-file-source-max-files.md" %}}



## monitor-method() {#source-wildcard-file-monitor-method}

|          |                       |
| -------- | --------------------- |
| Type:    | auto | inotify | poll |
| Default: | auto                  |

*Description:* If the platform supports inotify, {{% productparam "abbrev" %}} uses it automatically to detect changes to the source files. If inotify is not available, {{% productparam "abbrev" %}} polls the files as set in the `follow-freq()` option. To force {{% productparam "abbrev" %}} poll the files even if inotify is available, set this option to **poll**.


{{% include-headless "chunk/option-source-multi-line-garbage.md" %}}

{{% include-headless "chunk/option-source-multi-line-mode.md" %}}

{{% include-headless "chunk/option-source-multi-line-prefix.md" %}}

{{% include-headless "chunk/option-source-multi-line-suffix.md" %}}

{{% include-headless "chunk/option-source-pad-size.md" %}}

{{% include-headless "chunk/option-source-program-override.md" %}}


## recursive() {#source-wildcard-file-recursive}

|          |          |
| -------- | -------- |
| Type:    | yes | no |
| Default: | no       |

*Description:* When enabled, {{% productparam "abbrev" %}} monitors every subdirectory of the path set in the [base-dir()](#source-wildcard-file-base-dir) option, and reads log messages from files with matching filenames. The `recursive` option can be used together with wildcards in the filename.

{{% alert title="Warning" color="warning" %}}

{{% include-headless "wnt/warning-wildcard-overlapping-files.md" %}} {{% /alert %}}



## Example: Monitoring multiple directories {#example-source-wildcard-file-recursive}

The following example reads files having the `.log` extension from the `/var/log/` directory and its subdirectories, including for example, the `/var/log/apt/history.log` file.

```c

    source s_file_subdirectories {
        wildcard-file(
            base-dir("/var/log")
            filename-pattern("*.log")
            recursive(yes)
            follow-freq(1)
            log-fetch-limit(100)
        );
    };

```


{{% include-headless "chunk/option-source-tags.md" %}}

{{% include-headless "chunk/option-source-time-zone.md" %}}
