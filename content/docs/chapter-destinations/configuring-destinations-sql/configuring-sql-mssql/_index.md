---
title: "Using the sql() driver with a Microsoft SQL database"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `mssql` database driver can access Microsoft SQL (MSSQL) destinations. This driver has some special aspects that are important to note.

  - The date format used by the MSSQL database must be explicitly set in the `/etc/locales.conf` file of the syslog-ng server. For details, see the following example.

  - As certain database versions limit the maximum length of table names, macros in the table names should be used with care.

  - In the current version of {{% productparam "abbrev" %}}, the types of database columns must be explicitly set for the MSSQL destination.
    
    {{% include-headless "wnt/warning-destination-mssql-columntypes.md" %}}

  - The column used to store the text part of the syslog messages should be able to store messages as long as the longest message permitted by syslog-ng. The `varchar` column type can store maximum 4096 bytes-long messages. The maximum length of the messages can be set using the `log-msg-size()` option. For details, see the following example.

  - Remote access for SQL users must be explicitly enabled on the Microsoft Windows host running the Microsoft SQL Server. For details, see {{% xref "/docs/chapter-install/configuring-mssql-server/_index.md" %}}.


## Example: Using the sql() driver with an MSSQL database {#example-destination-sql-mssql}

The following example sends the log messages into an MSSQL database running on the `logserver` host. The messages are inserted into the `syslogng` database, the name of the table includes the exact date when the messages were sent. The syslog-ng application automatically creates the required tables and columns, if the user account used to connect to the database has the required privileges.

```c

    destination d_mssql {
    sql(type(mssql) host("logserver") port("1433")
      username("syslogng") password("syslogng") database("syslogng")
      table("msgs_${R_YEAR}${R_MONTH}${R_DAY}")columns("datetime varchar(16)", "host varchar(32)",
      "program varchar(32)", "pid varchar(8)", "message varchar(4096)")
      values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
      indexes("datetime", "host", "program", "pid"));
    };

```

The date format used by the MSSQL database must be explicitly set in the `/etc/locales.conf` file of the syslog-ng server. Edit or create this file as needed for your configuration. A sample is provided below.

```c

    [default]
    date = "%Y-%m-%d %H:%M:%S"

```

