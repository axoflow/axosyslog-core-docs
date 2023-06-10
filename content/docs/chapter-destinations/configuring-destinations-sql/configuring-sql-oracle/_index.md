---
title: "Using the sql() driver with an Oracle database"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The Oracle sql destination has some special aspects that are important to note.

  - The hostname of the database server is set in the `tnsnames.ora` file, not in the `host` parameter of the `sql()` destination.
    
    If the `tnsnames.ora` file is not located in the /etc directory (or in the /var/opt/oracle directory on Solaris), set the following Oracle-related environment variables, so {{% param "product.abbrev" %}} will find the file: `ORACLE_BASE`, `ORACLE_HOME`, and `ORACLE_SID`. For details, see the documentation of the Oracle Instant Client.

  - You cannot use the same `database()` settings in more than one destination, because the `database()` option of the SQL driver is just a reference to the connection string of the `tnsnames.ora` file. To overcome this problem, you can duplicate the connections in the `tnsnames.ora` file under a different name, and use a different table in each Oracle destination in {{% param "product.abbrev" %}}.

  - As certain database versions limit the maximum length of table names, macros in the table names should be used with care.

  - In the current version of {{% param "product.abbrev" %}}, the types of database columns must be explicitly set for the Oracle destination. The column used to store the text part of the syslog messages should be able to store messages as long as the longest message permitted by syslog-ng, therefore it is usually recommended to use the **varchar2** or **clob** column type. (The maximum length of the messages can be set using the `log-msg-size()` option.) For details, see the following example.

  - The Oracle Instant Client used by {{% param "product.abbrev" %}} supports only the following character sets:
    
      - Single-byte character sets: `US7ASCII, WE8DEC, WE8MSWIN1252, and WE8ISO8859P1`
    
      - Unicode character sets: `UTF8, AL16UTF16, and AL32UTF8`


## Example: Using the sql() driver with an Oracle database {#example-destination-sql-oracle}

The following example sends the log messages into an Oracle database running on the `logserver` host, which must be set in the `/etc/tnsnames.ora` file. The messages are inserted into the `LOGS` database, the name of the table includes the exact date when the messages were sent. The syslog-ng application automatically creates the required tables and columns, if the user account used to connect to the database has the required privileges.

```c

    destination d_sql {
      sql(type(oracle)
      username("syslog-ng") password("password")
      database("LOGS")
      table("msgs_${R_YEAR}${R_MONTH}${R_DAY}")
      columns("datetime varchar(16)", "host varchar(32)", "program varchar(32)", "pid varchar(8)", "message varchar2")
      values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
      indexes("datetime", "host", "program", "pid", "message"));
    };

```

The Oracle Instant Client retrieves the address of the database server from the `/etc/tnsnames.ora` file. Edit or create this file as needed for your configuration. A sample is provided below.

```c

    LOGS =
    (DESCRIPTION =
    (ADDRESS_LIST =
    (ADDRESS = (PROTOCOL = TCP)
    (HOST = logserver)
    (PORT = 1521))
    )
    (CONNECT_DATA =
    (SERVICE_NAME = EXAMPLE.SERVICE)
    )
    )

```

