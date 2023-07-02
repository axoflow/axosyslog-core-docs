---
title: "Using pattern parsers"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Pattern parsers attempt to parse a part of the message using rules specific to the type of the parser. Parsers are enclosed between @ characters. The syntax of parsers is the following:

  - a beginning `@` character,

  - the type of the parser written in capitals,

  - optionally a name,

  - parameters of the parser, if any, and

  - a closing `@` character.


## Example: Pattern parser syntax

A simple parser:

```shell
   @STRING@
```

A named parser:

```shell
   @STRING:myparser_name@
```

A named parser with a parameter:

```shell
   @STRING:myparser_name:*@
```

A parser with a parameter, but without a name:

```shell
   @STRING::*@
```


Patterns and literals can be mixed together. For example, to parse a message that begins with the `Host: ` string followed by an IP address (for example, `Host: 192.168.1.1`), the following pattern can be used: `Host:@IPv4@`.

{{% alert title="Note" color="info" %}}

Note that using parsers is a CPU-intensive operation. Use the ESTRING and QSTRING parsers whenever possible, as these can be processed much faster than the other parsers.

{{% /alert %}}


## Example: Using the STRING and ESTRING parsers

For example, look at the following message: `user=joe96 group=somegroup`.

  - `@STRING:mytext:@` parses only to the first non-alphanumeric character (`=`), parsing only `user`, so the value of the ${mytext} macro will be `user`

  - `@STRING:mytext:=@` parses the equation mark as well, and proceeds to the next non-alphanumeric character (the whitespace), resulting in `user=joe96`

  - `@STRING:mytext:= @` will parse the whitespace as well, and proceed to the next non-alphanumeric non-equation mark non-whitespace character, resulting in `user=joe96 group=somegroup`

Of course, usually it is better to parse the different values separately, like this: `"user=@STRING:user@ group=@STRING:group@"`.

If the username or the group may contain non-alphanumeric characters, you can either include these in the second parameter of the parser (as shown at the beginning of this example), or use an ESTRING parser to parse the message till the next whitespace: `"user=@ESTRING:user: @group=@ESTRING:group: @"`.

