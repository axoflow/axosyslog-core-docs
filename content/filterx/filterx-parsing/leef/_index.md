---
title: "LEEF"
weight: 1100
aliases:
- /filterx/filterx-parsing/leef/leef-parser-options/
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{< product >}} 4.9 and later.

The `parse_leef` FilterX function parses messages formatted in the [Log Event Extended Format (LEEF)](https://www.ibm.com/docs/en/SS42VS_DSM/pdf/b_Leef_format_guide.pdf) into a JSON object.

Both LEEF versions (1.0 and 2.0) are supported.

## Declaration

Usage: `parse_leef(<input-string>, value_separator="=", pair_separator="|", separate_extensions=false)`

The first argument is the input message. Optionally, you can set the `pair_separator` and `value_separator` arguments to override their default values.

The `value_separator` must be a single-character string. The `pair_separator` can be a regular string.

The parsed JSON object has the following fields:

- For LEEF v1 messages:

    - `leef_version`
    - `vendor_name`
    - `product_name`
    - `product_version`
    - `event_id`
    - `extensions`

- For LEEF v2 messages:

    - `leef_version`
    - `vendor_name`
    - `product_name`
    - `product_version`
    - `event_id`
    - `leef_delimiter`
    - `extensions`


{{% alert title="Note" color="info" %}}
The name of some fields changed in the parsed object in version 4.16 for clarity, and to avoid name collisions with fields in the extensions:

- `version` -> `leef_version`
- `vendor` -> `vendor_name`
- `delimiter` -> `leef_delimiter`
{{% /alert %}}

## Example

The following is a LEEF-formatted message including mandatory and custom (extension) fields:

```shell
LEEF:1.0|Microsoft|MSExchange|4.0 SP1|15345|src=192.0.2.0	dst=172.50.123.1	sev=5cat=anomaly	srcPort=81	dstPort=21	usrName=john.smith
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
"leef_version":"1.0",
"vendor_name":"Microsoft",
"product_name":"MSExchange",
"product_version":"4.0 SP1",
"event_id":"15345",
"src":"192.0.2.0",
"dst":"172.50.123.1",
"sev":"5cat=anomaly",
"srcPort":"81",
"dstPort":"21",
"usrName":"john.smith"
}
```

If you set `separate_extensions=true`, the extensions of the message will be grouped under the `extensions` key:

```json
{
"leef_version":"1.0",
"vendor_name":"Microsoft",
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

## Options of LEEF parsers

The `parse_leef` FilterX function has the following options.

### pair_separator

Specifies the character or string that separates the key-value pairs in the extensions. Default value: `\t` (tab).

LEEF v2 can specify the separator per message. Omitting this option uses the LEEF v2 provided separator, setting this value overrides it during parsing.

{{< include-headless "chunk/filterx-separate-extension.md" >}}

### value_separator

Specifies the character that separates the keys from the values in the extensions. Default value: `=`.
