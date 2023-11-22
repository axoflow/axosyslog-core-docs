---
title: "The `syslog-ng.conf` manual page"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Name

`syslog-ng.conf` — configuration file



## Synopsis

`syslog-ng.conf`



## Description



The {{% param "product.abbrev" %}} application is a flexible and highly scalable system logging application. Typically, {{% param "product.abbrev" %}} is used to manage log messages and implement centralized logging, where the aim is to collect the log messages of several devices on a single, central log server. The different devices - called {{% param "product.syslog-ng" %}} clients - all run {{% param "product.abbrev" %}}, and collect the log messages from the various applications, files, and other sources. The clients send all important log messages to the remote {{% param "product.abbrev" %}} server, where the server sorts and stores them.



<span id="idm45287286179568"></span>

## Basic concepts of {{% param "product.abbrev" %}}

The {{% param "product.abbrev" %}} application reads incoming messages and forwards them to the selected destinations. The {{% param "product.abbrev" %}} application can receive messages from files, remote hosts, and other sources.

<span id="idm45287286176944"></span>

Log messages enter {{% param "product.abbrev" %}} in one of the defined sources, and are sent to one or more destinations.

<span id="idm45287286175248"></span><span id="idm45287286174480"></span>

Sources and destinations are independent objects, log paths define what {{% param "product.abbrev" %}} does with a message, connecting the sources to the destinations. A log path consists of one or more sources and one or more destinations: messages arriving from a source are sent to every destination listed in the log path. A log path defined in {{% param "product.abbrev" %}} is called a log statement.

Optionally, log paths can include filters. Filters are rules that select only certain messages, for example, selecting only messages sent by a specific application. If a log path includes filters, {{% param "product.abbrev" %}} sends only the messages satisfying the filter rules to the destinations set in the log path.

Other optional elements that can appear in log statements are parsers and rewriting rules. Parsers segment messages into different fields to help processing the messages, while rewrite rules modify the messages by adding, replacing, or removing parts of the messages.



## Configuring {{% param "product.abbrev" %}}

- The main body of the configuration file consists of object definitions: sources, destinations, logpaths define which log message are received and where they are sent. All identifiers, option names and attributes, and any other strings used in the `syslog-ng.conf` configuration file are case sensitive. Object definitions (also called statements) have the following syntax:
    
    ```shell
        type-of-the-object identifier-of-the-object {<parameters>};
    ```
    
    - Type of the object: One of `source`, `destination`, `log`, `filter`, `parser`, `rewrite` rule, or `template`.
      
        Identifier of the object: A unique name identifying the object. When using a reserved word as an identifier, enclose the identifier in quotation marks (`""`).
      
        All identifiers, attributes, and any other strings used in the {{% param "product.abbrev" %}} configuration file are case sensitive.
      
        {{% alert title="Note" color="info" %}}
      
Use identifiers that refer to the type of the object they identify. For example, prefix source objects with `s_`, destinations with `d_`, and so on.
      
        {{% /alert %}}
      
        Repeating a definition of an object (that is, defining the same object with the same id more than once) is not allowed, unless you use the `@define allow-config-dups 1` definition in the configuration file.
  
    - Parameters: The parameters of the object, enclosed in braces `{parameters}`.
  
    - Semicolon: Object definitions end with a semicolon (`;`).
  
    For example, the following line defines a source and calls it `s_internal`.
    
    ```shell
        source s_internal { internal(); };
    ```
    
    The object can be later referenced in other statements using its ID, for example, the previous source is used as a parameter of the following log statement:
    
    ```shell
        log { source(s_internal); destination(d_file); };
    ```

- The parameters and options within a statement are similar to function calls of the C programming language: the name of the option followed by a list of its parameters enclosed within brackets and terminated with a semicolon.
    
    ```shell
        option(parameter1, parameter2); option2(parameter1, parameter2);
    ```
    
    For example, the `file()` driver in the following source statement has three options: the filename (`/var/log/apache/access.log`), `follow-freq()`, and `flags()`. The `follow-freq()` option also has a parameter, while the `flags()` option has two parameters.
    
    ```shell
        source s_tail { file("/var/log/apache/access.log"
        follow-freq(1) flags(no-parse, validate-utf8)); };
    ```
    
    Objects may have required and optional parameters. Required parameters are positional, meaning that they must be specified in a defined order. Optional parameters can be specified in any order using the `option(value)` format. If a parameter (optional or required) is not specified, its default value is used. The parameters and their default values are listed in the reference section of the particular object.
    
    
## Example: Using required and optional parameters

The `unix-stream()` source driver has a single required argument: the name of the socket to listen on. Optional parameters follow the socket name in any order, so the following source definitions have the same effect:

```shell
source s_demo_stream1 {
    unix-stream("<path-to-socket>" max-connections(10) group(log)); };
    source s_demo_stream2 {
unix-stream("<path-to-socket>" group(log) max-connections(10)); };
```


- Some options are global options, or can be set globally, for example, whether {{% param "product.abbrev" %}} should use DNS resolution to resolve IP addresses.
    
    ```shell
        options { use-dns(no); };
    ```

  - Objects can be used before definition.

  - Objects can be defined inline as well. This is useful if you use the object only once (for example, a filter).

  - To add comments to the configuration file, start a line with `#` and write your comments. These lines are ignored by {{% param "product.abbrev" %}}.
    
    ```shell
    #Comment: This is a stream source
    source s_demo_stream {
    unix-stream("<path-to-socket>" max-connections(10) group(log)); };
    ```

The syntax of log statements is as follows:

```shell
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

```shell
source s_localhost { network(ip(127.0.0.1) port(1999)); };
destination d_tcp { network("10.1.2.3" port(1999) localport(999)); };
log { source(s_localhost); destination(d_tcp); };
```

The {{% param "product.abbrev" %}} application has a number of global options governing DNS usage, the timestamp format used, and other general points. Each option may have parameters, similarly to driver specifications. To set global options add an option statement to the {{% param "product.abbrev" %}} configuration file using the following syntax:

```shell
options { option1(params); option2(params); ... };
```


## Example: Using global options

To disable domain name resolving, add the following line to the {{% param "product.abbrev" %}} configuration file:

```shell
options { use-dns(no); };
```


The sources, destinations, and filters available in {{% param "product.abbrev" %}} are listed below. For details, see the [{{% param "product.abbrev" %}} documentation](https://axoflow.com/).


## Table: Available source drivers

{{< list-drivers "chapter-sources" >}}

<span id="idm45287286060496"></span>

## Table 2. Available destination drivers

{{< list-drivers "chapter-destinations" >}}

<span id="idm45287285998944"></span>

## Table 3. Filter functions

| Name                       | Description                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| [facility()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-facility/_index.md" >}}) | Filter messages based on the sending facility.                                            |
| [filter()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-filter/_index.md" >}}) | Call another filter function.                                                             |
| [host()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-host/_index.md" >}}) | Filter messages based on the sending host.                                                |
| [in-list()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-inlist/_index.md" >}}) | File-based whitelisting and blacklisting.                                                 |
| [level() or priority()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-priority/_index.md" >}}) | Filter messages based on their priority.                                                  |
| [match()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-match/_index.md" >}}) | Use a regular expression to filter messages based on a specified header or content field. |
| [message()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-message/_index.md" >}}) | Use a regular expression to filter messages based on their content.                       |
| [netmask()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-netmask/_index.md" >}}) | Filter messages based on the IPv4 address of the sending host.                              |
| [netmask6()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-netmask6/_index.md" >}}) | Filter messages based on the IPv6 address of the sending host.                              |
| [program()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-program/_index.md" >}}) | Filter messages based on the sending application.                                         |
| [rate-limit()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-rate-limit/_index.md" >}}) | Limit messages rate based on arbitrary keys in each message.       |
| [source()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-source/_index.md" >}}) | Select messages of the specified {{% param "product.abbrev" %}} source statement.       |
| [tags()]({{< relref "/chapter-routing-filters/filters/reference-filters/filter-tags/_index.md" >}}) | Select messages having the specified tag.                                                 |

<!-- FIXME Add a similar table for parsers-->

## Files

`/opt/syslog-ng/`

`/opt/syslog-ng/etc/syslog-ng.conf`



## See also

[syslog-ng.8](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/syslog-ng.8/)

{{< include-headless "chunk/manpage-more-info.md" >}}
