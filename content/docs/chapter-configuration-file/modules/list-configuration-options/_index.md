---
title: "Listing configuration options"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with {{% param "product.abbrev" %}} 3.25, you can use the `syslog-ng-cfg-db.py` utility to list the available options of configuration objects. For example, you can list all the options that can be set in the file source, and so on.

The `syslog-ng-cfg-db.py` utility has the following options:

  - The following command lists the contexts that the utility supports.
    
    ```c
        syslog-ng-cfg-db.py
    
    ```
    
    {{% alert title="Note" color="info" %}}
Currently, sources and destinations are supported.
    {{% /alert %}}

  - The following command lists the available drivers of a context:
    
    ```c
        syslog-ng-cfg-db.py -c <source|destination>
    
    ```

  - The following command lists the available options of a specific driver and specifies the context and the driver:
    
    ```c
        syslog-ng-cfg-db.py -c <source|destination> -d <driver>
    
    ```
    
    For example, to list the options of the `kafka-c()` destination driver:
    
    ```c
        syslog-ng-cfg-db.py -c destination -d kafka-c
    
    ```
    
    The output includes the available options of the driver in alphabetical order, and the type of the option. For example:
    
    ```c
        destination kafka-c(
            bootstrap-servers/kafka-bootstrap-servers(<string>)
            client-lib-dir(<string>)
            config/option()
            config/option(<string> <arrow> <string-or-number>)
            config/option(<string> <string-or-number>)
            flush-timeout-on-reload(<number>)
            flush-timeout-on-shutdown(<number>)
            frac-digits(<number>)
            key(<string>)
            local-time-zone/time-zone(<string>)
            log-fifo-size(<number>)
            message/template(<string>)
            on-error(<string>)
            persist-name(<string>)
            poll-timeout(<number>)
            properties-file(<path>)
            send-time-zone(<string>)
            sync-send(<yesno>)
            throttle(<number>)
            time-zone(<string>)
            topic(<string>)
            ts-format(<string>)
            workers(<number>)
            config/option(
                <string>(<string-or-number>)
            )
            key(
                <identifier>(<string>)
            )
            message/template(
                <identifier>(<string>)
            )
        )
    
    ```
    
    {{% alert title="Note" color="info" %}}
The script caches the list of the options, so if you want to rebuild the database, you have to use the `-r` option.
    {{% /alert %}}
