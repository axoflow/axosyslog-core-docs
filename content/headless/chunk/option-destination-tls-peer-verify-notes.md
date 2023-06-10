---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
For untrusted certificates only the existence of the certificate is checked, but it does not have to be valid — `syslog-ng` accepts the certificate even if it is expired, signed by an unknown CA, or its CN and the name of the machine mismatches.

{{% alert title="Warning" color="warning" %}}

When validating a certificate, the entire certificate chain must be valid, including the CA certificate. If any certificate of the chain is invalid, {{% param "product.abbrev" %}} will reject the connection.

{{% /alert %}}
