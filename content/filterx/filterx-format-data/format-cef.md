---
title: Common Event Format (CEF)
description: "Format a FilterX dictionary into a Common Event Format (CEF) message with the format_cef() function."
weight: 100
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{< product >}} 4.13 and later.

Formats a dictionary into the [Common Event Format (CEF)](https://www.microfocus.com/documentation/arcsight/arcsight-smartconnectors-8.3/cef-implementation-standard/Content/CEF/Chapter%201%20What%20is%20CEF.htm).

To parse CEF messages, see {{% xref "/filterx/filterx-parsing/cef/_index.md" %}}.

Usage: `${MESSAGE} = format_cef(my_dictionary);`

For example:

```json
my_dictionary = {"version":"0","device_vendor":" KasperskyLab ","device_product":"SecurityCenter","device_version":"13.2.0.1511","device_event_class_id":"KLPRCI_TaskState","name":"Completed successfully","agent_severity":"1"};
```

Becomes:

```shell
CEF:0| KasperskyLab |SecurityCenter|13.2.0.1511|KLPRCI_TaskState|Completed successfully|1|
```

<!-- FIXME how to handle extensions -->

The following keys must be available in the dictionary, otherwise formatting fails with an error message like: `FILTERX ERROR;  ....|     format_cef(my_dictionary)', error='Failed to evaluate event formatter function:`.

`cef_version`, `device_vendor`, `device_product`, `device_version`, `device_event_class_id`, `event_name`, `agent_severity`, `extensions`
