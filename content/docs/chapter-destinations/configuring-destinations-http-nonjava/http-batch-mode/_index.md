---
title: "Batch mode and load balancing"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with version 3.18, you can send multiple log messages in a single HTTP request if the destination HTTP server supports that.

{{% include-headless "chunk/concept-batch-size.md" %}}


## Formatting the batch {#http-batch-format}

By default, {{% param "product.abbrev" %}} separates the log messages of the batch with a newline character. You can specify a different delimiter by using the `delimiter()` option.

If the target application or server requires a special beginning or ending to recognize batches, use the `body-prefix()` and `body-suffix()` options to add a beginning and ending to the batch. For example, you can use these options to create JSON-encoded arrays as POST payloads, which is required by a number of REST APIs. The body of a batch HTTP request looks like this:

```c
   value of body-prefix() option
    log-line-1 (as formatted in the body() option)
    log-line-2 (as formatted in the body() option)
    ....
    log-line-n (the number of log lines is batch-lines(), or less if batch-timeout() has elapsed or the batch would be longer than batch-bytes())
    value of body-suffix() option
```


## Example: HTTP batch mode {#example-http-batch-mode}

The following destination sends [log messages to an Elasticsearch server using the bulk API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html). A batch consists of 100 messages, or a maximum of 512 kilobytes, and is sent every 10 seconds (10000 milliseconds).

```c
   destination d_http {
        http(url("http://your-elasticsearch-server/_bulk")
            method("POST")
            batch-lines(100)
            batch-bytes(512Kb)
            batch-timeout(10000)
            headers("Content-Type: application/x-ndjson")
            body-suffix("\n")
            body('{ "index":{} }
                 $(format-json --scope rfc5424 --key ISODATE)')
        );
    };
```




## Load balancing between multiple servers {#http-load-balancing}

{{< include-headless "chunk/destination-load-balancing-url.md" >}}


## Example: HTTP load balancing {#example-http-load-balancing}

The following destination sends [log messages to an Elasticsearch server using the bulk API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html), to 3 different ingest nodes. Each node is assigned a separate worker thread. A batch consists of 100 messages, or a maximum of 512 kilobytes, and is sent every 10 seconds (10000 milliseconds).

```c
   destination d_http {
        http(url("http://your-elasticsearch-server/_bulk" "http://your-second-ingest-node/_bulk" "http://your-third-ingest-node/_bulk")
            method("POST")
            batch-lines(100)
            batch-bytes(512Kb)
            batch-timeout(10000)
            workers(3)
            headers("Content-Type: application/x-ndjson")
            body-suffix("\n")
            body('{ "index":{} }
                 $(format-json --scope rfc5424 --key ISODATE)')
            persist-name("d_http-load-balance")
        );
    };
```

{{% include-headless "chunk/http-load-balance-workers.md" %}}



