---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## frac-digits()

|          |        |
| -------- | ------ |
| Type:    | number |
| Default: | 0      |



*Description:* The `syslog-ng` application can store fractions of a second in the timestamps according to the ISO8601 format. The `frac-digits()` parameter specifies the number of digits stored. The digits storing the fractions are padded by zeros if the original timestamp of the message specifies only seconds. Fractions can always be stored for the time the message was received.

{{% alert title="Note" color="info" %}}

The {{% param "product.abbrev" %}} application can add the fractions to non-ISO8601 timestamps as well.

{{% /alert %}}

{{% include-headless "wnt/n-frac-trunc.md" %}}

