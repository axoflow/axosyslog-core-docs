---
title: "Using template functions"
weight:  1100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

A template function is a transformation: it modifies the way macros or name-value pairs are expanded. Template functions can be used in template definitions, or when macros are used in the configuration of {{% productparam "abbrev" %}}. Template functions use the following syntax:

```c

    $(function-name parameter1 parameter2 parameter3 ...)

```

For example, the `$(echo)` template function simply returns the value of the macro it receives as a parameter, thus `$(echo ${HOST})` is equivalent to `${HOST}`.

The parameters of template functions are separated by a whitespace character. A template function can have maximum 64 parameters. If you want to use a longer string or multiple macros as a single parameter, enclose the parameter in double-quotes or apostrophes. For example:

```c

    $(echo "${HOST} ${PROGRAM} ${PID}")

```

Template functions can be nested into each other, so the parameter of a template function can be another template function, like:

```c

    $(echo $(echo ${HOST}))

```

For details on the available template functions, see the descriptions of the individual template functions in {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" %}}.

You can define your own template function as a regular configuration object (for example, to reuse the same function in different places in your configuration).


## Declaration:

```c

    template-function <name-of-the-template-function> "<template-expression-using-strings-macros-template-functions>";

```



## Example: Using custom template functions

The following template function can be used to reformat the message. It adds the length of the message to the message template.

```c

    template-function my-template-function "${ISODATE} ${HOST} message-length=$(length "${MSG}") ${MESSAGE}";
    destination d_file {
        file("/tmp/mylogs.log" template("$(my-template-function)\n"));
    };

```

You can also refer to existing templates in your template function.

```c

    template my-custom-header-template "${ISODATE} ${HOST_FROM} ${MSGHDR}";
    template-function my-template-function "$(my-custom-header-template) message-length=$(length "${MESSAGE}") ${MESSAGE}";

```

