---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
When {{% param "product.abbrev" %}} starts up, it always connects to the primary server first. In the `failover()` option there is a possibility to customize the failover modes.

Depending on how you set the `failback()` option, {{% param "product.abbrev" %}} behaves as follows:

  - **round-robin mode**: If `failback()` is not set, {{% param "product.abbrev" %}} does not attempt to return to the primary server even if it becomes available. In case the failover server fails, {{% param "product.abbrev" %}} attempts to connect the next failover server in the list in round-robin fashion.<span data-conditions="General.PE"> This is the default behavior in {{% param "product.abbrev" %}} version 7.0.9 and earlier.</span>
    
    
    ## Example: round-robin mode
    
    In the following example {{% param "product.abbrev" %}} handles the logservers in round-robin fashion if the primary logserver becomes inaccessible (therefore `failback()` option is not set).
    
    ```c
    
        destination d_network {
             network(
                  "primary-server.com"
                  port(601)
                  failover( servers("failover-server1", "failover-server2") )
        );  
        };
    
    ```
    

  - **failback mode**: If `failback()` is set, {{% param "product.abbrev" %}} attempts to return to the primary server.
    
    After {{% param "product.abbrev" %}} connects a secondary server during a failover, it sends a probe every `tcp-probe-interval()` seconds towards the primary server. If the primary logserver responds with a TCP ACK packet, the probe is successful. When the number of successful probes reaches the value set in the `successful-probes-required()` option, {{% param "product.abbrev" %}} tries to connect the primary server using the last probe.
    
    {{% alert title="Note" color="info" %}}
    
    {{% param "product.abbrev" %}} always waits for the result of the last probe before sending the next message. So if one connection attempt takes longer than the configured interval, that is, it waits for connection time out, you may experience longer intervals between actual probes.
    
    {{% /alert %}}
    
    
    ## Example: failback mode
    
    In the following example {{% param "product.abbrev" %}} attempts to return to the primary logserver, as set in the `failback()` option: it will check if the server is accessible every `tcp-probe-interval()` seconds, and reconnect to the primary logserver after three successful connection attempts.
    
    ```c
    
        destination d_network_2 {
             network(
                  "primary-server.com"
                  port(601)
                  failover( 
                servers("failover-server1", "failover-server2")
                       failback(
                            successful-probes-required()
                            tcp-probe-interval()
                       )
                  )
        );  
        };
    
    ```
    
