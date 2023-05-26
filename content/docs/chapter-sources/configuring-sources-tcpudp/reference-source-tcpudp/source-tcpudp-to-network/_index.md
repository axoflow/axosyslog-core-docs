---
title: "Change an old source driver to the network() driver"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To replace your existing `tcp()`, `tcp6()`, `udp()`, `udp6()` sources with a `network()` source, complete the following steps.

1.  Replace the driver with `network`. For example, replace `udp(` with `network(`

2.  Set the transport protocol.
    
      - If you used TLS-encryption, add the `transport("tls")` option, then continue with the next step.
    
      - If you used the `tcp` or `tcp6` driver, add the `transport("tcp")` option.
    
      - If you used the `udp` or `udp` driver, add the `transport("udp")` option.

3.  If you use IPv6 (that is, the `udp6` or `tcp6` driver), add the `ip-protocol(6)` option.

4.  If you did not specify the port used in the old driver, check {{% xref "/docs/chapter-sources/configuring-sources-network/reference-source-network/_index.md" %}} and verify that your clients send the messages to the default port of the transport protocol you use. Otherwise, set the appropriate port number in your source using the `port()` option.

5.  All other options are identical. Test your configuration with the `syslog-ng --syntax-only` command.
    
    The following configuration shows a simple `tcp` source.
    
    ```c
        source s_old_tcp {
            tcp(
                ip(127.0.0.1) port(1999)
                tls(
                    peer-verify("required-trusted")
                    key-file("/opt/syslog-ng/etc/syslog-ng/syslog-ng.key")
                    cert-file('/opt/syslog-ng/etc/syslog-ng/syslog-ng.crt')
                )
            );
        };
    ```
    
    When replaced with the `network()` driver, it looks like this.
    
    ```c
        source s_new_network_tcp {
            network(
                transport("tls")
                ip(127.0.0.1) port(1999)
                tls(
                    peer-verify("required-trusted")
                    key-file("/opt/syslog-ng/etc/syslog-ng/syslog-ng.key")
                    cert-file('/opt/syslog-ng/etc/syslog-ng/syslog-ng.crt')
                )
            );
        };
    ```
