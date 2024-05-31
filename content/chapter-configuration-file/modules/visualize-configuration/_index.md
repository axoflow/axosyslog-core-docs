---
title: "Visualize the configuration"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with {{% param "product.abbrev" %}} 3.25, you can visualize the configuration of a running {{% param "product.abbrev" %}} instance using the `syslog-ng-ctl --export-config-graph` command. The command walks through the effective configuration, and exports it as a graph into a JSON structure.

The resulting JSON file can be converted into [DOT file format](https://en.wikipedia.org/wiki/DOT_(graph_description_language)) that visualization tools (for example, Graphviz) can use. The package includes a Python script to convert the exported JSON file into DOT format: `<syslog-ng-installation-directory>/contrib/scripts/config-graph-json-to-dot.py`

You can convert the DOT file into PNG or PDF format using external tools.
