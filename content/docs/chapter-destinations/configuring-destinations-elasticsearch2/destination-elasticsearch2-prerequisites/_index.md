---
title: "Prerequisites"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

To send messages from {{% param "product.abbrev" %}} to Elasticsearch, complete the following steps.


## Steps:

1.  Download and install the Java Runtime Environment (JRE), 2.x (or newer). The {{% param "product.abbrev" %}}`elasticsearch2` destination is tested and supported when using the Oracle implementation of Java. Other implementations are untested and unsupported, they may or may not work as expected.

2.  {{% alert title="Note" color="info" %}}
This step is only required if you use the `elasticsearch2` destination in node mode or transport mode.
    {{% /alert %}}
    
    Download the Elasticsearch libraries (version 2.x or newer from the 2.x line) from <https://www.elastic.co/downloads/elasticsearch>.

3.  {{% alert title="Note" color="info" %}}
This step is only required if you use the `elasticsearch2` destination in node mode or transport mode.
    {{% /alert %}}
    
    Extract the Elasticsearch libraries into a temporary directory, then collect the various `.jar` files into a single directory (for example, `/opt/elasticsearch/lib/`) where {{% param "product.abbrev" %}} can access them. You must specify this directory in the {{% param "product.abbrev" %}} configuration file. The files are located in the `lib` directory and its subdirectories of the Elasticsearch release package.

