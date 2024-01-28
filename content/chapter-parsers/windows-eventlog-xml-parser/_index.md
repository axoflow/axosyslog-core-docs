---
title: "Windows XML Event Log (EVTX) parser"
weight: 2250
driver: "windows-eventlog-xml-parser()"
short_description: "Parse messages in the Windows XML Event Log (EVTX) format"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Available in {{% param "product.abbrev" %}} version 4.5 and later.

The new `windows-eventlog-xml-parser()` can parse messages in the Windows XML Event Log (EVTX) format.

Example configuration:

```shell
parser p_win {
    windows-eventlog-xml-parser(prefix(".winlog."));
};
```

The `windows-eventlog-xml-parser()` parser has the same parameters are the same as the [`xml()` parser]({{< relref "/chapter-parsers/xml-parser/xml-parser-options/_index.md" >}}).

Don't forget to include the parsers in a log statement to actually use it:

```shell
log {
    source(s_local);
    parser(windows-eventlog-xml-parser(prefix(".winlog.")));
    destination(d_local);
};
```
