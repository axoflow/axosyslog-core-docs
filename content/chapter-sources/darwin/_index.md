---
title: Collect native macOS system logs
linktitle: darwin-oslog(), darwin-oslog-stream() for macOS
weight: 150
driver: "darwin-oslog(), darwin-oslog-stream()"
short_description: "Collect native macOS system logs"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.6.0, {{% param "product_name" %}} can collect logs on macOS using its native OSLog framework using the `darwin-oslog()` and `darwin-oslog-stream()` source drivers.

- [`darwin-oslog()`](#darwin-oslog): This source builds on the native OSLog framework, and replaces the earlier file-source based solution.
- [`darwin-oslog-stream()`](#darwin-oslog-stream): Provides a live log stream feed.

## `darwin-oslog()`

This source is based on the [native OSLog Framework](https://developer.apple.com/documentation/oslog?language=objc) to read logs from the local store of the unified logging system on darwin OSes. The {{% param "product_name" %}} `system()` source automatically uses this new source on darwin platforms if the `darwinosl` plugin is available. This plugin is available only on macOS 10.15 Catalina and above, the first version that has the OSLog API.

Note that the persistent OSLog store usually keeps about 7 days of logs on disk.

The `darwin-oslog()` source has the following options:

### filter-predicate()

<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>Type:</td>
<td>string</td>
</tr>
<tr>
<td>Default:</td>
<td><code>(eventType == 'logEvent' || eventType == 'lossEvent' || eventType == 'stateEvent' || eventType == 'userActionEvent') && (logType != 'debug')</code></td>
</tr>
</tbody>
</table>

*Description:* String for [native macOS log message filtering using predicates](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pSyntax.html). For example, the following predicate selects AirDrop logs: `subsystem=="com.apple.sharing" and category=="AirDrop"`

### do-not-use-bookmark()

|          |                            |
| -------- | -------------------------- |
| Type:    | boolean |
| Default: | `no` |

*Description:* By default, {{% param "product_name" %}} continues to read the logs from the last remembered position after a restart. If this option is set to `yes`, it will always start reading from the end or beginning of the available log list (depending on the setting of the [`go-reverse()`](#go-reverse) option).

### fetch-delay()

|          |                            |
| -------- | -------------------------- |
| Type:    | integer |
| Default: | `10000` |

*Description:* Controls the time {{% param "product_name" %}} waits between reading and sending log messages. This is a fraction of a second, where `wait_time = 1 second / n`, so `n=1` means that only about 1 log is sent in each second, and `n=1000000` means only 1 microsecond is the delay between read/write attempts. The maximal value of this parameter is `1000000`. Note that increasing the value of this parameter (thus lowering delay time) can increase log feed performance, but at the same time could increase system load.

### fetch-retry-delay()

|          |                            |
| -------- | -------------------------- |
| Type:    | integer |
| Default: | `1` |

*Description:* Controls how many seconds {{% param "product_name" %}} waits before trying to check for new logs if there were no more logs to read the last time.

### go-reverse()

|          |                            |
| -------- | -------------------------- |
| Type:    | boolean |
| Default: | `no` |

*Description:* Set it to `yes` to process the logs in a reverse order (from latest to oldest).

### log-fetch-limit()

|          |        |
| -------- | ------ |
| Type:    | integer |
| Default: | `0` (no limit) |

{{% alert title="Warning" color="warning" %}}
This option is currently disabled because of an [OSLog API bug](https://openradar.appspot.com/radar?id=5597032077066240).
{{% /alert %}}

{{% include-headless "chunk/option-description-source-log-fetch-limit.md" %}}

### max-bookmark-distance()

|          |        |
| -------- | ------ |
| Type:    | integer |
| Default: | `0` (no limit) [seconds] |

*Description:* The maximum distance in seconds that a bookmark can point backwards. That is, if {{% param "product_name" %}} was stopped for 10 minutes and `max-bookmark-distance()` is set to `60`, then {{% param "product_name" %}} will start reading the logs from 60 seconds before the startup, losing 9 minutes of logs.

### read-old-records()

|          |                            |
| -------- | -------------------------- |
| Type:    | boolean |
| Default: | `no` |

*Description:* If set to `yes`, {{% param "product_name" %}} starts reading logs from the oldest available log when it's first started on a system, or if there are no bookmarks for some reason

## darwin-oslog-stream()

This source is a wrapper around the OS command line `log stream` command that provides a live log stream feed. Unlike the `darwin-oslog()` source, the live stream can contain non-persistent log events as well. This might result in a large number of log events every second.

This source has only one option.

### params()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | `--type log --type trace --level info --level debug` |

*Description:* A string that can contain all the possible params the macOS `log` tool can accept. The source uses the "--style" internally (defaults to `ndjson`), so use templates or rewrite rules to format the final output. Use the `def-osl-stream-params` string to reference the default values when extending them with your own.

For a full reference, see the output of the `log --help stream` and `man log` commands.
