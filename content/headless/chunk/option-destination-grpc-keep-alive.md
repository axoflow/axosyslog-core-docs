---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## keep-alive()

Configures how {{% param "product.abbrev" %}} sends [gRPC keepalive pings](https://grpc.io/docs/guides/keepalive/).

### max-pings-without-data()

|          |                    |
| -------- | ------------------ |
| Type:    | integer |
| Default: |                 |

*Description:* The maximum number of gRPC pings that can be sent when there is no data/header frame to be sent. {{% param "product.abbrev" %}} won't send any pings after this limit. Set it to 0 disable this restriction and keep sending pings.

### time()

|          |                    |
| -------- | ------------------ |
| Type:    | number [milliseconds] |
| Default: |                 |

*Description:* The period (in milliseconds) after which {{% param "product.abbrev" %}} sends a gRPC keepalive ping.

### timeout()

|          |                    |
| -------- | ------------------ |
| Type:    | number [milliseconds] |
| Default: | 10                 |

*Description:* The time (in milliseconds) {{% param "product.abbrev" %}} waits for an acknowledgement.
