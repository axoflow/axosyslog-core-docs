---
title: "Troubleshoot FilterX"
linkTitle: "Troubleshooting"
description: "Fix common FilterX problems, like dropped messages and missing fields, and track failing statements with the failure_info functions."
weight: 2200
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## Common problems {#common-problems}

### Messages are dropped unexpectedly {#messages-dropped}

{{< product >}} drops the message from the log path if any statement of the FilterX block is falsy, or results in an error. For example, referencing a field or variable that doesn't exist is an error. For details, see [Truthy and falsy values]({{< relref "/filterx/filterx-language/_index.md#truthy-falsy" >}}).

To handle fields that exist only in some messages:

- Set a default value with the [null coalescing operator (`??`)]({{< relref "/filterx/operator-reference.md#null-coalescing-operator" >}}).
- Put the statements that use the field into a [conditional statement]({{< relref "/filterx/filterx-conditional/_index.md" >}}).

To find out which statement failed, see [Track failures](#track-failures).

### Fields are missing from the output {#missing-from-output}

Only macros and name-value pairs (names starting with `$`) reach the destination. Local and pipeline variables don't, and template functions can't access them either. Assign the value to a name-value pair to send it. For details, see [FilterX variables in destinations]({{< relref "/filterx/filterx-language/_index.md#variables-in-destinations" >}}).

### A comparison doesn't match {#comparison-mismatch}

How FilterX compares two values depends on their types: two strings are compared as strings, and case sensitively. If one side is a number, the comparison is numeric. For details, see [String and numerical comparison]({{< relref "/filterx/filterx-comparing/_index.md#string-and-numerical-comparison" >}}).

### An IP address check is always false {#ip-check-false}

The address family of the IP address and the subnet must match. Checking an IPv4 address against an IPv6 subnet (or the other way around) is falsy, so {{< product >}} drops the message. For details, see [Check whether an IP address is in a subnet]({{< relref "/filterx/filterx-subnet/_index.md#in-subnet" >}}).

### A parser returns an error or null {#parser-fails}

If the input doesn't match the expected format, the parser function fails, and the message is dropped. For example:

- `json()` returns an error if the string isn't valid JSON. See {{% xref "/filterx/filterx-parsing/json/_index.md" %}}.
- `parse_windows_eventlog_xml()` returns false if the input isn't valid XML, or doesn't use the Windows Event Log schema. See {{% xref "/filterx/filterx-parsing/windows-eventlog/_index.md" %}}.
- `strptime()` returns null if none of the format strings match. See {{% xref "/filterx/filterx-parsing/date/_index.md" %}}.

### Changes to OpenTelemetry messages are lost {#otel-changes-lost}

If you modify messages received with the `opentelemetry()` source, you must write the modified objects back to the raw data structures, otherwise the destination sends the original message. For details, see [Modify incoming OTEL]({{< relref "/filterx/filterx-otel/_index.md#modify-otel" >}}).

## Track failures {#track-failures}

To help troubleshooting FilterX blocks, {{< product >}} includes some specific functions that allow you to track failures in FilterX code:

- `failure_info_enable()`: Collect failure information from this point downwards through all branches of the pipeline. By default, only truthy expressions are collected. To collect collect falsy evaluations as well, use `failure_info_enable(collect_falsy=true);`
- `failure_info_clear()`: Clear all failure information collected so far.
- `failure_info_meta({})`: Attach metadata to the given section of FilterX code. The metadata remains in effect until the next call, or until the end of the enclosing FilterX block, whichever comes first. For example, you can use this function to mark where you are in a decision tree:

    ```sh
    failure_info_meta({"step": "#1 step-description"});
    ```

- `failure_info()`: Return the collected failure information as a FilterX dictionary. Call this function as late as possibly, for example, in the last log path of your {{< product >}} configuration, or within a fallback path. The output looks like:

    ```json
    [
      {
        "meta": {
          "step": "Setting common fields"
        },
        "location": "/etc/syslog-ng/syslog-ng.conf:33:7",
        "line": "nonexisting.key = 13;",
        "error": "No such variable: nonexisting"
      }
    ]
    ```

The following is an example configuration that uses these functions:

```sh
destination console_output {
  stdout(template("$a\n"));
};

source input {
  channel {
    source { stdin(); network(port(4444)); };

    filterx {
      # it can be enabled for a subset of messages
      failure_info_enable(collect_falsy=true);
    };
  };
};

log {
  source(input);

  log "log-path-1" {
    filterx {
      # "log-path-1" was successful, clear accumulated errors
      failure_info_clear();
    };
  };

  log "log-path-2" {
    filterx {

      # Step #1: abc
      failure_info_meta({"step": "#1 log-path-2"});
      a = 1;
      b = 3;
      1 == 1;
      true;

      # Step #2: cba
      failure_info_meta({"step": "#2 log-path-2"});
      declare g = 33;
      nonexisting.key = g;
    };
  };

  log "log-path-3" {
    filterx {
      failure_info_meta({"step": "falsystep"});
      1 == 0;
      true;
    };
  };
};

# WARNING: use the last logpath in the config file, or a real fallback path
log "fallback" {
  source(input);

  filterx {
    $a = failure_info();
  };

  destination(console_output);
};
```

If you start {{< product >}} with this configuration, the output will look like this (because it's trying to assign a value to a non-existing variable):

```json
[
    {
    "meta": {
        "step": "Setting common fields"
    },
    "location": "/etc/syslog-ng/syslog-ng.conf:33:7",
    "line": "nonexisting.key = 13;",
    "error": "No such variable: nonexisting"
    }
]
```
