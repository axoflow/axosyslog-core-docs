---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
Higher log-levels automatically include messages from lower log-levels:

- `default`: Just normal log messages.
- `verbose`: Normal and verbose log messages.
- `debug`: Include debug messages of {{% param "product.abbrev" %}}.
- `trace`: Include trace messages of how messages are processed.