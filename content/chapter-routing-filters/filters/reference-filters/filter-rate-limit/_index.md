---
title: "rate-limit()"
weight:  2100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

|           |                                        |
| --------- | -------------------------------------- |
| Synopsis: | rate-limit(template($HOST) rate(5000)) |

*Description:* Limits messages rate based on arbitrary keys in each message. The key will be resolved using the `template()` option. Each resolution will be allowed to have the number of messages each second, set by the `rate()` option. For example if `template($HOST)` and `rate(5000)` are set, and there are 2 hosts sending messages to {{% param "product.abbrev" %}}, a total of `10000` messages will be allowed by the `rate-limit()` filter, `5000` from the first and `5000` from the second host. If `template()` was not set instead, then `5000` messages would be allowed each second, regardless of their content.

{{% alert title="Note" color="info" %}}

In {{% param "product.abbrev" %}} version 3.35 the `rate-limit()` filter was called `throttle()`. In {{% param "product.abbrev" %}} version 3.36 it got renamed to `rate-limit()`, but `throttle()` is still available for backward compatibility.

{{% /alert %}} {{% alert title="Note" color="info" %}}

Like every other filter, messages unmatched (outside of the rate limit) by the `rate-limit()` filter are dropped by default. Also, as every filter can be used in channels or if conditions, the messages unmatched can be caught and handled, like sent to a different destination, and so on.

{{% /alert %}}


## Example: Using the rate-limit() filter

The following example depicts the scenario described in the description part of this section.

```shell
   filter f_rate_limit {
                    rate-limit(
                    template("$HOST")
                    rate(5000)
                    );
                };
```

