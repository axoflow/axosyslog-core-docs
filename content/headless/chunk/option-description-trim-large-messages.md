---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
*Description:* Determines what {{% param "product.abbrev" %}} does with incoming log messages that are received using the IETF-syslog protocol using the `syslog()` driver, and are longer than the value of `log-msg-size()`. Other drivers ignore the `trim-large-messages()` option.

  - If set to `no`, {{% param "product.abbrev" %}} drops the incoming log message.

  - If set to `yes`, {{% param "product.abbrev" %}} trims the incoming log message to the size set in `log-msg-size()`, and adds the `trimmed` tag to the message. The rest of the message is dropped. You can use the tag to filter on such messages.
    
    ```shell
        filter f_trimmed {
            tags("trimmed");
        };
    ```
    
    If {{% param "product.abbrev" %}} trims a log message, it sends a debug-level log message to its `internal()` source.
    
    As a result of trimming, a parser could fail to parse the trimmed message. For example, a trimmed JSON or XML message will not be valid JSON or XML.

Available in {{% param "product.abbrev" %}} version 3.21 and later.
