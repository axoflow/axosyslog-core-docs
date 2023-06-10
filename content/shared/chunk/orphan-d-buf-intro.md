---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
In certain situations (for example, after modifying the disk-buffer configuration or losing the persist information), {{% param "product.abbrev" %}} creates a new disk-buffer file instead of using the already existing one. In these situations, the already existing disk-buffer file becomes a so-called orphan disk-buffer file.

{{% alert title="Note" color="info" %}}

The {{% param "product.abbrev" %}} application does not store messages in orphan disk-buffer files or forward the messages stored in the disk-buffer file.

{{% /alert %}}
