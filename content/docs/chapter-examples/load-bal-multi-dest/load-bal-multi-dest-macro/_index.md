---
title: Load balancing with a round robin load balancing method based on the R_MSEC macro of syslog-ng OSE
linktitle: Round robin
weight: 100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes a round robin load balancing method based on the `R_MSEC` macro of {{% param "product.name" %}} ({{% param "product.abbrev" %}}) to load balance your logs between multiple {{% param "product.abbrev" %}} destinations.

{{% alert title="Note" color="info" %}}

If `R_MSEC` is not precise enough, you can replace it with `R_USEC` (which uses microseconds instead of milliseconds).

{{% /alert %}}

For more information about the `R_MSEC` macro and further macros of {{% param "product.abbrev" %}}, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" %}}.


## Example: round robin load balancing between multiple destinations

The following example is a round-robin load balancing method, based on {{% param "product.abbrev" %}}'s `R_MSEC` macro.

```c
   destination d_lb_network { 
      channel { 
        channel { 
          filter { 
          "0" == "$(% ${R_MSEC} 2)" 
          }; 
          destination { 
            network("myhost1" 
              disk-buffer(mem-buf-length(10000) disk-buf-size(2000000))); 
          }; 
          flags(final); 
        }; 
     
        channel { 
        filter { 
        "1" == "$(% ${R_MSEC} 2)" 
        }; 
    
        destination { 
          network("myhost2" 
            disk-buffer(mem-buf-length(10000) disk-buf-size(2000000))); 
        }; 
        flags(final); 
        }; 
      }; 
    }; 
```

The `filter {" \<return value \>" == "$(% ${R_MSEC} 2)"};` code snippets (in bold) serve as the basis of the method. This filter separates incoming log messages' timestamp values based on the `R_MSEC` macro, using a division with remainder method, and distributes the log messages equally between two destinations based on the return value (in this case, `0` or `1`).


If you need a file instead of a network destination, replace the network destination with the file in the example (and use the same analogy for any other {{% param "product.abbrev" %}} destinations).

For an alternative method to use the round robin load balancing method based on the `R_MSEC` macro, see {{% xref "/docs/chapter-examples/load-bal-multi-dest/load-bal-multi-dest-msec-h/_index.md" %}}.
