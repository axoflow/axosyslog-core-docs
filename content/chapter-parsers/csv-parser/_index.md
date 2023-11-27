---
title: "Parsing messages with comma-separated and similar values"
weight: 400
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{< include-headless "chunk/topic-parser-csv-intro.md" >}}

{{< include-headless "chunk/csv-parser-columnless.md" >}}

## Example: Segmenting hostnames separated with a dash {#example-csv-parser}

The following example separates hostnames like `example-1` and `example-2` into two parts.

```shell
   parser p_hostname_segmentation {
        csv-parser(columns("HOSTNAME.NAME", "HOSTNAME.ID")
        delimiters("-")
        flags(escape-none)
        template("${HOST}"));
    };
    destination d_file {
        file("/var/log/messages-${HOSTNAME.NAME:-examplehost}");
    };
    log {
        source(s_local);
        parser(p_hostname_segmentation);
        destination(d_file);
    };
```



## Example: Parsing Apache log files {#example-parser-apache}

The following parser processes the log of Apache web servers and separates them into different fields. Apache log messages can be formatted like:

```shell
   "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" %T %v"
```

Here is a sample message:

```shell
   192.168.1.1 - - [31/Dec/2007:00:17:10 +0100] "GET /cgi-bin/example.cgi HTTP/1.1" 200 2708 "-" "curl/7.15.5 (i4 86-pc-linux-gnu) libcurl/7.15.5 OpenSSL/0.9.8c zlib/1.2.3 libidn/0.6.5" 2 example.mycompany
```

To parse such logs, the delimiter character is set to a single whitespace (`delimiters(" ")`). Whitespaces between quotes and brackets are ignored (`quote-pairs('""[]')`).

```shell
   parser p_apache {
        csv-parser(
            columns("APACHE.CLIENT_IP", "APACHE.IDENT_NAME", "APACHE.USER_NAME",
            "APACHE.TIMESTAMP", "APACHE.REQUEST_URL", "APACHE.REQUEST_STATUS",
            "APACHE.CONTENT_LENGTH", "APACHE.REFERER", "APACHE.USER_AGENT",
            "APACHE.PROCESS_TIME", "APACHE.SERVER_NAME")
            flags(escape-double-char,strip-whitespace)
            delimiters(" ")
            quote-pairs('""[]')
        );
    };
```

The results can be used for example, to separate log messages into different files based on the APACHE.USER_NAME field. If the field is empty, the `nouser` name is assigned.

```shell
   log {
        source(s_local);
        parser(p_apache);
        destination(d_file);
    };
    destination d_file {
        file("/var/log/messages-${APACHE.USER_NAME:-nouser}");
    };
```



## Example: Segmenting a part of a message {#example-parser-multiple}

Multiple parsers can be used to split a part of an already parsed message into further segments. The following example splits the timestamp of a parsed Apache log message into separate fields.

```shell
   parser p_apache_timestamp {
        csv-parser(
            columns("APACHE.TIMESTAMP.DAY", "APACHE.TIMESTAMP.MONTH", "APACHE.TIMESTAMP.YEAR", "APACHE.TIMESTAMP.HOUR", "APACHE.TIMESTAMP.MIN", "APACHE.TIMESTAMP.SEC", "APACHE.TIMESTAMP.ZONE")
            delimiters("/: ")
            flags(escape-none)
            template("${APACHE.TIMESTAMP}")
        );
    };
    log {
        source(s_local);
        parser(p_apache);
        parser(p_apache_timestamp);
        destination(d_file);
    };
```



## Further examples:

  - For an example on using the `greedy` option, see [Example: Adding the end of the message to the last column]({{< relref "/chapter-parsers/csv-parser/reference-parsers-csv/_index.md" >}}).

