---
title: "Password-protected keys"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with {{% param "product.abbrev" %}} version {{% conditional-text include-if="ose" %}}3.14{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7.0.7{{% /conditional-text %}}, you can use password-protected private keys in the `network()` and `syslog()` source and destination drivers.


## Restrictions and limitations

  - {{% alert title="Note" color="info" %}}
    
    *Hazard of data loss\!* If you use password-protected keys, you must provide the passphrase of the password-protected keys every time {{% param "product.abbrev" %}} is restarted ({{% param "product.abbrev" %}} keeps the passphrases over reloads). The sources and destinations that use these keys will not work until you provide the passwords. Other parts of the {{% param "product.abbrev" %}} configuration will be unaffected.
    
    {{% /alert %}}
    
    This means that if you use a password-protected key in a destination, and you use this destination in a log path that has multiple destinations, neither destinations will receive log messages until you provide the password. In this cases, always [use disk-based buffering to avoid data loss]({{< relref "/docs/chapter-routing-filters/concepts-diskbuffer/_index.md" >}}).

  - The path and the filename of the private key cannot contain whitespaces.

  - Depending on your platform, the number of passwords {{% param "product.abbrev" %}} can use at the same time might be limited (for example, on Ubuntu 16.04 you can store 16 passwords if you are running {{% param "product.abbrev" %}} as a non-root user). If you use lots of password-protected private keys in your {{% param "product.abbrev" %}} configuration, increase this limit using the following command: **sudo ulimit -l unlimited**



## Providing the passwords

{{% include-headless "chunk/syslog-ng-ctl-credentials-status-description.md" %}}

{{% include-headless "chunk/syslog-ng-ctl-credentials-add-description.md" %}}

For details on the `syslog-ng-ctl credentials` command, see <span class="mcFormatColor" style="color: #04aada;">The syslog-ng control tool manual page</span>.

