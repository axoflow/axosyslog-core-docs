---
title: "sumologic-syslog() destination options"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `sumologic-syslog()` destination supports all {{% xref "/docs/chapter-destinations/configuring-destinations-network/reference-destination-network-chapter/_index.md" %}}.

In addition, the `sumologic-syslog()` destination also has the following options.


{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}



{{< include-headless "chunk/option-destination-tls-ca-file.md" >}}



{{% include-headless "chunk/option-deployment-sumologic.md" %}}



{{% include-headless "chunk/option-port-sumologic.md" %}}



{{% include-headless "chunk/option-tag-sumologic.md" %}}



{{% include-headless "chunk/option-tls-sumologic.md" %}}



## token() {#sumologic-option-token}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: |        |

*Description:* Required option. The Cloud Syslog Cloud Token that you received from the Sumo Logic service while [configuring your cloud syslog source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source#configure-a-cloud%C2%A0syslog%C2%A0source).

