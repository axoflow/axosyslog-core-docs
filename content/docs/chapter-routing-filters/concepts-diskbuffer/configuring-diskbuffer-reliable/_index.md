---
title: "Enabling reliable disk-based buffering"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% include-headless "chunk/p-disk-buffer-drivers.md" %}}

To enable reliable disk-based buffering, use the `disk-buffer(reliable(yes))` parameter in the destination. Use reliable disk-based buffering if you do not want to lose logs in case of reload/restart, unreachable destination or {{% param "product.abbrev" %}} crash. This solution provides a slower, but reliable disk-buffer option. It is created and initialized at startup and gradually grows as new messages arrive. The filename of the reliable disk buffer file is the following: `<syslog-ng path>/var/syslog-ng-00000.rqf`.


## Example: Example for using reliable disk-based buffering

```c
   destination d_BSD {
        network("127.0.0.1"
            port(3333)
            disk-buffer(
                mem-buf-size(10000)
                disk-buf-size(2000000)
                reliable(yes)
            )
        );
    }; 
```


For details on the differences between normal and reliable disk-based buffering, see also {{% xref "/docs/chapter-routing-filters/concepts-diskbuffer/about-disk-buffer-files/_index.md" %}}.
