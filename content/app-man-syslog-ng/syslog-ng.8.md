---
title: "The `syslog-ng` manual page"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


<span id="syslog-ng.8"></span>


## Name

`syslog-ng` — syslog-ng system logger application



## Synopsis

`syslog-ng [options]`



## Description



The {{% param "product.abbrev" %}} application is a flexible and highly scalable system logging application. Typically, {{% param "product.abbrev" %}} is used to manage log messages and implement centralized logging, where the aim is to collect the log messages of several devices on a single, central log server. The different devices - called clients - all run {{% param "product.abbrev" %}}, and collect the log messages from the various applications, files, and other sources. The clients send all important log messages to the remote {{% param "product.abbrev" %}} server, where the server sorts and stores them.



## Options

- `--caps`
    
    Run {{% param "product.abbrev" %}} process with the specified POSIX capability flags.
    
    - If the `--no-caps` option is not set, {{% param "product.abbrev" %}} has been compiled with the `--enable-linux-caps compile` option, and the host supports `CAP_SYSLOG`, {{% param "product.abbrev" %}} uses the following capabilities: `cap_net_bind_service`, `cap_net_broadcast`, `cap_net_raw`, `cap_dac_read_search`, `cap_dac_override`, `cap_chown`, `cap_fowner=p cap_syslog=ep`
  
    - If the `--no-caps` option is not set, and the host does not support `CAP_SYSLOG`, {{% param "product.abbrev" %}} uses the following capabilities: `cap_net_bind_service`, `cap_net_broadcast`, `cap_net_raw`, `cap_dac_read_search`, `cap_dac_override`, `cap_chown`, `cap_fowner=p cap_sys_admin=ep`
    
    For example:
    
    ```shell
    /opt/syslog-ng/sbin/syslog-ng -Fv --caps cap_sys_admin,cap_chown,cap_dac_override,cap_net_bind_service,cap_fowner=pi
    ```
    
    Note that the capabilities are not case sensitive, the following command is also good: `/opt/syslog-ng/sbin/syslog-ng -Fv --caps CAP_SYS_ADMIN,CAP_CHOWN,CAP_DAC_OVERRIDE,CAP_NET_BIND_SERVICE,CAP_FOWNER=pi`
    
    For details on the capability flags, see the following man pages: `cap_from_text(3)` and `capabilities(7)`

- `--cfgfile <file>` or `-f <file>`
    
    Use the specified configuration file.

- `--chroot <dir>` or `-C <dir>`
    
    Change root to the specified directory. The configuration file is read after chrooting so, the configuration file must be available within the `chroot`. That way it is also possible to reload the {{% param "product.syslog-ng" %}} configuration after chrooting. However, note that the `--user` and `--group`options are resolved before chrooting.

- `--control <file>` or `-c<file>`
    
    Set the location of the `syslog-ng` control socket. Default value: `/var/run/syslog-ng.ctl`

- `--debug` or `-d`
    
    Start `syslog-ng` in debug mode.

- `--default-modules`
    
    A comma-separated list of the modules that are loaded automatically. Modules not loaded automatically can be loaded by including the `@module <modulename>` statement in the {{% param "product.abbrev" %}} configuration file. Available only in {{% param "product.abbrev" %}} version 4.1 and later.

- `--enable-core`
    
    Enable {{% param "product.abbrev" %}} to write core files in case of a crash to help support and debugging.

- `--fd-limit <number>`
    
    Set the minimal number of required file descriptors (`fd-s`). This sets how many files `syslog-ng` can keep open simultaneously. Default value: `4096`. Note that this does not override the global ulimit setting of the host.

- `--foreground` or `-F`
    
    Do not daemonize, run in the foreground. When running in the foreground, {{% param "product.abbrev" %}} starts from the current directory (`$CWD`) so it can create core files (normally, {{% param "product.abbrev" %}} starts from `/$PREFIX/var`).

- `--group <group>` or `-g <group>`
    
    Switch to the specified group after initializing the configuration file.

- `--help` or `-h`
    
    Display a brief help message.

- `--log-level <level>`

    Set the internal log level of {{% param "product.abbrev" %}} to `default`, `verbose`, `debug`, or `trace`. Available in {{% param "product.abbrev" %}} 4.0 and later.

- `--module-registry`
    
    Display the list and description of the available modules. Note that not all of these modules are loaded automatically, only the ones specified in the `--default-modules` option.

- `--no-caps`
    
    Run {{% param "product.abbrev" %}} as root, without capability-support. This is the default behavior. On Linux, it is possible to run {{% param "product.abbrev" %}} as non-root with capability-support if {{% param "product.abbrev" %}} was compiled with the `--enable-linux-caps` option enabled. (Run `syslog-ng --version` to display the list of enabled build parameters.)
    
    To run {{% param "product.abbrev" %}} with specific capabilities, use the `--caps` option.

- `--persist-file <persist-file>` or `-R <persist-file>`
    
    Set the path and name of the `syslog-ng.persist` file where the persistent options and data are stored.

- `--pidfile <pidfile>` or `-p <pidfile>`
    
    Set path to the PID file where the pid of the main process is stored.

- `--preprocess-into <output-file>`
    
    After processing the configuration file and resolving included files and variables, write the resulting configuration into the specified output file. Available only in {{% param "product.abbrev" %}} 4 F1 and later.

- `--process-mode <mode>`
    
    Sets how to run {{% param "product.abbrev" %}}: in the `foreground` (mainly used for debugging), in the `background` as a daemon, or in `safe-background` mode. By default, `syslog-ng` runs in `safe-background` mode. This mode creates a supervisor process called `supervising syslog-ng`, that restarts {{% param "product.abbrev" %}} if it crashes.

- `--stderr` or `-e`

    Log internal messages of {{% param "product.abbrev" %}} to `stderr`. Mainly used for debugging purposes in conjunction with the `--foreground` option. If not specified, `syslog-ng` logs such messages to its internal source.

- `--syntax-only` or `-s`
    
    Verify that the configuration file is syntactically correct and exit.

- `--user <user>` or `-u <user>`
    
    Switch to the specified user after initializing the configuration file (and optionally chrooting). Note that it is not possible to reload the `syslog-ng` configuration if the specified user has no privilege to create the `/dev/log` file.

- `--verbose` or `-v`
    
    Enable verbose logging used to troubleshoot {{% param "product.abbrev" %}}.

- `--version` or `-V`
    
    Display version number and compilation information, and also the list and short description of the available modules. For detailed description of the available modules, see the `--module-registry` option. Note that not all of these modules are loaded automatically, only the ones specified in the `--default-modules`option.

- `--worker-threads`
    
    Sets the number of worker threads {{% param "product.abbrev" %}} can use, including the main {{% param "product.abbrev" %}} thread. Note that certain operations in {{% param "product.abbrev" %}} can use threads that are not limited by this option. This setting has effect only when {{% param "product.abbrev" %}} is running in multithreaded mode. Available only in {{% param "product.abbrev" %}} 4 F1 and later. See `The {{% param "product.abbrev" %}} 7 Administrator Guide` for details.

## Files

`/opt/syslog-ng/`

`/opt/syslog-ng/etc/syslog-ng.conf`



## See also

{{% xref "/app-man-syslog-ng/syslog-ng.conf.5.md" %}}

{{% alert title="Note" color="info" %}}



If you experience any problems or need help with {{% param "product.abbrev" %}}, {{% param "product.contact" %}}.

For news and notifications about {{% param "product.abbrev" %}}, visit the [AxoFlow blog](https://axoflow.com/blog/).

{{% /alert %}}

