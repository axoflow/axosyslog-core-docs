---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
## response-adapter()

|          |                            |
| -------- | -------------------------- |
| Type:    | `openobserve` or `splunk`  |
| Default: | N/A (disabled)             |

Available in {{% param "product.abbrev" %}} 4.27 and later.

*Description:* Some servers put the error data in the HTTP response body and not in the status code. The `response-adapter()` option lets {{% param "product.abbrev" %}} find these errors.

If `response-adapter()` finds an error, {{% param "product.abbrev" %}} sends the batch again. The [`retries()`](#retries) option sets the maximum number of tries. After the last try, {{% param "product.abbrev" %}} deletes the batch.

- `openobserve`: OpenObserve sends `200 OK` also for a request that has some errors. If you set `response-adapter(openobserve)`, {{% param "product.abbrev" %}} changes this response into an error. Then {{% param "product.abbrev" %}} can send the request again.
- `splunk`: This value processes the responses of Splunk HTTP Event Collector backends in the same way.

The [`openobserve()`]({{< relref "/chapter-destinations/openobserve/_index.md" >}}) and [`splunk-hec-event()`]({{< relref "/chapter-destinations/syslog-ng-with-splunk/_index.md" >}}) destinations set this option automatically.
