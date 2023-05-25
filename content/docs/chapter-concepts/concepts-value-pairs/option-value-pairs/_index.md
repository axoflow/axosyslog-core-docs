---
title: "value-pairs()"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Type:</td>
<td>parameter list of the `value-pairs()` option</td>
</tr>
<tr class="even">
<td>Default:</td>
<td>```c
<pre><code>empty string</code></pre>
```</td>
</tr>
</tbody>
</table>

*Description:* The `value-pairs()` option allows you to select specific information about a message easily using predefined macro groups. The selected information is represented as name-value pairs and can be used formatted to JSON format, or directly used in a `mongodb()` destination.


## Example: Using the value-pairs() option

The following example selects every available information about the log message, except for the date-related macros (`R_\*` and `S_\*`), selects the `.SDATA.meta.sequenceId` macro, and defines a new value-pair called `MSGHDR` that contains the program name and PID of the application that sent the log message.

```c

    value-pairs(
        scope(nv_pairs core syslog all_macros selected_macros everything)
        exclude("R_*")
        exclude("S_*")
        key(".SDATA.meta.sequenceId")
        pair("MSGHDR" "$PROGRAM[$PID]: ")
    )

```

The following example selects the same information as the previous example, but converts it into JSON format.

```c

    $(format-json --scope nv_pairs,core,syslog,all_macros,selected_macros,everything \
        --exclude R_* --exclude S_* --key .SDATA.meta.sequenceId \
        --pair MSGHDR="$PROGRAM[$PID]: ")

```


{{% alert title="Note" color="info" %}}

Every macro is included in the selection only once, but redundant information may appear if multiple macros include the same information (for example, including several date-related macros in the selection).

{{% /alert %}}

The `value-pairs()` option has the following parameters. The parameters are evaluated in the following order:

1.  [`scope()`]({{< relref "/docs/chapter-concepts/concepts-value-pairs/_index.md" >}})

2.  [`exclude()`]({{< relref "/docs/chapter-concepts/concepts-value-pairs/_index.md" >}})

3.  [`key()`]({{< relref "/docs/chapter-concepts/concepts-value-pairs/_index.md" >}})

4.  [`pair()`]({{< relref "/docs/chapter-concepts/concepts-value-pairs/_index.md" >}})

*exclude()*

Type:

Space-separated list of macros to remove from the selection created using the `scope()` option.

Default:

empty string

*Description:* This option removes the specified macros from the selection. Use it to remove unneeded macros selected using the `scope()` parameter.

For example, the following example removes the SDATA macros from the selection.

```c

    value-pairs(
        scope(rfc5424 selected_macros)
        exclude(".SDATA*")
    )

```

The name of the macro to remove can include wildcards `(\*, ?)`. Regular expressions are not supported.

*key()*

Type:

Space-separated list of macros to be included in selection

Default:

empty string

*Description:* This option selects the specified macros. The selected macros will be included as `MACRONAME = MACROVALUE`, that is using `key("HOST")` will result in `HOST = $HOST`. You can use wildcards `(\*, ?)` to select multiple macros. For example:

```c

    value-pairs(
        scope(rfc3164)
        key("HOST")
    )

```

```c

    value-pairs(
        scope(rfc3164)
        key("HOST", "PROGRAM")
    )

```

*omit-empty-values()*

 

Type:

flag

Default:

N/A

*Description:* If this option is specified, {{% productparam "abbrev" %}} does not include value-pairs with empty values in the output. For example: `$(format-json --scope none --omit-empty-values)` or

```c

    value-pairs(
        scope(rfc3164 selected-macros)
        omit-empty-values()
    )

```

Available in {{% productparam "abbrev" %}} version {{% conditional-text include-if="pe" %}}7.0.14{{% /conditional-text %}}{{% conditional-text include-if="ose" %}}3.21{{% /conditional-text %}} and later.

 

*pair()*

Type:

name value pairs in `"\<NAME\>" "\<VALUE\>"` format

Default:

empty string

*Description:* This option defines a new name-value pair to be included in the message. The value part can include macros, templates, and template functions as well. For example:

```c

    value-pairs(
        scope(rfc3164)
        pair("TIME" "$HOUR:$MIN")
        pair("MSGHDR" "$PROGRAM[$PID]: ")
    )

```

*rekey()*

Type:

\<pattern-to-select-names\>, \<list of transformations\>

Default:

empty string

*Description:* This option allows you to manipulate and modify the name of the value-pairs. You can define transformations, which are are applied to the selected name-value pairs. The first parameter of the `rekey()` option is a glob pattern that selects the name-value pairs to modify. If you omit the pattern, the transformations are applied to every key of the scope. For details on globs, see [glob]({{< relref "/docs/chapter-manipulating-messages/regular-expressions/reference-regexp-types/_index.md" >}}).

If you want to modify the names of several message fields, see also {{% xref "/docs/chapter-manipulating-messages/modifying-messages/parser-map-value-pairs/_index.md" %}}.

  - If `rekey()` is used within a `key()` option, the name-value pairs specified in the glob of the `key()` option are transformed.

  - If `rekey()` is used outside the `key()` option, every name-value pair of the `scope()` is transformed.

The following transformations are available:

  - `add-prefix("\<my-prefix\>")`
    
    Adds the specified prefix to every name. For example, `rekey( add-prefix("my-prefix."))`

  - `replace-prefix("\<prefix-to-replace\>", "\<new-prefix\>")`
    
    Replaces a substring at the beginning of the key with another string. Only prefixes can be replaced. For example, `replace-prefix(".class", ".patterndb")` changes the beginning tag `.class` to `.patterndb`
    
    This option was called `replace()` in {{% productparam "abbrev" %}} version 3.4.

  - `shift("\<number\>")`
    
    Cuts the specified number of characters from the beginning of the name.

  - `shift-levels("\<number\>")`
    
    Similar to --shift, but instead of cutting characters, it cuts dot-delimited "levels" in the name (including the initial dot). For example, `--shift-levels 2` deletes the prefix up to the second dot in the name of the key: `.iptables.SRC` becomes `SRC`


## Example: Using the rekey() option {#example-value-pairs-rekey}

The following sample selects every value-pair that begins with `.cee.`, deletes this prefix by cutting 4 characters from the names, and adds a new prefix (`events.`).

```c

    value-pairs(
        key(".cee.*"
            rekey(
                shift(4)
                add-prefix("events.")
            )
        )
    )

```

The `rekey()` option can be used with the `format-json` template-function as well, using the following syntax:

```c

    $(format-json --rekey .cee.* --add-prefix events.)

```


*scope()*

Type:

space-separated list of macro groups to include in selection

Default:

empty string

*Description:* This option selects predefined groups of macros. The following groups are available:

  - *nv-pairs*: Every soft macro (name-value pair) associated with the message, except the ones that start with a dot (.) character. Macros starting with a dot character are generated within {{% productparam "abbrev" %}} and are not originally part of the message, therefore are not included in this group.

  - *dot-nv-pairs*: Every soft macro (name-value pair) associated with the message which starts with a dot (.) character. For example, `.classifier.rule_id` and `.sdata.\*`. Macros starting with a dot character are generated within {{% productparam "abbrev" %}} and are not originally part of the message.

  - *all-nv-pairs*: Include every soft macro (name-value pair). Equivalent to using both `nv-pairs` and `dot-nv-pairs`.

  - *rfc3164*: The macros that correspond to the RFC3164 (legacy or BSD-syslog) message format: `$FACILITY`, `$PRIORITY`, `$HOST`, `$PROGRAM`, `$PID`, `$MESSAGE`, and `$DATE`.

  - *rfc5424*: The macros that correspond to the RFC5424 (IETF-syslog) message format: `$FACILITY`, `$PRIORITY`, `$HOST`, `$PROGRAM`, `$PID`, `$MESSAGE`, `$MSGID`, `$R_DATE`, and the metadata from the structured-data (SDATA) part of RFC5424-formatted messages, that is, every macro that starts with `.SDATA.`.
    
    The `rfc5424` group also has the following alias: `syslog-proto`. Note that the value of `$R_DATE` will be listed under the `DATE` key.
    
    The `rfc5424` group does not contain any metadata about the message, only information that was present in the original message. To include the most commonly used metadata (for example, the `$SOURCEIP` macro), use the `selected-macros` group instead.

  - *all-macros*: Include every hard macro. This group is mainly useful for debugging, as it contains redundant information (for example, the date-related macros include the date-related information several times in various formats).

  - *selected-macros*: Include the macros of the `rfc3164` groups, and the most commonly used metadata about the log message: the `$TAGS`, `$SOURCEIP`, and `$SEQNUM` macros.

  - *sdata*: The metadata from the structured-data (SDATA) part of RFC5424-formatted messages, that is, every macro that starts with `.SDATA.`

  - *everything*: Include every hard and soft macros. This group is mainly useful for debugging, as it contains redundant information (for example, the date-related macros include the date-related information several times in various formats).

  - *none*: Reset previously added scopes, for example, to delete automatically-added name-value pairs. The following example deletes every value-pair from the scope, and adds only the ones starting with iptables: `$(format-welf --scope none .iptables.\*)`

For example:

```c

    value-pairs(
        scope(rfc3164 selected-macros)
    )

```
