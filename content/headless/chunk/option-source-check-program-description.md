---
---
Available in version 4.10 and later.

If the `check-program` flag is enabled, {{% param "product.abbrev" %}} validates the `${PROGRAM}` field for RFC3164-formatted messages. Valid program names meet the following criteria:

- Contain only these characters: `[a-zA-Z0-9-_/().]`
- Include at least one alphabetical character.

If the program name fails validation, it's considered to be part of the log message.
