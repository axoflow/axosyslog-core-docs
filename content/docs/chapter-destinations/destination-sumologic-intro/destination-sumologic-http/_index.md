---
title: "sumologic-http()"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% include-headless "chunk/sumologic-intro-para.md" %}}

Using the `sumologic-http()` destination, you can send data to the Sumo Logic service by utilizing a [Hosted Collector hosted by Sumo Logic](https://help.sumologic.com/03Send-Data/Hosted-Collectors).

For more information about the `sumologic-http()` destination, see {{% xref "/docs/chapter-destinations/destination-sumologic-intro/destination-sumologic-syslog/_index.md" %}}.


## Sending data using the sumologic-http() destination


## Example: Using the sumologic-http() destination {#example-destination-sumologic-http}

The following example sends every log from the `system()` source to your Sumo Logic account.

```c
   log {
      source { system(); };
    
      destination {
        sumologic-http(
          collector("UNIQUE-HTTP-COLLECTOR-CODE-AS-PROVIDED-BY-sumologic")
          deployment("ENDPOINT")
          tls(peer-verify(yes) ca-dir('/etc/syslog-ng/ca.d'))
        );
      };
    };
```


