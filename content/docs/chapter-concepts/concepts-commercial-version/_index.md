---
title: "Commercial version of syslog-ng"
weight:  2300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The syslog-ng application has a commercial version available, called {{% param "product.pe" %}} ({{% param "product.pe" %}}). The commercial version comes with well-tested features from its open source foundation, a number of extra features, enterprise-level support, as well as a ready-to-use log management appliance built on the strengths of {{% param "product.pe" %}}.


## Exclusive features related to compliance

Collecting and analyzing log messages is required directly or indirectly by several regulations, frameworks, and standards, including the Sarbanes-Oxley Act (SOX), the Health Insurance and Portability Act (HIPAA), and the Payment Card Industry Data Security Standard (PCI-DSS). {{% param "product.pe" %}} provides a set of features that help you comply with regulations that require the central collection of log messages in a tamperproof way:

  - Logstore files enable you to store log messages securely in encrypted, compressed and timestamped binary files. From a compliance point of view, this serves a double purpose. Encryption guarantees the integrity of log messages so you can be sure that they have not been manipulated. Timestamping provides verifiable proof about the exact time when log messages arrived.

  - Reliable Log Transfer Protocol (RLTP) is a proprietary transport protocol that prevents message loss during connection breaks. When using this protocol, the sender detects which messages the receiver has successfully received (based on the acknowledgments returned by the receiver after having processed messages). If messages are lost during transfer, the sender resends the missing messages, starting from the last successfully received message. Therefore, messages are not duplicated at the receiving end in case of a connection break.



## Wide range of supported platforms with binary installers

{{% param "product.pe" %}} comes with tested binary files that are available for a wide array of server platforms, reducing the time required for installation and maintenance. Support for a wide range of operating system and hardware platforms also make {{% param "product.pe" %}} an ideal choice to collect logs in massively heterogeneous environments.



## Enterprise-level support services

As all commercial software, {{% param "product.pe" %}} also comes with various enterprise-level support packages, which means that you get immediate and pro-active assistance (24x7 if you choose a top-tier package), dedicated to resolving your issue as soon as possible when you experience problems.

For more information about {{% param "product.pe" %}}, see [The {{% param "product.pe" %}} Administrator Guide](https://goo.gl/cLBrpN).



## {{% param "product.ssblong" %}}, ready-to-use log management appliance

{{% param "product.ssblong" %}} ({{% param "product.ssblong" %}}) is a log management appliance that is built on {{% param "product.pe" %}}. It is a turnkey solution to manage your log data, meaning that no software installation is necessary. As {{% param "product.ssblong" %}} is available both as a virtual machine and a physical appliance, it is also easily scalable.

{{% param "product.ssblong" %}} provides a number of features that can add value for your use cases:

  - A web GUI that makes searching logs, as well as configuring and managing {{% param "product.ssblong" %}} itself easy:
    
      - The search interface allows you to use wildcards and Boolean operators to perform complex searches, and drill down on the results. You can gain a quick overview and pinpoint problems fast by generating ad-hoc charts from the distribution of the log messages.
        
        In addition, you can easily create customized reports from the charts and statistics you create on the search interface to demonstrate compliance with standards and regulations such as PCI-DSS, ISO 27001, SOX and HIPAA.
    
      - Configuring {{% param "product.ssblong" %}} is done through the user interface. All of the flexible filtering, classification and routing features in the {{% param "product.ose" %}} and {{% param "product.pe" %}} can be configured with it. Access and authentication policies can be set to integrate with Microsoft Active Directory, LDAP and Radius servers. The web interface is accessible through a network interface dedicated to management traffic. This management interface is also used for backups, sending alerts, and other administrative traffic.

  - High availability support to ensure continuous log collection in business-critical environments.

For further details about {{% param "product.ssblong" %}}, see [The {{% param "product.ssblong" %}} Administrator Guide](https://goo.gl/cbxYNx).



## Upgrading from {{% param "product.ose" %}} to {{% param "product.pe" %}}

If you wish to upgrade from {{% param "product.ose" %}} to {{% param "product.pe" %}}, read the blog post [Upgrading from {{% param "product.ose" %}} to {{% param "product.pe" %}}](https://syslog-ng.com/blog/upgrading-from-syslog-ng-open-source-to-premium-edition/) for instructions and tips.

