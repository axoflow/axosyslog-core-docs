---
title: "Secure logging using TLS"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `syslog-ng` application can send and receive log messages securely over the network using the Transport Layer Security (TLS) protocol using the `network()` and `syslog()` drivers.

{{% alert title="Note" color="info" %}}

This chapter describes how to use TLS encryption when using the standard syslog protocols, that is, the `network()` and `syslog()` drivers, for example, to forward log messages between two `syslog-ng` nodes, or to send log data to a log server. Other destinations that support TLS-encryption are not discussed in this chapter (for example, [`http()`]({{< relref "/docs/chapter-destinations/configuring-destinations-http-nonjava/_index.md" >}})).

{{% /alert %}}

TLS uses certificates to authenticate and encrypt the communication, as illustrated on the following figure:

![](/images/figures/fig-certificate-based-authentication01.png)

The client authenticates the server by requesting its certificate and public key. Optionally, the server can also request a certificate from the client, thus mutual authentication is also possible.

In order to use TLS encryption in `syslog-ng`, the following elements are required:

  - A certificate on the `syslog-ng` server that identifies the server.

  - The certificate of the Certificate Authority that issued the certificate of the `syslog-ng` server (or the self-signed certificate of the `syslog-ng` server) must be available on the `syslog-ng` client.

When using mutual authentication to verify the identity of the clients, the following elements are required:

  - A certificate must be available on the `syslog-ng` client. This certificate identifies the `syslog-ng` client.

  - The certificate of the Certificate Authority that issued the certificate of the `syslog-ng` client must be available on the `syslog-ng` server.

Mutual authentication ensures that the `syslog-ng` server accepts log messages only from authorized clients.

For more information about configuring TLS communication, see {{% xref "/docs/chapter-encrypted-transport-tls/tls-serverauth/_index.md" %}}.

For more information about TLS-related error messages, see {{% xref "/docs/chapter-troubleshooting-syslog-ng/error-messages/_index.md" %}}.
