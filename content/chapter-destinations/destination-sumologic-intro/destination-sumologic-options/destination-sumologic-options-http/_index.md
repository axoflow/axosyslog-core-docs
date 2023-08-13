---
title: "sumologic-http() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `sumologic-http()` destination supports all {{% xref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" %}}.

In addition, the `sumologic-http()` destination also has the following options.

{{% include-headless "chunk/option-destination-batch-bytes.md" %}}

{{% include-headless "chunk/option-destination-batch-lines.md" %}}

{{% include-headless "chunk/option-destination-tls-ca-dir.md" %}}

{{< include-headless "chunk/option-destination-tls-ca-file.md" >}}

<span id="sumologic-option-token"></span>

## collector() {#sumologic-option-token}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | empty  |

*Description:* The Cloud Syslog Cloud Token that you received from the Sumo Logic service while [configuring your cloud syslog source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source#configure-a-cloud%C2%A0syslog%C2%A0source).

For details on the option in the destination's declaration, see [Declaration for the sumologic-http() destination]({{< relref "/chapter-destinations/destination-sumologic-intro/_index.md" >}}).



{{% include-headless "chunk/option-deployment-sumologic.md" %}}



{{% include-headless "chunk/options-http-headers.md" %}} {{% alert title="Note" color="info" %}}

The `headers()` option is a required option for the `sumologic-http()` destination.

{{% /alert %}}


{{% include-headless "chunk/option-source-time-reopen.md" %}}


{{% include-headless "chunk/option-tls-sumologic.md" %}}

