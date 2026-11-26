---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

The `geoip-databases.tsv` file maps the database kinds to database files. Every line of the file contains a kind and the absolute path of a database file, separated by a tab. {{< product >}} uses the first readable file of the kind, so the same configuration works wherever the databases are installed.

The shipped copy of the file, for example, `/usr/share/syslog-ng/geoip-databases.tsv`, lists the following kinds, with the usual locations of the GeoIP2, GeoLite2, and DB-IP Lite databases:

- `country`
- `city`
- `asn`

To use another location or to add new kinds, copy the file into the configuration directory of {{< product >}}, for example, to `/etc/syslog-ng/geoip-databases.tsv`, and edit the copy. If the copy exists, {{< product >}} uses it instead of the shipped file. Upgrades don't overwrite the copy. For example:

```text
city	/opt/geoip/GeoIP2-City.mmdb
asn	/opt/geoip/GeoLite2-ASN.mmdb
```

If the kind isn't listed in the file, the configuration is invalid: {{< product >}} logs an error message, and doesn't start or doesn't reload the configuration. If the kind is listed, but none of its files are readable, {{< product >}} logs a warning, and the lookups return no data. After you install the database, reload the configuration of {{< product >}}.
