---
title: "Metrics"
weight: 1000
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

Available in {{< product >}} 4.9 and later.

You can use the `update_metric` function to count the processed messages, and create labeled metric counters based on the fields of the processed messages, similarly to the [`metrics-probe()` parser]({{< relref "/chapter-parsers/metrics-probe/_index.md" >}}).

You can configure the name of the counter to update and the labels to add. The name of the counter is an unnamed, mandatory option. Note that the name is automatically prefixed with the `syslogng_` string. For example:

```shell
update_metric(
    "my_counter_name",
    labels={
        "host": ${HOST},
        "app": ${PROGRAM},
        "id": ${SOURCE}
    }
);
```

This results in counters like:

```shell
syslogng_my_counter_name{app="example-app", host="localhost", source="s_local_1"} 3
```

## Options

### increment

|          |         |
| -------- | ------- |
| Type:    | integer or variable |
| Default: | 1 |

An integer, or an expression that resolves to an integer that defines the increment of the counter. The following example defines a counter called `syslogng_input_event_bytes_total`, and increases its value with the size of the incoming message (in bytes).

```shell
update_metric(
    "input_event_bytes_total",
    labels={
        "host": ${HOST},
        "app": ${PROGRAM},
        "id": ${SOURCE}
    },
    increment=${RAWMSG_SIZE}
);
```

### labels

|          |         |
| -------- | ------- |
| Type:    | dict |
| Default: | `{}` |

The labels used to create separate counters, based on the fields of the messages processed by `update_metric`. Use the following format:

```shell
labels(
    {
      "name-of-label1": "value-of-the-label1",
      ... ,
      "name-of-labelx": "value-of-the-labelx"
    }
)
```

### level

|          |         |
| -------- | ------- |
| Type:    | integer (0-3) |
| Default: | 0 |

Sets the stats level of the generated metrics.

{{% alert title="Note" color="info" %}}
Drivers configured with `internal(yes)` register their metrics on level 3. That way if you are creating an SCL, you can disable the built-in metrics of the driver, and create metrics manually using `update_metric`.
{{% /alert %}}
