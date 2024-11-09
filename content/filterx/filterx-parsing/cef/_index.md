---
title: "CEF"
weight: 100
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

Available in {{< product >}} 4.9 and later.

The `parse_cef` FilterX function parses messages formatted in the [Common Event Format (CEF)](https://www.microfocus.com/documentation/arcsight/arcsight-smartconnectors-8.3/cef-implementation-standard/Content/CEF/Chapter%201%20What%20is%20CEF.htm).

## Declaration

Usage: `parse_cef(<input-string>, value_separator="=", pair_separator="|")`

The first argument is the input message. Optionally, you can set the `pair_separator` and `value_separator` arguments to override their default values.

The `value_separator` must be a single-character string. The `pair_separator` can be a regular string.

## Example

The following is a CEF-formatted message including mandatory and custom (extension) fields:

```shell
CEF:0|KasperskyLab|SecurityCenter|13.2.0.1511|KLPRCI_TaskState|Completed successfully|1|foo=foo bar=bar baz=test
```

The following FilterX expression parses it and converts it into JSON format:

```shell
filterx {
    ${PARSED_MESSAGE} = json(parse_cef(${MESSAGE}));
};
```

The content of the JSON object for this message will be:

```json
{
"version":"0",
"device_vendor":"KasperskyLab",
"device_product":"SecurityCenter",
"device_version":"13.2.0.1511",
"device_event_class_id":"KLPRCI_TaskState",
"name":"Completed successfully",
"agent_severity":"1",
"extensions": {
    "foo":"foo=bar",
    "bar":"bar=baz",
    "baz":"test"
    }
}
```
