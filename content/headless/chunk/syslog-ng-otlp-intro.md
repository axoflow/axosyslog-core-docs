---
---
The `syslog-ng-otlp()` source and destination allows you to transfer the internal representation of log messages between {{% param "product.abbrev" %}} instances using the OpenTelemetry protocol. Unlike the traditional [syslog-ng()]({{< relref "/chapter-destinations/destination-syslog-ng/_index.md" >}}) drivers that rely on simple TCP connections, `syslog-ng-otlp()` leverages the OpenTelemetry protocol for efficient and reliable log message transmission.

The key benefits of the `syslog-ng-otlp()` drivers are:

- scalability (via the `workers()` option),
- built-in application layer acknowledgement,
- support for Google service authentication (ADC or ALTS), and
- improved load balancing capabilities.

To use it, configure a `syslog-ng-otlp()` destination on the sender node, and a `syslog-ng-otlp()` source on the receiver node, like this:

```shell
destination d_syslog_ng_otlp {
  syslog-ng-otlp(url("your-receiver-syslog-ng-instance:4317"));
};
```

```shell
source s_syslog_ng_otlp {
  syslog-ng-otlp(port(4317));
};
```
