---
title: "LEEF"
weight: 1100
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

Available in {{< product >}} 4.9 and later.

The `parse_leef` FilterX function parses messages formatted in the [Log Event Extended Format (LEEF)](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.ibm.com/docs/en/dsm%3Ftopic%3Doverview-leef-event-components&ved=2ahUKEwj87cLOjs-JAxUjgf0HHfxyM6AQFnoECBkQAQ&usg=AOvVaw1-YjjgdcnHjZLcJtzB3t6X).

Both LEEF versions (1.0 and 2.0) are supported.

## Declaration

Usage: `parse_leef(<input-string>, value_separator="=", pair_separator="|")`

The first argument is the input message. Optionally, you can set the `pair_separator` and `value_separator` arguments to override their default values.

The `value_separator` must be a single-character string. The `pair_separator` can be a regular string.

## Example

The following is a LEEF-formatted message including mandatory and custom (extension) fields:

```shell
LEEF:1.0|Microsoft|MSExchange|4.0 SP1|15345|src=192.0.2.0 dst=172.50.123.1 sev=5cat=anomaly srcPort=81 dstPort=21 usrName=john.smith
```

The following FilterX expression parses it and converts it into JSON format:

```shell
filterx {
    ${PARSED_MESSAGE} = json(parse_leef(${MESSAGE}));
};
```

The content of the JSON object for this message will be:

```json
{
"version":"1.0",
"vendor":"Microsoft",
"product_name":"MSExchange",
"product_version":"4.0 SP1",
"event_id":"15345",
"extensions": {
    "src":"192.0.2.0",
    "dst":"172.50.123.1",
    "sev":"5cat=anomaly",
    "srcPort":"81",
    "dstPort":"21",
    "usrName":"john.smith"
    }
}
```
