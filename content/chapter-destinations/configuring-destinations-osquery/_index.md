---
title: "osquery: Send log messages to osquery's syslog table"
weight:  3700
driver: "osquery()"
short_description: "Send log messages to osquery's syslog table"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `osquery()` driver sends log messages to osquery's syslog table.

The syslog table contains logs forwarded over a named pipe from `syslog-ng`. When an osquery process that supports the syslog table starts up, it creates (and properly sets permissions for) a named pipe for AxoSyslog to write to.


## Example: Using the osquery() destination driver

Run osqueryi:

```shell
   osqueryi --enable_syslog
             --disable-events=false
```

To store the database on disk:

```shell
   osqueryi --enable_syslog
             --disable-events=false
             --database_path=/tmp/osquery.db
```

To set up a custom named pipe:

```shell
   osqueryi --enable_syslog
             --disable-events=false
             --database_path=/tmp/osquery.db
             --syslog_pipe_path=/tmp/osq.pipe
```

Example configuration:

```shell
   @version: 3.12
    @include "scl.conf"
    
    source s_net {
      network(port(5514));
    };
    
    destination d_osquery {
      # custom pipe path:
      #osquery(pipe("/tmp/osq.pipe"));
    
      # backup outgoing logs:
      #osquery(file("/var/log/osquery_inserts.log" template(t_osquery)));
    
      # defaults
      osquery();
    };
    
    log {
     source(s_net);
     destination(d_osquery);
     flags(flow-control);
    };
```

