---
title: metrics-probe
weight: 1400
---

Available in {{% param "product_name" %}} version 4.1.1 and newer.

`metrics-probe()` is a special parser that counts the messages that pass through the log path, and creates labeled stats counters based on the fields of the passing messages.

> Note: This feature is experimental, the counters created by `metrics-probe()` (names, labels, and so on) may change in the next 2-3 releases.

You can configure the name of the keys and the labels. Note that the keys are automatically prefixes with the `syslogng_` string. You can use templates in the values of the labels.

The minimal configuration creates counters with the key `syslogng_classified_events_total` and labels `app`, `host`, `program` and `source`. For example:

```shell
parser p_metrics_probe {
  metrics-probe();

  # Same as:
  #
  # metrics-probe(
  #   key("classified_events_total")
  #   labels(
  #     "app" => "${APP}"
  #     "host" => "${HOST}"
  #     "program" => "${PROGRAM}"
  #     "source" => "${SOURCE}"
  #   )
  # );
};
```

This configuration results in counters like:

```shell
syslogng_classified_events_total{app="example-app", host="localhost", program="baz", source="s_local_1"} 3
syslogng_classified_events_total{app="example-app", host="localhost", program="bar", source="s_local_1"} 1
syslogng_classified_events_total{app="example-app", host="localhost", program="foo", source="s_local_1"} 1
```

You can query the metrics by running the following command: 

```shell
syslog-ng-ctl stats prometheus
```

For example, the following `metrics-probe()` parser creates a counter called `syslogng_custom_key` that counts messages that have their `custom_label_name_1` field set to `foobar`, and for these messages it creates separate counters based on the value of the `custom_label_name_2` field.

```shell
parser p_metrics_probe {
  metrics-probe(
    key("custom_key")  # adds "syslogng_" prefix => "syslogng_custom_key"
    labels(
      "custom_label_name_1" => "foobar"
      "custom_label_name_2" => "${.custom.field}"
    )
  );
};
```

This configuration results in counters like:

```shell
syslogng_custom_key{custom_label_name_1="foobar", custom_label_name_2="bar"} 1
syslogng_custom_key{custom_label_name_1="foobar", custom_label_name_2="foo"} 1
syslogng_custom_key{custom_label_name_1="foobar", custom_label_name_2="baz"} 3
```

## Options

## increment() {#metrics-probe-option-increment}

|          |         |
| -------- | ------- |
| Type:    | integer or template |
| Default: | 1 |

Available in {{% param "product_name" %}} version 4.2 and newer.

Sets a template, which resolves to a number that defines the increment of the counter. The following example defines a counter called `syslogng_input_event_bytes_total`, and increases its value with the size of the incoming message (in bytes).

```shell
metrics-probe(
    key("input_event_bytes_total")
    labels(
        "cluster" => "`cluster-name`"
        "driver" => "kubernetes"
        "id" => "${SOURCE}"
        "namespace" => "${`prefix`namespace_name}"
        "pod" => "${`prefix`pod_name}"
    )
    increment("${RAWMSG_SIZE}")
);
```

## key() {#metrics-probe-option-key}

|          |         |
| -------- | ------- |
| Type:    | string |
| Default: | `classified_events_total` |

The name of the counter to create. Note that the value of this option is always prefixed with `syslogng_`, so for example `key("my-custom-key")` becomes `syslogng_my-custom-key`.

## labels() {#metrics-probe-option-labels}

|          |         |
| -------- | ------- |
| Type:    |  |
| Default: | See the description |

The labels used to create separate counters, based on the fields of the messages processed by `metrics-probe()`. Use the following format:

```shell
labels(
    "name-of-the-label-in-the-output" => "field-of-the-message"
)
```

Default value:

```shell
labels(
    "app" => "${APP}"
    "host" => "${HOST}"
    "program" => "${PROGRAM}"
    "source" => "${SOURCE}"
)
```

This results in counters like:

```shell
syslogng_classified_events_total{app="example-app", host="localhost", program="baz", source="s_local_1"} 3
```

## level() {#metrics-probe-option-level}

|          |         |
| -------- | ------- |
| Type:    | integer (0-3) |
| Default: | 0 |

Available in {{% param "product_name" %}} version 4.2 and newer.

Sets the stats level of the generated metrics.

> Note: Drivers configured with `internal(yes)` register their metrics on level 3. That way if you are creating an SCL, you can disable the built-in metrics of the driver, and create metrics manually using `metrics-probe()`.
