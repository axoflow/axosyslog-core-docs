---
title: "Adding metadata from an external file"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

In {{% param "product.abbrev" %}} version 3.8 and later, you can use an external database file to add additional metadata to your log messages. For example, you can create a database (or export it from an existing tool) that contains a list of hostnames or IP addresses, and the department of your organization that the host belongs to, the role of the host (mailserver, webserver, and so on), or similar contextual information.

The database file is a simple text file in comma-separated value (CSV) format, where each line contains the following information:

  - A selector or ID that appears in the log messages, for example, the hostname. To use shell-style globbing (wildcards) in selectors, see {{% xref "/docs/chapter-enrich-data/data-enrichment-add-contextual-data/add-contextual-data-globs/_index.md" %}}. You can also reference the name of a filter that matches the messages, see {{% xref "/docs/chapter-enrich-data/data-enrichment-add-contextual-data/add-contextual-data-filters/_index.md" %}}

  - The name of the name-value pair that {{% param "product.abbrev" %}} adds to matching log messages.

  - The value of the name-value pairs. Starting with {{% param "product.abbrev" %}} version 3.22, the value of the name-value pair can be a template or a template function, for example, `"selector3,name,$(echo $HOST_FROM)";`

For example, the following csv-file contains three lines identified with the IP address, and adds the `host-role` field to the log message.

```c
   192.168.1.1,host-role,webserver
    192.168.2.1,host-role,firewall
    192.168.3.1,host-role,mailserver

```


## The database file: {#add-contextual-data-csv-database-file}

The database file must comply with the [RFC4180 CSV format](https://tools.ietf.org/html/rfc4180), with the following exceptions and limitations:

  - The values of the CSV-file cannot contain line-breaks

To add multiple name-value pairs to a message, include a separate line in the database for each name-value pair, for example:

```c
   192.168.1.1,host-role,webserver
    192.168.1.1,contact-person,"John Doe"
    192.168.1.1,contact-email,johndoe@example.com

```

Technically, `add-contextual-data()` is a parser in {{% param "product.abbrev" %}} so you have to define it as a parser object.



## Declaration:

```c
   parser p_add_context_data {
        add-contextual-data(
            selector("${HOST}"),
            database("context-info-db.csv"),
        );
    };
```


You can also add data to messages that do not have a matching selector entry in the database using the `default-selector()` option.

If you modify the database file, you have to reload {{% param "product.abbrev" %}} for the changes to take effect. If reloading {{% param "product.abbrev" %}} or the database file fails for some reason, {{% param "product.abbrev" %}} will keep using the last working database file.


## Example: Adding metadata from a CSV file

The following example defines uses a CSV database to add the role of the host based on its IP address, and prefixes the added name-value pairs with `.metadata`. The destination includes a template that simply appends the added name-value pairs to the end of the log message.

```c
   @include "scl.conf"
    
    source s_network {
        network(port(5555));
    };
    
    destination d_local {
        file("/tmp/test-msgs.log"
        template("$MSG Additional metadata:[${.metadata.host-role}]")};
    
    parser p_add_context_data {
        add-contextual-data(selector("$SOURCEIP"), database("context-info-db.csv"), default-selector("unknown"), prefix(".metadata."));
    };
    
    log {
        source(s_network);
        parser(p_add_context_data);
        destination(d_local);
    };
```

```c
   192.168.1.1,host-role,webserver
    192.168.2.1,host-role,firewall
    192.168.3.1,host-role,mailserver
    unknown,host-role,unknown

```

