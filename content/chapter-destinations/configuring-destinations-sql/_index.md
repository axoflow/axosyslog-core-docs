---
title: "sql: Storing messages in an SQL database"
weight:  5900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `sql()` driver sends messages into an SQL database. Currently the Microsoft SQL (MSSQL), MySQL, Oracle, PostgreSQL, and SQLite databases are supported. Starting with {{% param "product.abbrev" %}} 4.0, type information is automatically added to the stored columns if available. For details, see {{% xref "/chapter-concepts/concepts-value-pairs/specifying-data-types/_index.md" %}}.

## Declaration:

```shell
   sql(database_type host_parameters database_parameters [options]);
```

The `sql()` driver has the following required parameters: [`type()`]({{< relref "/chapter-destinations/configuring-destinations-sql/reference-destination-sql/_index.md" >}}), [`database()`]({{< relref "/chapter-destinations/configuring-destinations-sql/reference-destination-sql/_index.md" >}}), [`table()`]({{< relref "/chapter-destinations/configuring-destinations-sql/reference-destination-sql/_index.md" >}}), [`columns()`]({{< relref "/chapter-destinations/configuring-destinations-sql/reference-destination-sql/_index.md" >}}), and [`values()`]({{< relref "/chapter-destinations/configuring-destinations-sql/reference-destination-sql/_index.md" >}}).

{{% alert title="Warning" color="warning" %}}

The {{% param "product.abbrev" %}} application requires read and write access to the SQL table, otherwise it cannot verify that the destination table exists.

Currently the {{% param "product.abbrev" %}} application has default schemas for the different databases and uses these defaults if the database schema (for example, columns and column types) is not defined in the configuration file. However, these schemas will be deprecated and specifying the exact database schema will be required in later versions.

{{% /alert %}}


{{% alert title="Note" color="info" %}}

The `sql()` destination requires database-specific packages to be installed. These packages are automatically installed by the binary `syslog-ng` installer.

{{% /alert %}}

The `table` and `value` parameters can include macros to create tables and columns dynamically (for details, see {{% xref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" %}}).

{{% alert title="Warning" color="warning" %}}

When using macros in table names, note that some databases limit the maximum allowed length of table names. Consult the documentation of the database for details.

{{% /alert %}}

Inserting the records into the database is performed by a separate thread. The AxoSyslog application automatically performs the escaping required to insert the messages into the database.


## Example: Using the sql() driver {#example-destination-sql}

The following example sends the log messages into a PostgreSQL database running on the `logserver` host. The messages are inserted into the `logs` database, the name of the table includes the exact date and the name of the host sending the messages. The AxoSyslog application automatically creates the required tables and columns, if the user account used to connect to the database has the required privileges.

```shell
   destination d_sql {
        sql(type(pgsql)
        host("logserver") username("syslog-ng") password("password")
        database("logs")
        table("messages_${HOST}_${R_YEAR}${R_MONTH}${R_DAY}")
        columns("datetime", "host", "program", "pid", "message")
        values("{$R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
        indexes("datetime", "host", "program", "pid", "message"));
    };
```

The following example specifies the type of the database columns as well:

```shell
   destination d_sql {
        sql(type(pgsql)
        host("logserver") username("syslog-ng") password("password")
        database("logs")
        table("messages_${HOST}_${R_YEAR}${R_MONTH}${R_DAY}")
        columns("datetime varchar(16)", "host varchar(32)", "program  varchar(20)", "pid varchar(8)", "message  varchar(200)")
        values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
        indexes("datetime", "host", "program", "pid", "message"));
    };
```

