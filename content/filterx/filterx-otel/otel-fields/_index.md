---
title: "OpenTelemetry log record fields in FilterX"
linkTitle: "Log record fields"
description: "Fields of the otel_logrecord, otel_resource, and otel_scope FilterX objects, with their types and severity values."
weight: 100
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

This page lists the fields of the OpenTelemetry objects you can use in FilterX. For examples of routing, modifying, and creating OpenTelemetry log records, see {{% xref "/filterx/filterx-otel/_index.md" %}}.

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

```protobuf
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

```text
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