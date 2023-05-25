---
title: "Configuring multithreading"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with version {{% conditional-text include-if="ose" %}}3.6{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}5 F4{{% /conditional-text %}}, {{% param "product.abbrev" %}} runs in multithreaded mode by default. You can enable multithreading in {{% param "product.abbrev" %}} using the following methods:

  - Globally using the **threaded(yes)** option.

  - Separately for selected sources or destinations using the **flags("threaded")** option.


## Example: Enabling multithreading

To enable multithreading globally, use the `threaded` option:

```c

    options {
        threaded(yes) ;
    };

```

To enable multithreading only for a selected source or destination, use the **flags("threaded")** option:

```c

    source s_tcp_syslog {
        network(
            ip(127.0.0.1)
            port(1999)
            flags("syslog-protocol", "threaded")
        );
    };

```

