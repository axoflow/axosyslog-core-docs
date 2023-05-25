---
title: "Telegram: Sending messages to Telegram"
weight:  7100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `telegram()` destination sends log messages to [Telegram](https://core.telegram.org/ "https://core.telegram.org"), which is a secure, cloud-based mobile and desktop messaging app.

Note that this destination automatically uses the certificate store of the system (for details, see the [curl documentation](https://curl.haxx.se/docs/sslcerts.html)).


## Declaration:

```c
   telegram(parameters);

```


{{% include-headless "chunk/destination-http-proxy-settings.md" %}}


## Example: Using the telegram() driver {#example-destination-mongodb}

The following example creates a `telegram()` destination.

```c
   destination d_telegram {
        telegram(
            template("${MESSAGE}")
            throttle(1)
            parse-mode("markdown")
            disable-web-page-preview("true")
            bot-id("<bot id>")
            chat-id("<chat id>")
        );
    };

```

