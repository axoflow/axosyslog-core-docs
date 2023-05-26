---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
You can add the passphrase to a password-protected private key file using the following command. {{% param "product.abbrev" %}} will display a prompt for you to enter the passphrase. We recommend that you use this method.

```c
   syslog-ng-ctl credentials add --id=<path-to-the-key>
```

Alternatively, you can include the passphrase in the `--secret` parameter:

```c
   syslog-ng-ctl credentials add --id=<path-to-the-key> --secret=<passphrase-of-the-key>
```

Or you can pipe the passphrase to the syslog-ng-ctl command, for example:

```c
   echo "<passphrase-of-the-key>" | syslog-ng-ctl credentials add --id=<path-to-the-key>

```
