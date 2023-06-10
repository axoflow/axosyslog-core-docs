---
title: "python: writing custom Python destinations"
weight:  4500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The Python destination allows you to write your own destination in Python. You can import external Python modules to process the messages, and send them to other services or servers. Since many services have a Python library, the Python destination makes integrating {{% param "product.abbrev" %}} very easy and quick.

{{% include-headless "chunk/python-blocks.md" %}}

{{< include-headless "wnt/note-python-persist-name.md" >}}


## Declaration:

Python destinations consist of two parts. The first is a {{% param "product.abbrev" %}} destination object that you define in your {{% param "product.abbrev" %}} configuration and use in the log path. This object references a Python class, which is the second part of the Python destination. The Python class processes the log messages it receives, and can do virtually anything that you can code in Python. You can either embed the Python class into your {{% param "product.abbrev" %}} configuration file, or [store it in an external Python file]({{< relref "/docs/chapter-configuration-file/python-code-external-file/_index.md" >}}).

```c
   destination <name_of_the_python_destination>{
        python(
            class("<name_of_the_python_class_executed_by_the_destination>")
        );
    };
    
    python {
    class <name_of_the_python_class_executed_by_the_destination>(object):
    
        def open(self):
            """Open a connection to the target service
    
            Should return False if opening fails"""
            return True
    
        def close(self):
            """Close the connection to the target service"""
            pass
    
        def is_opened(self):
            """Check if the connection to the target is able to receive messages"""
            return True
    
        def init(self, options):
            """This method is called at initialization time
    
            Should return false if initialization fails"""
            return True
    
        def deinit(self):
            """This method is called at deinitialization time"""
            pass
    
        def send(self, msg):
            """Send a message to the target service
    
            It should return True to indicate success. False will suspend the
            destination for a period specified by the time-reopen() option."""
            return True
    
        def flush(self):
            """Flush the queued messages"""
            pass
    };
```

{{% alert title="Note" color="info" %}}
From version 3.27, {{% param "product.abbrev" %}} supports the arrow syntax in declaration. For more information, see [the options() of the python() destination]({{< relref "/docs/chapter-destinations/python-destination/reference-destination-python/_index.md#python-options" >}}).
{{% /alert %}}

## Methods of the python() destination {#python-destination-methods}

{{< include-headless "chunk/python-method-init.md" >}}


<span id="python-destination-method-is-opened"></span>

## is_opened(self) method (optional)

Checks if the connection to the target is able to receive messages, and should return True if it is. For details, see [Error handling in the python() destination](#python-destination-error-handling).



<span id="python-destination-method-open"></span>

## open(self) method (optional)

The `open(self)` method opens the resources required for the destination, for example, it initiates a connection to the target service. It is called after `init()` when {{% param "product.abbrev" %}} is started or reloaded. If `send()` returns with an error, {{% param "product.abbrev" %}} calls `close()` and `open()` before trying to send again.

{{% include-headless "chunk/python-method-open-time-reopen.md" %}}



<span id="python-destination-method-send"></span>

## send(self, message) method (mandatory)

The `send` method sends a message to the target service. It should return True to indicate success, or `self.QUEUED` when using batch mode. For other possible return values, see the description of the [`flush()` method](#python-destination-method-flush). Note that for batch mode, the `flush()` method must be implemented as well.

This is the only mandatory method of the destination.

If a message cannot be delivered after the number of times set in `retries()` (by default: 3), {{% param "product.abbrev" %}} drops the message and continues with the next message. For details, see [Error handling in the python() destination](#python-destination-error-handling).

The method can return True, False, or one of the following constants:

  - `self.DROP`: The message is dropped immediately.

  - `self.ERROR`: Corresponds to boolean False. The message is put back to the queue, and sending the message is attempted (up to the number of the `retries()` option). The destination is suspended for `time-reopen()` seconds.

  - `self.SUCCESS`: Corresponds to boolean True. The message was sent successfully.

  - `self.QUEUED`: The `send()` method should return this value when using batch mode, if it has successfully added the message to the batch. Message acknowledgment of batches is controlled by the `flush()` method.

  - `self.NOT_CONNECTED`: The message is put back to the queue, and the destination is suspended. The `open()` method will be called, and the sending the messages will be continued with the same message/batch.

  - `self.RETRY`: The message is put back to the queue, and sending the message is attempted (up to the number of the `retries()` option). If sending the message has failed `retries()` times, `self.NOT_CONNECTED` is returned.



<span id="python-destination-method-flush"></span>

## flush(self) method (optional)

Send the messages in a batch. You can use this method to implement batch-mode message sending instead of sending messages one-by-one. When using batch mode, the `send()` method adds the messages to a batch (for example, a list), and the `flush()` method sends the messages as configured in the `batch-bytes()`, `batch-lines()`, or `batch-timeout()` options.

The method can return True, False, or one of the following constants:

  - `self.DROP`: The messages cannot be sent and the entire batch is dropped immediately.

  - `self.ERROR`: Corresponds to boolean False. The message is put back to the queue, and sending the message is attempted (up to the number of the `retries()` option). The destination is suspended for `time-reopen()` seconds.

  - `self.SUCCESS`: Corresponds to boolean True. The message was sent successfully.

  - `self.NOT_CONNECTED`: The message is put back to the queue, and the destination is suspended. The `open()` method will be called, and the sending the messages will be continued with the same message/batch.

  - `self.RETRY`: The message is put back to the queue, and sending the message is attempted (up to the number of the `retries()` option). If sending the message has failed `retries()` times, `self.NOT_CONNECTED` is returned.



<span id="python-destination-method-close"></span>

## close(self) method (optional)

Close the connection to the target service. Usually it is called right before `deinit()` when stopping or reloading {{% param "product.abbrev" %}}. It is also called when `send()` fails.


{{< include-headless "chunk/python-method-deinit.md" >}}



## Error handling in the python() destination {#python-destination-error-handling}

The Python destination handles errors as follows.

1.  Currently {{% param "product.abbrev" %}} ignores every error from the `open` method until the first log message arrives to the Python destination. If the fist message has arrived and there was an error in the `open` method, {{% param "product.abbrev" %}} starts calling the `open` method every `time-reopen()` second, until opening the destination succeeds.

2.  If the `open` method returns without error, {{% param "product.abbrev" %}} calls the `send` method to send the first message.

3.  If the `send` method returns with an error, {{% param "product.abbrev" %}} calls the `is_opened` method.
    
      - If the `is_opened` method returns an error, {{% param "product.abbrev" %}} starts calling the `open` method every `time-reopen()` second, until opening the destination succeeds.
    
      - Otherwise, {{% param "product.abbrev" %}} calls the `send` method again.

4.  If the `send` method has returned with an error `retries()` times and the `is_opened` method has not returned any errors, {{% param "product.abbrev" %}} drops the message and attempts to process the next message.



## Example: Write logs into a file {#python-destination-example}

The purpose of this example is only to demonstrate the basics of the Python destination, if you really want to write log messages into text files, use the [file destination]({{< relref "/docs/chapter-destinations/configuring-destinations-file/_index.md" >}}) instead.

The following sample code writes the body of log messages into the `/tmp/example.txt` file. Only the `send()` method is implemented, meaning that {{% param "product.abbrev" %}} opens and closes the file for every message.

```c
   destination d_python_to_file {
        python(
            class("TextDestination")
        );
    };
    log {
        source(src);
        destination(d_python_to_file);
    };
    python {
    class TextDestination(object):
        def send(self, msg):
            self.outfile = open("/tmp/example.txt", "a")
            self.outfile.write("MESSAGE = %s\n" % msg["MESSAGE"])
            self.outfile.flush()
            self.outfile.close();
            return True
    };
```

The following code is similar to the previous example, but it opens and closes the file using the `open()` and `close()` methods.

```c
   destination d_python_to_file {
        python(
            class("TextDestination")
        );
    };
    log {
        source(src);
        destination(d_python_to_file);
    };
    python {
    class TextDestination(object):
        def open(self):
            try:
                self.outfile = open("/tmp/example.txt", "a")
                return True
            except:
                return False
    
        def send(self, msg):
            self.outfile.write("MESSAGE = %s\n" % msg["MESSAGE"])
            self.outfile.flush()
            return True
    
        def close(self):
            try:
                self.outfile.flush()
                self.outfile.close();
                return True
            except:
                return False
    };
```

For a more detailed example about sending log messages to an MQTT (Message Queuing Telemetry Transport) server, see the [Writing Python destination in syslog-ng: how to send log messages to MQTT blog post](https://www.syslog-ng.com/community/b/blog/posts/writing-python-destination-in-syslog-ng-how-to-send-log-messages-to-mqtt).

## Example: Print logs in batch mode {#python-destination-batch-mode-example}

The following is a simple destination that uses the `flush()` method to print the messages in batch mode.

```c
   class MyDestination(object):
        def init(self, options):
            self.bulk = list()
            return True
    
        def send(self, msg):
             self.bulk.append(msg["MSG"].decode())
             return self.QUEUED
    
        def flush(self):
            print("flushing: " + ",".join(self.bulk))
            self.bulk = list()
            return self.SUCCESS
```


For the list of available optional parameters, see {{% xref "/docs/chapter-destinations/python-destination/reference-destination-python/_index.md" %}}.
