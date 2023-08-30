---
title: Prometheus-like metrics
weight: 3800
type: docs
cascade:
    type: docs
---

Starting with version 4.0, {{% param "product.abbrev" %}} provides a new metric naming scheme (labeling capability) to provide metrics and statistics about the processed events. You can query the metrics using `syslog-ng-ctl`, which can produce Prometheus-like metric exports.

<!-- FIXME add/mention the new metrics exporter? https://github.com/axoflow/axosyslog-metrics-exporter -->

Metrics are identified by names and partitioned by labels, similarly to the [Prometheus data model](https://prometheus.io/docs/concepts/data_model/), in the following format: `<metric-name>{<id>, <labels>} <value-of-the-metric>`

The part with the curly braces is optional, and not used for certain metrics. For example:

```shell
syslogng_events_allocated_bytes 18446744073709550560
syslogng_filtered_events_total{id="#anon-filter0",result="matched"} 0
```

Note that:

- The order of the labels doesn't matter.
- A label with an empty value is equivalent to a non-existing label.
- If the related queue is specific to a worker, it also has the `worker` label.
- If there is no information about the worker of the driver, it has the `abandoned=true` label.

For example:

```shell
syslog-ng-ctl stats prometheus
```

The output is similar to:

```shell
syslogng_events_allocated_bytes 18446744073709550560
syslogng_filtered_events_total{id="#anon-filter0",result="matched"} 0
syslogng_filtered_events_total{id="#anon-filter0",result="not_matched"} 2
syslogng_filtered_events_total{id="ff",result="matched"} 0
syslogng_filtered_events_total{id="ff",result="not_matched"} 2
syslogng_input_events_total{id="#anon-source0#0",driver_instance="-",result="processed"} 0
syslogng_input_events_total{id="s_network#1",result="processed"} 2
syslogng_internal_source{result="dropped"} 0
syslogng_internal_source{result="queued"} 0
syslogng_output_events_total{id="d_dest#0",driver_instance="tcp,127.0.0.1:5555",result="delivered"} 0
syslogng_output_events_total{id="d_dest#0",driver_instance="tcp,127.0.0.1:5555",result="dropped"} 0
syslogng_output_events_total{id="d_dest#0",driver_instance="tcp,127.0.0.1:5555",result="queued"} 0
syslogng_output_events_total{id="d_dest#1",driver_instance="http,https://localhost:8080",result="delivered"} 0
syslogng_output_events_total{id="d_dest#1",driver_instance="http,https://localhost:8080",result="dropped"} 0
syslogng_output_events_total{id="d_dest#1",driver_instance="http,https://localhost:8080",result="queued"} 0
syslogng_parsed_events_total{id="#anon-parser0",result="discarded"} 0
syslogng_parsed_events_total{id="#anon-parser0",result="processed"} 0
syslogng_scratch_buffers_bytes 0
syslogng_scratch_buffers_total 3
syslogng_tagged_events_total{id=".source.#anon-source0",result="processed"} 0
syslogng_tagged_events_total{id=".source.s_network",result="processed"} 2
```

## Legacy metrics

You can access the [old statistics]({{< relref "/chapter-log-statistics/_index.md" >}}) of {{% param "product.abbrev" %}} in the new format by running:

```shell
syslog-ng-ctl stats prometheus --with-legacy-metrics
```

The output should be similar to:

```shell
syslogng_src_facility_processed{stat_instance="18"} 0
syslogng_dst_network_memory_usage{id="d_dest#0",stat_instance="tcp,127.0.0.1:5555"} 0
syslogng_src_host_processed{id="s_network#1",stat_instance="AnnoW"} 2
syslogng_global_sdata_updates_processed 0
syslogng_global_msg_clones_processed 0
syslogng_global_internal_queue_length_processed 0
syslogng_global_payload_reallocs_processed 4
...
```

For a detailed list of available metrics, see {{% xref "/metrics/reference-metrics/_index.md" %}}.
