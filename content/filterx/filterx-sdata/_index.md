---
title: "Handle SDATA in RFC5424 log records"
linkTitle: "SDATA in syslog"
weight:  900
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->



Available in {{< product >}} 4.9 and later.

{{< product >}} FilterX has a few functions to handle the [structured data (SDATA) part of RFC5424-formatted log messages]({{< relref "/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/_index.md#the-structured-data-message-part" >}}). These functions allow you to filter messages based on their SDATA fields.

<!-- FIXME tips/examples for modifying SDATA fields? -->

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
