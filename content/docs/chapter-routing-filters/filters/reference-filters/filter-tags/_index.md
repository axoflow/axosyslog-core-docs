---
title: "tags()"
weight:  2500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

|           |     |
| --------- | --- |
| Synopsis: | tag |

*Description:* Select messages labeled with the specified tag. Every message automatically has the tag of its source in `.source.\<id_of_the_source_statement\>` format. This option is available only in syslog-ng 3.1 and later.


## Example: Adding tags and filtering messages with tags {#example-tags-filtering}

```c
   source s_tcp {
        network(ip(192.168.1.1) port(1514) tags("tcp", "router"));
    };

```

Use the **tags()** option of the filters to select only specific messages:

```c
   filter f_tcp {
        tags(".source.s_tcp");
    };
    
    filter f_router {
        tags("router");
    };

```


{{% include-headless "wnt/note-patterndb-class-tag.md" %}}
