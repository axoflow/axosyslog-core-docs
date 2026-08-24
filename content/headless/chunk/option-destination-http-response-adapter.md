---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
## response-adapter()

|          |                            |
| -------- | -------------------------- |
| Type:    | `openobserve` or `splunk`  |
| Default: | N/A (disabled)             |

*Description:* Process the HTTP responses of a specific backend, so that {{% param "product.abbrev" %}} can detect errors that the server reports in the response body instead of in the status code.

- `openobserve`: OpenObserve returns `200 OK` even for requests that only partially succeeded. Setting `response-adapter(openobserve)` turns such a response into an actual error, so that {{% param "product.abbrev" %}} can retry it.
- `splunk`: Processes the responses of Splunk HTTP Event Collector backends the same way.

The [`openobserve()`]({{< relref "/chapter-destinations/openobserve/_index.md" >}}) and [`splunk-hec-event()`]({{< relref "/chapter-destinations/syslog-ng-with-splunk/_index.md" >}}) destinations set this option automatically.
