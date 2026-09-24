---
---
## Which package to install?

{{< product >}} supports many features, but you rarely need all of them on a single host. Sources and destinations that depend on external libraries live in separate modules, so you install only the ones you actually use. For example, the gRPC-based destinations (like [loki()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/destination-loki/) and [opentelemetry()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/opentelemetry/)) come from the gRPC module, while HTTP-based destinations (like [elasticsearch-http()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/configuring-destinations-elasticsearch-http/) and [sumologic-http()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/destination-sumologic-intro/)) come from the HTTP module.

The Prerequisites section of every source, destination, and parser names the module it needs.

If a module isn't installed, {{< product >}} doesn't start, and reports a syntax error that points at the name of the driver you configured. For details, see [Error: unexpected LL_IDENTIFIER](https://axoflow.com/docs/axosyslog-core/chapter-troubleshooting-syslog-ng/unexpected-ll-identifier/).

{{< readfile "/headless/chunk/package-matrix.md" >}}
