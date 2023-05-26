---
title: "How syslog-ng OSE interacts with HDFS"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application sends the log messages to the official HDFS client library, which forwards the data to the HDFS nodes. The way {{% param "product.abbrev" %}} interacts with HDFS is described in the following steps.

1.  After {{% param "product.abbrev" %}} is started and the first message arrives to the `hdfs` destination, the `hdfs` destination tries to connect to the HDFS NameNode. If the connection fails, {{% param "product.abbrev" %}} will repeatedly attempt to connect again after the period set in `time-reopen()` expires.

2.  {{% param "product.abbrev" %}} checks if the path to the logfile exists. If a directory does not exist {{% param "product.abbrev" %}} automatically creates it. {{% param "product.abbrev" %}} creates the destination file (using the filename set in the {{% param "product.abbrev" %}} configuration file, with a UUID suffix to make it unique, for example, `/usr/hadoop/logfile.txt.3dc1c59e-ab3b-4b71-9e81-93db477ed9d9`) and writes the message into the file. After the file is created, {{% param "product.abbrev" %}} will write all incoming messages into the `hdfs` destination.
    
    {{% alert title="Note" color="info" %}}
When the [`hdfs-append-enabled()`]({{< relref "/docs/chapter-destinations/configuring-destinations-hdfs/reference-destination-hdfs/_index.md" >}}) option is set to `true`, {{% param "product.abbrev" %}} will not assign a new UUID suffix to an existing file, because it is then possible to open a closed file and append data to that.
    {{% /alert %}} {{% alert title="Note" color="info" %}}
{{% include-headless "chunk/para-hdfs-flush.md" %}}
    {{% /alert %}}

3.  If the HDFS client returns an error, {{% param "product.abbrev" %}} attempts to close the file, then opens a new file and repeats sending the message (trying to connect to HDFS and send the message), as set in the `retries()` parameter. If sending the message fails for `retries()` times, {{% param "product.abbrev" %}} drops the message.

4.  The {{% param "product.abbrev" %}} application closes the destination file in the following cases:
    
      - {{% param "product.abbrev" %}} is reloaded
    
      - {{% param "product.abbrev" %}} is restarted
    
      - The HDFS client returns an error.

5.  If the file is closed and you have set an archive directory, {{% param "product.abbrev" %}} moves the file to this directory. If {{% param "product.abbrev" %}} cannot move the file for some reason (for example, {{% param "product.abbrev" %}} cannot connect to the HDFS NameNode), the file remains at its original location, {{% param "product.abbrev" %}} will not try to move it again.
