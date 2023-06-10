---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## namespace()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | "\*"   |

*Description:* The `namespace()` option works exactly the same way as [the respective option of the Journalctl command line tool](https://www.freedesktop.org/software/systemd/man/journalctl.html#--namespace=NAMESPACE).

The following modes of operation are available:

  - If you do not specify the `namespace()` option in your configuration, or if you specify an empty string, the `systemd-journal()` source reads and displays log data from all namespaces.

  - If you specify the `namespace()` option as `namespace("\*")`, the `systemd-journal()` source reads and displays log data from all namespaces, interleaved.

  - If `namespace(\<specified-namespace\>)` is specified, the `systemd-journal()` source only reads and displays log data from the specified namespace.

  - If the namespace identifier is prefixed with `"+"` when you specify your `namespace()` option, the `systemd-journal()`source only reads and displays log data from the specified namespace and the default namespace, interleaved.

*Syntax:*`namespace(string)`


## Example: configuration examples for using the namespace() option

The following configuration example uses the default value for the `namespace()` option:

```c
   source s_journal
    { 
      systemd-journal(namespace("*"));
    };

```

The following configuration example uses a prefixed namespace identifier in the `namespace()` option:

```c
   source s_journal
    { 
      systemd-journal(namespace("+foobar"));
    };

```


{{% alert title="Note" color="info" %}}

Namespace support was introduced to the Journalctl command line tool in Systemd version 2.45. The {{% param "product.abbrev" %}} application supports the <span>namespace()</span> option from version 3.29. For further information about namespaces on the Systemd side, see [Journal Namespaces](https://www.freedesktop.org/software/systemd/man/systemd-journald.service.html#Journal%20Namespaces).

{{% /alert %}}

