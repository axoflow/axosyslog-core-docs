---
title: "Handle SDATA in RFC5424 log records"
linkTitle: "SDATA in syslog"
description: "Read, filter, and format RFC5424 structured data with the get_sdata(), has_sdata(), is_sdata_from_enterprise(), and format_sdata() FilterX functions."
weight: 1300
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->



The `get_sdata()`, `has_sdata()`, and `is_sdata_from_enterprise()` functions are available in {{< product >}} 4.9 and later.

{{< product >}} FilterX has a few functions to handle the [structured data (SDATA) part of RFC5424-formatted log messages]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/_index.md#the-structured-data-message-part" >}}). These functions allow you to filter messages based on their SDATA fields.

<!-- FIXME tips/examples for modifying SDATA fields? -->

## format_sdata() {#format-sdata}

Available in {{< product >}} 4.30 and later.

Formats a dictionary as the structured data (SDATA) part of an RFC5424 message. The keys of the dictionary are the SD-IDs, and their values are dictionaries of the parameters. {{< product >}} escapes the names and the values the same way as in the `${SDATA}` macro. For example:

```shell
filterx {
  sdata = format_sdata({"meta@32473": {"sequenceId": 42, "language": "en"}, "empty@32473": {}});
};
```

The value of `sdata` is:

```shell
[meta@32473 sequenceId="42" language="en"][empty@32473]
```

- An empty dictionary becomes `-`.
- {{< product >}} converts the values of the parameters to strings, for example, `42` becomes `"42"`.
- If the argument or the value of an SD-ID isn't a dictionary, `format_sdata()` returns an error.

To add the structured data to an RFC5424 message, use the `sdata` argument of the [`format_syslog_5424()` function]({{< relref "/filterx/filterx-format-data/format-rfc5424.md#sdata" >}}).

## get_sdata()

Extracts the SDATA part of the message into a two-level dictionary, for example:

```json
{"Originator@6876": {"sub": "Vimsvc.ha-eventmgr", "opID": "esxui-13c6-6b16"}}
```

```shell
filterx {
  sdata_json = get_sdata();
};
```

## has_sdata()

Returns `true` if the SDATA field of the current message is not empty:

```shell
filterx {
  has_sdata();
};
```

## is_sdata_from_enterprise

Filter messages based on enterprise ID in the SDATA field. For example:

```shell
filterx {
  is_sdata_from_enterprise("6876");
};
```
