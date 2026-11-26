---
title: "Look up GeoIP data in FilterX"
linkTitle: "GeoIP lookup"
description: "Use the `geoip()` FilterX function to look up the country, city, location, or autonomous system of an IP address in a GeoIP2, GeoLite2, or DB-IP database."
weight: 950
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The `geoip()` FilterX function looks up an IP address in a MaxMind GeoIP2 or GeoLite2 database, or in a DB-IP Lite database, and returns the data of the address. For example, you can get the country, the city, the geographic location, or the autonomous system number (ASN) of the sender of a message.

`geoip()` is the FilterX version of the [`$(geoip2)` template function]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-geoip2" >}}) and the [`geoip2()` parser]({{< relref "/chapter-enrich-data/geoip2-parser/_index.md" >}}). Unlike them, it returns typed FilterX values. It can also return a whole record, or a part of it, as a dictionary.

## Prerequisites

- {{% param "product.name" %}} version 4.30 or later.
- {{< include-headless "chunk/prereq-package.md" "axosyslog-mod-geoip2" "axosyslog-geoip" >}}
- A GeoIP database in MaxMind DB (`.mmdb`) format, for example, the [GeoLite2](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data/) databases of MaxMind.

## Usage of geoip() {#usage}

```shell
geoip(<ip-address>, kind="country", field="country.iso_code")
geoip(<ip-address>, database="<path-to-database>", field="country.iso_code")
```

The first argument is the IP address to look up, as a string. Both IPv4 and IPv6 addresses work. The other arguments are optional, and must be string literals:

`kind`
: The type of the database to use: `country`, `city`, or `asn`. Default value: `country`. {{% param "product.name" %}} finds the database file of the kind automatically. For details, see [GeoIP database kinds](#database-kinds). You can't use `kind` and `database` together.

`database`
: The path of the database file to use, instead of the `kind` argument.

`field`
: The data to return, as a dot-separated path in the record of the address. Use map keys, and numeric indexes for arrays, for example, `subdivisions.0.iso_code`. Default value: `country.iso_code`. To return the whole record as a dictionary, use `field=""`.

## Examples: Look up GeoIP data {#examples}

The following examples look up the IP address of the sender of the message. The `${SOURCEIP}` macro always contains an IP address. Don't use `${HOST_FROM}`, which contains a hostname if the [`use-dns()`]({{< relref "/chapter-global-options/reference-options/_index.md#use-dns" >}}) option is enabled.

```shell
log {
  source(s_network);
  filterx {
    # The country code of the sender, from the country database
    $country = geoip($SOURCEIP);

    # The English name of the city, from the city database
    $city = geoip($SOURCEIP, kind="city", field="city.names.en");

    # The location as a dictionary. For example, for the 2.125.160.216 address:
    # {"accuracy_radius":100,"latitude":51.75,"longitude":-1.25,"time_zone":"Europe/London"}
    $location = geoip($SOURCEIP, kind="city", field="location");

    # The organization that owns the autonomous system of the address
    $asn = geoip($SOURCEIP, kind="asn", field="autonomous_system_organization");

    # The whole record, from a specific database file
    $record = geoip($SOURCEIP, database="/opt/geoip/custom.mmdb", field="");
  };
  destination(d_file);
};
```

## Return values of geoip() {#return-values}

- If the field is a single value, `geoip()` returns a string, an integer, a double, or a boolean, depending on the type of the value in the database.
- If the field is a map or an array, `geoip()` returns a dictionary or a list.
- If the address isn't in the database, or the record of the address doesn't have the field, `geoip()` returns `null`. To set a default value, use the [`??` operator]({{< relref "/filterx/operator-reference.md#null-coalescing-operator" >}}), for example: `$country = geoip($HOST_FROM) ?? "unknown";`
- If the argument isn't a valid IP address, `geoip()` returns an error, and {{% param "product.name" %}} drops the message from the log path. To keep the message, use the `??` operator, for example: `$country = geoip($HOST) ?? null;`

## Available fields of the GeoIP databases {#fields}

The fields depend on the database. The following fields are available in most databases:

- Country databases: `country.iso_code`, `country.names.en`, `continent.code`, `registered_country.iso_code`
- City databases: the fields of country databases, and `city.names.en`, `subdivisions.0.iso_code`, `postal.code`, `location.latitude`, `location.longitude`, `location.time_zone`
- ASN databases: `autonomous_system_number`, `autonomous_system_organization`

The `names` fields have a version for every available language, for example, `names.de`, `names.fr`, and `names.ja`.

To see the full record of an IP address, use `field=""`, or the `mmdblookup` command-line tool of MaxMind.

## GeoIP database kinds {#database-kinds}

{{< include-headless "chunk/geoip-database-kinds.md" >}}
