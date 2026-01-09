---
title: Log Event Extended Format (LEEF)
---

Available in {{< product >}} 4.13 and later.

Formats a dictionary into the [Log Event Extended Format (LEEF)](https://www.ibm.com/docs/en/SS42VS_DSM/pdf/b_Leef_format_guide.pdf). Both LEEF versions (1.0 and 2.0) are supported.

Usage: `${MESSAGE} = format_leef(my_dictionary);`

For example:

```json
my_dictionary = {"leef_version":"1.0","vendor_name":"Microsoft","product_name":"MSExchange","product_version":"4.0 SP1","event_id":"15345","src":"192.0.2.0","dst":"172.50.123.1","sev":"5", "cat":"anomaly","srcPort":"81","dstPort":"21","usrName":"joe.black"};
```

Becomes:

```shell
LEEF:1.0|Microsoft|MSExchange|4.0 SP1|15345|src=192.0.2.0   dst=172.50.123.1        sev=5   cat=anomaly     srcPort=81      dstPort=21      usrName=joe.black
```

The following keys must be available in the dictionary, otherwise formatting fails with an error message like: `FILTERX ERROR;  ....|     format_leef(my_dictionary)', error='Failed to evaluate event formatter function:`.

- LEEF version 1: `leef_version`, `vendor_name`, `product_name`, `product_version`, `event_id`, `extensions`
- LEEF version 2: `leef_version`, `vendor_name`, `product_name`, `product_version`, `event_id`, `leef_delimiter`, `extensions`
