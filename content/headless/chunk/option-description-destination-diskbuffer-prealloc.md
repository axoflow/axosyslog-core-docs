---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
By default, {{% param "product.abbrev" %}} doesn’t reserve the disk space for the disk-buffer file, since in a properly configured and sized environment the disk-buffer is practically empty, so a large preallocated disk-buffer file is just a waste of disk space. But a preallocated buffer can prevent other data from using the intended buffer space (and elicit a warning from the OS if disk space is low), preventing message loss if the buffer is actually needed. To avoid this problem, when using {{% param "product.abbrev" %}} 4.0 or later, you can preallocate the space for your disk-buffer files by setting `prealloc(yes)`.

In addition to making sure that the required disk space is available when needed, preallocated disk-buffer files provide radically better (3-4x) performance as well: in case of an outage the amount of messages stored in the disk-buffer is continuously growing, and using large continuous files is faster, than constantly waiting on a file to change its size.

If you are running {{% param "product.abbrev" %}} on a dedicated host (always recommended for any high-volume settings), use `prealloc(yes)`.