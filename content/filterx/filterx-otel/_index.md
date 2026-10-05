---
title: "Handle OpenTelemetry log records"
linkTitle: "OpenTelemetry logs"
description: "Route, modify, and create OpenTelemetry log records in FilterX, convert syslog messages to OTEL, and reference the otel_logrecord fields."
weight: 1400
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->



{{< product >}} allows you to process, manipulate, and create OpenTelemetry log messages using FilterX. For example, you can:

- route your OpenTelemetry messages to different destinations based on the content of the messages,
- change fields in the message (for example, add missing information, or delete unnecessary data), or
- convert incoming syslog messages to OpenTelemetry log messages.

The examples on this page map the incoming data to OTEL objects using the `${.otel_raw.*}` name-value pairs. This is what the [`opentelemetry()` source]({{< relref "/chapter-sources/opentelemetry/_index.md" >}}) creates by default, that is, in [`mode(logmessage)`]({{< relref "/chapter-sources/opentelemetry/_index.md#mode" >}}).

In {{< product >}} 4.28 and later, you can set [`mode(filterx-dict)`]({{< relref "/chapter-sources/opentelemetry/_index.md#mode" >}}) in the source instead. In this case, the source directly creates the declared `log`, `resource`, and `scope` FilterX variables as plain dictionaries, so you can omit the input mapping step. Note that these variables are dictionaries, not OTEL objects, so the functions and the typed field handling described in this chapter don't apply to them.

## Prerequisites

{{< include-headless "chunk/prereq-package.md" "axosyslog-mod-grpc" "axosyslog-grpc" >}}

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

    For details on the common keys in log records, see the [`otel_logrecord reference`]({{< relref "/filterx/filterx-otel/otel-fields/_index.md#otel-logrecord-reference" >}}).

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

1. After the mapping, you can access the elements of the different data structures as [FilterX dictionaries]({{< relref "/filterx/filterx-language/_index.md#json" >}}), for example, the body of the message (`log.body`), its attributes (`log.attributes`), or the attributes of the resource (`resource.attributes`).

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

    For details on mapping values, see the [`otel_logrecord reference`]({{< relref "/filterx/filterx-otel/otel-fields/_index.md#otel-logrecord-reference" >}}).

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
1. Map the key-value pairs and macros of the syslog message to appropriate OpenTelemetry log record fields. There is no universal mapping scheme available, it depends on the source message and the receiver as well. For some examples, see the [Example Mappings](https://opentelemetry.io/docs/specs/otel/logs/data-model-appendix) page in the OpenTelemetry documentation, or check the recommendations and requirements of your receiver. For details on the fields that are available in the {{< product >}} OTEL data structures, see the [`otel_logrecord reference`]({{< relref "/filterx/filterx-otel/otel-fields/_index.md#otel-logrecord-reference" >}}).

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

## Log record fields

For the fields of the `otel_logrecord`, `otel_resource`, and `otel_scope` objects, see {{% xref "/filterx/filterx-otel/otel-fields/_index.md" %}}.
