---
title: "String search in FilterX"
linkTitle: "String search"
weight:  550
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->



Available in {{< product >}} 4.9 and later.

You can check if a string contains a specified string using the `includes` FilterX function. The `startswith` and `endswith` functions check the beginning and ending of the strings, respectively. For example, the following expression checks if the message (`$MESSAGE`) begins with the `%ASA-` string:

```shell
startswith($MESSAGE, '%ASA-')
```

By default, matches are case sensitive. For case insensitive matches, use the `ignorecase=true` option:

```shell
startswith($MESSAGE, '%ASA-', ignorecase=true)
```

All three functions (`includes`, `startswith`, and `endswith`) can take a list with multiple search strings and return true if any of them match. This is equivalent with using combining the individual searches with logical OR operators. For example:

```shell
${MESSAGE} = "%ASA-5-111010: User ''john'', running ''CLI'' from IP 0.0.0.0, executed ''dir disk0:/dap.xml"
includes($MESSAGE, ['%ASA-','john','CLI'])

includes($MESSAGE, ['%ASA-','john','CLI'])
includes($MESSAGE, '%ASA-') or includes($MESSAGE, 'john') or includes($MESSAGE, 'CLI')
```

For more complex searches, or if you need to match a regular expression, use the [`regexp_search` FilterX function]({{< relref "/filterx/filterx-string-search/_index.md#regexp-search" >}}).

<!-- FIXME json object search example -->