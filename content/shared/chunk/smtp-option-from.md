---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## from()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | n/a    |

*Description:* The sender of the email (contents of the FROM field). You can specify the email address, or the name and the email address. For example:

```c

    from("admin@example.com")

```

or

```c

    from("Admin" "admin@example.com")

```

If you specify the `from()` option multiple times, the last value will be used. Instead of the `from()` option, you can also use `sender()`, which is just an alias of the `from()` option.

{{% include-headless "chunk/para-can-contain-macros.md" %}}

