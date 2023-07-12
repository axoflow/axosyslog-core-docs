---
title: Writing Python modules
weight: 4300
---

{{% param "product.name" %}} has comprehensive support for implementing various logging components in Python. This chapter shows you how to use this functionality.

## When to use Python

The Python bindings are useful if the facilities provided by the {{% param "product.name" %}} configuration language is not sufficient, that is:

- {{% param "product.name" %}} doesn't support a specific service (for example, API based log sources or information sources that you want to use for data enrichment purposes).
- The {{% param "product.name" %}} configuration language does not support a specific transformation (in that case, please [tell us about your use-case](https://axoflow.com/contact/)).
- You want to work on complex data structures (for example, JSON) which easier to do in a real programming language.

While Python is very powerful and you can produce clean and production ready solutions with it, the drawback is usually performance. Python code is usually slower than the native functionality that {{% param "product.name" %}} provides.

To offset this impact of performance degradation, it's a good strategy to only process a subset of the incoming log stream with Python code and use native configuration elements to select which subset is traversing said Python code.

## Creating and storing the Python code

You can embed Python code directly into `syslog-ng.conf`, or work with Python modules.

### Embedding Python into {{% param "product.name" %}} configuration

You can simply use a top-level `python {}` block to embed your Python code, like this:

```shell
@version: 4.0

python {

def template_function(msg):
    return b"Hello World from Python! Original message: " + msg['MSGHDR'] + msg['MESSAGE']

};

log {
    source { tcp(port(2000)); };
    destination { file("logfile" template("$ISODATE $(python template_function)")); };
};
```

### Using Python modules

You can also put your code into a proper Python module and then use it from there. {{% param "product.name" %}} automatically adds `${sysconfdir}/python` to your PYTHONPATH (normally `/etc/syslog-ng/python`), with that in mind add the following code to `/etc/syslog-ng/python/mytemplate.py`:

```python
def template_function(msg):
    return b"Hello World from Python! Original message: " + msg['MSGHDR'] + msg['MESSAGE']
```

The Python glue in {{% param "product.name" %}} automatically imports modules when it encounters an identifier in dotted notation, so if you use this {{% param "product.name" %}} config:

```shell
@version: 4.0

log {
    source { tcp(port(2000)); };
    destination { file("logfile" template("$ISODATE $(python mytemplate.template_function)")); };
};
```

{{% param "product.name" %}} recognizes that `mytemplate.template_function` is a qualified name and attempts to import `mytemplate` as a module and then looks up `template_function` within that module.

> Note: Modules are only imported once, so you will need to restart {{% param "product.name" %}} for a change to take effect.

## {{% param "product.name" %}} reload and Python

When you reload `syslog-ng` (with `syslog-ng-ctl` reload or `systemctl reload syslog-ng`) then the `python` block in your configuration is reloaded with the rest of the configuration file. Any changes you make in Python code directly embedded in your configuration takes effect after the reload. This also means that any global variables are reset, so you cannot store state across reloads in your `python {}` block.

Modules are only imported once and kept across reloads, even if the {{% param "product.name" %}} configuration is reloaded. This means that you van store global state in modules and they will be kept, even as {{% param "product.name" %}} reinitializes the configuration.

In case you want to reload a module every time {{% param "product.name" %}} configuration is reinitialized, you need to do this explicitly with a code similar to this:

```python
python {

import mymodule
import importlib

# reload mymodule every time syslog-ng reloads
importlib.reload(mymodule)

};
```

## Destination driver

You can derive a destination driver in Python from the `LogDestination` class, as defined by the `syslogng` module, like in the following example:

`mydestination.py`:

```python
from syslogng import LogDestination

class MyDestination(LogDestination):
    def send(self, msg):
    return True
```

The interface of the `LogDestination` class is documented in the `syslogng.dest` module, which is stored in the [`modules/python-modules/syslogng/dest.py`](https://github.com/syslog-ng/syslog-ng/blob/master/modules/python-modules/syslogng/dest.py) file of the source tree.

Once all required methods are implemented, you can use the [`python` destination]({{< relref "/chapter-destinations/python-destination/_index.md" >}}) in the {{% param "product.name" %}} configuration language.

```shell
destination whatever {
    python(class(mydestination.MyDestination));
};
```

There's a more complete example destination in the `python_example()` destination plugin, that is located in the directory [`modules/python-modules/syslogng/modules/example/`](https://github.com/syslog-ng/syslog-ng/tree/master/modules/python-modules/syslogng/modules/example) directory within the source tree, or the same files installed under `${exec_prefix}/syslog-ng/python/syslogng/modules` in a production deployment.

## Template function plugin

Template functions extend the {{% param "product.name" %}} template language. They get a `LogMessage` object and return a string which gets embedded into the
output of the template. You can have {{% param "product.name" %}} call a Python function from the template language using the `$(python)` template function.

```shell
@version: 4.0

python {

def template_function(msg):
    return b"Hello World from Python! Original message: " + msg['MSGHDR'] + msg['MESSAGE']

};

...

destination d_file {
    file("/var/log/whatever" template("$(python template_function)"));
};
```

The Python function must be callable. IT receives a `LogMessage` instance and returns a string (`str` or `bytes`). The message passed to the template function is read-only. If you are trying to change a name-value pair, you will receive an exception.

## Parser plugin

You can derive parser plugins in Python from the `LogParser` class as this example shows:

```python
from syslogng import LogParser

class MyParser(LogParser):

    def parse(self, msg):
        msg['name'] = 'value'
        return True
```

In contrast to template functions, parsers receive a read-writable `LogMessage` object, so you can modify its contents.

## Source plugins

There are two kinds of source plugins that can be implemented in Python:

- [`LogFetcher`](#logfetcher): `LogFetcher` provides a convenient interface for fetching messages from backend services via blocking APIs, but it is limited to performing the fetching operation in a sequential manner: you fetch a batch of messages, feed them to the {{% param "product.name" %}} pipeline, then repeat.
- [`LogSource`](#logsource): `LogSource` is more low-level but allows the use of an asynchronous framework (for example, `asyncio`) to perform message fetching along multiple threads of execution.

Both are defined by the `syslogng.source` module.

## Source driver based on LogFetcher {#logfetcher}

`LogFetcher` provides a convenient interface for fetching messages from backend services via blocking APIs, but it is limited to performing the fetching operation in a sequential manner: you fetch a batch of messages, feed them to the {{% param "product.name" %}} pipeline, then repeat.

For a `LogFetcher` class, you have to implement the `fetch()` method. This is the main entry point, which is automatically invoked by `syslog-ng`, whenever it consumes incoming messages.

```shell
@version: 4.0

python {
from syslogng import LogFetcher
from syslogng import LogMessage
import time

class MyFetcher(LogFetcher):
    def fetch(self):
        time.sleep(1)
        msg = LogMessage.parse("<5>2022-02-02T10:23:45+02:00 HOST program[pid]: foobar", self.parse_options)
        return self.SUCCESS, msg

};


log {
    source { python-fetcher(class(MyFetcher)); };
    destination { file("messages"); };
};
```

This example generates one message every second, based on a literal string that is parsed as a syslog message.

The source is running in a dedicated thread, so it is free to block.

To limit the rate of generating messages, the `time.sleep(1)` call in the first line of the `fetch()` method sleeps for 1 second between the invocations of the method. If that sleep wasn't there, the source would produce about 100-110k messages per second, depending on the speed of your CPU, the performance of the Python interpreter and the `syslog-ng` core.

If the fetcher connects to an external API, the sleep is usually not needed, as the response time of the API is a limiting factor.

### Adding persistent state

If you are fetching messages from an API, you need to keep track of which messages were already fetched. Storing the position in a variable is not a good solution, because the value of the variable is lost when `syslog-ng` is reloaded or restarted (depending on where you store that variable, in the `python {}` block or in a module).

Use the `Persist()` class that uses the persistent state handling functionality of {{% param "product.name" %}}. This allows you to persist variables in a file that gets stored in the `${localstatedir}/syslog-ng.persist` file along with the rest of the `syslog-ng` states.

```python
class MyFetcher(LogFetcher):

    def init(self, options):
        self.persist = Persist("MyFetcher_persistent_data", defaults={"counter": 1})
        return True

    def fetch(self):
        time.sleep(1)
        counter = self.persist['counter']
        self.persist['counter'] += 1
        msg = LogMessage.parse("<5>2022-02-02T10:23:45+02:00 HOST program[pid]: foobar %d" % counter, self.parse_options)
        return self.SUCCESS, msg
```

Once initialized, a `Persist()` instance behaves as a dict where you can store Python values. Currently `str`, `bytes` and `int` are supported. Anything you store in a persist instance is remembered even across restarts. The entries are backed up to disk immediately after changing them (using an `mmap()`-ped file), so you don't have to explicitly commit them to disk.

You can store position information in a `Persist()` entry, but it's not always the best choice. In {{% param "product.name" %}}, producing messages is decoupled from their delivery: sometimes a message is still in-flight for a while before being delivered. This time can be significant if a destination consumes messages at a slow rate. In this case, if you store the position once fetched, the message would still be sitting in a queue waiting to be delivered. If the queue is not backed by a disk-buffer, then these messages would be lost, once `syslog-ng` is restarted.

To anticipate this case, use [bookmarks](#bookmarks).

### Bookmarks in a source {#bookmarks}

The bookmarking mechanism allows messages to carry individual markers that uniquely identify a message and its position in a source stream. For example, in a source file the bookmark would contain the position of the message within that file. An API may have a similar mechanism in place in which the source API associates an opaque to each message, which signifies its position in the repository.

A specific example for bookmarks is systemd-journald, which has a "cursor" indicating the position of each journal record. The cursor can be used to restart the reading of the log stream.

Once you've identified what mechanism the source offers that maps to the bookmark concept, decide how you want to track these bookmarks. Which bookmark tracking strategy you should use depends on the API specifics.

- Some APIs are sequential in nature, thus you can only acknowledge the "last fetch position" in that sequence.
- Other APIs allow you to acknowledge messages individually.

{{% param "product.name" %}} supports both methods.

The following Python example updates the current position in a source stream only when the {{% param "product.name" %}} destination has acknowledged the messages in the sequence (that is, when the messages were properly sent).

```python
class MyFetcher(LogFetcher):
    counter = 0

    def init(self, options):
        self.persist = Persist("MyFetcher_persistent_data", defaults={"position": 0})
        self.counter = self.persist['position']

	# pass self.message_acked method as ACK callback
        self.ack_tracker = ConsecutiveAckTracker(ack_callback=self.message_acked)
        return True

    def message_acked(self, acked_message_bookmark):
	# update current persisted position when syslog-ng delivered the
	# message, but only then.
        self.persist['position'] = acked_message_bookmark

    def fetch(self):
        time.sleep(1)
        self.counter += 1

	# depending on the speed of our consumer and the setting of
	# flags(flow-control), the current counter and the acked value may
	# differ in the messages generated.
        msg = LogMessage.parse("<5>2022-02-02T10:23:45+02:00 HOST program[pid]: foobar %d (acked so far %d)" % (self.counter, self.persist['position']), self.parse_options)

	# this is where we set the bookmark for the message
        msg.set_bookmark(self.counter)
        return self.SUCCESS, msg
```

### Acknowledgement tracking strategies

Some APIs provide simple, while others provide more complex ways to track messages that are processed. {{% param "product.name" %}} provides the following strategies to cope with them.

- Instant tracking (`InstantAckTracker`): Messages are considered delivered as soon as the destination driver (or the disk-buffer) acknowledges them. Out-of-order deliveries are reported as they happen, so an earlier message may be acknowledged later than a message originally encountered later in the source stream.
- Consecutive tracking (`ConsecutiveAckTracker`): Messages are assumed to form a stream and the bookmark is a position in that stream. Unordered deliveries are properly handled by only acknowledging messages that were delivered in order. If unordered delivery happens, the tracker waits for the sequence to fill up, that is, it waits for all preceeding messages to be delivered as well.

- Batched tracking (`BatchedAckTracker`): Messages are assumed to be independent, not forming a sequence of events. Each message is individually tracked, the source driver has the means to get delivery notifications of each and every message independently. The acknowledgements are accumulated until a timeout happens, at which point they get reported as a single batch.

You can initialize your `ack_tracker` in the `init` method, like this:

```python
class MyFetcher(LogFetcher):

    ...

    def init(self, options):
        # pass self.message_acked method as ACK callback
        self.ack_tracker = ConsecutiveAckTracker(ack_callback=self.message_acked)
        return True

    def message_acked(self, acked_message_bookmark):
        pass

    def fetch(self):
        ...
        msg.set_bookmark("whatever-bookmark-value-that-denotes-position")
    ...
```

The previous example uses `ConsecutiveAckTracker`, so you get acknowledgements in the order messages were generated. The argument of the `message_acked` callback is the "bookmark" value that you set using `set_bookmark()`.

Using `InstantAckTracker` is very similar, just replace `ConsecutiveAckTracker` with `InstantAckTracker`. In this case you'd get a callback as soon as a message is delivered without preserving the original ordering.

```python
class MyFetcher(LogFetcher):

    ...

    def init(self, options):
        self.ack_tracker = InstantAckTracker(ack_callback=self.message_acked)
        return True

    def message_acked(self, acked_message_bookmark):
        pass
```

While `ConsecutiveAckTracker()` seems to provide a much more useful service, `InstantAckTracker()` performs better, as it does not have to track acknowledgements of individual messages.

The most complex scenario is implemented by `BatchedAckTracker`, this allows you to track the acknowledgements for individual messages, as they happen, not enforcing any kind of ordering.

```python
class MyFetcher(LogFetcher):

    ...

    def init(self, options):
        self.ack_tracker = BatchedAckTracker(timeout=500, batch_size=100,
                                             batched_ack_callback=self.messages_acked)
        return True

    def messages_acked(self, acked_message_bookmarks):
        pass
```

`BatchedAckTracker` calls your callback periodically, as set by the `timeout` argument in milliseconds. `batch_size` specifies the number of outstanding messages at a time.

With this interface it's quite easy to send acknowledgements back to the source interface where per-message acknowledgements are needed (for example, Google PubSub).

### Accessing the `flags()` option

The state of the `flags()` option is mapped to the `self.flags` variable, which is a `Dict[str, bool]`, for example:

```python
{
    'parse': True,
    'check-hostname': False,
    'syslog-protocol': True,
    'assume-utf8': False,
    'validate-utf8': False,
    'sanitize-utf8': False,
    'multi-line': True,
    'store-legacy-msghdr': True,
    'store-raw-message': False,
    'expect-hostname': True,
    'guess-timezone': False,
    'header': True,
    'rfc3164-fallback': True,
}
```

## Source driver based on LogSource {#logsource}

`LogSource` allows the use of an asynchronous framework (for example, `asyncio`) to perform message fetching along multiple threads of execution.

The following example uses `asyncio` to generate two independent sequences of messages: the first is generated every second, the other every 1.5 seconds, running concurrently via an `asyncio` event loop.

It is also easy to create a source that implements an HTTP server, and which injects messages coming via HTTP to the {{% param "product.name" %}} pipeline.

```python
from syslogng import LogSource
from syslogng import LogMessage
import asyncio

class MySource(LogSource):
    cancelled = False

    def run(self):
        asyncio.run(self.main())

    async def main(self):
        await asyncio.gather(self.sequence1(), self.sequence2())

    async def sequence1(self):
        while not self.cancelled:
            await asyncio.sleep(1)
            self.post_message(LogMessage("message1"))

    async def sequence2(self):
        while not self.cancelled:
            await asyncio.sleep(1.5)
            self.post_message(LogMessage("message2"))

    def request_exit(self):
        self.cancelled = True
```

Acknowledgement mechanisms (`ConsecutiveAckTracker`, `BatchedAckTracker`) and `flags()` mapping can be used similarly to how it was described at `LogFetcher`.

## Making it more native config-wise

The examples so far used some form of `python()` driver, for instance, this was the Python based destination driver:

```shell
destination whatever {
    python(class(mydestination.MyDestination)
           options(option1 => value,
                   option2 => value));
};
```

While this works, the syntax doesn't look like other parts of the configuration, and is also hard to read. The usual syntax for referencing regular drivers is something like this:

```shell
destination whatever {
    my-destination(option1(value) option2(value));
};
```

To make the syntax more native, you can use the block functionality to wrap your Python driver, hide that it's actually Python, and provide a syntax to your code that is more convenient to use.

```shell
block destination my-destination(option1(value)
                                 option2(value)) {
    python(class(mydestination.MyDestination)
                 options(option1 => `option1`,
                         option2 => `option2`));
};
```

This block allows the use of the more {{% param "product.name" %}}-native syntax, completely hiding the fact that the implementation is Python based, concentrating on functionality.

Add this wrapper to your Python module in an `scl` subdirectory as a file with a .conf extension. {{% param "product.name" %}} automatically includes these files along the rest of the SCL.

## Adding the code to syslog-ng

To add your Python-based modules to `syslog-ng`, complete the following steps.

1. Create a Python package: add the `__init__.py` file and anything that the file references to the `modules/python-modules/<name-of-your-module>` directory of the [syslog-ng repository](https://github.com/syslog-ng/syslog-ng/).
1. Add your files to the source tarball by listing them in the EXTRA_DIST variable of the `modules/python-modules/Makefile.am` file.
1. Run `make install` to install your module along the rest of the `syslog-ng` binaries.
1. Open a pull request.

### External dependencies

If your Python code depends on third-party libraries, those need to be installed on the system where your code is deployed. If your deployment mechanism is based on DEB or RPM packages, make sure that you add these OS-level dependencies to the packages generated.

- For DEB packages, add the dependency package to the `Depends` line.
- For RPM packages, add the dependency package as a `Requires` line to the `.spec` file.

If you want to use `pip/requirements.txt` to deploy dependencies, you can invoke pip during `make install` time so that syslog-ng's private Python directory would contain all the dependencies that you require.

### Adding Python code to the syslog-ng DEB package

To add your module to the syslog-ng DEB package, complete the following steps.

1. Create a new file in `packaging/debian/` called `syslog-ng-mod-<yourmodule>.install`.
1. Populate this file with wildcard patterns that capture the files of your package after installation. For example:

    ```
    usr/lib/syslog-ng/python/syslogng/modules/<yourmodule>/*
    ```

1. Add an entry to `packaging/debian/control`:

    ```yaml
    Package: syslog-ng-mod-<yourmodule>
    Architecture: any
    Multi-Arch: foreign
    Depends: ${shlibs:Depends}, ${misc:Depends}, syslog-ng-core (>= ${source:Version}), syslog-ng-core (<< ${source:Version}.1~), syslog-ng-mod-python
    Description: The short description of the package
      This is a longer description with dots separating paragraphs.
      .
      This package provides a collection of example plugins.
    ```

1. Add your `.install` file to the tarball by adding it to the `EXTRA_DIST` in the `Makefile.am`.

### Adding Python code to syslog-ng RPM packages

The RPM package is less modular than the Debian package and it automatically captures all Python modules in the `syslog-ng-python` package without having to list them explicitly.

If you need to customize the installation, you can find the spec file in `packaging/rhel/syslog-ng.spec` which is populated and copied to the root at tarball creation.
