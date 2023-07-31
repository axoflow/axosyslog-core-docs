---
title: "sql() destination options"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This driver sends messages into an SQL database. The `sql()` destination has the following options:

{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

{{% include-headless "chunk/option-destination-batch-lines.md" %}}

{{% include-headless "chunk/option-destination-batch-timeout.md" %}}

## columns() {#sql-option-columns}

|          |                                                                  |
| -------- | ---------------------------------------------------------------- |
| Type:    | string list                                                      |
| Default: | "date", "facility", "level", "host", "program", "pid", "message" |

*Description:* Name of the columns storing the data in `fieldname [dbtype]` format. The `[dbtype]` parameter is optional, and specifies the type of the field. By default, {{% param "product.abbrev" %}} creates `text` columns. Note that not every database engine can index text fields.

{{< include-headless "wnt/warning-destination-mssql-columntypes.md" >}}

## create-statement-append() {#sql-option-create-statement-append}

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

*Description:* Specifies additional SQL options that are appended to the CREATE statement. That way you can customize what happens when {{% param "product.abbrev" %}} creates a new table in the database. Consult the documentation of your database server for details on the available options. Syntax:

```shell
   create-statement-append(<options-to-append>)
```

For example, you can appends the `ROW_FORMAT=COMPRESSED` option to MySQL create table statements:

```shell
   create-statement-append(ROW_FORMAT=COMPRESSED)
```

{{% include-headless "chunk/option-sql-database.md" %}}

## dbd-option() {#sql-option-dbd-option}

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

*Description:* Specify database options that are set whenever {{% param "product.abbrev" %}} connects to the database server. Consult the documentation of your database server for details on the available options. Syntax:

```shell
   dbd-option(OPTION_NAME VALUE)
```

OPTION_NAME is always a string, VALUE is a string or a number. For example:

```shell
   dbd-option("null.sleep.connect" 1)
    dbd-option("null.sleep.query" 5)
```

## dbdi-driver-dir() {#sql-option-dbdi-driver-dir}

|          |              |
| -------- | ------------ |
| Type:    | string       |
| Default: | empty string |

*Description:* Defines an optional DBI driver location for DBD initialization.

{{< include-headless "chunk/option-destination-diskbuffer.md" >}}

## flags() {#sql-option-flags}

|          |               |
| -------- | ------------- |
| Type:    | list of flags |
| Default: | empty string  |

*Description:* Flags related to the `sql()` destination.

  - *dont-create-tables*: Enable this flag to prevent {{% param "product.abbrev" %}} from creating non-existing database tables automatically. The {{% param "product.abbrev" %}} application typically has to create tables if you use macros in the table names. Available in {{% param "product.abbrev" %}} version 3.2 and later.

  - *explicit-commits*: By default, {{% param "product.abbrev" %}} commits every log message to the target database individually. When the `explicit-commits` option is enabled, messages are committed in batches. This improves the performance, but results in some latency, as the messages are not immediately sent to the database. The size and frequency of batched commits can be set using the `batch-lines()` parameter. The `explicit-commits` option is available in {{% param "product.abbrev" %}} version 3.2 and later.

### Example: Setting flags for SQL destinations

The following example sets the `dont-create-tables` and `explicit-commits` flags for an `sql()` destination.

```shell
   flags(dont-create-tables,explicit-commits)
```

{{< include-headless "chunk/option-destination-frac-digits.md" >}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{< include-headless "chunk/option-sql-host.md" >}}

## indexes() {#sql-option-indexes}

|          |                                       |
| -------- | ------------------------------------- |
| Type:    | string list                           |
| Default: | "date", "facility", "host", "program" |

*Description:* The list of columns that are indexed by the database to speed up searching. To disable indexing for the destination, include the empty `indexes()` parameter in the destination, simply omitting the `indexes` parameter will cause AxoSyslog to request indexing on the default columns.

The {{% param "product.abbrev" %}} application will create the name of indexes automaticaly with the following method:

  - In case of MsSQL, PostgreSQL, MySQL or SQLite or (Oracle but tablename < 30 characters): `{table}_{column}_idx`.

  - In case of Oracle and tablename > 30 characters: `md5sum of {table}_{column}-1` and the first character will be replaced by "i" character and the md5sum will be truncated to 30 characters.

{{% include-headless "chunk/option-destination-local-timezone.md" %}}

{{% include-headless "chunk/option-destination-log-fifo-size.md" %}}

## null() {#sql-option-null}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* If the content of a column matches the string specified in the `null()` parameter, the contents of the column will be replaced with an SQL NULL value. If unset (by default), the option does not match on any string. For details, see the [Example: Using SQL NULL values](#example-destination-sql-null).

### Example: Using SQL NULL values {#example-destination-sql-null}

The `null()` parameter of the SQL driver can be used to replace the contents of a column with a special SQL NULL value. To replace every column that contains an empty string with NULL, use the `null("")` option, for example

```shell
   destination d_sql {
        sql(type(pgsql)
        host("logserver") username("syslog-ng") password("password")
        database("logs")
        table("messages_${HOST}_${R_YEAR}${R_MONTH}${R_DAY}")
        columns("datetime", "host", "program", "pid", "message")
        values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
        indexes("datetime", "host", "program", "pid", "message")
        null(""));
    };
```

To replace only a specific column (for example, `pid`) if it is empty, assign a default value to the column, and use this default value in the `null()` parameter:

```shell
   destination d_sql {
        sql(type(pgsql)
        host("logserver") username("syslog-ng") password("password")
        database("logs")
        table("messages_${HOST}_${R_YEAR}${R_MONTH}${R_DAY}")
        columns("datetime", "host", "program", "pid", "message")
        values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID:-@@NULL@@}", "${MSGONLY}")
        indexes("datetime", "host", "program", "pid", "message")
        null("@@NULL@@"));
    };
```

Ensure that the default value you use does not appear in the actual log messages, because other occurrences of this string will be replaced with NULL as well.


{{% include-headless "chunk/option-sql-password.md" %}}

{{% include-headless "chunk/option-sql-port.md" %}}

## quote-char() {#sql-option-quote-char}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

Available in {{% param "product_name" %}} version 4.3.0 and newer.

*Description:* Set custom quoting for table and index names (for example, MySQL needs sometimes this for certain identifiers).

> Note: Using a backtick character needs special formatting, because {{% param "product.abbrev" %}} uses backticks for configuration parameter names. To use backticks as quote character, set a double backtick: `quote-char("``")`

## retries() {#sql-option-retry-sql-inserts}

|          |                             |
| -------- | --------------------------- |
| Type:    | number (insertion attempts) |
| Default: | 3                           |

*Description:* The number of insertion attempts. If {{% param "product.abbrev" %}} could not insert a message into the database, it will repeat the attempt until the number of attempts reaches `retries`, then drops the connection to the database. For example, {{% param "product.abbrev" %}} will try to insert a message maximum three times by default (once for first insertion and twice if the first insertion was failed).

## session-statements() {#sql-option-session-statements}

|          |                                        |
| -------- | -------------------------------------- |
| Type:    | comma-separated list of SQL statements |
| Default: | empty string                           |

*Description:* Specifies one or more SQL-like statement which is executed after {{% param "product.abbrev" %}} has successfully connected to the database. For example:

```shell
   session-statements("SET COLLATION_CONNECTION='utf8_general_ci'")
```

{{% alert title="Warning" color="warning" %}}

The {{% param "product.abbrev" %}} application does not validate or limit the contents of customized queries. Consequently, queries performed with a user with write-access can potentially modify or even harm the database. Use customized queries with care, and only for your own responsibility.

{{% /alert %}}

## table() {#sql-option-table}

|          |          |
| -------- | -------- |
| Type:    | string   |
| Default: | messages |

*Description:* Name of the database table to use (can include macros). When using macros, note that some databases limit the length of table names.

{{% include-headless "chunk/option-source-time-reopen.md" %}}

{{% include-headless "chunk/option-destination-timezone.md" %}}

## type() {#sql-option-type}

|          |                                         |
| -------- | --------------------------------------- |
| Type:    | mssql, mysql, oracle, pgsql, or sqlite3 |
| Default: | mysql                                   |

{{% include-headless "chunk/option-description-sql-type.md" %}}

{{% include-headless "chunk/option-sql-username.md" %}}

## values() {#sql-option-values}

|          |                                                                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Type:    | string list                                                                                                                                    |
| Default: | "${R_YEAR}-${R_MONTH}-${R_DAY}, ${R_HOUR}:${R_MIN}:${R_SEC}", "${FACILITY}", "${LEVEL}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}" |

*Description:* The parts of the message to store in the fields specified in the `columns()` parameter.

It is possible to give a special value calling: default (without quotation marks).It means that the value will be used that is the default of the column type of this value.

### Example: Value: default

```shell
   columns("date datetime", "host varchar(32)", "row_id serial")
        values("${R_DATE}", "${HOST}", default)
```
