---
title: "Mutual authentication using TLS"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes how to configure mutual authentication between the AxoSyslog server and the client. Configuring mutual authentication is similar to configuring TLS (for details, see {{% xref "/chapter-encrypted-transport-tls/tls-serverauth/_index.md" %}}), but the server verifies the identity of the client as well. Therefore, each client must have a certificate, and the server must have the certificate of the CA that issued the certificate of the clients. For the concepts of using TLS in `syslog-ng`, see {{% xref "/chapter-encrypted-transport-tls/concepts-tls/_index.md" %}}.
