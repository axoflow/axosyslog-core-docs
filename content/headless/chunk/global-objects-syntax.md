---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
- The main body of the configuration file consists of object definitions: sources, destinations, logpaths define which log message are received and where they are sent. All identifiers, option names and attributes, and any other strings used in the `syslog-ng.conf` configuration file are case sensitive. Object definitions (also called statements) have the following syntax:
    
    ```c
        type-of-the-object identifier-of-the-object {<parameters>};
    ```
    
    - *Type of the object*: One of `source`, `destination`, `log`, `filter`, `parser`, `rewrite` rule, or `template`.
    
    - *Identifier of the object*: A unique name identifying the object. When using a reserved word as an identifier, enclose the identifier in quotation marks.
        
        All identifiers, attributes, and any other strings used in the `syslog-ng.conf` configuration file are case sensitive.
        
        {{< alert title="Note" color="info" >}}Use identifiers that refer to the type of the object they identify. For example, prefix source objects with `s_`, destinations with `d_`, and so on.

Repeating a definition of an object (that is, defining the same object with the same id more than once) is not allowed, unless you use the `@define allow-config-dups 1` definition in the configuration file.
        {{< /alert >}}
    
    - *Parameters*: The parameters of the object, enclosed in braces `{parameters}`.

    - *Semicolon*: Object definitions end with a semicolon (`;`).
    
    For example, the following line defines a source and calls it `s_internal`.
    
    ```c
        source s_internal {
            internal();
        };
    ```
    
    The object can be later referenced in other statements using its ID, for example, the previous source is used as a parameter of the following log statement:
    
    ```c
        log {
            source(s_internal); destination(d_file);
        };
    ```

- The parameters and options within a statement are similar to function calls of the C programming language: the name of the option followed by a list of its parameters enclosed within brackets and terminated with a semicolon.
    
    ```c
        option(parameter1, parameter2); option2(parameter1, parameter2);
    ```
    
    For example, the `file()` driver in the following source statement has three options: the filename (`/var/log/apache/access.log`), `follow-freq()`, and `flags()`. The `follow-freq()` option also has a parameter, while the `flags()` option has two parameters.
    
    ```c
        source s_tail {
            file("/var/log/apache/access.log" follow-freq(1) flags(no-parse, validate-utf8));
        };
    ```
    
    Objects may have required and optional parameters. Required parameters are positional, meaning that they must be specified in a defined order. Optional parameters can be specified in any order using the `option(value)` format. If a parameter (optional or required) is not specified, its default value is used. The parameters and their default values are listed in the reference section of the particular object.
    
    
    ## Example: Using required and optional parameters
    
    The `unix-stream()` source driver has a single required argument: the name of the socket to listen on. Optional parameters follow the socket name in any order, so the following source definitions have the same effect:
    
    ```c
        source s_demo_stream1 {
            unix-stream("<path-to-socket>" max-connections(10) group(log));
        };
        source s_demo_stream2 {
            unix-stream("<path-to-socket>" group(log) max-connections(10));
        };
    ```
    

  - Some options are global options, or can be set globally, for example, whether {{% param "product.abbrev" %}} should use DNS resolution to resolve IP addresses. Global options are detailed in {{% xref "/docs/chapter-global-options/_index.md" %}}.
    
    ```c
        options {
            use-dns(no);
        };
    ```

  - Objects can be used before definition.

  - Objects can be defined inline as well. This is useful if you use the object only once (for example, a filter). For details, see {{% xref "/docs/chapter-configuration-file/inline-objects/_index.md" %}}.

  - To add comments to the configuration file, start a line with `#` and write your comments. These lines are ignored by `syslog-ng`.
    
    ```c
        # Comment: This is a stream source
        source s_demo_stream {
            unix-stream("<path-to-socket>" max-connections(10) group(log));
        };
    ```
