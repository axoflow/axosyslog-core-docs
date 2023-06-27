---
title: "Template functions of AxoSyslog"
weight:  1300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The following template functions are available in {{% param "product.abbrev" %}}.


## base64-encode {#template-function-base64-encode}

*Syntax:*

    $(base64-encode argument)

*Description:* You can use the `base64-encode` template function to [base64-encode](https://tools.ietf.org/html/rfc4648) strings and macros. The template function can receive multiple parameters (maximum 64). In this case, {{% param "product.abbrev" %}} joins the parameters into a single string and encodes this string. For example, `$(base64-encode string1 string2)` is equivalent to `$(base64-encode string1string2)`.

Available in {{% param "product.abbrev" %}} version 3.18 and later.



## basename {#template-function-basename}

*Syntax:*

    $(basename argument)

*Description:* Returns the filename from an argument (for example, a macro: `$(basename ${FILE_NAME})`) that contains a filename with a path. For example, `$(basename "/var/log/messages.log")` returns `messages.log`. To [extract the path, use the dirname template function]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}).

Available in {{% param "product.abbrev" %}} version 3.10 and later.



## ceil {#template-function-ceil}

*Syntax:*

    $(ceil argument)

*Description:* Rounds a floating-point number upwards to the nearest integer. For example, `$(ceil 1.5)` is 2, `$(ceil -1.5)` is -1. See also the `floor` and `round` template functions.



## context-lookup {#template-function-context-lookup}

*Syntax:*

    $(context-lookup [option] condition value-to-select)

*Description:* The `context-lookup` template function can search a message context when correlating messages (for example, when you use a [pattern database]({{< relref "/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" >}}) or the [grouping-by parser]({{< relref "/chapter-correlating-log-messages/grouping-by-parser/_index.md" >}})). The `context-lookup` template function requires a condition (a filter or a string), and returns a specific macro or template of the matching messages (for example, the ${MESSAGE}) as a list. It works similarly to the [`$(grep)`]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}) template function, but it escapes its output properly, so that the returned value is a list that can be processed with other template functions that work on lists, for example, `$(list-slice)`.


## Example: Using the context-lookup template function

The following example selects the message of the context that has a `username` name-value pair with the `root` value, and returns the value of the `tags` name-value pair.

```c
   $(context-lookup ("${username}" == "root") ${tags})
```


To limit the number of matches that the template function returns, use the `--max-count` option, for example, `$(context-lookup --max-count 5 ("${username}" == "root") ${tags})`. If you do not want to limit the number of matches, use `--max-count 0`.

You can to specify multiple name-value pairs as parameters, separated with commas. If multiple messages match the condition of `context-lookup`, these will be returned also separated by commas. This can be used for example, to collect the email recipients from postfix messages.

Available in {{% param "product.abbrev" %}} version 3.10 and later.



## context-values {#template-function-context-values}

*Syntax:*

    $(context-values $name-value1 $name-value2 ...)

*Description:* The `context-values` template function returns a list of every occurrence of the specified name-value pairs from the entire context. For example, if the context contains multiple messages, the `$(context-values ${HOST})` template function will return a comma-separated list of the `${HOST}` values that appear in the context.

Available in {{% param "product.abbrev" %}} version 3.10 and later.



## dirname {#template-function-dirname}

*Syntax:*

    $(dirname argument)

*Description:* Returns the path (without the filename) from an argument (for example, a macro: `$(basename ${FILE_NAME}`) that contains a filename with a path. For example, `$(dirname "/var/log/messages.log")` returns `/var/log` path. To [extract the filename, use the basename template function]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}).

Available in {{% param "product.abbrev" %}} version 3.10 and later.



## echo {#template-function-echo}

*Syntax:*

    $(echo argument)

*Description:* Returns the value of its argument. Using `$(echo ${HOST})` is equivalent to `${HOST}`.



## env {#template-function-env}

*Syntax:*

    $(env <environment-variable>)

*Description:* Returns the value of the specified environment variable. Available in {{% param "product.abbrev" %}} 3.5 and later.



## explode {#template-function-explode}

*Syntax:*

    $(explode <separator> <string1> <string2> ...)

*Description:* Turns a string separated by a specific character into a list. You can also use the [implode](#template-function-implode) template function, which turns a list into a string combining the pieces together with a separator. Available in {{% param "product.abbrev" %}} 3.21 and later.


## Example: Using the explode template function

The following configuration example turns strings into a list. If there are several strings, {{% param "product.abbrev" %}} looks for a separator within each individual string. For example, `string 2` is separated as `string, 2` in the example below:

| Configuration                                   | Result                             |
| ----------------------------------------------- | ---------------------------------- |
| `$(explode ';' string1;string 2;string3;string4)` | `"string1,string,2,string3,string4"` |

Enclose the strings in double-quotes or apostrophes and `string 2` is separated as shown below:

| Configuration                                             | Result                                     |
| --------------------------------------------------------- | ------------------------------------------ |
| `$(explode ' ' 'string1 string 2 string3 string4 string5')` | `"string1,string 2,string3,string4,string5"` |

The following examples replace the separator `';'` character with a `','` character:

| Configuration                                                | Result                                    |
| ------------------------------------------------------------ | ----------------------------------------- |
| `$(implode ',' $(explode ';' 'string1;string2;string3'))`  | `"string1,string2,string3"`                 |
| `$(explode ';' 'string1;string2;string3;string4;string5')` | `"string1,string2,string3,string4,string5"` |




<span id="filter-template-function"></span>

## filter

*Syntax:*

    $(filter <filter-expression> <list>)

*Description:* Runs the filter expression on each element of a given list, and returns only those list elements that meet the requirements of the filter expression. The current value is referred by `$_`, similarly to the [<span class="mcFormatColor" style="color: #04aada;">`map` template function</span>](#template-map).

{{% alert title="Note" color="info" %}}

You can use macros, logical expressions, and template functions inside the expression.

{{% /alert %}}

Available in {{% param "product.abbrev" %}} version 3.30 and later.


## Example: using the filter template function in your configuration

When used in configuration as seen in the example, the `filter` template function filters even numbers from an input list of `0`, `1`, `2` and `3`:

```c
   log {
      source { example-msg-generator(num(1) values(INPUT => "0,1,2,3")); };
      destination {
         file("/dev/stdout"
               template("$(filter ('$(% $_ 2)' eq '0') $INPUT)\n)")
         );
      };
    };
```

The returned values are `0` and `2`.


*Parameters:*

  - `<filter-expression>`
    
    Mandatory parameter.
    
    The `<filter-expression>` parameter can be:
    
      - a comparison
    
      - a filter
    
      - a logical expression built from filters (using `and`, `or`, and `not`)
    
    {{% alert title="Note" color="info" %}}
When using the `<filter-expression>` parameter, you can refer other template functions, or use macros.
    {{% /alert %}} {{% alert title="Note" color="info" %}}
To refer to the variable bound to the current element of the list, use `$_ macro`.
    {{% /alert %}}
    
    
    ## Examples for <filter-expression>
    
    The following examples illustrate several ways that you can use a single filter, or a logical expression built from several filters.
    
    ```c
        ('1' == '1')
        ('$_' le '1')
        ('$(% $_ 2)' eq '0')
        ('$_' le '1') and ('$(% $_ 2)' eq '0')
    ```
    

  - `list`
    
    Mandatory parameter. A {{% param "product.abbrev" %}} list.



## format-cef-extension {#template-function-format-cef-extension}

{{% param "product.abbrev" %}} version 3.8 includes a new template function (`format-cef-extension`) to format name-value pairs as ArcSight Common Event Format extensions. Note that the template function only formats the selected name-value pairs, it does not provide any mapping. There is no special support for creating the prefix part of a Common Event Format (CEF) message. Note that the order of the elements is random. For details on the CEF extension escaping rules format, see the [ArcSight Common Event Format](https://kc.mcafee.com/resources/sites/MCAFEE/content/live/CORP_KNOWLEDGEBASE/78000/KB78712/en_US/CEF_White_Paper_20100722.pdf).

You can use the [value-pairs]({{< relref "/chapter-concepts/concepts-value-pairs/_index.md" >}}) that {{% param "product.abbrev" %}} stores about the log message as CEF fields. Using value-pairs, you can:

  - select which value-pairs to use as CEF fields,

  - add custom value-pairs as CEF fields,

  - rename value-pairs, and so on.

For details, see {{% xref "/chapter-concepts/concepts-value-pairs/_index.md" %}}. Note that the syntax of `format-\*` template functions is different from the syntax of `value-pairs()`: these template functions use a syntax similar to command lines.

Using the `format-cef-extension` template function has the following prerequisites:

  - Set the `on-error` global option to `drop-property`, otherwise if the name of a name-value pair includes an invalid character, {{% param "product.abbrev" %}} drops the entire message. (Key name in CEF extensions can contain only the A-Z, a-z and 0-9 characters.)
    
    ```c
        options {
           on-error("drop-property");
        };
    ```

  - The log messages must be encoded in UTF-8. Use the `encoding()` option or the `validate-utf8` flag in the message source.


## Example: Using the format-cef-extension template function

The following example selects every available information about the log message, except for the date-related macros (`R_\*` and `S_\*`), selects the `.SDATA.meta.sequenceId` macro, and defines a new value-pair called `MSGHDR` that contains the program name and PID of the application that sent the log message (since you will use the template-function in a template, you must escape the double-quotes).

```c
   $(format-cef-extension --scope syslog,all_macros,selected_macros \
      --exclude R_* --exclude S_* --key .SDATA.meta.sequenceId \
      --pair MSGHDR=\"$PROGRAM[$PID]: \")
```

The following example selects every value-pair that has a name beginning with `.cef.`, but removes the `.cef.` prefix from the key names.

```c
   template("$(format-cef-extension --subkeys .cef.)\n")
```

The following example shows how to use this template function to store log messages in CEF format:

```c
   destination d_cef_extension {
        file("/var/log/messages.cef" template("${ISODATE} ${HOST} $(format-cef-extension --scope selected_macros --scope nv_pairs)\n"));
    };
```




## format-cim {#template-function-format-cim}

*Syntax:* `$(format-cim)`

*Description:* Formats the message into [Splunk Common Information Model (CIM) format](http://docs.splunk.com/Documentation/CIM/latest/User/Overview). Applications that can receive messages in CIM format include Kibana, logstash, and Splunk. Applications that can be configured to log into CIM format include nflog and the Suricata IDS engine.

```c
   destination d_cim {
        network(
            "192.168.1.1"
            template("$(format-cim)\n")
        );
    };
```

You can find the exact source of this template function in the [{{% param "product.abbrev" %}} GitHub repository](https://github.com/syslog-ng/syslog-ng/blob/master/scl/cim/template.conf).

{{% alert title="Note" color="info" %}}

To use the `format-cim()` template function, {{% param "product.abbrev" %}} must be compiled with JSON support. For details, see {{% xref "/chapter-install/syslog-ng-compile-options/_index.md" %}}. To see if your {{% param "product.abbrev" %}} binary was compiled with JSON support, execute the `syslog-ng --version` command.

{{% /alert %}}



## format-ewmm {#template-function-format-ewmm}

*Syntax:* `$(format-ewmm)`

*Description:* The `format-ewmm` template function converts the message into the [Enterprise-wide message model (EWMM) format]({{< relref "/chapter-concepts/concepts-message-structure/syslog-ng-message-format/_index.md" >}}). Available in version 3.16 and later.

{{% include-headless "chunk/example-ewmm-message-format.md" %}}



## format-flat-json {#template-function-format-flat-json}

*Syntax:* `$(format-flat-json parameters)`

*Description:* The `format-flat-json` template function is identical to the `format-json` template function, but nested JSON objects are flattened in the output. If you have to forward your log messages in JSON format, but the receiving application cannot handle nested JSON objects, use the `format-flat-json` template function.


## Example: Flattened JSON output

The following example shows the difference between nested and flattened JSON objects.

  - The output of `$(format-json a.b.c=1)` is a nested JSON object (whitespace added for better readability):
    
    ```c
        {
            "a": {
                "b": {
                "c": "1"
                }
            }
        }
    ```

  - The output of `$(format-flat-json a.b.c=1)` is a flattened JSON object (whitespace added for better readability):
    
    ```c
        {
            "a.b.c": "1"
        }
    ```


For details on formatting log messages into JSON format, see [](#template-function-format-json).



## format-gelf {#template-function-format-gelf}

*Syntax:* `$(format-gelf)`

*Description:* Available in {{% param "product.abbrev" %}} 3.13 and later.

You can use the Graylog Extended Log Format (GELF) template together with the `graylog2()` destination to send syslog messages to [Graylog](http://docs.graylog.org). GELF is the native data format of Graylog.


## Example: Using the format-gelf template function

The following configuration example shows how you can use the `format-gelf` template:

```c
   destination graylog2 {
        network(
            "127.0.0.1"
            port(12201)
            transport(tcp)
            template("$(format-gelf)")
        );
    };
```




## format-json {#template-function-format-json}

*Syntax:* `$(format-json parameters)`

*Description:* The `format-json` template function receives value-pairs as parameters and converts them into JavaScript Object Notation (JSON) format. Including the template function in a message template allows you to store selected information about a log message (that is, its content, macros, or other metadata) in JSON format. Note that the input log message does not have to be in JSON format to use `format-json`, you can reformat any incoming message as JSON.

You can use the [value-pairs]({{< relref "/chapter-concepts/concepts-value-pairs/_index.md" >}}) that {{% param "product.abbrev" %}} stores about the log message as JSON fields. Using value-pairs, you can:

  - select which value-pairs to use as JSON fields,

  - add custom value-pairs as JSON fields,

  - rename value-pairs, and so on.

For details, see {{% xref "/chapter-concepts/concepts-value-pairs/_index.md" %}}. Note that the syntax of `format-json` is different from the syntax of `value-pairs()`: `format-json` uses a syntax similar to command lines.

{{< include-headless "wnt/note-typehinting.md" >}}


## Example: Using the format-json template function

The following example selects every available information about the log message, except for the date-related macros (`R_\*` and `S_\*`), selects the `.SDATA.meta.sequenceId` macro, and defines a new value-pair called `MSGHDR` that contains the program name and PID of the application that sent the log message (since you will use the template-function in a template, you must escape the double-quotes).

```c
   $(format-json --scope syslog,all_macros,selected_macros \
      --exclude R_* --exclude S_* --key .SDATA.meta.sequenceId \
      --pair MSGHDR=\"$PROGRAM[$PID]: \")
```

The following example shows how to use this template function to store log messages in JSON format:

```c
   destination d_json {
        file(
            "/var/log/messages.json"
            template("$(format-json --scope selected_macros --scope nv_pairs)\n")
        );
    };
```


{{% alert title="Note" color="info" %}}
In the case of syslog-ng macros starting with a dot (for example, "`.SDATA.meta.sequenceID`"), `format-json` replaces the dot with an underscore character (for example, `{"_SDATA":{"meta":{"sequenceId":"55555"}}}`).

To retain the starting dot, use the `--leave-initial-dot` flag, for example:

```c
$(format-json --leave-initial-dot .SDATA.meta.sequenceID)
```
{{% /alert %}}

If you have to forward your log messages in JSON format, but the receiving application cannot handle nested JSON objects, use the `format-flat-json` template function. For details, see [](#template-function-format-flat-json).



## format-welf {#template-function-format-welf}

This template function converts value-pairs into the WebTrends Enhanced Log file Format (WELF). The WELF format is a comma-separated list of `name=value` elements. Note that the order of the elements is random. If the value contains whitespace, it is enclosed in double-quotes, for example, `name="value"`. For details on the WELF format, see <https://www3.trustwave.com/support/kb/article.aspx?id=10899>.

To select which value-pairs to convert, use the command-line syntax of the `value-pairs()` option. For details on selecting value-pairs, see <span class="mcFormatColor" style="color: #04aada;">value-pairs()</span>.


## Example: Using the format-welf() template function

The following example selects every available information about the log message, except for the date-related macros (`R_\*` and `S_\*`), selects the `.SDATA.meta.sequenceId` macro, and defines a new value-pair called `MSGHDR` that contains the program name and PID of the application that sent the log message (since you will use the template-function in a template, you must escape the double-quotes).

```c
   $(format-welf --scope syslog,all_macros,selected_macros \
      --exclude R_* --exclude S_* --key .SDATA.meta.sequenceId \
      --pair MSGHDR=\"$PROGRAM[$PID]: \")
```

The following example shows how to use this template function to store log messages in WELF format:

```c
   destination d_welf {
        file(
            "/var/log/messages.welf"
            template("$(format-welf --scope selected_macros --scope nv_pairs)\n")
        );
    };
```




## geoip (DEPRECATED) {#template-function-geoip}

This template function is deprecated. Use [geoip2](#template-function-geoip2) instead.

*Syntax:* `$(geoip <IPv4-address>)`

*Description:* This template function returns the 2-letter country code of any IPv4 address or host. IPv6 addresses are not supported. Currently only the 2-letter codes are supported, and only from the default database. For example, `$(geoip $HOST)`

{{% alert title="Note" color="info" %}}

This template function is available only if {{% param "product.abbrev" %}} has been compiled with the `--enable-geoip` compiling option.

{{% /alert %}}

To retrieve additional GeoIP information, see {{% xref "/chapter-enrich-data/geoip-parser/_index.md" %}}.



## geoip2 {#template-function-geoip2}

*Syntax:*

    ```bash
    $(geoip2 --database <path-to-geoip2-database-file>
        [ --field "registered_country.names.ru" ] ${HOST})
    ```

*Description:* This template function extracts specific fields from the mmdb database using the `--field` parameter. If you omit this parameter, it returns the 2-letter country code of any IPv4/IPv6 address or host.


{{% alert title="Note" color="info" %}}

This template function is available only if {{% param "product.abbrev" %}} has been compiled with geoip2 support. To enable it, use the `--enable-geoip` compiling option.

{{% /alert %}}


To retrieve additional GeoIP information, see {{% xref "/chapter-enrich-data/geoip2-parser/_index.md" %}}.

{{% include-headless "chunk/option-parser-geoip.md" %}}



## getent {#template-function-getent}

*Syntax:* `$(getent)`

*Description:* Available in {{% param "product.abbrev" %}} 3.13 and later.

You can use the `getent` template function to look up entries from the Name Service Switch libraries, such as, passwd, services, or protocols.

The following databases are supported:

  - *passwd*
    
    Use this database to query data related to a user. Specify the user by either username or user ID. You can query the following data: username, user ID, group ID, GECOS field, home directory, or user shell.
    
    ```c
        $(getent passwd testuser name)
        $(getent passwd testuser uid)
        $(getent passwd testuser gid)
        $(getent passwd testuser gecos)
        $(getent passwd testuser dir)
        $(getent passwd testuser shell)
    ```
    
    or
    
    ```c
        $(getent passwd 1000 name)
        $(getent passwd 1000 uid)
        $(getent passwd 1000 gid)
        $(getent passwd 1000 gecos)
        $(getent passwd 1000 dir)
        $(getent passwd 1000 shell)
    ```
    
    The queried data is optional. When you do not query any data, the default behavior applies, which is as follows: user ID is returned for username, or username is returned for user ID.
    
      - Username `$(getent passwd testuser)` returns user ID `1000`.
    
      - User ID `$(getent passwd 1000)` returns username `testuser`.

  - *group*
    
    Use this database to query group-related data. The group can be specified using either group ID or group name. You can query the following data: group name, group ID, and members.
    
    ```c
        $(getent group adm name)
        $(getent group adm gid)
        $(getent group adm members)
    ```
    
    The queried data is optional. The default behavior is as follows: group ID is returned for group name, or group name is returned for user ID.
    
      - Group name `$(getent group adm)` returns group ID `4`.
    
      - Group ID `$(getent group 4)` returns group name `adm`.

  - *protocols*
    
    Use this database to translate protocol name to protocol ID, or protocol ID to protocol string.
    
    ```c
        $(getent protocols tcp)
        $(getent protocols 6)
    ```

  - *services*
    
    Use this database to translate service name to service ID, or service ID to service name.
    
    ```c
        $(getent services http)
        $(getent services 80)
    ```



## graphite-output {#template-function-graphite}

*Syntax:* `$(graphite-output parameters)`

*Description:* Available in {{% param "product.abbrev" %}} 3.6 and later. This template function converts value-pairs from the incoming message to the Graphite plain text protocol format. It is ideal to use with the messages generated by the [monitor-source plugin](https://github.com/syslog-ng/syslog-ng-incubator/tree/master/modules/monitor-source/) (currently available in the syslog-ng incubator project).

For details on selecting value-pairs in {{% param "product.abbrev" %}} and for possibilities to specify which information to convert to Graphite plain text protocol format, see {{% xref "/chapter-concepts/concepts-value-pairs/_index.md" %}}. Note that the syntax of `graphite-output` is different from the syntax of `value-pairs()`: `graphite-output` uses a the command-line syntax used in the [format-json template function]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}).


## Example: Using the graphite-output template function

The following configuration example shows, how to send value-pairs with names starting with "`vmstat.`" to Graphite running on `localhost`, port `2003`:

```c
   destination d_graphite {
        network( host("localhost") port(2003) template("$(graphite-output --key vmstat.*)"));
    };
```




## grep {#template-function-grep}

*Syntax:* `$(grep condition value-to-select)`

*Description:* The `grep` template function can search a message context when correlating messages (for example, when you use a [pattern database]({{< relref "/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-correlation/_index.md" >}}) or the [grouping-by parser]({{< relref "/chapter-correlating-log-messages/grouping-by-parser/_index.md" >}})). The `context-lookup` template function requires a condition (a filter or a string), and returns a specific macro or template of the matching message (for example, the ${MESSAGE} field of the message).


{{% include-headless "chunk/example-grep-template-function.md" %}}


You can to specify multiple name-value pairs as parameters, separated with commas. If multiple messages match the condition of `grep`, these will be returned also separated by commas. This can be used for example, to collect the email recipients from postfix messages.



## hash {#template-function-hash}

*Syntax:* `$(<method> [opts] $arg1 $arg2 $arg3...)`

*Options:* `--length N, -l N`

Truncate the hash to the first N characters.

*Description:* Calculates a hash of the string or macro received as argument using the specified hashing method. If you specify multiple arguments, effectively you receive the hash of the first argument salted with the subsequent arguments.

`<method>` can be one of md5, md4, sha1, sha256, sha512 and "hash", which is equivalent to md5. Macros are expected as arguments, and they are concatenated without the use of additional characters.

The md4 `<method>` is deprecated.

This template function can be used for anonymizing sensitive parts of the log message (for example, username) that were parsed out using PatternDB before storing or forwarding the message. This way, the ability of correlating messages along this value is retained.

Also, using this template, quasi-unique IDs can be generated for data, using the `--length` option. This way, IDs will be shorter than a regular hash, but there is a very small possibility of them not being as unique as a non-truncated hash.

{{% alert title="Note" color="info" %}}

These template functions are available only if {{% param "product.abbrev" %}} has been compiled with the `--enable-ssl` compile option and the `tfhash` module has been loaded.

{{% include-headless "chunk/para-load-module.md" %}}
{{% /alert %}}


## Example: Using the $(hash) template function {#template-function-hash-example}

The following example calculates the SHA1 hash of the hostname of the message:

```c
   $(sha1 $HOST)
```

The following example calculates the SHA256 hash of the hostname, using the `salted` string to salt the result:

```c
   $(sha1 $HOST salted)
```

To use shorter hashes, set the `--length`:

```c
   $(sha1 --length 6 $HOST)
```

To replace the hostname with its hash, use a rewrite rule:

```c
   rewrite r_rewrite_hostname{set("$(sha1 $HOST)", value("HOST"));};
```



{{% include-headless "chunk/example-rewrite-hash.md" %}}




## if {#template-function-if}

*Syntax:* `$(if (<condition>) <true template> <false template>)`

*Description:* Returns the value of the `<true template> parameter if the `<condition>>is true. If the `<condition>`>s false, the value of `<false template>` > returned.


## Example: Using pattern databases and the if template function

The following example returns `violation` if the `username` name-value pair of a message is `root`, and `system` otherwise.

```c
   $(if ("${username}" == "root") "violation" "system")
```

This can be used to set the class of a message in pattern database rules based on the condition.

```c
   <value name="username">$(if ("${username}" == "root") "violation" "system")</value>
```

Since template functions can be embedded into each other, it is possible to use another template function as the template of the first one. For example, the following expression returns `root` if the username is `root`, `admin` if the username is `joe`, and `normal user` otherwise.

```c
   <value name="username">
        $(if ("${username}" == "root")
            "root"
            $(if ("${username}" == "joe") "admin" "normal user"))</value>
```




## implode {#template-function-implode}

*Syntax:* `$(implode <separator> <string1>, <string2>, ...)`

*Description:* Turns a list into a string combining the pieces together with a separator. You can also use the [explode](#template-function-explode) template function, which turns a string separated by a specific character into a list. Available in {{% param "product.abbrev" %}} 3.21 and later.


## Example: Using the implode template function

The following configuration example shows how you can use the `implode` template to turn a list into a string:

| Configuration                                            | Result                                    |
| -------------------------------------------------------- | ----------------------------------------- |
| `$(implode ' ' 'string1,string2,string3,string4,string5')` | `"string1 string2 string3 string4 string5"` |

You can also use a <span>$(list-\*)</span> template function to further manipulate the list. The following example returns the first three elements of the list:

| Configuration                                                           | Result                    |
| ----------------------------------------------------------------------- | ------------------------- |
| `$(implode ' ' $(list-slice :3 string1,string2,string3,string4,string5))` | `"string1 string2 string3"` |




## indent-multi-line {#template-function-indent-multi-line}

*Syntax:* `$(indent-multi-line parameter)`

*Description:* This template function makes it possible to write multi-line log messages into a file. The first line is written like a regular message, subsequent lines are indented with a tab, in compliance with RFC822.


## Example: Using the indent-multi-line template function

The following example writes multi-line messages into a text file.

```c
   destination d_file {
        file (
            "/var/log/messages"
            template("${ISODATE} ${HOST} $(indent-multi-line ${MESSAGE})\n")
        );
    };
```




## ipv4-to-int {#template-function-ipv4-to-int}

*Syntax:* `$(ipv4-to-int parameter)`

*Description:* Converts the specified IPv4 address to its numeric representation. The numerical value of an IPv4 address is calculated by treating the IP address as a 4-byte hexadecimal value. For example, the 192.168.1.1 address equals to: 192=C0, 168=A8, 1=01, 1=01, or C0A80101, which is 3232235777 in decimal representation.

{{% alert title="Note" color="info" %}}

This template function is available only if the `convertfuncs` module has been loaded.

{{% include-headless "chunk/para-load-module.md" %}}

{{% /alert %}}



## List manipulation {#template-function-list}

The `list-*` template functions allow you to manipulate comma-separated lists. Such lists represent a simple array type in {{% param "product.abbrev" %}}. Note the following about formatting lists:

  - Values are separated by commas, for example, `"item1","item2","item3"`. The single-element list is an element without a comma.

  - You can use shell-like quotation to embed commas, for example, `"item1","ite\\,m2","item3"`.

  - Empty values are skipped (except if they are quoted)

These template functions return a well-formed list, properly encoding and quoting all elements. If a template function returns a single element, all quotation is decoded and the value contains the literal value.

Starting with {{% param "product.abbrev" %}} version 3.10, the following list-related template functions are available. Certain functions allow you to reference an element using its number: note that the list index starts with zero, so the index of the first element is 0, the second element is 1, and so on.


<span id="template-function-list-append"></span>

## list-append {#template-function-list-append}

*Syntax:* `$(list-append ${list} ${name-value-pair1} ${name-value-pair2} ... )`

*Description:* Returns a list and appends the values of the specified name-value pairs to the end of the list. You can also append elements to an empty list, for example, `$(list-append '' 'element-to-add')`



<span id="template-function-list-concat"></span>

## list-concat {#template-function-list-concat}

*Syntax:* `$(list-concat ${name-value-pair1} ${name-value-pair2} ... )`

The commas between the parameters are optional.

*Description:* This template function creates (concatenates) a list of the values it receives as parameter. The values can be single values (for example, `${HOST}`) or lists.

For example, the value of the `$(list-concat ${HOST}, ${PROGRAM}, ${PID})` is a comma-separated list.

You can concatenate existing lists into a single list using:

```c
   $(list-concat ${list1} ${list2})
```



<span id="template-function-list-count"></span>

## list-count {#template-function-list-count}

*Syntax:* `$(list-count ${list} )`

*Description:* Returns the number of elements in the list.



<span id="template-function-list-head"></span>

## list-head {#template-function-list-head}

*Syntax:* `$(list-head ${list} )`

*Description:* Returns the first element of the list, unquoted.



<span id="template-function-list-nth"></span>

## list-nth {#template-function-list-nth}

*Syntax:* `$(list-nth <index-number> ${list} )`

*Description:* Returns the nth element of the list, unquoted. Note that the list index starts with zero, so `(list-nth 1 ${list} )` returns the second element, and so on.



<span id="template-function-list-search"></span>

## list-search {#template-function-list-search}

*Syntax:* `$(list-search [OPTIONS] <pattern> ${list})`

*Description:* The `list-search` template function searches the elements of `${list}` starting at the specified `start_index`, then returns the index of the first match of `<pattern> within `${list}`.

{{% alert title="Note" color="info" %}}

Indexing is 0-based. If `<pattern>` is not found, the function returns an empty string.

{{% /alert %}}

Options:

  - `--mode MODE`: Matching mode, with the following possible values: `literal` (default), `prefix`, `substring`, `glob`, `pcre`
  - `--start-index N`: Skips N elements in the `${list}`



<span id="template-function-list-slice"></span>

## list-slice {#template-function-list-slice}

*Syntax:* `$(list-slice <from>:<to> ${list} )`

*Description:* Returns the specified subset of the list. Note that the list index starts with zero, for example, `$(list-slice 1:2 ${list} )` returns the second and third element of the list, and so on.

You can omit the from or to index if you want to start the subset from the beginning or end of the list, for example: `3:` returns the list starting with the 4th element, while `:3` returns the first four elements.

Negative numbers select an element from the end of the list, for example, `-3:` returns the last three element of the list.



<span id="template-function-list-tail"></span>

## list-tail {#template-function-list-tail}

*Syntax:* `$(list-tail ${list} )`

*Description:* Returns the list without the first element. For example, if the `${mylist}` list contains the `one, two, three` elements, then `$(list-tail ${mylist} )` returns `two, three`.




<span id="template-function-length"></span>

## length {#template-function-length}

*Syntax:* `$(length "<macro>")`

*Description:* Returns the length of the macro in characters, for example, the length of the message. For example, the following filter selects messages that are shorter than 16 characters:

```c
   f_short {
        match ('-', value ("$(if ($(length "${MESSAGE}") <= 16) "-" "+")"));
    };
```



<span id="template-function-lowercase"></span>

## lowercase {#template-function-lowercase}

*Syntax:* `$(lowercase "<macro>")`

*Description:* Returns the lowercase version of the specified string or macro. For example, the following example uses the lowercase version of the hostname in a directory name:

```c
   destination d_file {
        file ("/var/log/${MONTH}/${DAY}/$(lowercase "${HOST}")/messages");
    };
```

Available in {{% param "product.abbrev" %}} 3.5 and later.



<span id="map-template-function"></span>

## map

*Syntax:* `$(map template list)`

*Description:* Returns with a list that contains the results of applying a template function for each elements of a list.

Available in {{% param "product.abbrev" %}} version 3.28 and later.

*Parameters:*

  - `template`: Mandatory. This template function is applied for each elements of the list. Use `$_ macro` to refer to the current list element.

  - `list`: Mandatory. A list, or template.

*Example:*

When used in configuration as seen in the example, the `map` template function adds one to each element of a list:

```c
   log {
      source { example-msg-generator(num(1) values(LST => "0,1,2")); };
      destination {
        file("/dev/stdout"template('$(map "$(+ 1 $_)" $LST)')
        );
      };
    };
```

The returned values are `1`, `2`, and `3`.



## Numerical operations {#template-function-numerical}

*Syntax:* `$(<operation> "<value1>" "<value2>")`

*Description:* These template functions allow you to manipulate numbers, that is, to perform addition (+), substraction (-), multiplication (\*), division (/), and modulus (%). All of them require two numeric arguments. The result is `NaN` (Not-a-Number) if the parameters are not numbers, cannot be parsed, or if a division by zero would occur. For example, to add the value of two macros, use the following template function:

```c
   $(+ "${<MACRO1>}" "${<MACRO2>}");
```

Starting with {{% param "product.abbrev" %}} version 3.22 and later, the numerical operators support floating-point values. They behave like the operators in the C programming language:

  - If both operands are integers, they return an integer.

  - If any of the operands is a floating-point number, they return a floating-point result.

For example:

```c
   $(/ 3 2) # Both operands are integers, so the result is 1
    # One of the operands is a floating point number, so the result is also floating-point
    $(/ 3.0 2) # = 1.500000
    $(/ 3 2.0) # = 1.500000
    $(/ 3.0 2.0) # = 1.500000
```

To round floating-point numbers, you can use the `ceil`, `floor`, and `round` template functions.

When you are correlating messages and a name-value pair contains numerical values in the messages, you can calculate the lowest (min), highest (max), total (sum), and mean (average) values. These calculations process every message of the correlation context. For details on message correlation, see {{% xref "/chapter-correlating-log-messages/_index.md" %}}. For example, if the messages of the context have a `.myfields.load` name-value pair, you can find the highest load value using the following template function.

```c
   $(max ${.myfields.load})
```



## or {#template-function-or}

*Syntax:* `$(or <macro1> <macro2>)`

*Description:* This template function returns the first non-empty argument.



## padding {#template-function-padding}

*Syntax:*

```bash 
 $(padding <macro> <width> <prepended-character-or-string>)
```

*Description:* This template function returns the value of its first parameter (a string or macro), prepended with a string. This string is `<width> long, and repeats the character or string set in the third parameter. If you use a single character, it is added `<width>>times. If you use a string, it is repeated until its length reaches `<width>`>The default padding character is ' ' (space). For example:


## Example: Using the padding template function

If the value of the `${MESSAGE}` macro is `mymessage`, then the output of the `padding()` template function is the following:

```c
   $(padding ${MESSAGE} 10 X)
```

Output: `XXXXXXXXXXmymessage`

```c
   $(padding ${MESSAGE} 10 foo)
```

Output: `foofoofoofmymessage`




## python {#template-function-python}

*Syntax:*

``` bash
 $(python <name-of-the-python-method-to-use> <arguments-of-the-method>)
```

*Description:* This template function enables you to write a custom template function in Python. You can define a Python block in your {{% param "product.abbrev" %}} configuration file, define one or more Python functions in it, and use the methods as template functions. If you use a Python block, {{% param "product.abbrev" %}} embeds a Python interpreter to process the messages.

{{< include-headless "chunk/python-blocks.md" >}}

The following points apply to Python parsers.

  - The first argument in the definition of the Python function is the actual log message. This is implicitly passed to the function, you do not have to use it in the template function.

  - The value of the template function is return value of the Python function.

  - To reference a name-value pair or a macro in the Python function, use the dot-notation. For example, if the first argument in the definition of the function is called `log-message`, the value of the HOST macro is `log-message.HOST`, and so on.

  - You can define new name-value pairs in the Python function. For example, if the first argument in the definition of the function is called `log-message`, you can create a new name-value pair like this: `log_message["new-macro-name"]="value"`. This is useful when you parse a part of the message from Python, or lookup a value based on data extracted from the log message.


## Declaration:

```c
   python {
    def <name_of_the_python_function>(<log_message>, <optional_other_arguments>):
        # <your-python-code>
        return <value_of_the_template_function>
    };
    
    template <template-name> {
        template($(python <name_of_the_python_function>));
    };
```



## Example: Writing template functions in Python {#example-python-template-functions}

The following example creates a Python template function called `return_message` that returns the MESSAGE part of the log message.

```c
   @version: {{% param "product.techversion" %}}
    
    python {
    def return_message(log_message):
        return log_message.MESSAGE
    };
    
    destination d_local {
        file("/tmp/logs.txt" template("[$(python return_message)]\n"));
    };
```

The following example creates a Python template function called `resolve_host` that receives an IP address as an argument, and attempts to resolve it into a hostname.

```c
   @version: {{% param "product.techversion" %}}
    
    python {
    import socket
    
    def resolve_host(log_message, hostname):
        try:
            return socket.gethostbyaddr(hostname)[0]
        except (socket.herror, socket.error):
            return 'unknown'
    };
    
    destination d_local {
        file(
            "/tmp/logs.txt"
            template("${ISODATE} $(python resolve_host ${SOURCE_IP}) ${MESSAGE}\n")
        );
    };
```




## replace-delimiter {#template-function-replace-delimiter}

*Syntax:* `$(replace-delimiter "<old-delimiters>" "<new-delimiter>" "<macro>")`

*Description:* Replaces the delimiter character with a new one. For example, the following example replaces the tabulators (`\\t`) in the message with semicolons (`;`):

```c
   $(replace-delimiter "\t" ";" "${MESSAGE}")
```

Available in {{% param "product.abbrev" %}} 3.5 and later.



## round {#template-function-round}

*Syntax:* `$(round argument)`

*Description:* Rounds a floating-point number to the nearest integer. For example, `$(round 1.5)` is 2. See also the `ceil` and `floor` template functions.

This template function has an optional second argument that sets the precision of rounding. The default is 0 (output a natural number), but values up to 20 are accepted. For example, `$(round 2.123456 4)` is 2.1235.



## sanitize {#template-function-sanitize}

*Syntax:* `$(sanitize <options> "<macro1>" "<macro2> ...")`

*Description:* This file replaces the special characters in macro values, for example, it can replace the slash (/) characters in a filename with the underscore (_) character. If you specify multiple arguments, they will be concatenated using the `/` character, so they can be used as separate directory levels when used in filenames.

The function has the following options:

  - `--ctrl-chars or -c`

  - Filter control characters (characters that have an ASCII code of 32 or lower). This option is used by default.

  - `--invalid-chars <characterlist>` or `-i <characterlist>`

  - The list of characters to be replaced with underscores (_). The default list contains the `/` character. The following example replaces the \\ and @ characters, so for example, fo\\o@bar becomes foobar:
    
    ```c
        $(sanitize -i \@ $PROGRAM)
    ```

  - `--no-ctrl-chars or -C`

  - Do not filter the control characters (characters that have an ASCII code of 32 or lower).

  - `--replacement <replacement-character>` or `-r <replacement-character>`

  - The character used to replace invalid characters. By default, this is the underscore (_). The following example replaces invalid characters with colons instead of underscores, so for example, `foo/bar` becomes `foo;bar`:
    
    ```c
        $(sanitize -r ; $PROGRAM)
    ```


## Example: Using the sanitize template function

The following example uses the sanitize function on two macros, and the results are used as directory names in a file destination.

```c
   file("/var/log/$(sanitize $HOST $PROGRAM)/messages");
```

This is equivalent to `file("/var/log/$HOST/$PROGRAM/messages");`, but any slashes in the values of the $HOST and $PROGRAM macros are replaced with underscores.




## stardate {#template-function-stardate}

*Syntax:* `$(stardate [option] "<date-in-unixtime>")`

*Description:* Converts a date in UNIXTIME (for example, ${UNIXTIME}) into [stardate](https://en.wikipedia.org/wiki/Stardate), displaying the year and the progress of the year in a number of digits (`YYYY.NNN`). You can set the number of digits using the `--digits` option, for example:

```c
   $(stardate --digits 2 "${R_UNIXTIME}")
```



## strip {#template-function-strip}

*Syntax:* `$(strip "<macro>")`

*Description:* Deletes whitespaces from the beginning and the end of a macro. You can specify multiple macros separated with whitespace in a single template function, for example:

```c
   $(strip "${MESSAGE}" "${PROGRAM}")
```



## substr {#template-function-substr}

*Syntax:* `$(substr "<argument>" "<offset>" "<length>")`

*Description:* This function extracts a substring of a string.

  - `argument` The string to extract the substring from, for example, `"${MESSAGE}"`

  - `offset` Specifies where the substring begins (in characters). `0` means to start from the beginning of the string, `5` means to skip the first 5 characters of the string, and so on. Use negative numbers to specify where to start from the end of the string, for example, `-1` means the last character, `-5` means to start five characters before the end of the string.

  - `length` *Optional parameter*: The number of characters to extract. If not specified, the substring will be extracted from the offset to the end of the string. Use negative numbers to stop the substring before the end of the string, for example, `-5` means the substring ends five characters before the end of the string.


## Example: Using the substr template function

Skip the first 15 characters of the message, and select the rest:

```c
   $(substr "${MESSAGE}" "15");
```

Select characters 16-30 of the message (15 characters with offset 15):

```c
   $(substr "${MESSAGE}" "15" "15");
```

Select the last 15 characters of the message:

```c
   $(substr "${MESSAGE}" "-15");
```

A template that converts the message to RFC3164 (BSD-syslog) format and truncates the messages to 1023 characters:

```c
   template t_truncate_messages {
        template("$(substr \"<$PRI>$DATE $HOST $MSGHDR$MESSAGE\" \"0\" \"1023\")\n");
        template-escape(no);
    };
```




## template {#template-function-template}

*Syntax:*

```shell
$(template <template-name>)
$(template $<dynamic-template-name>)
$(template $<dynamic-template-name> '<optional-fallback-template>')
```

*Description:* This template function looks up the <template-name>in the configuration and uses that to format its result. The referenced template can be static or dynamic. For static templates, {{% param "product.abbrev" %}} resolves the template when it starts, or when the configuration is reloaded. For dynamic templates, the results are resolved runtime (for dynamic templates, the template name contains at least one '$' character). For example, the name of the template to be invoked can be extracted from the message, or from a name-value pair set using the [`add-contextual-data()`]({{< relref "/chapter-enrich-data/data-enrichment-add-contextual-data/_index.md" >}}) feature.

For dynamic templates, you can set an optional second template. This second template will be the results of the template function if resolving the dynamic template fails for some reason. For example:

```c
   $(template ${my-dynamic-template} '$DATE $HOST $MSGHDR$MSG\n')
```

Available in {{% param "product.abbrev" %}} 3.22 and later.



## uppercase {#template-function-uppercase}

*Syntax:* `$(uppercase "<macro>")`

*Description:* Returns the uppercase version of the specified string or macro. For example, the following example uses the uppercase version of the hostname in a directory name:

```c
   destination d_file {
        file ("/var/log/${MONTH}/${DAY}/$(uppercase "${HOST}")/messages");
    };
```

Available in {{% param "product.abbrev" %}} 3.5 and later.



## url-decode {#template-function-url-decode}

*Syntax:* `$(url-decode <string-pr-macro-1> <string-pr-macro-2> ... )`

*Description:* You can use the `url-decode` template function to decode url-encoded strings and macros. For example, `$(url-decode %3C%3E)` yields `<>. The `url-decode` can receive multiple parameters (maximum 64). In this case, each parameter is decoded separately, and simply concatenated.

Available in {{% param "product.abbrev" %}} version 3.18 and later.



## url-encode {#template-function-url-encode}

*Syntax:* `$(url-encode ${MESSAGE} )\n")`

*Description:* You can use the `url-encode` template function together with the `telegram()` destination to send syslog messages to [Telegram.](https://core.telegram.org/ "https://core.telegram.org") The `url-encode` template function escapes strings. All input characters that are not a-z, A-Z, 0-9, '-', '.', '_' or '\~' are converted to their "URL escaped" version.

Available in {{% param "product.abbrev" %}} version 3.18 and later. (In version 3.16-3.17, this template function was called `urlencode`.)


## uuid {#template-function-uuid}

*Syntax:* `$(uuid)`

*Description:* Generates a Universally Unique IDentifier (UUID) that complies with [RFC4122](https://www.ietf.org/rfc/rfc4122.txt). That way, an UUID can be added to the message soon after it is received, so messages stored in multiple destinations can be identified. For example, when storing messages in a database and also in files, the UUID can be used to find a particular message both in the database and the files.

To generate a UUID, you can use a rewrite rule to create a new value-pair for the message.


## Example: Using Universally Unique Identifiers

The following example adds a value-pair called `MESSAGE_UUID` to the message using a rewrite rule and a template.

```c
   rewrite r_add_uuid {
        set("$(uuid)" value("MESSAGE_UUID"));
    };
    
    destination d_file {
        file (
            "/var/log/messages"
            template("$MESSAGE_UUID $ISODATE $HOST $MSG\n")
            template-escape(no)
        );
    };
    
    log {
        source(s_network);
        rewrite(r_add_uuid);
        destination(d_file);
    };
```


{{% alert title="Note" color="info" %}}

This template function is available only if the `tfuuid` module has been loaded.

{{% include-headless "chunk/para-load-module.md" %}} {{% /alert %}}

