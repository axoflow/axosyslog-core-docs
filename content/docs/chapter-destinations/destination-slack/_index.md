---
title: "slack: Sending alerts and notifications to a Slack channel"
weight:  5100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `slack()` destination driver sends messages to a [Slack](https://slack.com/) channel using the Slack Web API. For the list of available optional parameters, see {{% xref "/docs/chapter-destinations/destination-slack/reference-destination-slack/_index.md" %}}. This destination is available in version 3.19 and later.


## Declaration:

```c
   destination d_slack {
      slack(
        hook-url("https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX")
      );
    };

```


The driver allows you to modify nearly every field of the HTTP request. For details, see the [Slack API documentation](https://api.slack.com/docs/message-attachments).

{{% include-headless "chunk/destination-http-proxy-settings.md" %}}

{{% include-headless "chunk/option-description-destination-slack-throttle.md" %}}


To use this destination, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```c
   @include "scl.conf"

```

The `slack()` driver is actually a reusable configuration snippet configured to send log messages using the `http()` driver. For details on using or writing such configuration snippets, see {{% xref "/docs/chapter-configuration-file/large-configs/config-blocks/_index.md" %}}. You can find the source of this configuration snippet on [GitHub](https://github.com/syslog-ng/syslog-ng/blob/master/scl/slack/slack.conf).



## Prerequisites {#slack-destination-prerequisites}

To send messages and notifications from {{% param "product.abbrev" %}} to Slack, you must create a Slack app and a Webhook that {{% param "product.abbrev" %}} can use. For details, see the [Slack documentation](https://api.slack.com/incoming-webhooks).



## Example: Using the slack() driver {#example-destination-slack}

The following example sets the colors and the author of the message.

```c
   @include "scl.conf"
    
    destination d_slack1 {
      slack(
        hook-url("https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX")
        colors("#000000,#222222,#444444,#666666,#888888,#AAAAAA,#CCCCCC,#EEEEEE")
        color-chooser(7)
        author-name("syslog-ng BOT")
        author-link("https://www.syslog-ng.com/products/open-source-log-management")
        author-icon("https://raw.githubusercontent.com/MrAnno/vscode-syslog-ng/master/images/syslog-ng-icon.png")
      );
    };

```

