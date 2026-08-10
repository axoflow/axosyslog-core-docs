---
title: "Set message fields to specific values"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To set a field of the message to a specific value, you have to:

- define the string to include in the message, and
- select the field where it should be included.
- {{< include-headless "chunk/set-groupset-type-support.md" >}}

You can set the value of available macros, for example, HOST, MESSAGE, PROGRAM, or any user-defined macros created using parsers (for details, see {{% xref "/chapter-parsers/_index.md" %}} and {{% xref "/chapter-parsers/chapter-patterndb/_index.md" %}}). Note that the rewrite operation completely replaces any previous value of that field.

{{< include-headless "wnt/note-rewrite-hard-macros.md" >}}

Use the following syntax:

## Declaration

```shell
   rewrite <name_of_the_rule> {
        set("<string to include>", value(<field name>));
    };
```

## Example: Set message fields to a particular value {#example-rewrite-set}

The following example sets the HOST field of the message to `myhost`.

```shell
   rewrite r_rewrite_set{
        set("myhost", value("HOST"));
    };
```

The following example appends the "suffix" string to the MESSAGE field:

```shell
   rewrite r_rewrite_set{
        set("$MESSAGE suffix", value("MESSAGE"));
    };
```

For details on rewriting SDATA fields, see {{% xref "/chapter-manipulating-messages/modifying-messages/custom-sdata-fields/_index.md" %}}.

{{% alert title="Note" color="info" %}}
The `severity` and `facility` fields can only be set by the `set-severity()` rewrite functions. For more information, see {{% xref "/chapter-manipulating-messages/modifying-messages/rewrite-set-severity/_index.md" %}}.
{{% /alert %}}

## Options

The `set()` rewrite rule has the following options. In addition to `condition()`, `internal()`, and `value()`, `set()` accepts the template options listed below, which control how {{% param "product.abbrev" %}} expands the template in its first argument.

```shell
   rewrite <name_of_the_rule> {
        set("<string to include>", value(<field name>), on-error("fallback-to-string"));
    };
```

{{% include-headless "chunk/option-rewrite-condition.md" %}}

## frac-digits()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | `0`    |

*Description:* The number of digits that {{% param "product.abbrev" %}} stores when it expands a timestamp macro with fractions of a second. Overrides the global [`frac-digits()`]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-frac-digits" >}}) option for this rule.

{{< include-headless "chunk/option-source-internal.md" >}}

## local-time-zone()

|          |                                              |
| -------- | -------------------------------------------- |
| Type:    | name of the timezone, or the timezone offset |
| Default: | The local timezone.                          |

*Description:* Sets the timezone that {{% param "product.abbrev" %}} uses when it expands a timestamp macro as a local time.

{{% include-headless "chunk/para-timezone-format.md" %}}

{{< include-headless "chunk/option-destination-on-error.md" >}}

## send-time-zone()

|          |                                              |
| -------- | -------------------------------------------- |
| Type:    | name of the timezone, or the timezone offset |
| Default: | The local timezone.                          |

*Description:* Sets the timezone that {{% param "product.abbrev" %}} uses when it expands a timestamp macro. The `time-zone()` option is an alias of `send-time-zone()`.

{{% include-headless "chunk/para-timezone-format.md" %}}

## template-escape()

|          |             |
| -------- | ----------- |
| Type:    | `yes`, `no` |
| Default: | `no`        |

*Description:* Turns on escaping for the `'`, `"`, and backspace characters in the expanded value.

## time-zone()

|          |                                              |
| -------- | -------------------------------------------- |
| Type:    | name of the timezone, or the timezone offset |
| Default: | The local timezone.                          |

*Description:* Alias of [`send-time-zone()`](#send-time-zone).

## ts-format()

|          |                                    |
| -------- | ---------------------------------- |
| Type:    | `rfc3164`, `bsd`, `rfc3339`, `iso` |
| Default: | `rfc3164`                          |

*Description:* Overrides the global [`ts-format()`]({{< relref "/chapter-global-options/reference-options/_index.md" >}}) option for the timestamp macros that this rule expands.

{{% include-headless "chunk/option-rewrite-value.md" %}}
