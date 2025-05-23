---
title: "Anonymize credit card numbers"
weight:  2900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Log messages of banking and e-commerce applications might include credit card numbers (Primary Account Number or PAN). According to privacy best practices and the requirements of the Payment Card Industry Data Security Standards (PCI-DSS), PAN must be rendered unreadable. The {{% param "product.abbrev" %}} application uses a regular expression to detect credit card numbers, and provides two ways to accomplish this: you can either mask the credit card numbers, or replace them with a hash. To mask the credit card numbers, use the `credit-card-mask()` or the `credit-card-hash()` rewrite rules in a log path.

## Declaration

```shell
@include "scl/rewrite/cc-mask.conf"

rewrite {
    credit-card-mask(value("<message-field-to-process>"));
};
```

By default, these rewrite rules process the MESSAGE part of the log message.

## credit-card-hash() {#credit-card-hash}

|           |                                                         |
| --------- | ------------------------------------------------------- |
| Synopsis: | credit-card-hash(value("<message-field-to-process>")) |

*Description:* Process the specified message field (by default, `${MESSAGE}`), and replace any credit card numbers (Primary Account Number or PAN) with a 16-character-long hash. This hash is generated by calculating the SHA-1 hash of the credit card number, selecting the first 64 bits of this hash, and representing this 64 bits in 16 characters.

## credit-card-mask() {#credit-card-mask}

|           |                                                         |
| --------- | ------------------------------------------------------- |
| Synopsis: | credit-card-mask(value("<message-field-to-process>")) |

*Description:* Process the specified message field (by default, `${MESSAGE}`), and replace the 7-12th character of any credit card numbers (Primary Account Number or PAN) with asterisks (`*`). For example, {{% param "product.abbrev" %}} replaces the number `5542043004559005` with `554204******9005`.
