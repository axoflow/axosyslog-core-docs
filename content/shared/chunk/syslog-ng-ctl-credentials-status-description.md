---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
The `syslog-ng-ctl credentials status` command allows you to query the status of the private keys that {{% productparam "abbrev" %}} uses in the `network()` and `syslog()` drivers. The command returns the list of private keys used, and their status. For example:

```c

    syslog-ng-ctl credentials status
    Secret store status:
    /home/user/ssl_test/client-1/client-encrypted.key SUCCESS

```

If the status of a key is PENDING, you must provide the passphrase for the key, otherwise {{% productparam "abbrev" %}} cannot use it. The sources and destinations that use these keys will not work until you provide the passwords. Other parts of the {{% productparam "abbrev" %}} configuration will be unaffected. You must provide the passphrase of the password-protected keys every time {{% productparam "abbrev" %}} is restarted.

The following log message also notifies you of PENDING passphrases:

```c

    Waiting for password; keyfile='private.key'

```
