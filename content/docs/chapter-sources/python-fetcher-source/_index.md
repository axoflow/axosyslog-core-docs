---
title: "python-fetcher: writing fetcher-style Python sources"
weight:  3300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

{{% include-headless "chunk/python-source-intro.md" %}}

This section describes fetcher-style sources. For details on server-style sources, see {{% xref "/docs/chapter-sources/python-source/_index.md" %}}.

{{% include-headless "chunk/python-blocks.md" %}}


## Declaration:

{{% include-headless "chunk/python-source-declaration.md" %}}

```c

    source <name_of_the_python_source>{
        python-fetcher(
            class("<name_of_the_python_class_executed_by_the_source>")
        );
    };
    
    python {
    from syslogng import LogFetcher
    from syslogng import LogMessage
    
    class <name_of_the_python_class_executed_by_the_source>(LogFetcher):
        def init(self, options): # optional
            print("init")
            print(options)
            return True
    
        def deinit(self): # optional
            print("deinit")
    
        def open(self): # optional
            print("open")
            return True
    
        def fetch(self): # mandatory
            print("fetch")
            # return LogFetcher.FETCH_ERROR,
            # return LogFetcher.FETCH_NOT_CONNECTED,
            # return LogFetcher.FETCH_TRY_AGAIN,
            # return LogFetcher.FETCH_NO_DATA,
            return LogFetcher.FETCH_SUCCESS, msg
    
        def request_exit(self):
            print("request_exit")
            # If your fetching method is blocking, do something to break it
            # For example, if it reads a socket: socket.shutdown()
    
        def close(self): # optional
            print("close")
    };

```



## Methods of the python-fetcher() source {#python-source-methods}

Fetcher-style Python sources must be inherited from the `syslogng.LogFetcher` class, and must implement at least the `fetch` method. Multiple inheritance is allowed, but only for pure Python super classes.

For fetcher-style Python sources, {{% param "product.abbrev" %}} handles the event loop and the scheduling automatically. You can use simple blocking server/client libraries to receive or fetch logs.

You can retrieve messages using the **fetch()** method.

{{% include-headless "chunk/python-method-init.md" %}}


## open(self) method (optional)

The `open(self)` method opens the resources required for the source, for example, it initiates a connection to the target service. It is called after `init()` when {{% param "product.abbrev" %}} is started or reloaded. If `fetch()` returns with an error, {{% param "product.abbrev" %}} calls the `close()` and `open()` methods before trying to fetch a new message.

{{% include-headless "chunk/python-method-open-time-reopen.md" %}}



## fetch(self) method (mandatory)

Use the **fetch** method to fetch messages and pass them to the log paths.

For details on parsing messages, see {{% xref "/docs/chapter-sources/python-source/python-source-logmessage/_index.md" %}}.

The `fetch` method must return one of the following values:

  - `LogFetcher.FETCH_ERROR`: Fetching new messages failed, {{% param "product.abbrev" %}} calls the `close` and `open` methods.

  - `LogFetcher.FETCH_NO_DATA`: There was not any data available. The source waits before calling the fetch method again. The wait time is equal to `time-reopen()` by default, but you can override it by setting the `fetch-no-data-delay()` option in the source.

  - `LogFetcher.FETCH_NOT_CONNECTED`: Could not access the source, {{% param "product.abbrev" %}} calls the `open` method.

  - `LogFetcher.FETCH_SUCCESS, msg`: Post the message returned as the second argument.

  - `LogFetcher.FETCH_TRY_AGAIN`: The fetcher could not provide a message this time, but will make the source call the fetch method as soon as possible.



## request_exit(self) method (optional)

If you use blocking operations within the `fetch()` method, use `request_exit()` to interrupt those operations (for example, to shut down a socket), otherwise {{% param "product.abbrev" %}} is not able to stop. Note that {{% param "product.abbrev" %}} calls the `request_exit` method from a thread different from the source thread.



## close(self) method (optional)

Close the connection to the target service. Usually it is called right before `deinit()` when stopping or reloading {{% param "product.abbrev" %}}. It is also called when `fecth()` fails.


{{% include-headless "chunk/python-method-deinit.md" %}}


For the list of available optional parameters, see {{% xref "/docs/chapter-sources/python-source/reference-source-python/_index.md" %}}.
