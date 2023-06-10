---
title: "Reusing configuration blocks"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To create a reusable configuration snippet and reuse parts of a configuration file, you have to define the block (for example, a source) once, and reference it later. ([Such reusable blocks are sometimes called a Source Configuration Library, or SCL.](https://www.syslog-ng.com/community/b/blog/posts/creating-your-first-block-for-the-syslog-ng-configuration-library-scl)) Any syslog-ng object can be a block. Use the following syntax to define a block:

```c

    block type name() {<contents of the block>};

```

Type must be one of the following: `destination`, `filter`, `log`, `options`, `parser`, `rewrite`, `root`, `source`. The `root` blocks can be used in the "root" context of the configuration file, that is, outside any other statements.

Note that `options` can be used in blocks only in version {{% conditional-text include-if="ose" %}}3.22{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7.0.15{{% /conditional-text %}} and later.

Blocks may be nested into each other, so for example, a block can be built from other blocks. Blocks are somewhat similar to C++ templates.

The type and name combination of each block must be unique, that is, two blocks can have the same name if their type is different.

To use a block in your configuration file, you have to do two things:

  - Include the file defining the block in the `syslog-ng.conf` file — or a file already included into `syslog-ng.conf`. Version {{% conditional-text include-if="ose" %}}3.7{{% /conditional-text %}} and newer automatically includes the `\*.conf` files from the `\<directory-where-syslog-ng-is-installed\>/scl/\*/` directories.

  - Reference the name of the block in your configuration file. This will insert the block into your configuration. For example, to use a block called `myblock`, include the following line in your configuration:
    
    ```c
    
        myblock()
    
    ```
    
    Blocks may have parameters, but even if they do not, the reference must include opening and closing parentheses like in the previous example.

The contents of the block will be inserted into the configuration when {{% param "product.abbrev" %}} is started or reloaded.


## Example: Reusing configuration blocks {#example-configuration-block}

Suppose you are running an application on your hosts that logs into the `/opt/var/myapplication.log` file. Create a file (for example, `myblocks.conf`) that stores a source describing this file and how it should be read:

```c

    block source myappsource() {
            file("/opt/var/myapplication.log" follow-freq(1) default-facility(syslog)); };

```

Include this file in your main syslog-ng configuration file, reference the block, and use it in a logpath:

```c

    @version: {{% param "product.techversion" %}}
    @include "<correct/path>/myblocks.conf"
    source s_myappsource { myappsource(); };
    ...
    log { source(s_myappsource); destination(...); };

```


To define a block that defines more than one object, use **root** as the type of the block, and reference the block from the main part of the {{% param "product.abbrev" %}} configuration file.


## Example: Defining blocks with multiple elements {#example-configuration-block-root}

The following example defines a source, a destination, and a log path to connect them.

```c

    block root mylogs() {
        source s_file {
            file("/var/log/mylogs.log" follow-freq(1));
        };
        destination d_local {
            file("/var/log/messages");
        };
        log {
            source(s_file); destination(d_local);
        };
    };

```


{{% alert title="Note" color="info" %}}

Since the block is inserted into the {{% param "product.abbrev" %}} configuration when {{% param "product.abbrev" %}} is started, the block can be generated dynamically using an external script if needed. This is useful when you are running {{% param "product.abbrev" %}} on different hosts and you want to keep the main configuration identical.

If you want to reuse more than a single configuration object, for example, a logpath and the definitions of its sources and destinations, use the include feature to reuse the entire snippet. For details, see {{% xref "/docs/chapter-configuration-file/large-configs/including-config-files/_index.md" %}}.

{{% /alert %}}


## Mandatory parameters

You can express in block definitons that a parameter is mandatory by defining it with empty brackets `()`. In this case, the parameter must be overridden in the reference block. Failing to do so will result in an error message and initialization failure.

To make a parameter expand into nothing (for example, because it has no default value, like `hook-commands()` or `tls()`), insert a pair of double quote marks inside the empty brackets: **("")**


## Example: Mandatory parameters

The following example defines a TCP source that can receive the following parameters: the port where {{% param "product.abbrev" %}} listens (`localport`), and optionally source flags (`flags`).

```c

    block source my_tcp_source(localport() flags("")) {
        network(port(`localport`) transport(tcp) flags(`flags`));
    };

```

Because `localport` is defined with empty brackets `()`, it is a mandatory parameter. However, the `flags` parameter is not mandatory, because it is defined with an empty double quote bracket pair `("")`. If you do not enter a specific value when referencing this parameter, the value will be an empty string. This means that in this case

```c

    my_tcp_source(localport(8080))

```

will be expanded to:

```c

    network(port(8080) transport(tcp) flags());

```




## Passing arguments to configuration blocks

Configuration blocks can receive arguments as well. The parameters the block can receive must be specified when the block is defined, using the following syntax:

```c

    block type block_name(argument1(<default-value-of-the-argument>) argument2(<default-value-of-the-argument>) argument3())

```

If an argument does not have a default value, use an empty double quote bracket pair **("")** after the name of the argument. To refer the value of the argument in the block, use the name of the argument between backticks (for example, **`argument1`**).


## Example: Passing arguments to blocks

The following sample defines a file source block, which can receive the name of the file as a parameter. If no parameter is set, it reads messages from the `/var/log/messages` file.

```c

    block source s_logfile (filename("messages")) {
        file("/var/log/`filename`" );
    };
    
    source s_example {
        s_logfile(filename("logfile.log"));
    };

```


If you reference the block with more arguments then specified in its definition, you can use these additional arguments as a single argument-list within the block. That way, you can use a variable number of optional arguments in your block. This can be useful when passing arguments to a template, or optional arguments to an underlying driver.

The three dots (`…`) at the end of the argument list refer to any additional parameters. It tells {{% param "product.abbrev" %}} that this macro accepts ``__VARARGS__``, therefore any name-value pair can be passed without validation. To reference this argument-list, insert **`__VARARGS__`** to the place in the block where you want to insert the argument-list. Note that you can use this only once in a block.

The following definition extends the logfile block from the previous example, and passes the optional arguments (`follow-freq(1) flags(no-parse)`) to the `file()` source.

```c

    block source s_logfile(filename("messages") ...) {
        file("/var/log/`filename`" `__VARARGS__`);
    };
    
    source s_example {
        s_logfile(
            filename("logfile.log")
            follow-freq(1)
            flags(no-parse)
        );
    };

```


## Example: Using arguments in blocks

The following example is the code of the [`pacct()` source driver]({{< relref "/docs/chapter-sources/source-pacct/_index.md" >}}), which is actually a block that can optionally receive two arguments.

```c

    block source pacct(file("/var/log/account/pacct") follow-freq(1) ...) {
        file("`file`" follow-freq(`follow-freq`) format("pacct") tags(".pacct") `__VARARGS__`);
    };

```



## Example: Defining global options in blocks

The following example defines a block called `setup-dns()` to set DNS-related settings at a single place.

```c

    block options setup-dns(use-dns()) {
        keep-hostname(no);
        use-dns(`use-dns`);
        use-fqdn(`use-dns`);
    dns-cache(`use-dns`);
    };
    
    options {
        setup-dns(use-dns(yes));
    };

```


