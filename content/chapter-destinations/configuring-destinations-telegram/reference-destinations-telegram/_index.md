---
title: "telegram() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `telegram()` destination has the following options.

The `telegram()` destination is a reusable configuration snippet based on the `http()` destination, so you can use the [options of the `http()` destination]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}) as well. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/master/scl/telegram/telegram.conf). Note that the `telegram()` destination changes the default value of several `http()` options, as described in the following sections.

<!-- FIXME include/reference http() options -->

## bot-id() {#https-options-timeout}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | N/A    |

*Description:* This is a required option. Specifies the token for the bot necessary to access the Telegram HTTP API.



## chat-id() {#https-options-timeout}

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | N/A    |

*Description:* This is a required option. Specifies the ID of the chat of the telegram destination.



## disable-notification() {#disable_notification}

|          |              |
| -------- | ------------ |
| Type:    | boolean      |
| Default: | `false` |

*Description:* Enables the `telegram()` destination to send silent messages. By default, the `disable-notification()` value is `false`.


## Example: using the disable-notification() option with the telegram() destination

The following example illustrates how you can configure the `disable-notification()`option to send silent messages to the `telegram()` destination.

```shell
   destination {
      telegram(
        bot-id(...)
        chat-id(...) 
        disable-notification(true)
      ); 
    };
```




## disable-web-page-preview() {#https-options-timeout}

|          |         |
| -------- | ------- |
| Type:    | boolean |
| Default: | true    |

*Description:* Disables link previews for links in the message. By default, the disable-web-page-preview value is `true`. From a security point of view, {{% param "product.companyabbrev" %}} recommends to leave it true, otherwise malicious messages can trick the telegram destination to generate traffic to any URL.


{{< include-headless "chunk/option-hook-commands.md" >}}


## parse-mode() {#https-options-timeout}

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | none   |

*Description:* Formats the message in a markdown-style or HTML-style formatting. By default, the parse-mode value is `markdown`, which means that the message is formatted in markdown style.



## template()

|          |                 |
| -------- | --------------- |
| Type:    | string          |
| Default: | `${MESSAGE}` |

*Description:* Specifies the content of the message. The {{% param "product.abbrev" %}} application will automatically encode the content of this option using the `url-encode()` template function.


{{% include-headless "chunk/option-source-time-reopen.md" %}}

## throttle()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 1      |

{{% include-headless "chunk/option-throttle-description.md" %}}

The `telegram()` destination changes the default value of the underlying `http()` destination from `0` (unlimited) to `1`, because Telegram limits how frequently a bot can send messages. For details, see [My bot is hitting limits, how do I avoid this?](https://core.telegram.org/bots/faq#my-bot-is-hitting-limits-how-do-i-avoid-this) in the Telegram documentation.

## use-system-cert-store()

|          |               |
| -------- | ------------- |
| Type:    | `yes` or `no` |
| Default: | `yes`         |

*Description:* For details, see [`use-system-cert-store()`]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}#use-system-cert-store) of the `http()` destination. The `telegram()` destination changes the default value of the underlying `http()` destination from `no` to `yes`.
