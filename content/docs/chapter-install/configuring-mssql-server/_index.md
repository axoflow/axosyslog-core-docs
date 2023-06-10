---
title: "Configuring Microsoft SQL Server to accept logs from syslog-ng"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Complete the following steps to configure your Microsoft SQL Server to enable remote logins and accept log messages from `syslog-ng`.


1.  Start the SQL Server Management Studio application. Select `Start \> Programs \> Microsoft SQL Server 2005 \> SQL Server Management Studio`.

2.  Create a new database.
    
    1.  ![](../Images/Screenshots/mssql-newdb-select.png)
        
        In the `Object Explorer`, right-click on the `Databases` entry and select `New Database`.
    
    2.  ![](../Images/Screenshots/mssql-newdb-create.png)
        
        Enter the name of the new database (for example, `syslogng`) into the `Database name` field and click `OK`.

3.  Create a new database user and associate it with the new database.
    
    1.  ![](../Images/Screenshots/mssql-newuser-select.png)
        
        In the `Object Explorer`, select `Security`, right-click on the `Logins` entry, then select `New Login`.
    
    2.  ![](../Images/Screenshots/mssql-newuser-general.png)
        
        Enter a name (for example, `syslog-ng`) for the user into the `Login name` field.
    
    3.  Select the `SQL Server Authentication` option and enter a password for the user.
    
    4.  In the `Default database` field, select the database created in Step 2 (for example, `syslogng`).
    
    5.  In the `Default language` field, select the language of log messages that you want to store in the database, then click `OK`.
        
        {{% alert title="Warning" color="warning" %}}
        
Incorrect language settings may result in the database converting the messages to a different character-encoding format. That way the log messages may become unreadable, causing information loss.
        
        {{% /alert %}}
    
    6.  In the `Object Explorer`, select `Security > Logins`, then right-click on the new login created in the previous step, and select `Properties`.
    
    7.  ![](../Images/Screenshots/mssql-newuser-setowner.png)
        
        Select `User Mapping`. In the `Users mapped to this login` option, check the line corresponding to the new login (for example, `syslogng`). In the `Database role membership` field, check the `db_owner` and `public` options.

4.  ![](../Images/Screenshots/mssql-newuser-login.png)
    
    Enable remote logins for SQL users.
    
    In the `Object Explorer` right-click on your database server, and select `Properties > Security`, and set the `Server Authentication` option to `SQL Server and Windows Authentication mode`.

