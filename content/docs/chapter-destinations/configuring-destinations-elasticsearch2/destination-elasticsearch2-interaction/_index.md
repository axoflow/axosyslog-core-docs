---
title: "How syslog-ng OSE interacts with Elasticsearch"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% productparam "abbrev" %}} application sends the log messages to the official Elasticsearch client library, which forwards the data to the Elasticsearch nodes. The way {{% productparam "abbrev" %}} interacts with Elasticsearch is described in the following steps.

  - After {{% productparam "abbrev" %}} is started and the first message arrives to the `elasticsearch2` destination, the `elasticsearch2` destination tries to connect to the Elasticsearch server or cluster. If the connection fails, {{% productparam "abbrev" %}} will repeatedly attempt to connect again after the period set in `time-reopen()` expires.

  - If the connection is established, {{% productparam "abbrev" %}} sends JSON-formatted messages to Elasticsearch.
    
    {{% include-headless "chunk/option-destination-elasticsearch-flush-limit-description.md" %}}

  - {{% include-headless "chunk/option-destination-elasticsearch-timezone.md" %}}
