---
title: "riemann: Monitoring your data with Riemann"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `riemann()` driver sends your data (for example, metrics or events) to a [Riemann](http://riemann.io/) monitoring system.

For the list of available parameters, see {{% xref "/chapter-destinations/configuring-destinations-riemann/reference-destination-riemann/_index.md" %}}.


## Declaration:

```c
   riemann(
        server("<riemann-server-address>")
        port("<riemann-server-port>")
        metric("<the-metric-or-data-to-send-to-riemann>")
    );
```



## Example: Using the riemann() driver {#example-using-riemann}

The following destination sends the value of the SEQNUM macro (the number of messages sent to this destination) as a metric to the Riemann server.

```c
   @version: {{% param "product.techversion" %}}
    
    source s_network {
        network(port(12345));
    };
    
    destination d_riemann {
        riemann(
            server("localhost")
            port(5555)
            ttl("300.5")
            metric(int("$SEQNUM"))
            description("syslog-ng riemann test")
            state("ok")
            attributes(x-ultimate-answer("$(+ $PID 42)")
                       key("MESSAGE", rekey(add-prefix("x-")) )
                       )
        );
    };
    
    log {
        source(s_network);
        destination(d_riemann);
        flags(flow-control);
    };
```


For a detailed use-case on using {{% param "product.abbrev" %}} with the Riemann monitoring system, see the article [A How to Guide on Modern Monitoring and Alerting by Fabien Wernli](https://devops.com/guide-modern-monitoring-alerting/).
