---
title: "The Python HTTP header plugin"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

This section describes the {{% param "product.name" %}} ({{% param "product.abbrev" %}}) application's Python HTTP header plugin.

For more information about modules in {{% param "product.abbrev" %}}, see {{% xref "/docs/chapter-configuration-file/modules/_index.md" %}}.


## The Python HTTP header plugin

The {{% param "product.abbrev" %}} application supports adding custom headers to HTTP requests using the Python programming language.



## Prerequisites

{{% alert title="Note" color="info" %}}

Before you use the `python-http-header` plugin, make sure that your {{% param "product.abbrev" %}} appliance was compiled with Python support. If you installed {{% param "product.abbrev" %}} from a package, make sure that the subpackage containing Python support is also installed.

{{% /alert %}}



## Configuration

```c
   destination d_http {
      http(
        python_http_header(
          class("<class-name>")
          options("options-key1", "option-value1")
          options("options-key2", "option-value2")
          mark-errors-as-critical(no))
        url("http://127.0.0.1:8888")
      );
    };
```

`Options used in the configuration`

  - `class`: Mandatory option. It refers to the user's Python class that implements the `python-http-header` interface. It can be `mymodule.MyClass` if the `class MyClass` is put into a `mymodule.py` module, or simply `MyClass` if the user's code is provided inline in the configuration, using the `python { ... };` keyword.{{% alert title="Note" color="info" %}}
If you put the class implementation into its own module, it should be put into a standard location, or made available with the `PYTHONPATH` environment variable.
    {{% /alert %}}

  - `options("key" "value")`: Optional option. Multiple options can be specified at the same time. The {{% param "product.abbrev" %}} application will build a Python dictionary, which will be available in the `__init__` method.

  - `mark-errors-as-critical(yes|no)`: Optional option. Its default value is `yes`. In case there is a Python error, this parameter decides if the HTTP destination will still try to send the request with the failed headers, or disconnect instead.



## Defining the python-http-header() interface

You can define the Python interface with the following:

```c
   class TestCounter():
      def __init__(self, options):
        self.key = options["value"]
    
      def get_headers(self, body, headers):
        return ["header1: value1", "header2: value2"]
    
      def on_http_response_received(self, http_code):
        print("HTTP response code received: {}".format(http_code))
```

By default, when the `signal_http_header_request` is emitted by the HTTP module, the connected slot automatically executes the Python code.

{{% alert title="Note" color="info" %}}

If the plugin fails, the HTTP module does not send the HTTP request without the header items by default. If you want the HTTP module to try sending the request without the header items, disable the `mark-errors-as-critical` function.

{{% /alert %}}


`Methods used in the configuration`

  - `__init__(self, options)`: Optional method. The options specified in the {{% param "product.abbrev" %}} configuration can be stored in the instance using this method.
  - `get_headers(self, body, headers)`: Mandatory method. Returns a list of strings of form [`"header: value"`, ...]. The returned headers will be set for the outgoing HTTP request. The body contains the body of the HTTP request. The headers contain the current headers that the HTTP destination has already added to the request.
  - `on_http_response_received(self, http_code)`: Optional method. If specified, {{% param "product.abbrev" %}} inserts the `http_code` of the previous response. This can be used to handle error (for example, for recreating auth headers, or dropping cache).





## Example configuration for using the Python HTTP header plugin

The following example can be copy-pasted and used as a template for using the Python HTTP header plugin in your configuration.

```c
   python {
    from syslogng import Logger
                        
    logger = Logger()
                        
    class TestCounter():
        def __init__(self, options):
            self.header = options["header"]
            self.counter = int(options["counter"])
            logger.debug(f"TestCounter class instantiated; options={options}")
                        
        def get_headers(self, body, headers):
            logger.debug(f"get_headers() called, received body={body}, headers={headers}")
                        
            response = ["{}: {}".format(self.header, self.counter)]
            self.counter += 1
            return response
                        
        def on_http_response_received(self, http_code):
            self.counter += http_code
            logger.debug("HTTP response code received: {}".format(http_code))
                        
        def __del__(self):
            logger.debug("Deleting TestCounter class instance")
    };
                        
    source s_network {
      network(port(5555));
    };
                        
    destination d_http {
        http(
            python_http_header(
                class("TestCounter")
                options("header", "X-Test-Python-Counter")
                options("counter", 11)
                # this means that syslog-ng will keep trying to send the http request even when this module fails
                mark-errors-as-critical(no)
            )
            url("http://127.0.0.1:8888")
        );
    };
                        
    log {
        source(s_network);
        destination(d_http);
        flags(flow-control);
    };
```



{{% include-headless "wnt/w-http-header-py-supp.md" %}}
