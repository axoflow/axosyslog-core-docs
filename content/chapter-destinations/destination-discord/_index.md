---
title: "discord: Send alerts and notifications to Discord"
weight:  500
driver: "discord()"
short_description: "Send alerts and notifications to Discord"
type: http
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `discord()` destination driver sends messages to [Discord](https://discord.com/) using [Discord Webhook](https://discord.com/developers/resources/webhook). For the list of available optional parameters, see Discord destination options.

Available in {{% param "product.abbrev" %}} version 3.33 and later.

## Declaration:

```shell
@include "scl.conf"
# ...

destination {
    discord(url("https://discord.com/api/webhooks/x/y"));
};
```

By default the message sending is throttled to 5 message/sec, see [Discord: Rate Limits](https://discord.com/developers/topics/rate-limits#global-rate-limit). To change this, use the `throttle()` option.

To use this destination, the `scl.conf` file must be included in your {{% param "product.abbrev" %}} configuration:

```shell
@include "scl.conf"
```

The `discord()` driver is actually a reusable configuration snippet configured to send log messages using the `http()` driver. For details on using or writing such configuration snippets, see Reusing configuration blocks. You can find the source of this configuration snippet on GitHub.

## Prerequisites

To send messages to Discord, you must setup webhooks. For details, see: [Discord: Intro to Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

## Example: Using the discord() driver {#example-destination-collectd}

The following example sends messages with custom avatar, and text-to-speech enabled.

```shell
@include "scl.conf"
destination d_discord {
    discord(
        url("https://discord.com/api/webhooks/x/y")
        avatar-url("https://example.domain/any_image.png")
        username("$HOST-bot") # Custom bot name, accepts macros
        tts(true) # Text-to-Speech message
        template("${MSG:-[empty message]}") # Message to send, can't be empty
    );
}
```
