---
title: "PostgreSQL csvlog"
weight: 1650
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{% param "product_name" %}} version 4.5.0 and later.

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

The `postgresql-csvlog-parser()` extracts the information from this message into a set of name-value pairs. By default, the name-value pairs have the `.pgsql` prefix.

```sh
@version: current

log {
    source { file("/var/log/pgsql.log" follow-freq(1) flags(no-parse)); };
    parser { postgresql-csvlog-parser() };
    destination { ... };
};

```

The `postgresql-csvlog-parser()` driver is actually a reusable configuration snippet configured to parse log messages using the `csv-parser()`. For details on using or writing such configuration snippets, see {{% xref "/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/pgsql/pgsql.conf).

{{% include-headless "chunk/option-parser-on-type-error.md" %}}

{{% include-headless "chunk/option-parser-prefix.md" %}}
