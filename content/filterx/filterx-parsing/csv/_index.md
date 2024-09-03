---
title: "Comma-separated values"
linkTitle: "CSV"
weight: 400
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{< include-headless "chunk/filterx-experimental-banner.md" >}}

The `parse_csv` filterx function can separate parts of log messages (for example, the contents of the `${MESSAGE}` macro) at delimiter characters or strings to named fields (columns).

Usage: `parse_csv(<input-string>, columns=json_array, delimiter=string, string_delimiters=json_array, dialect=string, strip_whitespace=boolean, greedy=boolean)`

Only the input string is mandatory.

If the `columns` option is set, `parse_csv` returns a [dictionary]({{< relref "/filterx/_index.md#json" >}}) with the column names (as keys) and the parsed values. If the [`columns`]({{< relref "/filterx/filterx-parsing/csv/reference-parsers-csv/_index.md#columns" >}}) option isn't set, `parse_csv` returns a list.

The following example separates hostnames like `example-1` and `example-2` into two parts.

```shell
block filterx() p_hostname_segmentation {
    cols = json_array(["NAME","ID"]);
    HOSTNAME = parse_csv(${HOST}, delimiter="-", columns=cols);
    # HOSTNAME is a json object containing parts of the hostname
    # For example, for example-1 it contains:
    # {"NAME":"example","ID":"1"}
};
destination d_file {
    file("/var/log/${HOSTNAME.NAME:-examplehost}/${HOSTNAME.ID}"/messages.log);
};
log {
    source(s_local);
    filterx(p_hostname_segmentation);
    destination(d_file);
};
```

## Parse Apache log files {#example-parser-apache}

The following parser processes the log of Apache web servers and separates them into different fields. Apache log messages can be formatted like:

```shell
"%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" %T %v"
```

Here is a sample message:

```shell
192.168.1.1 - - [31/Dec/2007:00:17:10 +0100] "GET /cgi-bin/example.cgi HTTP/1.1" 200 2708 "-" "curl/7.15.5 (i4 86-pc-linux-gnu) libcurl/7.15.5 OpenSSL/0.9.8c zlib/1.2.3 libidn/0.6.5" 2 example.mycompany
```

To parse such logs, the delimiter character is set to a single whitespace (`delimiter=" "`). Whitespaces are stripped.

```shell
block filterx() p_apache {
    ${APACHE} = json();
    cols = json_array("CLIENT_IP", "IDENT_NAME", "USER_NAME",
    "TIMESTAMP", "REQUEST_URL", "REQUEST_STATUS",
    "CONTENT_LENGTH", "REFERER", "USER_AGENT",
    "PROCESS_TIME", "SERVER_NAME");
    ${APACHE} = parse_csv(${MESSAGE}, columns=cols, delimiter=(" "), strip_whitespaces=true, dialect="escape-double-char");
};
```

The results can be used for example, to separate log messages into different files based on the APACHE.USER_NAME field. If the field is empty, the `nouser` name is assigned.

```shell
log {
    source(s_local);
    filterx(p_apache);
    destination(d_file);
};
destination d_file {
    file("/var/log/messages-${APACHE.USER_NAME:-nouser}");
};
```

## Segment a part of a message {#example-parser-multiple}

You can use multiple parsers to split a part of an already parsed message into further segments. The following example splits the timestamp of a parsed Apache log message into separate fields. Note that the [scoping of filterx variables]({{< relref "/filterx/_index.md#scoping" >}}) is important:

- If you add the new parser to the filterx block used in the [previous example](#example-parser-apache), every variable is available.
- If you use a separate filterx block, only global variables and name-value pairs (variables with names starting with the `$` character) are accessible from the block.

```shell
filterx p_apache_timestamp {
    cols = json_array("TIMESTAMP.DAY", "TIMESTAMP.MONTH", "TIMESTAMP.YEAR", "TIMESTAMP.HOUR", "TIMESTAMP.MIN", "TIMESTAMP.SEC", "TIMESTAMP.ZONE")
    ${APACHE.TIMESTAMP} = parse_csv(${APACHE.TIMESTAMP}, columns=cols, delimiters=("/: "), dialect="escape-none");
};
destination d_file {
    file("/var/log/messages-${APACHE.USER_NAME:-nouser}/${APACHE.TIMESTAMP.DAY}");
};
log {
    source(s_local);
    filterx(p_apache);
    filterx(p_apache_timestamp);
    destination(d_file);
};
```
