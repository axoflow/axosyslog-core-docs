---
title: "graphite() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `graphite()` destination has the following options:

{{< include-headless "chunk/option-destination-hook.md" >}}


## host() {#graphite-option-host}

|          |                        |
| -------- | ---------------------- |
| Type:    | hostname or IP address |
| Default: | localhost              |

*Description:* The hostname or IP address of the Graphite server.



## port() {#graphite-option-port}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 2003   |

*Description:* The port number of the Graphite server.



## payload() {#graphite-option-payload}

| Type:        | parameter list of the `payload()` option    |
|--------------|-----------|
| Default:     | empty string   |

*Description:* The payload() option allows you to select which value pairs to forward to graphite.

The syntax of `payload` is different from the syntax of `value-pairs()`: use the command-line syntax used in the [format-json template function]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}). For details on using the payload() option, see [graphite-output]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md" >}}).

{{% alert title="Note" color="info" %}}

If left empty, there is no data to be forwarded to Graphite.

{{% /alert %}}

