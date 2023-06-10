---
title: "How syslog-ng OSE connects the MongoDB server"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

When {{% productparam "abbrev" %}} connects the MongoDB server during startup, it completes the following steps.

1.  The {{% productparam "abbrev" %}} application connects the first address listed in the `servers()` option.

2.    - If the server is accessible and it is a master MongoDB server, {{% productparam "abbrev" %}} authenticates on the server (if needed), then starts sending the log messages to the server.
    
      - If the server is not accessible, or it is not a master server in a MongoDB replicaset and it does not send the address of the master server, {{% productparam "abbrev" %}} connects the next address listed in the `servers()` option.
    
      - If the server is not a master server in a MongoDB replicaset, but it sends the address of the master server, {{% productparam "abbrev" %}} connects the received address.

3.  When {{% productparam "abbrev" %}} connects the master MongoDB server, it retrieves the list of replicas (from the `replSet` option of the server), and appends this list to the `servers()` option.
    
    {{% alert title="Warning" color="warning" %}}
    
      - This means that {{% productparam "abbrev" %}} can send log messages to addresses that are not listed in its configuration.
    
      - Make sure to include the address of your master server in your {{% productparam "abbrev" %}} configuration file, otherwise you risk losing log messages if all the addresses listed in the {{% productparam "abbrev" %}} configuration are offline.
    
      - Addresses retrieved from the MongoDB servers are not stored, and can be lost when {{% productparam "abbrev" %}} is restarted. The retrieved addresses are not lost if the `server()` option of the destination was not changed in the configuration file since the last restart.
    
      - The failover mechanism used in the `mongodb()` driver is different from the client-side failover used in other drivers.
    
    {{% /alert %}}

4.  The {{% productparam "abbrev" %}} application attempts to connect another server if the `servers()` list contains at least two addresses, and one of the following events happens:
    
      - The `safe-mode()` option is set to **no**, and the MongoDB server becomes unreachable.
    
      - The `safe-mode()` option is set to **yes**, and {{% productparam "abbrev" %}} cannot insert a log message into the database because of an error.
    
    In this case, {{% productparam "abbrev" %}} starts to connect the addresses in from the `servers()` list (starting from the first address) to find the new master server, authenticates on the new server (if needed), then continues to send the log messages to the new master server.
    
    During this failover step, one message can be lost if the `safe-mode()` option is disabled.

5.  If the original master becomes accessible again, {{% productparam "abbrev" %}} will automatically connect to the original master.
