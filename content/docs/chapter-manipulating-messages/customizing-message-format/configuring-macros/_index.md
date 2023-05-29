---
title: "Templates and macros"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application allows you to define message templates, and reference them from every object that can use a template. Templates can include strings, macros (for example, date, the hostname, and so on), and template functions. For example, you can use templates to create standard message formats or filenames. For a list of macros available in {{% param "product.name" %}}, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" %}}. Fields from the structured data (SD) part of messages using the new IETF-syslog standard can also be used as macros.


## Declaration:

```c
   template <template-name> {
        template("<template-expression>") <template-escape(yes)>;
    };
```


Template objects have a single option called `template-escape()`, which is disabled by default (`template-escape(no)`). This behavior is useful when the messages are passed to an application that cannot handle escaped characters properly. Enabling template escaping (`template-escape(yes)`) causes `syslog-ng` to escape the `'`, `"`, and backslash characters from the messages.

If you do not want to enable the `template-escape()` option (which is rarely needed), you can define the template without the enclosing braces.

```c
   template <template-name> "<template-expression>";
```

You can also refer to an existing template from within a template. The result of the referred template will be pasted into the second template.

```c
   template first-template "sample-text";
    template second-template "The result of the first-template is: $(template first-template)";
```

If you want to use a template only once, you can define the template inline, for example:

```c
   destination d_file {
        file ("/var/log/messages" template("${ISODATE} ${HOST} ${MESSAGE}\n") );
    };
```

Macros can be included by prefixing the macro name with a `$` sign, just like in Bourne compatible shells. Although using braces around macro names is not mandatory, and the `"$MESSAGE"` and `"${MESSAGE}"` formats are equivalent, using the `"${MESSAGE}"` format is recommended for clarity.

Macro names are case-sensitive, that is, `"$message"` and `"$MESSAGE"` are not the same.

To use a literal `$` character in a template, you have to escape it. In {{% param "product.abbrev" %}} versions 3.4 and earlier, use a backslash `(`\\$`)`. In version 3.5 and later, use `$$`.

{{< include-headless "wnt/note-escape-at.md" >}}

Default values for macros can also be specified by appending the `:-` characters and the default value of the macro. If a message does not contain the field referred to by the macro, or it is empty, the default value will be used when expanding the macro. For example, if a message does not contain a hostname, the following macro can specify a default hostname.

```c
${HOST:-default_hostname}
```

By default, `syslog-ng` sends messages using the following template: `${ISODATE} ${HOST} ${MSGHDR}${MESSAGE}\\n`. (The `${MSGHDR}${MESSAGE}` part is written together because the `${MSGHDR}` macro includes a trailing whitespace.)


## Example: Using templates and macros

The following template (`t_demo_filetemplate`) adds the date of the message and the name of the host sending the message to the beginning of the message text. The template is then used in a file destination: messages sent to this destination (`d_file`) will use the message format defined in the template.

```c
   template t_demo_filetemplate {
        template("${ISODATE} ${HOST} ${MESSAGE}\n");
    };
    destination d_file {
        file("/var/log/messages" template(t_demo_filetemplate));
    };
```

If you do not want to enable the `template-escape()` option (which is rarely needed), you can define the template without the enclosing braces. The following two templates are equivalent.

```c
   template t_demo_template-with-braces {
        template("${ISODATE} ${HOST} ${MESSAGE}\n");
    };
    template t_demo_template-without-braces "${ISODATE} ${HOST} ${MESSAGE}\n";
```

Templates can also be used inline, if they are used only at a single location. The following destination is equivalent with the previous example:

```c
   destination d_file {
        file ("/var/log/messages" template("${ISODATE} ${HOST} ${MESSAGE}\n") );
    };
```

The following file destination uses macros to daily create separate logfiles for every client host.

```c
   destination d_file {
            file("/var/log/${YEAR}.${MONTH}.${DAY}/${HOST}.log");
    };
```


{{% alert title="Note" color="info" %}}

Macros can be used to format messages, and also in the name of destination files or database tables. However, they cannot be used in sources as wildcards, for example, to read messages from files or directories that include a date in their name.

{{% /alert %}}
