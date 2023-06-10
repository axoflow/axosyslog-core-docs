---
title: "The syslog-ng.conf manual page"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Name

`syslog-ng.conf` — syslog-ng configuration file



## Synopsis

`syslog-ng.conf`



## Description

This manual page is only an abstract, for the complete documentation of {{% productparam "abbrev" %}}, see the [{{% productparam "abbrev" %}} Documentation page](https://support.oneidentity.com/syslog-ng-premium-edition/technical-documents/)[{{% productparam "abbrev" %}} Documentation page](https://www.syslog-ng.com/).

The {{% productparam "ose" %}} application is a flexible and highly scalable system logging application. Typically, {{% productparam "ose" %}} is used to manage log messages and implement centralized logging, where the aim is to collect the log messages of several devices on a single, central log server. The different devices - called {{% productparam "syslog-ng" %}} clients - all run {{% productparam "ose" %}}, and collect the log messages from the various applications, files, and other sources. The clients send all important log messages to the remote {{% productparam "pe" %}} server, where the server sorts and stores them.



<span id="idm45287286179568"></span>

## Basic concepts of {{% productparam "ose" %}}

The {{% productparam "ose" %}} application reads incoming messages and forwards them to the selected destinations. The syslog-ng application can receive messages from files, remote hosts, and other sources.

<span id="idm45287286176944"></span>

Log messages enter {{% productparam "ose" %}} in one of the defined sources, and are sent to one or more destinations.

<span id="idm45287286175248"></span><span id="idm45287286174480"></span>

Sources and destinations are independent objects, log paths define what {{% productparam "ose" %}} does with a message, connecting the sources to the destinations. A log path consists of one or more sources and one or more destinations: messages arriving from a source are sent to every destination listed in the log path. A log path defined in {{% productparam "ose" %}} is called a log statement.

Optionally, log paths can include filters. Filters are rules that select only certain messages, for example, selecting only messages sent by a specific application. If a log path includes filters, {{% productparam "ose" %}} sends only the messages satisfying the filter rules to the destinations set in the log path.

Other optional elements that can appear in log statements are parsers and rewriting rules. Parsers segment messages into different fields to help processing the messages, while rewrite rules modify the messages by adding, replacing, or removing parts of the messages.



## Configuring {{% productparam "ose" %}}

  - The main body of the configuration file consists of object definitions: sources, destinations, logpaths define which log message are received and where they are sent. All identifiers, option names and attributes, and any other strings used in the syslog-ng configuration file are case sensitive. Object definitions (also called statements) have the following syntax:
    
    ```c
    
        type-of-the-object identifier-of-the-object {<parameters>};
    
    ```
    
      - Type of the object: One of `source`, `destination`, `log`, `filter`, `parser`, `rewrite` rule, or `template`.
        
        Identifier of the object: A unique name identifying the object. When using a reserved word as an identifier, enclose the identifier in quotation marks (`""`).
        
        All identifiers, attributes, and any other strings used in the {{% productparam "ose" %}} configuration file are case sensitive.
        
        {{% alert title="Note" color="info" %}}
        
        Use identifiers that refer to the type of the object they identify. For example, prefix source objects with `s_`, destinations with `d_`, and so on.
        
        {{% /alert %}}
        
        Repeating a definition of an object (that is, defining the same object with the same id more than once) is not allowed, unless you use the `@define allow-config-dups 1` definition in the configuration file.
    
      - Parameters: The parameters of the object, enclosed in braces `{parameters}`.
    
      - Semicolon: Object definitions end with a semicolon (`;`).
    
    For example, the following line defines a source and calls it `s_internal`.
    
    ```c
    
        source s_internal { internal(); };
    
    ```
    
    The object can be later referenced in other statements using its ID, for example, the previous source is used as a parameter of the following log statement:
    
    ```c
    
        log { source(s_internal); destination(d_file); };
    
    ```

  - The parameters and options within a statement are similar to function calls of the C programming language: the name of the option followed by a list of its parameters enclosed within brackets and terminated with a semicolon.
    
    ```c
    
        option(parameter1, parameter2); option2(parameter1, parameter2);
    
    ```
    
    For example, the `file()` driver in the following source statement has three options: the filename (`/var/log/apache/access.log`), `follow-freq()`, and `flags()`. The `follow-freq()` option also has a parameter, while the `flags()` option has two parameters.
    
    ```c
    
        source s_tail { file("/var/log/apache/access.log"
        follow-freq(1) flags(no-parse, validate-utf8)); };
    
    ```
    
    Objects may have required and optional parameters. Required parameters are positional, meaning that they must be specified in a defined order. Optional parameters can be specified in any order using the **option(value)** format. If a parameter (optional or required) is not specified, its default value is used. The parameters and their default values are listed in the reference section of the particular object.
    
    
    ## Example: Using required and optional parameters
    
    The `unix-stream()` source driver has a single required argument: the name of the socket to listen on. Optional parameters follow the socket name in any order, so the following source definitions have the same effect:
    
    ```c
    
        source s_demo_stream1 {
                            unix-stream("<path-to-socket>" max-connections(10) group(log)); };
                            source s_demo_stream2 {
        unix-stream("<path-to-socket>" group(log) max-connections(10)); };
    
    ```
    

  - Some options are global options, or can be set globally, for example, whether {{% productparam "ose" %}} should use DNS resolution to resolve IP addresses.
    
    ```c
    
        options { use-dns(no); };
    
    ```

  - Objects can be used before definition.

  - Objects can be defined inline as well. This is useful if you use the object only once (for example, a filter).

  - To add comments to the configuration file, start a line with `#` and write your comments. These lines are ignored by {{% productparam "ose" %}}.
    
    ```c
    
    ``` 
        #Comment: This is a stream source
    source s_demo_stream {
    unix-stream("<path-to-socket>" max-connections(10) group(log)); };
    ```
    
    ```

The syntax of log statements is as follows:

```c

    log {
        source(s1); source(s2); ...
    optional_element(filter1|parser1|rewrite1);
    optional_element(filter2|parser2|rewrite2);
                ...
    destination(d1); destination(d2); ...
    flags(flag1[, flag2...]);
            };

```

The following log statement sends all messages arriving to the `localhost` to a remote server.

```c

``` 
        source s_localhost { network(ip(127.0.0.1) port(1999)); };
        destination d_tcp { network("10.1.2.3" port(1999) localport(999)); };
        log { source(s_localhost); destination(d_tcp); };
```

```

The {{% productparam "ose" %}} application has a number of global options governing DNS usage, the timestamp format used, and other general points. Each option may have parameters, similarly to driver specifications. To set global options add an option statement to the {{% productparam "ose" %}} configuration file using the following syntax:

```c

``` 
    options { option1(params); option2(params); ... };
```

```


## Example: Using global options

To disable domain name resolving, add the following line to the {{% productparam "ose" %}} configuration file:

```c

    options { use-dns(no); };

```


The sources, destinations, and filters available in {{% productparam "ose" %}} are listed below. For details, see the [{{% productparam "ose" %}} Documentation page](https://www.syslog-ng.com).


## Table: Source drivers available in {{% productparam "ose" %}}

| Name                             | Description                                                                                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [file()](#)                      | Opens the specified file and reads messages.                                                                                                 |
| [wildcard-file()](#)             | Reads messages from multiple files and directories.                                                                                          |
| [internal()](#)                  | Messages generated internally in {{% productparam "ose" %}}.                                                                           |
| [network()](#)                   | Receives messages from remote hosts using the [BSD-syslog protocol](#) over IPv4 and IPv6. Supports the TCP, UDP, and TLS network protocols. |
| [nodejs()](#)                    | Receives JSON messages from nodejs applications.                                                                                             |
| [mbox()](#)                      | Read e-mail messages from local mbox files, and convert them to multiline log messages.                                                      |
| [osquery()](#)                   | Run osquery queries, and convert their results into log messages.                                                                            |
| [pacct()](#)                     | Reads messages from the process accounting logs on Linux.                                                                                    |
| [pipe()](#)                      | Opens the specified named pipe and reads messages.                                                                                           |
| [program()](#)                   | Opens the specified application and reads messages from its standard output.                                                                 |
| [snmptrap()](#)                  | Read and parse the SNMP traps of the Net-SNMP's snmptrapd application.                                                                       |
| [sun-stream(), sun-streams()](#) | Opens the specified STREAMS device on Solaris systems and reads incoming messages.                                                           |
| [syslog()](#)                    | Listens for incoming messages using the new [IETF-standard syslog protocol](#).                                                              |
| [system()](#)                    | Automatically detects which platform {{% productparam "ose" %}} is running on, and collects the native log messages of that platform.  |
| [systemd-journal()](#)           | Collects messages directly from the journal of platforms that use systemd.                                                                   |
| [systemd-syslog()](#)            | Collects messages from the journal using a socket on platforms that use `systemd`.                                                         |
| [unix-dgram()](#)                | Opens the specified unix socket in <span>SOCK_DGRAM</span> mode and listens for incoming messages.                                          |
| [unix-stream()](#)               | Opens the specified unix socket in `SOCK_STREAM` mode and listens for incoming messages.                                                  |
| [stdin()](#)                     | Collects messages from the standard input stream.                                                                                            |



<span id="idm45287286060496"></span>

## Table 2. Destination drivers available in syslog-ng

| Name                | Description                                                                                                                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [amqp()](#)         | Publishes messages using the `AMQP` (Advanced Message Queuing Protocol).                                                                                                                          |
| [elasticsearch2](#) | Sends messages to an Elasticsearch server. The `elasticsearch2` driver supports Elasticsearch version 2 and newer.                                                                                |
| [file()](#)         | Writes messages to the specified file.                                                                                                                                                              |
| [graphite()](#)     | Sends metrics to a [Graphite](http://graphite.readthedocs.io/en/latest/index.html) server to store numeric time-series data.                                                                        |
| [graylog2()](#)     | Sends syslog messages to [Graylog](http://docs.graylog.org).                                                                                                                                        |
| [hdfs()](#)         | Sends messages into a file on a [Hadoop Distributed File System (HDFS)](http://hadoop.apache.org/) node.                                                                                            |
| http()              | Sends messages over the HTTP protocol. There are two different implementations of this driver: a [Java-based http driver](#), and an [http driver without Java](#).                                 |
| [kafka()](#)        | Publishes log messages to the [Apache Kafka](http://kafka.apache.org) message bus, where subscribers can access them.                                                                               |
| [loggly()](#)       | Sends log messages to the [Loggly](https://www.loggly.com/) Logging-as-a-Service provider.                                                                                                          |
| [logmatic()](#)     | Sends log messages to the [Logmatic.io](https://logmatic.io/) Logging-as-a-Service provider.                                                                                                        |
| [mongodb()](#)      | Sends messages to a [MongoDB](https://www.mongodb.com) database.                                                                                                                                    |
| [network()](#)      | Sends messages to a remote host using the [BSD-syslog protocol](#) over IPv4 and IPv6. Supports the TCP, UDP, and TLS network protocols.                                                            |
| [pipe()](#)         | Writes messages to the specified named pipe.                                                                                                                                                        |
| [program()](#)      | Forks and launches the specified program, and sends messages to its standard input.                                                                                                                 |
| [redis()](#)        | Sends messages as name-value pairs to a [Redis](https://redis.io/) key-value store.                                                                                                                 |
| [riemann()](#)      | Sends metrics or events to a [Riemann](http://riemann.io/) monitoring system.                                                                                                                       |
| [smtp()](#)         | Sends e-mail messages to the specified recipients.                                                                                                                                                  |
| [sql()](#)          | Sends messages into an SQL database. In addition to the standard {{% productparam "ose" %}} packages, the <span>sql()</span> destination requires database-specific packages to be installed. |
| [stomp()](#)        | Sends messages to a STOMP server.                                                                                                                                                                   |
| [syslog()](#)       | Sends messages to the specified remote host using the [IETF-syslog protocol](#). The IETF standard supports message transport using the UDP, TCP, and TLS networking protocols.                     |
| [unix-dgram()](#)   | Sends messages to the specified unix socket in `SOCK_DGRAM` style (BSD).                                                                                                                         |
| [unix-stream()](#)  | Sends messages to the specified unix socket in `SOCK_STREAM` style (Linux).                                                                                                                      |
| [usertty()](#)      | Sends messages to the terminal of the specified user, if the user is logged in.                                                                                                                     |



<span id="idm45287285998944"></span>

## Table 3. Filter functions available in syslog-ng OSE

| Name                       | Description                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| [facility()](#)            | Filter messages based on the sending facility.                                            |
| [filter()](#)              | Call another filter function.                                                             |
| [host()](#)                | Filter messages based on the sending host.                                                |
| [inlist()](#)              | File-based whitelisting and blacklisting.                                                 |
| [level() or priority()](#) | Filter messages based on their priority.                                                  |
| [match()](#)               | Use a regular expression to filter messages based on a specified header or content field. |
| [message()](#)             | Use a regular expression to filter messages based on their content.                       |
| [netmask()](#)             | Filter messages based on the IP address of the sending host.                              |
| [program()](#)             | Filter messages based on the sending application.                                         |
| [source()](#)              | Select messages of the specified {{% productparam "ose" %}} source statement.       |
| [tags()](#)                | Select messages having the specified tag.                                                 |




## Files

`/opt/syslog-ng/`

`/opt/syslog-ng/etc/syslog-ng.conf`



## See also

<span class="mcFormatColor" style="color: #04aada;">The syslog-ng manual page</span>

{{% alert title="Note" color="info" %}}

For the detailed documentation of {{% productparam "abbrev" %}} see [{{% productparam "abbrev" %}} Documentation page](https://support.oneidentity.com/syslog-ng-premium-edition/technical-documents/)[{{% productparam "abbrev" %}} Documentation page](https://www.syslog-ng.com/).

If you experience any problems or need help with {{% productparam "abbrev" %}}, visit the [{{% productparam "syslog-ng" %}} mailing list](https://lists.balabit.hu/mailman/listinfo/syslog-ng).

For news and notifications about {{% productparam "abbrev" %}}, visit the [{{% productparam "syslog-ng" %}} blogs](https://syslog-ng.com/blog/).

{{% /alert %}}

