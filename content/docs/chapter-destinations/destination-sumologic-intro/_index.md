---
title: "Sumo Logic destinations: sumologic-http() and sumologic-syslog()"
weight:  6300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

From version 3.27.1, the {{% param "product.name" %}} ({{% param "product.abbrev" %}}) application can send log messages to [Sumo Logic](https://www.sumologic.com/), a cloud-based log management and security analytics service, by using the `sumologic-http()` and `sumologic-syslog()` destinations.


## Prerequisites

Currently, using the `sumologic-http()` and `sumologic-syslog()` destinations with {{% param "product.abbrev" %}} has the following prerequisites:

- A Sumo Logic account.
    
    If you do not yet have a Sumo Logic account, visit [the official Sumo Logic website](https://www.sumologic.com/), and click `Start free trial` to create an account.
    
    {{% alert title="Note" color="info" %}}
A free trial version of the Sumo Logic account has limited functionalities and is only available for 90 days.
    {{% /alert %}}

- A [Cloud Syslog Source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source) configured with your Sumo Logic account.
    
    For details, follow the configuration instructions under [the Configure a Cloud Syslog Source section](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source#configure-a-cloud%C2%A0syslog%C2%A0source) on the official Sumo Logic website.
    
    {{% alert title="Note" color="info" %}}
Transport-level security (TLS) 1.2 over TCP is required.
    {{% /alert %}}

- A Cloud Syslog Source Token (from the Cloud Syslog Source side).

- TLS set up on your Sumo Logic account.
    
    For detailed information about setting up TLS in your Sumo Logic account, see [the description for setting up TLS on the Sumo Logic official website](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source#set%C2%A0up-tls).
    
    {{% alert title="Note" color="info" %}}
After you download the `DigiCert` certificate, make sure you follow the certificate setup steps under [the syslog-ng section](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source#syslog-ng-1).
    {{% /alert %}}

- Your Sumo Logic syslog client, configured to send data to the Sumo Logic cloud syslog service, by using {{% param "product.abbrev" %}}.
    
    For detailed information, follow the instructions under [the Send data to cloud syslog source with syslog-ng section](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source#send-data-to%C2%A0cloud-syslog-source-with-syslog-ng) on the official Sumo Logic website.

- A verified connection and client configuration with the Sumo Logic service.
    
    {{% alert title="Warning" color="warning" %}}
To avoid potential data loss, we strongly recommend that you verify your [connection](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source#verify-connection-with-sumo-service) and [client configuration](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source#verify-client-configuration) with the Sumo Logic service before you start using the `sumologic-http()` or `sumologic-syslog()` destination with {{% param "product.abbrev" %}} in a production environment.
    {{% /alert %}}

- (Optional) For using the `sumologic-http()` destination, you need a [HTTP Hosted Collector](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source) configured in the Sumo Logic service.
    
    To configure a Hosted Collector, follow the configuration instructions under [the Configure a Hosted Collector section](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector) on the official Sumo Logic website.

- (Optional) For using the `sumologic-http()` destination, you need the unique HTTP collector code you receive while configuring your Host Collector for HTTP requests.



## Limitations

Currently, using the `sumologic-syslog()` and `sumologic-http()` destinations with {{% param "product.abbrev" %}} has the following limitations:

- The minimum required version of {{% param "product.abbrev" %}} is version 3.27.1.

- Message format must be in [RFC 5424-compliant form](https://tools.ietf.org/html/rfc5424#page-8). Messages over 64KB in length are truncated.
    
    For more information about the message format limitations, see [the Message format section](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source#message-format) on the official Sumo Logic website.

- 64 characters long Sumo Logic tokens must be passed in the message body.
    
    {{% alert title="Note" color="info" %}}
Although [RFC 5424](https://tools.ietf.org/html/rfc5424) limits the structured data field ([SD-ID](https://tools.ietf.org/html/rfc5424#page-15)) to 32 characters, Sumo Logic tokens are 64 characters long. If your logging client enforces the 32 characters length limit, you must pass the token in the message body.
    {{% /alert %}}



## Declaration for the sumologic-http() destination

```c
   destination d_sumo_http {
      sumologic-http(
        collector("ZaVnC4dhaV3_[...]UF2D8DRSnHiGKoq9Onvz-XT7RJG2FA6RuyE5z4A==")
        deployment("eu")
        tls(peer-verify(yes) ca-dir('/etc/syslog-ng/ca.d'))
      );
    };
```


## Declaration for the sumologic-syslog() destination

```c
   destination d_sumo_syslog {
      sumologic-syslog(
        token("rqf/bdxYVaBLFMoU39[...]CCC5jwETm@41123")
        deployment("eu")
        tls(peer-verify(yes) ca-dir('/etc/syslog-ng/ca.d'))
      );
    };
```



## Using the sumologic() driver

To use the `sumologic()` driver, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```c
   @include "scl.conf"
```


{{% alert title="Note" color="info" %}}

The `sumologic()` driver is actually a reusable configuration snippet configured to send log messages using the `network()` and `http()` destination by using a template. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/sumologic/sumologic.conf).

{{% /alert %}}

