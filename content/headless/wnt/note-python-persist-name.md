---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{% alert title="Note" color="info" %}}

Starting with 3.26, {{% param "product.abbrev" %}} assigns a persist name to Python sources and destinations. The persist name is generated from the class name. If you want to use the same Python class multiple times in your {{% param "product.abbrev" %}} configuration, add a unique `persist-name()` to each source or destination, otherwise {{% param "product.abbrev" %}} will not start. For example:

```shell
   log {
        source { python(class(PyNetworkSource) options("port" "8080") persist-name("<unique-string>); };
        source { python(class(PyNetworkSource) options("port" "8081")); };
    };
```

Alternatively, you can include the following line in the Python package: `@staticmethod generate_persist_name`. For example:

```shell
   from syslogng import LogSource
      class PyNetworSource(LogSource):
        @staticmethod
        def generate_persist_name(options):
            return options["port"]
        def run(self):
            pass
        def request_exit(self):
            pass

```
{{% /alert %}}
