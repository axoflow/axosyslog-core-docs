---
title: Metrics reference
---

This page lists the different metrics available in {{% param "product.abbrev" %}}. Note that although the metrics framework was introduced in {{% param "product.abbrev" %}} version 4.0, some of the metrics were added in later versions.

<!-- 
FIXME: We should also document the labels available for the different drivers
-->

<!-- FIXME can we export the metrics in a machine-readable format, so we could process them as hugo data and produce lists by stats level, and alphabetical lists, ... ? -->

<!-- Template

### stat_name

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: |  |
| Labels: | ``, `` |

*Description:* 

*Example:*

```json

```
 -->

## Configuration related metrics

### last_config_file_modification_timestamp_seconds

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 0 |
| Labels: |  |

*Description:* 

*Example:*

```json
syslogng_last_config_file_modification_timestamp_seconds 1681309877
```

### last_config_reload_timestamp_seconds

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 0 |
| Labels: |  |

*Description:* 

*Example:*

```json
syslogng_last_config_reload_timestamp_seconds 1681309903
```

### last_successful_config_reload_timestamp_seconds

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 0 |
| Labels: |  |

*Description:* 

*Example:*

```json
syslogng_last_successful_config_reload_timestamp_seconds 1681309758
```

## Disk-buffer metrics

Disk-buffer metrics are available for abandoned disk-buffer files as well. Metrics for abandoned disk-buffer files always include the `abandoned="true"` label. The `reliable` label shows whether the disk-buffer `reliable()` option is enabled or not.

### capacity_bytes

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: | 1 |
| Labels: | `driver_id`, `driver_instance`, `path`, `reliable` |

*Description:* The theoretical maximal useful size of the disk-buffer. This is always smaller, than `disk-buf-size()`, as there is some reserved space for metadata. The actual full disk-buffer file can be larger than this, as syslog-ng allows to write over this limit once, at the end of the file.

*Example:*

```json
syslogng_disk_queue_capacity_bytes{driver_id="d_network#0",driver_instance="tcp,localhost:1235",path="/var/syslog-ng-00000.rqf",reliable="true"} 104853504
```

### dir_available_bytes

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: | 1 |
| Labels: | `dir` |

*Description:* Metric for monitoring the available space in disk-buffer directories (set with the `dir()` option of the disk buffer).

*Example:*

```json
syslogng_disk_queue_dir_available_bytes{dir="/var/syslog-ng"} 870109413376
```

### disk_allocated_bytes

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: | 1 |
| Labels: | `driver_id`, `driver_instance`, `path`, `reliable` |

*Description:* The current size of the disk-buffer file on the disk. Note that the disk-buffer file size does not strictly correlate with the number of messages, as it is a ring buffer implementation, and also {{% param "product.abbrev" %}} optimizes the truncation of the file for performance reasons.

*Example:*

```json
syslogng_disk_queue_disk_allocated_bytes{driver_id="d_network#0",driver_instance="tcp,localhost:1235",path="/var/syslog-ng-00000.rqf",reliable="true"} 17284

```

### disk_usage_bytes

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: | 1 |
| Labels: | `driver_id`, `driver_instance`, `path`, `reliable` |

*Description:* The serialized size of the queued messages in the disk-buffer file. This counter is useful for calculating the disk usage percentage (disk_usage_bytes / capacity_bytes) or the remaining available space (capacity_bytes - disk_usage_bytes).

*Example:*

```json
syslogng_disk_queue_disk_usage_bytes{driver_id="d_network#0",driver_instance="tcp,localhost:1235",path="/var/syslog-ng-00000.rqf",reliable="true"} 13188
```

### events

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: | 1 |
| Labels: | `driver_instance`, `id`, `path`, `reliable` |

*Description:* 

*Example:*

```json
syslogng_disk_queue_events{driver_instance="tcp,localhost:1235",id="d_network_disk_buffer#0",path="/var/syslog-ng/syslog-ng-00000.qf",reliable="false"} 101
```

### memory_usage_bytes

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: | 1 |
| Labels: | `driver_instance`, `id`, `path`, `reliable`, `worker` |

*Description:* 

*Example:*

```json
syslogng_disk_queue_memory_usage_bytes{driver_instance="http,http://localhost:1239",id="d_http_disk_buffer#0",path="/var/syslog-ng/syslog-ng-00000.rqf",reliable="true",worker="0"} 3136
```

## Incoming and outgoing event metrics

Available for the `file()`, `http()`, `kubernetes()`, `network()`, `otel()`, `syslog()` drivers. 

Note that metrics of the `kubernetes()` source (`driver="kubernetes"`) have some special labels: `cluster`, `namespace`, `pod`, for example:

```json
syslogng_input_event_bytes_total{cluster="k8s",driver="kubernetes",id="#anon-source0",namespace="default",pod="log-generator-1682517834-7797487dcc-49hqc"} 1859
```

### input_event_bytes_total

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: |  |
| Labels: | `driver_instance`, `id` |

*Description:* Shows the serialized message size (without protocol-specific header/framing/similar) in bytes for the incoming messages.

*Example:*

```json
syslogng_input_event_bytes_total{id="s_network#0",driver_instance="tcp,127.0.0.1"} 1925529600
```

### output_event_bytes_total

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: |  |
| Labels: | `driver_instance`, `id` |

*Description:* Shows the serialized message size (without protocol-specific header/framing/similar) in bytes for the outgoing  messages.

*Example:*

```json
syslogng_output_event_bytes_total{id="d_network#0",driver_instance="tcp,127.0.0.1:5555"} 565215232
syslogng_output_event_bytes_total{id="d_http#0",driver_instance="http,http://127.0.0.1:8080/"} 1024
```

## `internal()` metrics

### internal_events_total

|          |                         |
| -------- | ----------------------- |
| Type:    | L |
| Level: | 0 |
| Labels: | `result=queued`, `result=dropped`, `result=processed` |

*Description:* 

*Example:*

```json

```

### internal_events_queue_capacity

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 0 |
| Labels: |  |

*Description:* 

*Example:*

```json

```

## Memory queue metrics

### events

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: |  |
| Labels: | `driver_instance`, `id` |

*Description:* 

*Example:*

```json
syslogng_memory_queue_events{driver_instance="tcp,localhost:1234",id="d_network#0"} 29
```

### memory_usage_bytes

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `driver_instance`, `id`, `worker` |

*Description:* 

*Example:*

```json
syslogng_memory_queue_memory_usage_bytes{driver_instance="http,http://localhost:1236",id="d_http#0",worker="0"} 5896
```

## Message delay related metrics

### output_message_delay_sample_age_seconds

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: |  |
| Labels: | |

*Description:*  Shows when the delay metric was last sampled. It contains the age of the sample relative to the current time. This is a relative timestamp, so the accuracy of clock on the host running the {{% param "product.ose" %}} doesn't matter. The actual delay is stored in `output_message_delay_sample_seconds`

*Example:*

```json
syslogng_output_message_delay_sample_seconds{driver="http",url="https://opensearch-cluster-master:9200/_bulk",id="#anon-destination0#0",worker="2"} 841.38900000000001
```

### output_message_delay_sample_seconds

|          |                         |
| -------- | ----------------------- |
| Type:    |  |
| Level: |  |
| Labels: | |

*Description:* Shows the delay between the time when {{% param "product.ose" %}} received the message and when {{% param "product.ose" %}} sent the message to its destination. This is a sampled metric, not an average: it shows the delay associated with a specific message that was recently sent out. It is assumed that messages sitting in the queue in close proximity have very similar delay values, so {{% param "product.ose" %}} samples this delay once every second.

*Example:*

```json

```

## TCP connection metrics

These metrics are available for the `network()` and `syslog()` drivers.

### socket_connections

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `id`, `driver_instance`, `direction` |

*Description:* 

*Example:*

```json
syslogng_socket_connections{id="tcp_src#0",driver_instance="afsocket_sd.(stream,AF_INET(0.0.0.0:5555))",direction="input"} 3
```

### socket_max_connections

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 0 |
| Labels: | `id`, `driver_instance`, `direction` |

*Description:* 

*Example:*

```json
syslogng_socket_max_connections{id="tcp_src#0",driver_instance="afsocket_sd.(stream,AF_INET(0.0.0.0:5555))",direction="input"} 10
```

### socket_receive_dropped_packets_total

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `id`, `driver_instance`, `direction` |

*Description:* 

*Example:*

```json
syslogng_socket_receive_dropped_packets_total{id="#anon-source0#3",direction="input",driver_instance="afsocket_sd.udp4"} 619173
```

### socket_receive_buffer_max_bytes

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `id`, `driver_instance`, `direction` |

*Description:* 

*Example:*

```json
syslogng_socket_receive_buffer_max_bytes{id="#anon-source0#3",direction="input",driver_instance="afsocket_sd.udp4"} 268435456
```

### socket_receive_buffer_used_bytes

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `id`, `driver_instance`, `direction` |

*Description:* 

*Example:*

```json
syslogng_socket_receive_buffer_used_bytes{id="#anon-source0#3",direction="input",driver_instance="afsocket_sd.udp4"} 0
```

### socket_rejected_connections_total

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `id`, `driver_instance`, `direction` |

*Description:* 

*Example:*

```json
syslogng_socket_rejected_connections_total{id="tcp_src#0",driver_instance="afsocket_sd.(stream,AF_INET(0.0.0.0:5555))",direction="input"} 96
```

## Unsorted

### classified_events_total

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 0 |
| Labels: | `app`, `host`, `program`, `source` |

*Description:* 

*Example:*

```json

```

### events_allocated_bytes

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: |  |

*Description:* 

*Example:*

```json
syslogng_events_allocated_bytes 11639868
```

### filtered_events_total

|          |                         |
| -------- | ----------------------- |
| Type:    | L |
| Level: | 1 |
| Labels: | `id`, `result=matched`, `result=not_matched` |

*Description:* 

*Example:*

```json
syslogng_filtered_events_total{id="#anon-filter0",result="matched"} 2369
syslogng_filtered_events_total{id="#anon-filter0",result="not_matched"} 0
```

### input_events_total

|          |                         |
| -------- | ----------------------- |
| Type:    | L |
| Level: | 1 |
| Labels: | `driver_instance`, `id` |

*Description:* 

*Example:*

```json
syslogng_input_events_total{cluster="k8s",driver="kubernetes",id="#anon-source0",namespace="default",pod="log-generator-1692522870-6966655876-c57dx"} 1367
```

### input_event_bytes_total

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `driver_instance`, `id` |

*Description:* 

*Example:*

```json
syslogng_input_event_bytes_total{cluster="k8s",driver="kubernetes",id="#anon-source0",namespace="kube-system",pod="kube-controller-manager-minikube"} 36993
```

### io_worker_latency_seconds

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: |  |

*Description:* 

*Example:*

```json
syslogng_io_worker_latency_seconds 7.4839999999999995e-05
```

### mainloop_io_worker_roundtrip_latency_seconds

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: |  |

*Description:* 

*Example:*

```json
syslogng_mainloop_io_worker_roundtrip_latency_seconds 0.00012654699999999999
```

### output_events_bytes_total

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `driver_instance`, `id` |

*Description:* 

*Example:*

```json
```

### output_events_total

|          |                         |
| -------- | ----------------------- |
| Type:    | L |
| Level: | 1 |
| Labels: | `driver_instance`, `id`, `result=queued`, `result=dropped`, `result=suppressed`, `result=delivered` |

*Description:* 

*Example:*

```json
syslogng_output_events_total{driver="http",url="https://opensearch-cluster-master:9200/_bulk",id="#anon-destination0#0",result="dropped"} 0
syslogng_output_events_total{driver="http",url="https://opensearch-cluster-master:9200/_bulk",id="#anon-destination0#0",result="queued"} 2369
syslogng_output_events_total{driver="http",url="https://opensearch-cluster-master:9200/_bulk",id="#anon-destination0#0",result="delivered"} 0
```

### parsed_events_total

|          |                         |
| -------- | ----------------------- |
| Type:    | L |
| Level: | 1 |
| Labels: | `id`, `result=discarded`, `result=processed` |

*Description:* 

*Example:*

```json
```

### route_egress_total

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `id` |

*Description:* 

*Example:*

```json
```

### route_ingress_total

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `id` |

*Description:* 

*Example:*

```json
```

### scratch_buffers_bytes

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 0 |
| Labels: |  |

*Description:* 

*Example:*

```json
syslogng_scratch_buffers_bytes 0
```

### scratch_buffers_count

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 0 |
| Labels: |  |

*Description:* 

*Example:*

```json
syslogng_scratch_buffers_count 206
```

### tagged_events_total

|          |                         |
| -------- | ----------------------- |
| Type:    | L |
| Level: | 3 |
| Labels: | `id` |

*Description:* 

*Example:*

```json

```

### tls_handshake_errors_total

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `direction`, `driver_instance`, `id`, `transport=syslog` |

*Description:* 

*Example:*

```json

```

### transport_syslog_framing_errors_total

|          |                         |
| -------- | ----------------------- |
| Type:    | S |
| Level: | 1 |
| Labels: | `driver_instance`, `id` |

*Description:* 

*Example:*

```json

```