---
title: Metrics reference
---

- `classified_events_total`: 
- `disk_queue_capacity_bytes`: 
- `disk_queue_capacity`: 
- `disk_queue_dir_available_bytes`: 
- `disk_queue_disk_allocated_bytes`: 
- `disk_queue_disk_usage_bytes`: Total bytes of data waiting in each disk queue.
- `disk_queue_events`: Number of messages waiting in each disk queue by destination.
- `disk_queue_memory_usage_bytes`: Amount of memory used for caching disk-based queues.
- `disk_queue_processed_events_total`: The number of events processed since startup by each queue.
- `event_processing_latency_seconds`: Histogram of the latency (time from receiving the message to fully processing it), from the source or destination perspective.
- `events_allocated_bytes`: 
- `filtered_events_total`: 
- `input_event_bytes_total`: Incoming log messages processed by each source, measured in bytes per second, averaged for a time window of 5 minutes.
- `input_events_total`: Number of incoming log messages processed by each source per second, averaged for a time window of 5 minutes.
- `input_window_available`: Available on `stats(level(3))`. Shows the current size of the flow-control window (how much is still free from `log-iw-size()`).
- `input_window_capacity`: Available on `stats(level(3))`. Shows the value of `log-iw-size()` (the size of the flow-control window).
- `input_window_full_total`: The total number of input window full events, for the entire configuration. These events cause {{< product >}} to throttle the source.
- `internal_events_queue_capacity`: 
- `internal_events_total`: 
- `io_worker_latency_seconds`: 
- `last_config_file_modification_timestamp_seconds`: 
- `last_config_reload_timestamp_seconds`: 
- `last_successful_config_reload_timestamp_seconds`: 
- `mainloop_io_worker_roundtrip_latency_seconds`: 
- `memory_queue_capacity`: Shows the capacity (maximum possible size) of each queue. Note that this metric publishes `log-fifo-size()`, which only limits non-flow-controlled messages. Messages coming from flow-controlled paths aren't limited by `log-fifo-size()`, but by the `log-iw-size()` of their corresponding source. For metrics on `log-iw-size()`, see [`input_window_available`](#input_window_available) and [`input_window_capacity`](#input_window_capacity).
- `memory_queue_events`: Number of messages waiting in each memory queue by destination.
- `memory_queue_memory_usage_bytes`: Total bytes of data waiting in each memory queue.
- `memory_queue_processed_events_total`: The number of events processed since startup by each queue.
- `output_active_worker_partitions`: The number of active workers when `worker-partition-autoscaling()` is set to `yes`.
- `output_batch_size_bytes`: Histogram-style metrics for the destination.
- `output_batch_size_events`: Histogram-style metrics for the destination.
- `output_batch_timedout_total`: 
- `output_event_bytes_total`: Log messages sent to each log destination, measured in bytes per second, averaged for a time window of 5 minutes.
- `output_event_latency_seconds`: Histogram of the latency: time from receiving the message to delivering it to the destination.
- `output_event_retries_total`: Shows the number of events when {{< product >}} retried sending a message.
- `output_event_size_bytes`: Histogram-style metrics for the destination.
- `output_events_total`: Number of log messages sent to each log destination per second, averaged for a time window of 5 minutes.
- `output_grpc_requests_total`: The total number of gRPC requests.
- `output_http_requests_total`: Available on `stats(level(1))` The total number of HTTP requests.
- `output_request_latency_seconds`: Histogram-style metrics for the destination.
- `output_unreachable`: A bool-like metric, which shows whether a destination is reachable or not.
- `output_workers`: 

    <!-- New metrics: syslogng_output_workers and syslogng_output_active_worker_partitions

    Using the new worker-partition-autoscaling(yes) option allows producing partition metrics, which can be used
    for alerting: if the number of active partitions remains higher than the configured number of workers,
    it may indicate that events are not being batched properly, which can lead to performance degradation.
    (#866) -->

- `parallelize_failed_events_total`: 
- `parallelized_assigned_events_total`: 
- `parallelized_processed_events_total`: 
- `parsed_events_total`: 
- `processed_events_total`: 
- `route_egress_total`: 
- `route_ingress_total`: 
- `scratch_buffers_bytes`: 
- `scratch_buffers_count`: 
- `socket_connections`: Number of active connections for the sources.
- `socket_max_connections`: Maximum permitted number of connections for the sources.
- `socket_receive_buffer_max_bytes`: 
- `socket_receive_buffer_used_bytes`: 
- `socket_receive_dropped_packets_total`: Number of UDP packets dropped by the OS before processing per second averaged within a time window of 5 minutes.
- `socket_rejected_connections_total`: 
- `stats_level`: Shows the current verbosity [`level()`]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-stats-level" >}}) of statistics and metrics.
- `tagged_events_total`:
