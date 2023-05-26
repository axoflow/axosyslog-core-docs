---
title: "Setting the priority of a message with the set-pri() rewrite function"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

You can set the `PRI` value of a [BSD]({{< relref "/docs/chapter-concepts/concepts-message-structure/concepts-message-bsdsyslog/concepts-message-bsdsyslog-pri/_index.md" >}}) or [IETF]({{< relref "/docs/chapter-concepts/concepts-message-structure/concepts-message-ietfsyslog/_index.md" >}}) syslog message with the `set-pri()` rewrite function by specifying a template string. This is useful, for example, if incoming messages do not have a `PRI` value specified by default, but a PRI value is required for filtering purposes.

When configured, the `set-pri()` function will only rewrite the `PRI` value of the message field.

{{% alert title="Note" color="info" %}}

If the specified parameter value is not a valid value, the function ignores it and sends a debug message. However, the {{% param "product.name" %}} ({{% param "product.abbrev" %}}) application will still send the message.

{{% /alert %}}


## Declaration

```c
   rewrite <rule-name> {
        set-pri("template-string");
    };
```



## Parameters

The `set-pri()` rewrite function expects a template string as its only parameter, for example:

  - set-pri("42");

  - set-pri("$.json.priority");



## Accepted values

The template string specified for the `set-pri()` rewrite function must expand to a natural number in the interval of 0–1023, inclusive. This means that if you, for example, extract the value from a syslog `\<PRI\>` header (such as `\<42\>`), then you need to remove the opening and closing brackets (`\<` `\>`) in the specified template string.



## Example: Temporarily raising the priority of an application

In the following example, the `set-pri()` rewrite function is used to temporarily raise the priority of the application `myprogram`:

```c
   log {
      source { system(); };
      if (program("myprogram")){
      rewrite { set-pri("92"); };
      };
      destination { file("/var/log/mail.log"); };
      flags(flow-control);
    }
```



## Example: Changing the priority of an application log message in JSON format

In the following example, an application sends log messages in the following JSON format:

```c
   {
    "time": "2003-10-11T22:14:15.003Z",
    "host": "mymachine",
    "priority": "165",
    "message": "An application event log entry."
    }
```

You can parse these logs with the {{% xref "/docs/chapter-parsers/json-parser/_index.md" %}} function:

```c
   {
    parser p_json {
    json-parser (prefix(".json."));
    }
```

As the application message contains a valid priority field, you can use the `set-pri()` rewrite function to modify the priority of the message:

```c
   set-pri("$.json.priority");
```

