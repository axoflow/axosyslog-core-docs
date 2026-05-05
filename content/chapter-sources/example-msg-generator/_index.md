---
title: Generate synthetic log messages for testing
linktitle: example-msg-generator()
weight: 350
driver: "example-msg-generator()"
short_description: "Generate synthetic log messages for testing pipelines, parsers, FilterX expressions, and destinations"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The `example-msg-generator()` source emits synthetic log messages on a fixed interval. Each generated message has the body set by the `template()` option and any extra name-value pairs set through `values()`. You can use it for testing log paths, parsers, FilterX expressions, and destinations without depending on an external log producer.

Because the driver generates messages locally, it doesn't read from a network socket, file, or other external transport.

## Example: Generate one test message and write it to a file

```shell
source s_genmsg {
    example-msg-generator(
        num(1)
        template("dummy message")
        values("bar" => "bar_value")
    );
};

destination d_file {
    file("/tmp/genmsg.log");
};

log {
    source(s_genmsg);
    destination(d_file);
};
```

## Example: Drive a FilterX test pipeline {#filterx-example}

The `example-msg-generator()` source is widely used in the {{% param "product.abbrev" %}} test suite to drive [FilterX]({{< relref "/filterx/_index.md" >}}) expressions with deterministic input.

```shell
source genmsg {
    example-msg-generator(
        num(1)
        template("{msg}")
        values(
            "values.str"      => string("string"),
            "values.bool"     => boolean(true),
            "values.int"      => int(5),
            "values.double"   => double(32.5),
            "values.datetime" => datetime("1701350398.123000+01:00"),
            "values.list"     => list("foo,bar,baz"),
            "values.null"     => null(""),
            "values.bytes"    => bytes("binary whatever"),
        )
    );
};
```

Each generated message receives the listed name-value pairs (with their typed values), so a downstream FilterX expression can read them as if they had been parsed from a real log message.

## Driver-specific options

The following options control how the driver generates messages.

### freq()

|          |                                  |
| -------- | -------------------------------- |
| Type:    | float or nonnegative integer (seconds) |
| Default: | 1                                |

*Description:* The interval between two generated messages, in seconds. Fractional values are honored — for example, `freq(0.5)` emits a message every 500 ms.

### num()

|          |                              |
| -------- | ---------------------------- |
| Type:    | nonnegative integer          |
| Default: | 0 (unlimited)                |

*Description:* The total number of messages to emit. After generating `num()` messages, the source stops. `0` means the source generates messages indefinitely.

### template()

|          |                  |
| -------- | ---------------- |
| Type:    | template content |
| Default: | empty            |

*Description:* The template that produces the body (`${MESSAGE}`) of each generated message. Any template function or macro is allowed. For example:

```shell
example-msg-generator(template("synthetic message $(format-json --scope=core)"));
```

### values()

|          |                                    |
| -------- | ---------------------------------- |
| Type:    | list of `<name> => <template>` pairs |
| Default: | empty                              |

*Description:* A list of additional name-value pairs to set on every generated message. Each entry uses the `name => template` arrow syntax. The template can produce typed values when used together with FilterX type constructors such as `int()`, `boolean()`, `datetime()`, and `bytes()` (see the [FilterX example](#filterx-example) above).

```shell
example-msg-generator(
    num(1)
    template("dummy")
    values(
        "host"   => "test-host",
        ".sdata.foo.bar" => "example"
    )
);
```

## Generic source options that affect output

The following generic options are honored by `example-msg-generator()` and meaningfully alter the generated messages:

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-source-host-override.md" %}}

{{% include-headless "chunk/option-source-internal.md" %}}

{{< include-headless "chunk/option-source-keep-timestamp.md" >}}

{{% include-headless "chunk/option-source-log-iw-size.md" %}}

{{< include-headless "chunk/option-source-log-prefix.md" >}}

{{% include-headless "chunk/option-persist-name.md" %}}

{{% include-headless "chunk/option-source-program-override.md" %}}

{{% include-headless "chunk/option-source-tags.md" %}}

{{% include-headless "chunk/option-source-time-zone.md" %}}

<!-- cfg-helper exposes the following generic source options for
     example-msg-generator(), but they have no useful effect because the
     source generates messages locally — there's no sender host to resolve,
     no DNS lookup happening, and no persistent input state. Markers kept
     so the next docs-vs-cfg-helper diff doesn't flag them as missing.

  - chain-hostnames(), long-hostnames(), keep-hostname(), normalize-hostnames(),
    use-dns(), use-fqdn(), dns-cache(): the source has no incoming hostname
    to resolve or rewrite. Use host-override() instead to set the HOST field.
  - read-old-records(): the source generates messages on the fly; it has
    no persistent file or journal to replay.
  - use-syslogng-pid(): no upstream sender PID to attach.
-->
