---
title: "Interacting with the database"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## SQL operations

*Create table:*

  - If the given table does not exist, AxoSyslog tries to create it with the given column types.

  - The {{% param "product.abbrev" %}} application automatically creates the required tables and columns, if the user account used to connect to the database has the required privileges.

  - If AxoSyslog cannot create or alter a table, it tries to do it again when it reaches the next `time-reopen()`.

*Alter table:*

  - If the table structure is different from given structure in an existing table, AxoSyslog tries to add columns in this table but never will delete or modify an existing column.

  - If {{% param "product.abbrev" %}} cannot create or alter a table, it tries to do it again when reach the next `time-reopen()`.

  - The {{% param "product.abbrev" %}} application requires read and write access to the SQL table, otherwise it cannot verify that the destination table exists.

*Insert table:*

  - Insert new records in a table.

  - Inserting the records into the database is performed by a separate thread.

  - The {{% param "product.abbrev" %}} application automatically performs the escaping required to insert the messages into the database.

  - If insert returns with error, AxoSyslog tries to insert the message +two times by default, then drops it. Retrying time is the value of `time-reopen()`.



## Encoding

The {{% param "product.abbrev" %}} application uses UTF-8 by default when writes logs into database.



## Start/stop and reload

*Start:*

  - The {{% param "product.abbrev" %}} application will connect to database automatically after starting regardless existing incoming messages.

*Stop:*

  - The {{% param "product.abbrev" %}} application will close the connection to database before shutting down.

*Possibility of losing logs:*

  - The {{% param "product.abbrev" %}} application cannot lose logs during shutting down if disk buffer was given and it is not full yet.

  - The {{% param "product.abbrev" %}} application cannot lose logs during shutting down if disk buffer was not given.

*Reload:*

  - The {{% param "product.abbrev" %}} application will close the connection to database if it received SIGHUP signal (reload).

  - It will reconnect to the database when it tries to send a new message to this database again.



## Macros:

The value of ${SEQNUM} macro will be overridden by sql driver regardless of local or relayed incoming message.

It will be grown continuously.

