---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## port() or localport() {#port}

|          |         |
| -------- | ------- |
| Type:    | number  |
| Default: | 80 for `transport(tcp)`, 443 for `transport(tls)` |

*Description:* The port number to bind to. Make sure to enable this port on the firewall of the {{% param "product.abbrev" %}} host.
