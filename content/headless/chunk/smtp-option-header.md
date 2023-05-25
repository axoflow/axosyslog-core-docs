---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## header()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | n/a    |

*Description:* Adds an extra header to the email with the specified name and content. The first parameter sets the name of the header, the second one its value. The value of the header can contain macros. Set the **header** option multiple times to add multiple headers. For example:

```c
   header("X-Program", "$PROGRAM")

```

When using the header option, note the following points:

  - Do not use the `header()` option to set the values of headers that have dedicated options. Use it only to add extra headers.

  - If you set the same custom header multiple times, only the first will be added to the email, other occurrences will be ignored.

  - It is not possible to set the DATE, Return-Path, Original-Recipient, Content-\*, MIME-\*, Resent-\*, Received headers.

