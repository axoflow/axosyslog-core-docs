---
title: "Regular expression (regexp) parser"
weight:  4100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application can parse fields from a message with the help of regular expressions. This can be also achieved with the `match()` filter, by setting the store-matches flag, but the `regexp-parser()` offers more flexibility, like multiple patterns and setting the prefix of the created name-value pairs.

{{% alert title="Note" color="info" %}}

The `regexp-parser()` can create additional name-value pairs only if "named capture groups" are used in the regular expression, for example `(?\<test_field\>\\w+)`. For more information, see "named capture groups" in [PCRE documentation](https://www.pcre.org/current/doc/html/pcre2pattern.html#SEC16).

{{% /alert %}}

For more information about regular expressions in {{% param "product.abbrev" %}}, see {{% xref "/docs/chapter-manipulating-messages/regular-expressions/_index.md" %}}.

For example:


## Declaration:

```c
   parser p_regexp {
        regexp-parser(
        patterns( ... )
        );
    };

```



## Example: Using a regexp-parser()

In the following example, the incoming log message is the following:

```c
   Apr 20 11:09:46 test_field -> test_value

```

The regexp-parser inserts the `.regexp.` prefix before all extracted name-value pairs. The destination is a file, that uses the format-json template function. Every name-value pair that begins with a dot (`.`) character will be written to the file (dot-nv-pairs). The log line connects the source, the parser and the destination.

```c
   source s_network {
        network(
            port(21514)
            flags(no-parse)
        );
    };
    parser p_regexp {
        regexp-parser(
            patterns(".*test_field -> (?<test_field>.*)$")
            prefix(".regexp.")
        );
    };
    destination d_file {
        file(
            "/tmp/test.json"
            template("$(format-json --scope dot-nv-pairs)\n")
        );
    };
    log {
        source(s_network);
        parser(p_regexp);
        destination(d_file);
    };

```

You can also define the parser inline in the log path.

```c
   source s_network {
        network(
            port(21514)
            flags(no-parse)
        );
    };
    destination d_file {
        file(
            "/tmp/test.json"
            template("$(format-json --scope dot-nv-pairs)\n")
        );
    };
    log {
        source(s_network);
        parser{
            regexp-parser(
                patterns(".*test_field -> (?<test_field>.*)$")
                prefix(".regexp.")
            );
        };
        destination(d_file);
    };

```

You can set multiple patterns:

```c
   parser p_regexp {
        regexp-parser(
            patterns(".*test_field -> (?<test_field>.*)$", ".*other_format: (?<foo>.*)$")
            prefix(".regexp.")
        );
    };

```

