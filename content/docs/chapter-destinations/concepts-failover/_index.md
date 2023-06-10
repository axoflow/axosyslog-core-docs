---
title: "Client-side failover"
weight:  7900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% productparam "abbrev" %}} can detect if the remote server of a network destination becomes inaccessible, and start sending messages to a secondary server. You can configure multiple failover servers, so if the secondary server becomes inaccessible as well, {{% productparam "abbrev" %}} switches to the third server in the list, and so on. If there are no more failover servers left, {{% productparam "abbrev" %}} returns to the beginning of a list and attempts to connect to the primary server.

The primary server is the address you provided in the destination driver configuration and it has a special role. {{% productparam "abbrev" %}} nominates this destination over the failover servers, and handles it as the primary address.

{{% include-headless "chunk/option-destination-description-failback.md" %}}

If {{% productparam "abbrev" %}} is restarted, it attempts to connect the primary server.

If {{% productparam "abbrev" %}} uses TLS-encryption to communicate with the remote server, {{% productparam "abbrev" %}} checks the certificate of the failover server as well. The certificates of the failover servers should match their domain names or IP addresses — for details, see {{% xref "/docs/chapter-encrypted-transport-tls/tls-serverauth/_index.md" %}}. Note that when mutual authentication is used, the {{% productparam "abbrev" %}} client sends the same certificate to every server.

The primary server and the failover servers must be accessible with the same communication method: it is not possible to use different destination drivers or options for the different servers.

{{% alert title="Note" color="info" %}}

Client-side failover works only for TCP-based connections (including TLS-encrypted connections), that is, the `syslog()` and `network()` destination drivers (excluding UDP transport).

Client-side failover is not supported in the `sql()` driver, even though it may use a TCP connection to access a remote database.

{{% /alert %}}

For details on configuring failover servers, see {{% xref "/docs/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" %}} and {{% xref "/docs/chapter-destinations/configuring-destinations-syslog/reference-destination-syslog-chapter/_index.md" %}}.
