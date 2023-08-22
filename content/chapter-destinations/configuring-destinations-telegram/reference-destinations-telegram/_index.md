---
title: "telegram() destination options"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `telegram()` destination has the following options:


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



## disable_notification() {#disable_notification}

|          |              |
| -------- | ------------ |
| Type:    | boolean      |
| Default: | `false` |

*Description:* Enables the `telegram()` destination to send silent messages. By default, the `disable_notification()` value is `false`.


## Example: using the disable_notification() option with the telegram() destination

The following example illustrates how you can configure the `disable_notification()`option to send silent messages to the `telegram()` destination.

```shell
   destination {
      telegram(
        bot-id(...)
        chat-id(...) 
        disable_notification(true)
      ); 
    };
```




## disable-web-page-preview() {#https-options-timeout}

|          |         |
| -------- | ------- |
| Type:    | boolean |
| Default: | true    |

*Description:* Disables link previews for links in the message. By default, the disable-web-page-preview value is `true`. From a security point of view, {{% param "product.companyabbrev" %}} recommends to leave it true, otherwise malicious messages can trick the telegram destination to generate traffic to any URL.


{{< include-headless "chunk/option-destination-hook.md" >}}


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

{{% include-headless "chunk/option-destination-throttle.md" %}}
