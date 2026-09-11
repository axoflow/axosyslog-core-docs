---
title: "PostgreSQL csvlog"
weight: 1650
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

This parser processes messages in the [PostgreSQL csvlog](https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-CSVLOG) format.
The following sample message is a multi-line message with embedded NL characters. This is a single, multi-line log entry that starts with the timestamp.

```sh
2023-08-08 12:05:52.805 UTC,,,22113,,64d22fa0.5661,1,,2023-08-08 12:05:52 UTC,23/74060,0,LOG,00000,"automatic vacuum of table ""tablename"": index scans: 0
pages: 0 removed, 4 remain, 0 skipped due to pins, 0 skipped frozen
tuples: 114 removed, 268 remain, 0 are dead but not yet removable, oldest xmin: 149738000
buffer usage: 97 hits, 0 misses, 6 dirtied
avg read rate: 0.000 MB/s, avg write rate: 114.609 MB/s
system usage: CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s",,,,,,,,,""
```

## Prerequisites

- {{% param "product.name" %}} version 4.5.0 or later.
- {{< include-headless "chunk/prereq-package-scl.md" >}}

    {{< include-headless "chunk/scl-config-snippet.md" "postgresql-csvlog-parser()" "scl/pgsql/pgsql.conf" >}}

## Configuration

The `postgresql-csvlog-parser()` extracts the information from this message into a set of name-value pairs. By default, the name-value pairs have the `.pgsql` prefix.

```sh
@version: current

log {
    source { file("/var/log/pgsql.log" follow-freq(1) flags(no-parse)); };
    parser { postgresql-csvlog-parser() };
    destination { ... };
};
```

FilterX has no PostgreSQL parser. Since this driver builds on the CSV parser, the related [`parse_csv()`]({{< relref "/filterx/function-reference.md#parse-csv" >}}) function is the closest building block.

## Options

{{< include-headless "chunk/option-source-internal.md" >}}

{{% include-headless "chunk/option-parser-on-type-error.md" %}}

{{% include-headless "chunk/option-parser-prefix.md" %}}
