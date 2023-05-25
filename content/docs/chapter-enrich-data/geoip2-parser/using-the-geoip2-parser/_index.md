---
title: "Using the GeoIP2 parser"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Declaration:

```c

    parser parser_name {
        geoip2(
            <macro-containing-the-IP-address-to-lookup>
            prefix()
            database("<path-to-geoip2-database-file>")
        );
    };

```


In the following example, {{% param "product.abbrev" %}} retrieves the GeoIP2 data of the IP address contained in the ${HOST} field of the incoming message (assuming that in this case the ${HOST} field contains an IP address), and includes the data (prefixed with the `geoip2` string) in the output JSON message.

```c

    @version: 3.11
    
    options {
        keep-hostname(yes);
    };
    
    source s_file {
        file("/tmp/input");
    };
    
    parser p_geoip2 {
        geoip2(
            "${HOST}",
            prefix( "geoip2." )
            database( "/usr/share/GeoIP2/GeoLiteCity.dat" )
        );
    };
    
    destination d_file {
        file(
            "/tmp/output"
            flags(syslog-protocol)
            template("$(format-json --scope core --key geoip2*)\n")
        );
    };
    
    
    log {
        source(s_file);
        parser(p_geoip2);
        destination(d_file);
    };

```

For example, for the `\<38\>2017-05-24T13:09:46 192.168.1.1 prg00000[1234]: test message` message the output will look like:

```c

    <38>1 2017-05-24T13:09:46+02:00 192.168.1.1 prg00000 1234 - [meta sequenceId="3"] {"geoip2":{"subdivisions":{"0":{"names":{"en":"Budapest"},"iso_code":"BU","geoname_id":"3054638"}},"registered_country":{"names":{"en":"Hungary"},"iso_code":"HU","geoname_id":"719819"},"postal":{"code":"1063"},"location":{"time_zone":"Europe/Budapest","longitude":"19.070200","latitude":"47.510200","accuracy_radius":"5"},"country":{"names":{"en":"Hungary"},"iso_code":"HU","geoname_id":"719819"},"continent":{"names":{"en":"Europe"},"geoname_id":"6255148","code":"EU"},"city":{"names":{"en":"Budapest"},"geoname_id":"3054643"}},"PROGRAM":"prg00000","PRIORITY":"info","PID":"1234","MESSAGE":"test message","HOST":"192.168.1.1","FACILITY":"auth","DATE":"May 24 13:09:46"}

```
