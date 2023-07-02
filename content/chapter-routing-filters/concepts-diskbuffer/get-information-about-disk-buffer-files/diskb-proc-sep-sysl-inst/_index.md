---
title: "How to process messages from an orphan disk-buffer file using a separate syslog-ng OSE instance"
weight:  1100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Purpose

This section describes how to read messages from an orphan disk-buffer file by using a separate {{% param "product.name" %}} process running parallel to the already running {{% param "product.abbrev" %}} instance.


## Orphan disk-buffer files

{{< include-headless "chunk/orphan-d-buf-intro.md" >}}



## Processing the messages from an orphan disk-buffer file by using a separate {{% param "product.abbrev" %}} instance

When {{% param "product.abbrev" %}} creates orphan disk-buffer files, you can start a separate {{% param "product.abbrev" %}} instance parallel to the {{% param "product.abbrev" %}} instance already running, and use the following resolution process to process the messages in the orphan disk-buffer file.

{{% alert title="Warning" color="warning" %}}

Before starting a separate {{% param "product.abbrev" %}} instance to process the messages from the orphan disk-buffer file, consider the following:

  - During the resolution process, a separate {{% param "product.abbrev" %}} instance will be started with its temporary files beside the {{% param "product.abbrev" %}} instance already running.
  - An incorrect startup command and incorrect configurations may cause issues for the {{% param "product.abbrev" %}} instance already running.
  - The disk-buffer file stores processed log messages in the format in which they would have been sent out to the destination.
  - The disk-buffer file doesn't store information about the destination.

{{% /alert %}}


To process the messages from an orphan disk-buffer file using a separate {{% param "product.abbrev" %}} instance,

1.  Identify the orphan disk-buffer files and make a record of them. For more information, see {{% xref "/chapter-routing-filters/concepts-diskbuffer/get-information-about-disk-buffer-files/_index.md" %}}.
    
    It is important to know the type of the disk-buffer file. Disk-buffer file types can be normal (`.qf`) or reliable (`.rqf`).
    
    In the examples during this process, the `/opt/syslog-ng/var/syslog-ng-00005.rqf` orphan reliable disk-buffer file is used.

2.  Determine the destination of the logs. The content of the disk-buffer may help you determine the logs' destination. For more information, see {{% xref "/chapter-routing-filters/concepts-diskbuffer/get-information-about-disk-buffer-files/_index.md" %}}.
    
    In the examples during this process, the destination `10.21.10.20` is used with the standard `network()` port `514`.

3.  Create a directory for the temporary instance. In the examples during this process, the `/tmp/qdisk` directory is used.
    
    ```shell
        mkdir /tmp/qdisk
    ```
    
    {{% alert title="Warning" color="warning" %}}
Make sure that there is sufficient disk space in the directory. The minimum recommended disk space in the directory is equal to the size of the orphan disk-buffer file.
    {{% /alert %}}

4.  Create the configuration file `/tmp/qdisk/qdisk.conf` for the temporary instance with the following content.
    
    
    ## Example: creating the /tmp/qdisk/qdisk.conf configuration file for the temporary instance
    
    ```shell
        @version:7.0
        @include "scl.conf"
        
        options {
          keep-hostname(yes);
          keep-timestamp(yes);
        };
        
        destination d_destination {
        #    ADD YOUR DESTINATION HERE
        
        };
        
        log {
          destination(d_destination);
        };
    ```
    

5.  Add your destination statement with `disk-buffer()` to the configuration file. You can copy the destination statement from your running {{% param "product.abbrev" %}} configuration.
    
    {{% alert title="Warning" color="warning" %}}
Add the `dir()` option and set the disk-buffer file's destination directory to the temporary directory (that is, `/tmp/qdisk`) in your destination statement.
    {{% /alert %}}

6.  <span id="start-temp-instance"></span>Start the temporary {{% param "product.abbrev" %}} instance in the foreground.
    
    ```shell
        syslog-ng -Fe -f /tmp/qdisk/qdisk.conf -R /tmp/qdisk/qdisk.persist -c /tmp/qdisk/qdisk.ctl
    ```
    
    The {{% param "product.abbrev" %}} application will log to the console, so you will see any potential error that may occur during startup.
    
    The following example output displays that an empty disk-buffer file has been created and the connection to the remote destination has been established.
    
    
    ## Example: output displaying newly created empty disk-buffer file and connection established to remote destination
    
    ```shell
        Follow-mode file source not found, deferring open; filename='/no_such_file_or.dir'
        Reliable disk-buffer state saved; filename='/tmp/qdisk/syslog-ng-00000.rqf', qdisk_length='0'
        No server license found, running in client mode;
        syslog-ng starting up; version='7.0.20', cfg-fingerprint='eaa03b9efb88b87d7c1b0ce7efd042ed8ac0c013', cfg-nonce-ndx='0', cfg-signature='c0327a7f7e6418ce0399a75089377dfb662bb072'
        FIPS information; FIPS-mode='disabled'
        Syslog connection established; fd='7', server='AF_INET(10.21.10.20:514)', local='AF_INET(0.0.0.0:0)'
    ```
    

7.  To stop {{% param "product.abbrev" %}}, press `CTRL+C`.

8.  <span id="repeat-steps-from-here"></span>Overwrite the empty disk-buffer file with the orphan disk-buffer file.
    
    ```shell
        mv /opt/syslog-ng/var/syslog-ng-00005.rqf /tmp/qdisk/syslog-ng-00000.rqf
    ```

9.  Start {{% param "product.abbrev" %}} using the command used in [Start the temporary {{% param "product.abbrev" %}} instance in the foreground]({{< relref "/chapter-routing-filters/concepts-diskbuffer/get-information-about-disk-buffer-files/diskb-proc-sep-sysl-inst/_index.md#start-temp-instance" >}}) step.
    
    ```shell
        syslog-ng -Fe -f /tmp/qdisk/qdisk.conf -R /tmp/qdisk/qdisk.persist -c /tmp/qdisk/qdisk.ctl
    ```

10. Open another terminal and check the progress by using one of the following methods.
    
      - Checking the number of stored logs in the disk-buffer (that is, the last number from the output).
        
        ```shell
            /opt/syslog-ng/sbin/syslog-ng-ctl stats -c /tmp/qdisk/qdisk.ctl | grep 'dst.*queued'
        ```
    
      - Checking the status of the disk-buffer file.
        
        ```shell
            /opt/syslog-ng/bin/dqtooldqtool info /tmp/qdisk/syslog-ng-00000.rqf
        ```
        
        An empty disk-buffer file will look similar to this:
        
        
        ## Example: empty disk-buffer file status message
        
        When checking the status of the disk-buffer files, the terminal will display a similar status message for an empty disk-buffer file:
        
        ```shell
            Reliable disk-buffer state loaded; filename='/tmp/qdisk/syslog-ng-00000.rqf', queue_length='0', size='0'
        ```
        

11. Press `CTRL+C` to stop {{% param "product.abbrev" %}}.

12. Check the state of the orphan disk-buffer file. For more information, see {{% xref "/chapter-routing-filters/concepts-diskbuffer/get-information-about-disk-buffer-files/_index.md" %}}.

13. If you have more than one orphan disk-buffer file, repeat [the steps following the {{% param "product.abbrev" %}} stop]({{< relref "/chapter-routing-filters/concepts-diskbuffer/get-information-about-disk-buffer-files/diskb-proc-sep-sysl-inst/_index.md#repeat-steps-from-here" >}}) (that is, the steps beginning from overwriting the empty disk-buffer file with the orphan disk-buffer file) for each orphan disk-buffer file.

14. Remove the temporary directory.
    
    
    ## Example: command for removing the temporary directory
    
    The following command removes the `/mp/qdisk` temporary directory:
    
    ```shell
        rm -rf /tmp/qdisk
    ```
