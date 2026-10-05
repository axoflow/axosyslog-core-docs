---
title: "Format data as comma-separated values"
linkTitle: "CSV"
description: "Format a FilterX dict or list into a delimiter-separated string with format_csv(), and set the columns, delimiter, and default value."
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Formats a dictionary or a list into a comma-separated string.

Usage: `format_csv(<input-list-or-dict>, columns=<json-list>, delimiter=<delimiter-character>, default_value=<string>)`

Only the input is mandatory, other arguments are optional. Note that the delimiter must be a single character.

By default, the delimiter is the comma (`delimiter=","`), the `columns` and `default_value` are empty.

If the `columns` option is set, {{< product >}} checks that the number of fields or entries in the input data matches the number of columns. If there are fewer items, it adds the `default_value` to the missing entries.
