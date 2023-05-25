---
title: "Uninstalling syslog-ng OSE"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

If you need to uninstall {{% param "product.abbrev" %}} for some reason, you have the following options:

  - *If you have installed {{% param "product.abbrev" %}} using the .run installer*: Execute the **uninstall.sh** script located at `/opt/syslog-ng/bin/uninstall.sh`. The uninstall script will automatically restore the syslog daemon used before installing syslog-ng. To completely remove {{% param "product.abbrev" %}}, including the configuration files, use the **uninstall.sh --purge** command.

  - *If you have installed {{% param "product.abbrev" %}} from a .deb package*: Execute the **dpkg -r syslog-ng{{% conditional-text include-if="pe" %}}-premium-edition{{% /conditional-text %}}** command to remove syslog-ng, or the **dpkg -P syslog-ng{{% conditional-text include-if="pe" %}}-premium-edition{{% /conditional-text %}}** command to remove {{% param "product.abbrev" %}} and the configuration files as well. Note that removing {{% param "product.abbrev" %}} does not restore the syslog daemon used before syslog-ng.

  - *If you have installed {{% param "product.abbrev" %}} from an .rpm package*: Execute the **rpm -e syslog-ng{{% conditional-text include-if="pe" %}}-premium-edition{{% /conditional-text %}}** command to remove {{% param "product.abbrev" %}}. Note that removing {{% param "product.abbrev" %}} does not restore the syslog daemon used before {{% param "product.abbrev" %}}.

  - *If you have compiled {{% param "product.abbrev" %}} from source*: Execute the **sudo make uninstall** command to remove {{% param "product.abbrev" %}}. Note that removing {{% param "product.abbrev" %}} does not restore the syslog daemon used before {{% param "product.abbrev" %}}.

  - *If you have installed {{% param "product.abbrev" %}} from a .pkg package*: Execute the **pkgrm BBsyslng** command to remove {{% param "product.abbrev" %}}. Note that removing {{% param "product.abbrev" %}} does not restore the syslog daemon used before syslog-ng.
    
    For automatic uninstall (answering `y` to all questions): Execute the **yes | pkgrm BBsyslng** command.
    
    The following files have to be deleted manually:
    
      - `\<syslog-ng path\>/etc/syslog-ng.conf`
    
      - `\<syslog-ng path\>/var/syslog-ng.persist`
    
      - `\<syslog-ng path\>/var/syslog-ng-00000.qf`
    
      - anything else under the `\<syslog-ng path\>/var` directory
