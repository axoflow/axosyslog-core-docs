---
title: "Looking up GeoIP2 data from IP addresses"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% productparam "abbrev" %}} application can lookup IP addresses from an offline GeoIP2 database, and make the retrieved data available in name-value pairs. Depending on the database used, you can access country code, longitude, and latitude information and so on.

The {{% productparam "abbrev" %}} application works with the Country and the City version of the GeoIP2 database, both free and the commercial editions. The {{% productparam "abbrev" %}} application works with the `mmdb` (GeoIP2) format of these databases. Other formats, like `csv` are not supported.

{{% alert title="Note" color="info" %}}

To access longitude and latitude information, download the City version of the [GeoIP2](https://www.maxmind.com/en/geoip2-databases) database.

There are two types of GeoIP2 databases available.

  - *GeoLite2 City:*
    
      - free of charge
    
      - less accurate

  - *GeoIP2 City:*
    
      - has to be purchased
    
      - more accurate

Unzip the downloaded database (for example, to the `/usr/share/GeoIP2/GeoIP2City.mmdb` file). This path will be used later in the configuration.

{{% include-headless "chunk/option-parser-geoip.md" %}} {{% /alert %}}
