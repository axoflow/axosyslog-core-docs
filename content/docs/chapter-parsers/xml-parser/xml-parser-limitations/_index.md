---
title: "Limitations of the XML parsers"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The XML parser comes with certain limitations.


## Vector-like structures:

It is not possible to address each element of a vector-like structure individually. For example, take this input:

```c
   <vector>
        <entry>value1</entry>
        <entry>value2</entry>
        ...
        <entry>valueN</entry>
    </vector>
```

After parsing, the entries cannot be addressed individually. Instead, the text of the entries will be concatenated:

```c
   vector.entry = "value1value2...valueN"
```

Note that `xmllint` has the same behavior:

```c
   $ xmllint --xpath "/vector/entry/text()" test.xml
    value1value2valueN%
```



## CDATA:

The XML parser does not support CDATA. CDATA inside the XML input is ignored. This is true for the processing instructions as well.



## Inherited limitations:

The XML parser is based on the glib XML subset parser, called ["GMarkup" parser](https://developer.gnome.org/glib/stable/glib-Simple-XML-Subset-Parser.html), which is not a full-scale XML parser. It is intended to parse a simple markup format that is a subset of XML. Some limitations are inherited:

  - Do not use the XML parser if you expect to interoperate with applications generating full-scale XML. Instead, use it for application data files, configuration files, log files, and so on, where you know your application will be the only one writing the file.

  - The XML parser is not guaranteed to display an error message in the case of invalid XML. It may accept invalid XML. However, it does not accept XML input that is not well-formed (a condition that is weaker than requiring XML to be valid).



## No support for long keys:

If the key is longer than 255 characters, `syslog-ng` drops the entry and an error log is emitted. There is no chunking or any other way of recovering data, not even partial data. The entry will be replaced by an empty string.

