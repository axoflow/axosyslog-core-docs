---
title: "Parse JSON with FilterX"
linkTitle: "JSON"
description: "Parse JSON strings into FilterX objects with the parse_json() function, then access their fields."
weight: 400
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

To parse a JSON string, use the [`parse_json`]({{< relref "/filterx/function-reference.md#parse-json" >}}) function. It returns a value of the matching FilterX type: a JSON object becomes a dict, an array becomes a list. To convert an object back to a JSON string, use the [`format_json`]({{< relref "/filterx/filterx-format-data/format-json.md" >}}) function.

If the string isn't valid JSON, the function returns an error, and the FilterX block evaluates to false.

For example, if the message contains a JSON object like `{"user":"alice","action":"login","src":{"ip":"192.0.2.2"}}`, the following FilterX block parses it and stores two of its fields in name-value pairs:

```shell
filterx {
    event = parse_json(${MESSAGE});
    ${USER} = event.user;
    ${SRC_IP} = event.src.ip;
};
```

After the block, `${USER}` is `alice`, and `${SRC_IP}` is `192.0.2.2`. The `event` variable is a local variable, so it isn't sent to the destination. For details, see [FilterX variables in destinations]({{< relref "/filterx/filterx-language/_index.md#variables-in-destinations" >}}).

To access the fields of the parsed object, see [Complex types: lists, dicts, and JSON]({{< relref "/filterx/filterx-language/_index.md#json" >}}).

{{% alert title="Note" color="info" %}}
To replace an existing [`json-parser()`]({{< relref "/chapter-parsers/json-parser/_index.md" >}}) with FilterX, see {{% xref "/filterx/update-filters.md" %}}.
{{% /alert %}}
