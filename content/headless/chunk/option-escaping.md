---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
- `escape-backslash`: The parsed message uses the backslash (`\\`) character to escape quote characters.
- `escape-backslash-with-sequences`: The parsed message uses `""` as an escape character but also supports C-style escape
sequences, like `\n` or `\r`. Available in {{% param "product.abbrev" %}} version 4.0 and later.
- `escape-double-char`: The parsed message repeats the quote character when the quote character is used literally. For example, to escape a comma (`,`), the message contains two commas (`,,`).
- `escape-none`: The parsed message does not use any escaping for using the quote character literally.
