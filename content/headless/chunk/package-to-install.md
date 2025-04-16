---
---
## Which package to install?

{{< product >}} supports many features. Some of these, like specific sources and destinations require additional packages that you need only if you're actually using the specific destination. Therefore, {{< product >}} has a number of modules that you can install as a separate package if you need the particular feature. For example, to use the gRPC-based destinations (like [loki()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/destination-loki/) or [opentelemetry()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/opentelemetry/)), install the `axosyslog-grpc`/`axosyslog-mod-grpc` package. For HTTP-based destinations like [elasticsearch-http()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/configuring-destinations-elasticsearch-http/) or [sumologic-http()](https://axoflow.com/docs/axosyslog-core/chapter-destinations/destination-sumologic-intro/), you need the `axosyslog-http`/`axosyslog-mod-http` package.
