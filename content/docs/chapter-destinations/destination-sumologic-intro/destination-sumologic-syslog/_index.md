---
title: "sumologic-syslog()"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% include-headless "chunk/sumologic-intro-para.md" %}}

Using the `sumologic-syslog()` destination, you can send data (both in JSON and in non-JSON format) to the Sumo Logic service.

For more information about the `sumologic-http()` destination, see {{% xref "/docs/chapter-destinations/destination-sumologic-intro/destination-sumologic-http/_index.md" %}}.


## Sending data using the sumologic-syslog() destination


## Example: Sending data using the sumologic-syslog() destination {#example-destination-sumologic-syslog}

The following example illustrates how you can use the `sumologic-syslog()` destination to send data to your Sumo Logic account.

```c

    log {
      source { system(); };
    
      destination{
        sumologic-syslog(token("USER-TOKEN-AS-PROVIDED-BY-sumologic")
          deployment("ENDPOINT")
          tls(peer-verify(required-trusted) ca-dir('/etc/syslog-ng/ca.d'))
        );
    };
    };

```




## Sending JSON data using the sumologic-syslog destination


## Example: Sending data using the sumologic-syslog() destination {#example-destination-sumologic-syslog-json}

The following example illustrates how you can use the `sumologic-syslog()` destination to send JSON data to your Sumo Logic account.

```c

    log {
      source{ system(); };
    
      destination{
        sumologic-syslog(token("USER-TOKEN-AS-PROVIDED-BY-sumologic")
          deployment("ENDPOINT")
          tls(peer-verify(required-trusted) ca-dir('/etc/syslog-ng/ca.d'))
          template("$(format-json --scope all-nv-pairs)")
        );
      };
    };

```


