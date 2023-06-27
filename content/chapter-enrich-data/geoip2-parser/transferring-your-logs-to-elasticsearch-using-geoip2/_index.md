---
title: "Transferring your logs to Elasticsearch using GeoIP2"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

If you are transferring your log messages into Elasticsearch, use the following rewrite rule to combine the longitude and latitude information into a single value (called `geoip2.location`), and set the mapping in Elasticsearch accordingly. Do not forget to include the rewrite in your log path. These examples assume that you used `prefix("geoip2.")` instead of the default for the `geoip2` parser. For details on transferring your log messages to Elasticsearch, see {{% xref "/chapter-destinations/configuring-destinations-elasticsearch2/_index.md" %}}.

```c
   rewrite r_geoip2 {
        set(
            "${geoip2.location.latitude},${geoip2.location.longitude}",
            value( "geoip2.location2" ),
            condition(not "${geoip2.location.latitude}" == "")
        );
    };
```

In your Elasticsearch configuration, set the appropriate mappings:

```c
   {
       "mappings" : {
          "_default_" : {
             "properties" : {
                "geoip2" : {
                   "properties" : {
                      "location2" : {
                         "type" : "geo_point"
                      }
                   }
                }
             }
          }
       }
    }

```
