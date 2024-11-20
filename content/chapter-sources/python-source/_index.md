---
title: "python: writing server-style Python sources"
weight:  3100
driver: "python()"
short_description: "Server-style Python source that receives messages"
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% include-headless "chunk/python-source-intro.md" %}}

This section describes server-style sources. For details on fetcher-style sources, see {{% xref "/chapter-sources/python-fetcher-source/_index.md" %}}.

{{< include-headless "chunk/python-blocks.md" >}}

{{< include-headless "wnt/note-python-persist-name.md" >}}


## Declaration:

{{% include-headless "chunk/python-source-declaration.md" %}}

```shell
   source <name_of_the_python_source>{
        python(
            class("<name_of_the_python_class_executed_by_the_source>")
            options(
                "option1" "value1",
                "option2" "value2"
            )
        );
    };
    
    python {
    from syslogng import LogSource
    from syslogng import LogMessage
    
    class <name_of_the_python_class_executed_by_the_source>(LogSource):
        def init(self, options): # optional
            print("init")
            print(options)
            self.exit = False
            return True
    
        def deinit(self): # optional
            print("deinit")
    
        def run(self): # mandatory
            print("run")
            while not self.exit:
                # Must create a message
                msg = LogMessage("this is a log message")
                self.post_message(msg)
    
        def request_exit(self): # mandatory
            print("exit")
            self.exit = True
    };
```



## Methods of the python() source {#python-source-methods}

Server-style Python sources must be inherited from the `syslogng.LogSource` class, and must implement at least the `run` and `request_exit` methods. Multiple inheritance is allowed, but only for pure Python super classes.

You can implement your own event loop, or integrate the event loop of an external framework or library, for example, [KafkaConsumer](https://kafka-python.readthedocs.io/en/master/apidoc/KafkaConsumer.html), [Flask](http://flask.pocoo.org/), [Twisted engine](https://twisted.org/), and so on.

To post messages, call `LogSource::post_message()` method in the `run` method.

For the list of available optional parameters, see {{% xref "/chapter-sources/python-source/reference-source-python/_index.md" %}}.

{{< include-headless "chunk/python-method-init.md" >}}


## run(self) method (mandatory)

Use the `run` method to implement an event loop, or start a server framework or library. Create `LogMessage` instances in this method, and pass them to the log paths by calling `LogSource::post_message()`.

Currently, `run` stops permanently if an unhandled exception happens.

For details on parsing and posting messages, see {{% xref "/chapter-sources/python-source/python-source-logmessage/_index.md" %}}.



## request_exit(self) method (mandatory)

The {{% param "product.abbrev" %}} application calls this method when {{% param "product.abbrev" %}} is shut down or restarted. The `request_exit` method must shut down the event loop or framework, so the `run` method can return gracefully. If you use blocking operations within the `run()` method, use `request_exit()` to interrupt those operations and set an exit flag, otherwise {{% param "product.abbrev" %}} is not able to stop. Note that {{% param "product.abbrev" %}} calls the `request_exit` method from a thread different from the source thread.

{{< include-headless "chunk/python-method-close-batch.md" >}}

{{< include-headless "chunk/python-method-deinit.md" >}}

## set_transport_name(self, name)

Set the transport name used to retrieve messages This function can be called to customize the [`${TRANSPORT}` name-value pair]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md#macro-transport" >}}).
