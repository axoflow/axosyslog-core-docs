---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
*Description:* Controls what happens when type-casting fails and {{% param "product.abbrev" %}} cannot convert some data to the specified type. By default, {{% param "product.abbrev" %}} drops the entire message and logs the error. Currently the `value-pairs()` option uses the settings of `on-error()`.

  - `drop-message`: Drop the entire message and log an error message to the `internal()` source. This is the default behavior of {{% param "product.abbrev" %}}.

  - `drop-property`: Omit the affected property (macro, template, or message-field) from the log message and log an error message to the `internal()` source.

  - `fallback-to-string`: Convert the property to string and log an error message to the `internal()` source.

  - `silently-drop-message`: Drop the entire message silently, without logging the error.

  - `silently-drop-property`: Omit the affected property (macro, template, or message-field) silently, without logging the error.

  - `silently-fallback-to-string`: Convert the property to string silently, without logging the error.
