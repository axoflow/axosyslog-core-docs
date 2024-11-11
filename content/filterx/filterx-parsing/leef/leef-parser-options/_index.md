---
title: "Options of LEEF parsers"
weight:  100
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The `parse_leef` FilterX function has the following options.

## pair_separator

Specifies the character or string that separates the key-value pairs in the extensions. Default value: `\t` (tab).

LEEF v2 can specify the separator per message. Omitting this option uses the LEEF v2 provided separator, setting this value overrides it during parsing.

## value_separator

Specifies the character that separates the keys from the values in the extensions. Default value: `=`.
