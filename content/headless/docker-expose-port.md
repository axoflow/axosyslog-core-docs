## Expose port to receive incoming traffic
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

To receive incoming network in a container, you must expose the port from the container where you want to receive the traffic to the host that's running the container. Typically, this is only needed if you are running {{% param "product.name" %}} as a relay or a server/aggregator.

By default, the {{% param "product.name" %}} container images expose the ports commonly used to receive syslog traffic:

- `514/udp`, typically used for RFC3164 (BSD-syslog) formatted traffic.
- `601/tcp`, typically used for RFC5424 (IETF-syslog) formatted traffic.
- `6514/tcp`, typically used for RFC5424 (IETF-syslog) formatted traffic over TLS.

To expose a specific port, use the `--expose` option when starting the container. Make sure to include the IP address of the host to make the port externally accessible.

For example, if you are receiving OpenTelemetry messages using the `opentelemetry()` source, expose the `4317` port:

```bash
{{< param "command" >}} run --rm --expose 127.0.0.1:4317:4317/tcp --volume <path-to-your/syslog-ng.conf>:/etc/syslog-ng/syslog-ng.conf ghcr.io/axoflow/axosyslog:latest
```
