---
title: "Looking up GeoIP data from IP addresses (DEPRECATED)"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This parser is deprecated. Use {{% xref "/docs/chapter-enrich-data/geoip2-parser/_index.md" %}} instead.

The {{% productparam "abbrev" %}} application can lookup IPv4 addresses from an offline GeoIP database, and make the retrieved data available in name-value pairs. IPv6 addresses are not supported. Depending on the database used, you can access country code, longitude, and latitude information.

{{% alert title="Note" color="info" %}}

To access longitude and latitude information, download the [GeoLiteCity](http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz) database, and unzip it (for example, to the `/usr/share/GeoIP/GeoLiteCity.dat` file). The default databases available on Linux and other platforms usually contain only the country codes.

{{% /alert %}}

You can refer to the separated parts of the message using the key of the value as a macro. For example, if the message contains `KEY1=value1,KEY2=value2`, you can refer to the values as **${KEY1}** and **${KEY2}**.


## Declaration:

```c

    parser parser_name {
        geoip(
            <macro-containing-the-IP-address-to-lookup>
            prefix()
            database("<path-to-database-file>")
        );
    };

```



## Example: Using the GeoIP parser

In the following example, {{% productparam "abbrev" %}} retrieves the GeoIP data of the IP address contained in the ${HOST} field of the incoming message, and includes the data (prefixed with the `geoip.` string) in the output JSON message.

```c

    @version: 3.7
    
    options {
        keep-hostname(yes);
    };
    
    source s_file {
        file("/tmp/input");
    };
    
    parser p_geoip { geoip( "${HOST}", prefix( "geoip." ) database( "/usr/share/GeoIP/GeoLiteCity.dat" ) ); };
    
    destination d_file {
        file( "/tmp/output" template("$(format-json --scope core --key geoip*)\n") );
    };
    
    
    log {
        source(s_file);
        parser(p_geoip);
        destination(d_file);
    };

```

For example, for the `\<38\>Jan 1 14:45:22 192.168.1.1 prg00000[1234]: test message` message the output will look like:

```c

    {"geoip":{"longitude":"47.460704","latitude":"19.049968","country_code":"HU"},"PROGRAM":"prg00000","PRIORITY":"info","PID":"1234","MESSAGE":"test message","HOST":"192.168.1.1","FACILITY":"auth","DATE":"Jan  1 14:45:22"}

```

If you are transferring your log messages into Elasticsearch, use the following rewrite rule to combine the longitude and latitude information into a single value (called `geoip.location`), and set the mapping in Elasticsearch accordingly. Do not forget to include the rewrite in your log path. For details on transferring your log messages to Elasticsearch, see {{% xref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/_index.md" %}}.

```c

    rewrite r_geoip {
        set(
            "${geoip.latitude},${geoip.longitude}",
            value( "geoip.location" ),
            condition(not "${geoip.latitude}" == "")
        );
    };

```

In your Elasticsearch configuration, set the appropriate mappings:

```c

    {
       "mappings" : {
          "_default_" : {
             "properties" : {
                "geoip" : {
                   "properties" : {
                      "country_code" : {
                         "index" : "not_analyzed",
                         "type" : "string",
                         "doc_values" : true
                      },
                      "latitude" : {
                         "index" : "not_analyzed",
                         "type" : "string",
                         "doc_values" : true
                      },
                      "longitude" : {
                         "type" : "string",
                         "doc_values" : true,
                         "index" : "not_analyzed"
                      },
                      "location" : {
                         "type" : "geo_point"
                      }
                   }
                }
             }
          }
       }
    }

```

