---
title: "Handle OpenTelemetry log records"
linkTitle: "OpenTelemetry logs"
weight:  900
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

{{< product >}} allows you to process, manipulate, and create OpenTelemetry log messages using FilterX. For example, you can:

- route your OpenTelemetry messages to different destinations based on the content of the messages,
- change fields in the message (for example, add missing information, or delete unnecessary data), or
- convert incoming syslog messages to OpenTelemetry log messages.

## Route OTEL messages

To route OTEL messages (such as the ones received through the [`opentelemetry()` source]({{< relref "/chapter-sources/opentelemetry/_index.md" >}})) based on their content, configure the following:

1. Map the OpenTelemetry input message to OTEL objects in FilterX, so {{< product >}} handles their type properly. Add the following to your FilterX block:

    ```shell
    log {
        source {opentelemetry()};
        filterx {
            # Input mapping
            declare log = otel_logrecord(${.otel_raw.log});
            declare resource = otel_resource(${.otel_raw.resource});
            declare scope = otel_scope(${.otel_raw.scope});
        };
        destination {
            # your opentelemetry destination settings
        };
    };
    ```

1. Add FilterX statements that select the messages you need. The following example selects messages sent by the `nginx` application, received from the host called `example-host`.

    ```shell
    log {
        source {opentelemetry()};
        filterx {
            # Input mapping
            declare log = otel_logrecord(${.otel_raw.log});
            declare resource = otel_resource(${.otel_raw.resource});
            declare scope = otel_scope(${.otel_raw.scope});

            # FilterX statements that act as filters
            resource.attributes["service.name"] == "nginx";
            resource.attributes["host.name"] == "example-host";
        };
        destination {
            # your opentelemetry destination settings
        };
    };
    ```

    For details on the common keys in log records, see the [`otel_logrecord reference`](#otel-logrecord-reference).

## Modify incoming OTEL {#modify-otel}

To modify messages received via the OpenTelemetry protocol (OTLP), such as the ones received using the [`opentelemetry()` source]({{< relref "/chapter-sources/opentelemetry/_index.md" >}}), you have to configure the following:

1. Map the OpenTelemetry input message to OTEL objects in FilterX, so {{< product >}} handles their type properly. Add the following to your FilterX block:

    ```shell
    log {
        source {opentelemetry()};
        filterx {
            # Input mapping
            declare log = otel_logrecord(${.otel_raw.log});
            declare resource = otel_resource(${.otel_raw.resource});
            declare scope = otel_scope(${.otel_raw.scope});
        };
        destination {
            # your opentelemetry destination settings
        };
    };
    ```

1. After the mapping, you can access the elements of the different data structures as [FilterX dictionaries]({{< relref "/filterx/_index.md#json" >}}), for example, the body of the message (`log.body`), its attributes (`log.attributes`), or the attributes of the resource (`resource.attributes`).

    The following example does two things:

    - It checks if the hostname resource attribute exists, and sets it to the sender IP address if it doesn't.

        ```shell
        if (not isset(resource.attributes["host.name"])) {
            resource.attributes["host.name"] = ${SOURCEIP};
        };
        ```

    - It checks whether the [Timestamp field](https://opentelemetry.io/docs/specs/otel/logs/data-model/#field-timestamp) (which is optional) is set in the log object, and sets it to the date {{< product >}} received the message if it isn't.

        ```shell
        if (log.observed_time_unix_nano == 0) {
            log.observed_time_unix_nano = ${R_UNIXTIME};
        };
        ```

    When inserted into the configuration, this will look like:

    ```shell
    log {
        source {opentelemetry()};
        filterx {
            # Input mapping
            declare log = otel_logrecord(${.otel_raw.log});
            declare resource = otel_resource(${.otel_raw.resource});
            declare scope = otel_scope(${.otel_raw.scope});

            # Modifying the message
            if (not isset(resource.attributes["host.name"])) {
                resource.attributes["host.name"] = ${SOURCEIP};
            };
            if (log.observed_time_unix_nano == 0) {
                log.observed_time_unix_nano = ${R_UNIXTIME};
            };
        };
        destination {
            # your opentelemetry destination settings
        };
    };
    ```

    For details on mapping values, see the [`otel_logrecord reference`](#otel-logrecord-reference).

1. Update the message with the modified objects so that your changes are included in the message sent to the destination:

    ```shell
    log {
        source {opentelemetry()};
        filterx {
            # Input mapping
            declare log = otel_logrecord(${.otel_raw.log});
            declare resource = otel_resource(${.otel_raw.resource});
            declare scope = otel_scope(${.otel_raw.scope});

            # Modifying the message
            if (not isset(resource.attributes["host.name"])) {
                resource.attributes["host.name"] = ${SOURCEIP};
            };
            if (log.observed_time_unix_nano == 0) {
                log.observed_time_unix_nano = ${R_UNIXTIME};
            };

            # Update output
            ${.otel_raw.log} = log;
            ${.otel_raw.resource} = resource;
            ${.otel_raw.scope} = scope;
            ${.otel_raw.type} = "log";
        };
        destination {
            # your opentelemetry destination settings
        };
    };
    ```

## syslog to OTEL

To convert incoming syslog messages to OpenTelemetry log messages and send them to an OpenTelemetry receiver, you have to perform the following high-level steps in your configuration file:

1. Receive the incoming syslog messages.
1. Initialize the data structures required for OpenTelemetry log messages in a [FilterX block]({{< relref "/filterx/_index.md" >}}).
1. Map the key-value pairs and macros of the syslog message to appropriate OpenTelemetry log record fields. There is no universal mapping scheme available, it depends on the source message and the receiver as well. For some examples, see the [Example Mappings](https://opentelemetry.io/docs/specs/otel/logs/data-model-appendix) page in the OpenTelemetry documentation, or check the recommendations and requirements of your receiver. For details on the fields that are available in the {{< product >}} OTEL data structures, see the [`otel_logrecord reference`](#otel-logrecord-reference).

    The following example includes a simple mapping for RFC3164-formatted syslog messages. Note that the body of the message is rendered as a string, not as structured data.

    ```shell
    log {
        source {
        # Configure a source to receive your syslog messages
        };
        filterx {
            # Create the empty data structures for OpenTelemetry log records
            declare log = otel_logrecord();
            declare resource = otel_resource();
            declare scope = otel_scope();

            # Set the log resource fields and map syslog values
            resource.attributes["host.name"] = ${HOST};
            resource.attributes["service.name"] = ${PROGRAM};
            log.observed_time_unix_nano = ${R_UNIXTIME};
            log.body = ${MESSAGE};
            log.severity_number = ${LEVEL_NUM};

            # Update output
            ${.otel_raw.log} = log;
            ${.otel_raw.resource} = resource;
            ${.otel_raw.scope} = scope;
            ${.otel_raw.type} = "log";
        };
        destination {
            # your opentelemetry destination settings
        };
    };
    ```
    <!-- FIXME do we need the Update output part in this case? -->

## otel_logrecord reference {#otel-logrecord-reference}

OpenTelemetry log records can have the following fields. (Based on the [official OpenTelemetry proto file](https://github.com/open-telemetry/opentelemetry-proto/blob/main/opentelemetry/proto/logs/v1/logs.proto).)

### attributes

|           |                                                  |
| --------- | ------------------------------------------------ |
| Type: | `otel_kvlist` |

Attributes that describe the event. Attribute keys MUST be unique.

### body

The body of the log record. It can be a simple string, or any number of complex nested objects, such as lists and arrays.

### flags

|           |                                                  |
| --------- | ------------------------------------------------ |
| Type: | `int` |

Flags as a bit field.

### observed_time_unix_nano

|           |                                                  |
| --------- | ------------------------------------------------ |
| Type: | `datetime` |

The time when the event was observed by the collection system, expressed as nanoseconds elapsed since the UNIX Epoch (January 1, 1970, 00:00:00 UTC).

### severity_number

|           |                                                  |
| --------- | ------------------------------------------------ |
| Type: | `int` |

The severity of the message as a numerical value of the [severity](#severity_text).

```
SEVERITY_NUMBER_UNSPECIFIED = 0;
SEVERITY_NUMBER_TRACE  = 1;
SEVERITY_NUMBER_TRACE2 = 2;
SEVERITY_NUMBER_TRACE3 = 3;
SEVERITY_NUMBER_TRACE4 = 4;
SEVERITY_NUMBER_DEBUG  = 5;
SEVERITY_NUMBER_DEBUG2 = 6;
SEVERITY_NUMBER_DEBUG3 = 7;
SEVERITY_NUMBER_DEBUG4 = 8;
SEVERITY_NUMBER_INFO   = 9;
SEVERITY_NUMBER_INFO2  = 10;
SEVERITY_NUMBER_INFO3  = 11;
SEVERITY_NUMBER_INFO4  = 12;
SEVERITY_NUMBER_WARN   = 13;
SEVERITY_NUMBER_WARN2  = 14;
SEVERITY_NUMBER_WARN3  = 15;
SEVERITY_NUMBER_WARN4  = 16;
SEVERITY_NUMBER_ERROR  = 17;
SEVERITY_NUMBER_ERROR2 = 18;
SEVERITY_NUMBER_ERROR3 = 19;
SEVERITY_NUMBER_ERROR4 = 20;
SEVERITY_NUMBER_FATAL  = 21;
SEVERITY_NUMBER_FATAL2 = 22;
SEVERITY_NUMBER_FATAL3 = 23;
SEVERITY_NUMBER_FATAL4 = 24;
```

### severity_text

|           |                                                  |
| --------- | ------------------------------------------------ |
| Type: | `string` |

The severity of the message as a string, one of:

```
"SEVERITY_NUMBER_TRACE"
"SEVERITY_NUMBER_TRACE2"
"SEVERITY_NUMBER_TRACE3"
"SEVERITY_NUMBER_TRACE4"
"SEVERITY_NUMBER_DEBUG"
"SEVERITY_NUMBER_DEBUG2"
"SEVERITY_NUMBER_DEBUG3"
"SEVERITY_NUMBER_DEBUG4"
"SEVERITY_NUMBER_INFO"
"SEVERITY_NUMBER_INFO2"
"SEVERITY_NUMBER_INFO3"
"SEVERITY_NUMBER_INFO4"
"SEVERITY_NUMBER_WARN"
"SEVERITY_NUMBER_WARN2"
"SEVERITY_NUMBER_WARN3"
"SEVERITY_NUMBER_WARN4"
"SEVERITY_NUMBER_ERROR"
"SEVERITY_NUMBER_ERROR2"
"SEVERITY_NUMBER_ERROR3"
"SEVERITY_NUMBER_ERROR4"
"SEVERITY_NUMBER_FATAL"
"SEVERITY_NUMBER_FATAL2"
"SEVERITY_NUMBER_FATAL3"
"SEVERITY_NUMBER_FATAL4"
```

### span_id

|           |                                                  |
| --------- | ------------------------------------------------ |
| Type: | `bytes` |

Unique identifier of a span within a trace, an 8-byte array.

### time_unix_nano

|           |                                                  |
| --------- | ------------------------------------------------ |
| Type: | `datetime` |

The time when the event occurred, expressed as nanoseconds elapsed since the UNIX Epoch (January 1, 1970, 00:00:00 UTC). If `0`, the timestamp is missing.

### trace_id

|           |                                                  |
| --------- | ------------------------------------------------ |
| Type: | `bytes` |

Unique identifier of a trace, a 16-byte array.

## otel_resource reference {#otel-resource-reference}

The [resource](https://opentelemetry.io/docs/concepts/resources/) describes the entity that produced the log record. It contains a set of attributes (key-value pairs) that must have unique keys. For example, it can contain the hostname and the name of the cluster.
<!-- https://github.com/open-telemetry/opentelemetry-proto/blob/main/opentelemetry/proto/resource/v1/resource.proto -->

## otel_scope reference {#otel-scope-reference}

Describes the [instrumentation scope](https://opentelemetry.io/docs/concepts/instrumentation-scope/) that sent the message. It may contain simple key-value pairs (strings or integers), but also arbitrary nested objects, such as lists and arrays. It usually contains a `name` and a `version` field.

<!-- https://github.com/open-telemetry/opentelemetry-proto/blob/main/opentelemetry/proto/common/v1/common.proto -->