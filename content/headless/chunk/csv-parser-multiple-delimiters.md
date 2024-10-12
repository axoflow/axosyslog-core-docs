---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
<!-- Applies to both csv-parser() and filterx parse_csv -->
### Multiple delimiters

If you use more than one delimiter, note the following points:

- {{% param "product.abbrev" %}} will split the message at the nearest possible delimiter. The order of the delimiters in the configuration file does not matter.
- You can use both string delimiters and character delimiters in a parser.
- The string delimiters may include characters that are also used as character delimiters.
- If a string delimiter and a character delimiter both match at the same position of the input, {{% param "product.abbrev" %}} uses the string delimiter.
