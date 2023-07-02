---
title: "Options add-contextual-data()"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `add-contextual-data()` has the following options.


## Required options:

The following options are required: `selector()`, `database()`.



## database() {#add-contextual-data-option-database}

|          |                      |
| -------- | -------------------- |
| Type:    | <path-to-file>.csv |
| Default: |                      |

*Description:* Specifies the path to the CSV file, for example, `/opt/syslog-ng/my-csv-database.csv`. The extension of the file must be `.csv`, and can include Windows-style (CRLF) or UNIX-style (LF) linebreaks. You can use absolute path, or relative to the `syslog-ng` binary.



## default-selector()

|           |                    |
| --------- | ------------------ |
| Synopsis: | default-selector() |

*Description:* Specifies the ID of the entry (line) that is corresponds to log messages that do not have a selector that matches an entry in the database. For example, if you add name-value pairs from the database based on the hostname from the log message (`selector("${HOST}")`), then you can include a line for unknown hosts in the database, and set `default-selector()` to the ID of the line for unknown hosts. In the CSV file:

```shell
   unknown-hostname,host-role,unknown
```

In the {{% param "product.abbrev" %}} configuration file:

```shell
   add-contextual-data(
        selector("$HOST")
        database("context-info-db.csv")
        default-selector("unknown-hostname")
    );
```



## ignore-case()

|           |                 |
| --------- | --------------- |
| Synopsis: | ignore-case()   |
| Default:  | ignore-case(no) |

*Description:* Specifies if selectors are handled as case insensitive. If you set the `ignore-case()` option to `yes`, selectors are handled as case insensitive.



## prefix()

|           |          |
| --------- | -------- |
| Synopsis: | prefix() |

*Description:* Insert a prefix before the name part of the added name-value pairs (including the pairs added by the `default-selector()`) to help further processing.



## selector()

|           |            |
| --------- | ---------- |
| Synopsis: | selector() |

*Description:* Specifies the string or macro that {{% param "product.abbrev" %}} evaluates for each message, and if its value matches the ID of an entry in the database, {{% param "product.abbrev" %}} adds the name-value pair of every matching database entry to the log message. You can use the following in the `selector()` option.

  - Strings

  - A single macro (for example, `selector("${HOST}")`)

  - To use filters as selectors, see {{% xref "/chapter-enrich-data/data-enrichment-add-contextual-data/add-contextual-data-filters/_index.md" %}}.

  - To use shell-style globbing (wildcards) in selectors, see {{% xref "/chapter-enrich-data/data-enrichment-add-contextual-data/add-contextual-data-globs/_index.md" %}}.

  - Using templates as selectors is not supported.

