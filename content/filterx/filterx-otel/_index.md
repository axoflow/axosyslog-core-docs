---
title: "Handling OpenTelemetry log records"
linkTitle: "OpenTelemetry logs"
weight:  500
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

{{< product >}} allows you to process, manipulate, and create OpenTelemetry log messages using filterx. For example, you can:

- route your OpenTelemetry messages to different destinations based on the content of the messages,
- change fields in the message (for examples, add missing information, or delete unnecessary data), or
- convert incoming syslog messages to OpenTelemetry log messages.

<!-- FIXME example for routing message based on something like resource podname -->

### Modify incoming OTEL messages

To modify messages received via the OpenTelemetry protocol (OTLP), such as the ones received using the [`opentelemetry()` source]({{< relref "/chapter-sources/opentelemetry/_index.md" >}}), you have to configure the following:

<!-- FIXME what's the difference when we receive messages via syslog-ng-otlp? -->

1. Map the OpenTelemetry input message to OTEL objects in filterx, so {{< product >}} handles their type properly. Add the following to your filterx block:

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

1. After the mapping, you can access the elements of the different data structures as [filterx dictionaries]({{< relref "/filterx/_index.md#json" >}}), for example, the body of the message (`log.body`), its attributes (`log.attributes`), or the attributes of the resource (`resource.attributes`).

    The following example does two things:

    - It checks if the hostname resource attribute exists, and adds the sender IP address if it doesn't.

        ```shell
        if not isset(resource.attributes["host.name"]) {
            resource.attributes["host.name"] = ${SOURCEIP};
        };
        ```

    - It checks if the [Timestamp field](https://opentelemetry.io/docs/specs/otel/logs/data-model/#field-timestamp) (which is optional) is set in the log object, and sets it to the date {{< product >}} received the message if it doesn't.

        ```shell
        if not isset(log["Timestamp"]) {
            log["Timestamp"] = ${R_UNIXTIME};
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
            if not isset(resource.attributes["host.name"]) {
                resource.attributes["host.name"] = ${SOURCEIP};
            };
            if log.observed_time_unix_nano == 0 {
                log.observed_time_unix_nano = ${R_UNIXTIME};
            };
        };
        destination {
            # your opentelemetry destination settings
        };
    };
    ```

<!-- FIXME 

    logs.proto file-ban van leirva milyen fieldek vannak az otel uzenetben
    mindre lehet hivatkozni, ertekuket bizgetni, stb
        resource.proto > ebben nem sok van
        common.proto (a scope-hoz tartozo proto) https://github.com/open-telemetry/opentelemetry-proto/blob/main/opentelemetry/proto/common/v1/common.proto

    anyvalue lehet sokminden (kb barmi)

    keyvalue mezokben listakat es dicteket is lehet belepakolno
    -->

1. Update the message with the modified objects so your changes are included in the message sent to the destination:

    ```shell
    log {
        source {opentelemetry()};
        filterx {
            # Input mapping
            declare log = otel_logrecord(${.otel_raw.log});
            declare resource = otel_resource(${.otel_raw.resource});
            declare scope = otel_scope(${.otel_raw.scope});

            # Modifying the message
            if not isset(resource.attributes["host.name"]) {
                resource.attributes["host.name"] = ${SOURCEIP};
            };
            if not isset(log["Timestamp"]) {
                log["Timestamp"] = ${R_UNIXTIME};
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

### syslog to OTEL

To convert incoming syslog messages to OpenTelemetry log messages and send them to an OpenTelemetry receiver, you have to perform the following high-level steps in your configuration file:

- Receive the incoming syslog messages.
- Initialize the data structures required for OpenTelemetry log messages in a [filterx block]({{< relref "/filterx/_index.md" >}}).
- Map the key-value pairs and macros of the syslog message to appropriate OpenTelemetry log record fields. There is no universal mapping available, it depends on the source message and the receiver as well. For some samples, see the [Example Mappings](https://opentelemetry.io/docs/specs/otel/logs/data-model-appendix) in the OpenTelemetry documentation, or check the recommendations and requirements of your receiver.

    <!-- FIXME can we show a minimally viable syslog mapping for RFC3164?
        For example, set somewhere the hostname, timestamp, programname, body
     -->

    <!-- 
    common usecase:
    log.body = parse_kv(${MESSAGE})
    That way the receiver gets the data in a structured manner (can we show the difference on some receiver?)
    -->

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
