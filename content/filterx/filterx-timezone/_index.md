---
title: "Handle and fix timezones and timestamps"
linkTitle: "Timezones and timestamps"
weight:  3000
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< product >}} FilterX has a few functions set or fix the timestamp and timezone of the messages.

## fix_timezone {#fix-timezone}

Available in {{< product >}} 4.24 and later. Similar to the [`fix-time-zone()` rewrite operation]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-timezone/_index.md#rewrite-timezone-fix" >}}).

Corrects the timezone of a message if it was parsed incorrectly for some reason, or if the client didn't include any timezone information in the message. For example:

```shell
datetime = strptime("2000-01-01T00:00:00 +0200", "%Y-%m-%dT%H:%M:%S %z");
timezone = "CET";
fixed_datetime = fix_timezone(datetime, timezone);
${MSG} = strftime("%Y-%m-%dT%H:%M:%S %z", fixed_datetime);
```

## get_timezone_source {#get-timezone-source}

Available in {{< product >}} 4.24 and later.

Shows where the timezone information of the message originates from.

For example:

```shell
if (get_timezone_source(timestamp) === "assumed") {
  timestamp = fix_timezone(timestamp, "CET");
};
```

Possible values:

- `assumed`: The timestamp didn't contain timezone info, so {{< product >}} used the default (local) timezone
- `fixed`: The timezone was set using the `fix_timezone` or `set_timezone` functions
- `guessed`: The timezone info was set using `guess_timezone` function
- `parsed`: The timezone was parsed from the timestamp

## guess_timezone {#guess-timezone}

Available in {{< product >}} 4.24 and later. Similar to the [`guess-time-zone()` rewrite operation]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-timezone/_index.md#rewrite-timezone-guess" >}}).

Attempts to set the timezone of the message automatically, using heuristics on the timestamps. Normally {{< product >}} performs this operation automatically when it parses the incoming message. Use this function if you can't parse the incoming message for some reason, but you want to set the timezone automatically, for example, after you have preprocessed the message. Using this function is identical to using the `flags(guess-timezone)` flag in the source.

For example:

```shell
datetime = strptime("2000-01-01T00:00:00 +0200", "%Y-%m-%dT%H:%M:%S %z");
guessed_datetime = guess_timezone(datetime);
```

## set_timezone {#set-timezone}

Available in {{< product >}} 4.24 and later. Similar to the [`set-time-zone()` rewrite operation]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-timezone/_index.md#rewrite-timezone-set" >}}).

Sets the timezone of the message to a specific value, or converts an existing timezone to a different one. This operation is identical to setting the [`time-zone()` option]({{< relref "/chapter-global-options/reference-options/_index.md#time-zone" >}}) in the destination or as a global option, but can be applied selectively to the messages using conditions.

For example:

```shell
datetime = strptime("2000-01-01T00:00:00 +0200", "%Y-%m-%dT%H:%M:%S %z");
timezone = "CET";
set_datetime = set_timezone(datetime, timezone);
${MSG} = strftime("%Y-%m-%dT%H:%M:%S %z", set_datetime);
```
