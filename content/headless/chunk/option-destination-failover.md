---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## failover()

*Description:* Available only in {{% param "product.name" %}} version 3.17 and later. For details about how client-side failover works, see {{% xref "/chapter-destinations/concepts-failover/_index.md" %}}.



### servers()

| Type:        | list of IP addresses and fully-qualified domain names |
|--------------|-----------|
| Default:     | empty  |

*Description:* Specifies a secondary destination server where log messages are sent if the primary server becomes inaccessible. To list several failover servers, separate the address of the servers with comma. By default, {{% param "product.abbrev" %}} waits for the a server before switching to the next failover server is set in the `time-reopen()` option.

If `failback()` is not set, {{% param "product.abbrev" %}} does not attempt to return to the primary server even if it becomes available. In case the failover server fails, {{% param "product.abbrev" %}} attempts to connect the next failover server in the list in round-robin fashion.<span data-conditions="General.PE"> This is the default behavior in {{% param "product.abbrev" %}} version 7.0.9 and earlier.</span>

{{% alert title="Warning" color="warning" %}}

The failover servers must be accessible on the same port as the primary server.

{{% /alert %}}


### failback()


*Description:* Available only in {{% param "product.name" %}} version 3.17 and later.

{{< include-headless "chunk/option-destination-description-failback.md" >}}

Default value for `tcp-probe-interval()`: 60 seconds

Default value for `successful-probes-required()`: 3


### Example: Configuring failover servers

In the following example {{% param "product.abbrev" %}} handles the logservers in round-robin fashion if the primary logserver becomes uneccassible (therefore `failback()` option is not set).

```c
   destination demo_failover_roundrobin{
          syslog("primary-logserver.example.com"
                failover(
                      servers("first-failover-logserver.example.com", "second-failover-logserver.example.com")
                )
          transport("tcp")
          port(514)
          time-reopen(60)
          );
    };
```

In the following example {{% param "product.abbrev" %}} attempts to return to the primary logserver, as set in the `failback()` option: it will check if the server is accessible every `tcp-probe-interval()` seconds, and reconnect to the primary logserver after three successful connection attempts.

```c
   destination demo_failover_returntoprimary{
          syslog("primary-logserver.example.com"
                failover(
                      servers("first-failover-logserver.example.com", "second-failover-logserver.example.com")
                      failback(
                            tcp-probe-interval(120)
                            successful-probes-required(3)
                      )
                )
          transport("tcp")
          port(514)
          time-reopen(60)
          );
    };
```


{{% alert title="Note" color="info" %}}

This option is not available for the connection-less UDP protocol, because in this case the client does not detect that the destination becomes inaccessible.

{{% /alert %}}
