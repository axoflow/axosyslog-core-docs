---
title: How relaying log messages works
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Depending on your exact needs about relaying log messages, there are many scenarios and {{% param "product.abbrev" %}} options that influence how the log message will look like on the logserver. Some of the most common cases are summarized in the following example:

Consider the following example: *client-host > relay > server*, where the IP address of `client-host` is `192.168.1.2`. The `client-host` device sends a syslog message to `relay`. Depending on the settings of `relay`, the following can happen.

  - By default, the `keep-hostname()` option is disabled, so `relay` writes the IP address of the sender host (in this case, `192.168.1.2`) to the HOST field of the syslog message, discarding any IP address or hostname that was originally in the message.

  - If the `keep-hostname()` option is enabled on `relay`, but name resolution is disabled (the `use-dns()` option is set to `no`), `relay` uses the HOST field of the message as-is, which is probably `192.168.1.2`.

  - To resolve the `192.168.1.2` IP address to a hostname on `relay` using a DNS server, use the `keep-hostname(no)` and `use-dns(yes)` options. If the DNS server is properly configured and reverse DNS lookup is available for the `192.168.1.2` address, {{% param "product.abbrev" %}} will rewrite the HOST field of the log message to `client-host`.
    
    {{% alert title="Note" color="info" %}}
It is also possible to resolve IP addresses locally, without relying on the DNS server. For details on local name resolution, see {{% xref "/docs/chapter-examples/examples-dns/example-local-dns/_index.md" %}}.
    {{% /alert %}}

  - The above points apply to the {{% param "product.abbrev" %}} server (`server`) as well, so if `relay` is configured properly, use the `keep-hostname(yes)` option on `server` to retain the proper HOST field. Setting `keep-hostname(no)` on `server` would result in {{% param "product.abbrev" %}} rewriting the HOST field to the address of the host that sent the message to `server`, which is `relay` in this case.

  - If you cannot or do not want to resolve the `192.168.1.2` IP address on `relay`, but want to store your log messages on `server` using the IP address of the original host (that is, `client-host`), you can enable the `spoof-source()` option on `relay`. However, `spoof-source()` works only under the following conditions:
    
      - The {{% param "product.abbrev" %}} binary has been compiled with the `--enable-spoof-source` option.
    
      - The log messages are sent using the highly unreliable UDP transport protocol. (Extremely unrecommended.)
