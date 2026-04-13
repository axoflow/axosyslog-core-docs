---
title: "Collect metrics with Prometheus"
weight: 200
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
Export AxoSyslog and syslog-ng metrics to Prometheus using the `axosyslog-metrics-exporter` and scrape them with Prometheus.

## Prerequisites

- A running {{% param "product.name" %}} instance
- `stats(level(2))` or higher set in your configuration file
- File-level access to the {{% param "product.name" %}} control socket

{{% alert title="Note" color="info" %}}
You must set `stats(level(2))` to expose host-level metrics. Without it, many metrics (including per-host counters) aren't available. For details, see the [`stats(level())` global option]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-stats-level" >}}).
{{% /alert %}}

## Deploy the metrics exporter

The [`axosyslog-metrics-exporter`](https://github.com/axoflow/axosyslog-metrics-exporter) is a Go-based tool that exposes Prometheus-style metrics by connecting to the {{% param "product.name" %}} control socket. It works with syslog-ng, syslog-ng Premium Edition, and all versions of {{% param "product.name" %}} (syslog-ng™ is the trademark of One Identity LLC).

Run the exporter as a container:

```shell
sudo podman run -d -p 9577:9577 -v $(echo /var/*/syslog-ng/syslog-ng.ctl):/syslog-ng.ctl \
  ghcr.io/axoflow/axosyslog-metrics-exporter:latest --socket.path=/syslog-ng.ctl
```

Once started, the metrics endpoint is available at `http://127.0.0.1:9577/metrics`.

{{% alert title="Note" color="info" %}}
The control socket is typically located at `/var/lib/syslog-ng/syslog-ng.ctl` or `/var/run/syslog-ng/syslog-ng.ctl`. In containerized environments, share the Unix domain socket with the exporter container using a volume mount, as shown in the preceding command.
{{% /alert %}}

## Configure Prometheus

Create a `prometheus.yml` file with a scrape job pointing to the metrics exporter:

```yaml
scrape_configs:
  - job_name: axosyslog
    static_configs:
      - targets:
          - <prometheus-host-ip>:9577
        labels:
          app: axosyslog
```

Then run Prometheus:

```shell
sudo podman run \
    -p 9090:9090 \
    -v ./prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```

To verify that Prometheus is scraping correctly, open the following pages in your browser:

- `http://127.0.0.1:9090/config`: shows the active configuration
- `http://127.0.0.1:9090/targets`: shows whether the {{% param "product.name" %}} scrape target is up

## Key metrics to monitor

For a detailed reference, see {{% xref "/chapter-log-statistics/metrics-reference/_index.md" %}}. The main metrics that you should monitor are the following.

### Critical metrics

These metrics indicate problems that require immediate attention:

- `output_unreachable`: destination is unavailable
- `socket_receive_dropped_packets_total`: messages dropped on the source side
- `output_events_total{result="dropped"}`: messages dropped at the output without flow control
- `socket_rejected_connections_total`: number of rejected incoming connections

### Core pipeline metrics

These metrics give you a basic understanding of pipeline throughput:

- `input_events_total`: total messages received by all sources
- `output_events_total`: total messages sent by all destinations
- `filtered_events_total`: total messages processed by filters
- `parsed_events_total`: total messages processed by parsers
- `memory_queue_events` and `disk_queue_events`: current buffer usage
- `io_worker_latency_seconds`: I/O worker latency, a sign of potential overload
