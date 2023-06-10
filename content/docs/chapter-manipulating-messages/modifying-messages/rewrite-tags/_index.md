---
title: "Adding and deleting tags"
weight:  2500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To add or delete a tag, you can use rewrite rules. To add a tag, use the following syntax:

```c
   rewrite <name_of_the_rule> {
        set-tag("<tag-to-add>");
    };

```

To delete a tag, use the following syntax:

```c
   rewrite <name_of_the_rule> {
        clear-tag("<tag-to-delete>");
    };

```

Templates (macros, template functions) can be used when specifying tags, for example, **set-tag("dyn::$HOST");**.
