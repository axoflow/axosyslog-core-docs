---
---
The `axosyslog-otlp()` source and destination allows you to transfer the internal representation of log messages between {{% param "product.abbrev" %}} instances using the OpenTelemetry protocol. Unlike the traditional [{{% param "product.abbrev" %}}]({{< relref "/chapter-destinations/destination-syslog-ng/_index.md" >}}) drivers that rely on simple TCP connections, `axosyslog-otlp()` leverages the OpenTelemetry protocol for efficient and reliable log message transmission.

The key benefits of the `axosyslog-otlp()` drivers are:

- scalability (via the `workers()` option),
- built-in application layer acknowledgement,
- support for Google service authentication (ADC or ALTS), and
- improved load balancing capabilities.

To use it, configure an `axosyslog-otlp()` destination on the sender node, and an `axosyslog-otlp()` source on the receiver node, like this:

```shell
destination d_axosyslog_otlp {
  axosyslog-otlp(url("your-receiver-axosyslog-instance:4317"));
};
```

```shell
source s_axosyslog_otlp {
  axosyslog-otlp(port(4317));
};
```
