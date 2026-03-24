---
title: Metrics reference
---

The following list shows the metrics available in {{< product >}}.

{{% alert title="Note" color="info" %}}
Metrics that have the `_total` suffix reset to zero when {{< product >}} is restarted. Reloading {{< product >}} doesn't cause a reset.
{{% /alert %}}

<!-- FIXME change into headings instead of list, so we'll have space for examples as well -->
- `classified_events_total`: Default metric of the [`metrics-probe()`]({{< relref "/chapter-parsers/metrics-probe/_index.md" >}}) parser.
- `disk_queue_capacity_bytes`: Maximal size of the disk queue (in bytes), as set in the `capacity-bytes()` disk-buffer option.
- `disk_queue_capacity`: The size of the overflow queue of the destination, as set in the `flow-control-window-size()` disk-buffer option.
- `disk_queue_dir_available_bytes`: The size of the space available in the directories where disk-buffer files are stored (including directories storing abandoned disk-buffers), in bytes.
- `disk_queue_disk_allocated_bytes`: The actual size of the disk-buffer files, in bytes.
- `disk_queue_disk_usage_bytes`: Total size of data waiting in each disk-buffer, in bytes.
- `disk_queue_events`: Number of messages waiting in each disk-buffer by destination.
- `disk_queue_memory_usage_bytes`: Amount of memory used for caching disk-buffers, in bytes.
- `disk_queue_processed_events_total`: The number of events processed since startup by each disk-buffer.
- `event_processing_latency_seconds`: Histogram of the latency (time from receiving the message to fully processing it), from the source or destination perspective.
- `events_allocated_bytes`: The total amount of memory used by log messages in {{< product >}}.
- `filtered_events_total`: The total number of messages that matched and didn't match a filter, for each filter in the configuration file.
- `input_event_bytes_total`: Incoming log messages processed by each source, measured in bytes.
- `input_events_total`: Number of incoming log messages processed by each source.
- `input_window_available`: Available on `stats(level(3))`. Shows the current size of the flow-control window (how much is still free from `log-iw-size()`).
- `input_window_capacity`: Available on `stats(level(3))`. Shows the value of `log-iw-size()` (the size of the flow-control window).
- `input_window_full_total`: The total number of input window full events, for the entire configuration. These events cause {{< product >}} to throttle the source.
- `internal_events_queue_capacity`: The internal queue size of the [`internal()`]({{< relref "/chapter-sources/configuring-sources-internal/_index.md" >}}) source.
- `internal_events_total`: The number of messages the [`internal()`]({{< relref "/chapter-sources/configuring-sources-internal/_index.md" >}}) source has queued, processed, or dropped.
- `io_worker_latency_seconds`: Shows how overloaded the IO workers of {{< product >}} are.
- `last_config_file_modification_timestamp_seconds`: The date when the configuration file was last modified.
- `last_config_reload_timestamp_seconds`: The date when the {{< product >}} configuration was last reloaded. If it differs from `last_successful_config_reload_timestamp_seconds`, reloading the configuration has failed.
- `last_successful_config_reload_timestamp_seconds`: The date when the {{< product >}} configuration was last reloaded successfully.
- `mainloop_io_worker_roundtrip_latency_seconds`: Shows how overloaded the main {{< product >}} loop is (how much time it takes to start a new worker). Values close to 0 are good, high values indicate high load or processing bottleneck.
- `memory_queue_capacity`: Shows the capacity (maximum possible size) of each queue. Note that this metric publishes `log-fifo-size()`, which only limits non-flow-controlled messages. Messages coming from flow-controlled paths aren't limited by `log-fifo-size()`, but by the `log-iw-size()` of their corresponding source. For metrics on `log-iw-size()`, see [`input_window_available`](#input_window_available) and [`input_window_capacity`](#input_window_capacity).
- `memory_queue_events`: Number of messages waiting in each memory queue by destination.
- `memory_queue_memory_usage_bytes`: Total bytes of data waiting in each memory queue.
- `memory_queue_processed_events_total`: The number of events processed since startup by each queue.
- `output_active_worker_partitions`: The number of active partitions when `worker-partition-autoscaling()` is set to `yes`.
- `output_batch_size_bytes`: Histogram-style metrics for the destination.
- `output_batch_size_events`: Histogram-style metrics for the destination.
- `output_batch_timedout_total`: For destinations that use batching, it shows the number of batches that were sent because of timeout (either `batch-timeout()` or `batch-idle-timeout()` expired).
- `output_event_bytes_total`: Log messages sent to each destination, measured in bytes.
- `output_event_latency_seconds`: Histogram of the latency: time from receiving the message to delivering it to the destination.
- `output_event_retries_total`: Shows the number of events when {{< product >}} retried sending a message.
- `output_event_size_bytes`: Histogram-style metrics for the destination.
- `output_events_total`: Number of log messages sent to each destination, showing sent and dropped messages.
- `output_grpc_requests_total`: The total number of gRPC requests.
- `output_http_requests_total`: Available on `stats(level(1))` The total number of HTTP requests.
- `output_request_latency_seconds`: Histogram-style metrics for the destination.
- `output_unreachable`: A bool-like metric, which shows whether a destination is reachable or not.
- `output_workers`: The number of workers configured for each destination.
- `parallelize_failed_events_total`: The number of events that [`parallelize()`]({{< relref "/chapter-nonsequential-processing/_index.md" >}}) couldn't process in parallel. Such messages were sent without parallelization. A high number of such events can signal a configuration issue or a bottleneck.
- `parallelized_assigned_events_total`: The number of events each worker has received when using [`parallelize()`]({{< relref "/chapter-nonsequential-processing/_index.md" >}}). Can show if the workers receive the load unevenly.
- `parallelized_processed_events_total`: The number of events processed using [`parallelize()`]({{< relref "/chapter-nonsequential-processing/_index.md" >}}).
- `parsed_events_total`: Shows the number of messages processed by each parser.
- `route_egress_total`: The number of messages sent by each [named log path]({{< relref "/chapter-routing-filters/logpath/_index.md#name-log-path" >}}).
- `route_ingress_total`: The number of messages received by each [named log path]({{< relref "/chapter-routing-filters/logpath/_index.md#name-log-path" >}}).
- `scratch_buffers_bytes`: The number of bytes allocated to internal string buffers.
- `scratch_buffers_count`: The number allocated to internal string buffers.
- `socket_connections`: Number of active connections for the sources.
- `socket_max_connections`: Maximum permitted number of connections for the sources.
- `socket_receive_buffer_max_bytes`: The maximal size socket receive buffer in bytes, as configured in the `so-rcvbuf()` option of the destination.
- `socket_receive_buffer_used_bytes`: The number of bytes used from the socket receive buffer.
- `socket_receive_dropped_packets_total`: Number of UDP packets dropped by the OS before processing.
- `socket_rejected_connections_total`: The number of connections rejected because the `max-connections()` limit of the source was reached, for each source.
- `stats_level`: Shows the current verbosity [`level()`]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-stats-level" >}}) of statistics and metrics.
- `tagged_events_total`: The number of messages marked with a [tag]({{< relref "/chapter-manipulating-messages/modifying-messages/rewrite-tags/_index.md" >}}), for each tag. (Every message automatically has the tag of its source in `.source.<id_of_the_source_statement>` format.)
