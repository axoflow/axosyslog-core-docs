---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
<span id="Log"></span>

## Log statement flags

### catchall

This flag means that the source of the message is ignored, only the filters of the log path are taken into account when matching messages. A log statement using the `catchall` flag processes every message that arrives to any of the defined sources.

### drop-unmatched

This flag means that the message is dropped along a log path when it does not match a filter or is discarded by a parser. Without using the `drop-unmatched` flag, {{% param "product.abbrev" %}} would continue to process the message along alternative paths.

### fallback

This flag makes a log statement 'fallback'. Fallback log statements process messages that were not processed by other, 'non-fallback' log statements.

{{< include-headless "chunk/para-flags-processed.md" >}}

### final

This flag means that the processing of log messages processed by the log statement ends here, other log statements appearing later in the configuration file will not process the messages processed by the log statement labeled as 'final'. Note that this does not necessarily mean that matching messages will be stored only once, as there can be matching log statements processed before the current one ({{% param "product.abbrev" %}} evaluates log statements in the order they appear in the configuration file).

{{< include-headless "chunk/para-flags-processed.md" >}}

### flow-control

Enables flow-control to the log path, meaning that AxoSyslog will stop reading messages from the sources of this log statement if the destinations are not able to process the messages at the required speed. If disabled, AxoSyslog will drop messages if the destination queues are full. If enabled, AxoSyslog will only drop messages if the destination queues/window sizes are improperly sized. For details, see {{% xref "/chapter-routing-filters/concepts-flow-control/_index.md" %}}. Starting with version 4.12, you can enable flow-control for every log path using the [`log-flow-control()` global option]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-log-flow-control" >}}).

### no-flow-control

Available in {{< product >}} 4.12 and later.

Disables flow-control for a log path if the [`log-flow-control()` global option]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-log-flow-control" >}}) is enabled.
