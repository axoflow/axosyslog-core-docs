---
title: "Flow-control and multiple destinations"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Using flow-control on a source has an important side-effect if the messages of the source are sent to multiple destinations. If flow-control is in use and one of the destinations cannot accept the messages, the other destinations do not receive any messages either, because AxoSyslog stops reading the source. For example, if messages from a source are sent to a remote server and also stored locally in a file, and the network connection to the server becomes unavailable, neither the remote server nor the local file will receive any messages.

{{% alert title="Note" color="info" %}}

Creating separate log paths for the destinations that use the same flow-controlled source does not avoid the problem.

{{% /alert %}}

If you use flow-control and reliable disk-based buffering together with multiple destinations, the flow-control starts slowing down the source only when:

  - one destination is down, and

  - the number of messages stored in the disk buffer of the destination reaches (`capacity-bytes()` minus `flow-control-window-bytes()`).
