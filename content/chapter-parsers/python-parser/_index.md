---
title: "Python parser"
weight: 1700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The Python log parser (available in {{% param "product.abbrev" %}} version 3.10 and later) allows you to write your own parser in Python. Practically, that way you can process the log message (or parts of the log message) any way you need. For example, you can import external Python modules to process the messages, query databases to enrich the messages with additional data, and many other things.

{{< include-headless "chunk/python-blocks.md" >}}

## Declaration:

Python parsers consist of two parts. The first is a {{% param "product.abbrev" %}} parser object that you use in your {{% param "product.abbrev" %}} configuration, for example, in the log path. This parser references a Python class, which is the second part of the Python parsers. The Python class processes the log messages it receives, and can do virtually anything that you can code in Python.

```shell
   parser <name_of_the_python_parser>{
        python(
            class("<name_of_the_python_class_executed_by_the_parser>")
        );
    };
    
    python {
    class MyParser(object):
        def init(self, options):
            '''Optional. This method is executed when syslog-ng is started or reloaded.'''
            return True
        def deinit(self):
            '''Optional. This method is executed when syslog-ng is stopped or reloaded.'''
            pass
        def parse(self, msg):
            '''Required. This method receives and processes the log message.'''
            return True
    };
```



## Methods of the python() parser {#python-parser-methods}


## The init (self, options) method (optional)

The {{% param "product.abbrev" %}} application initializes Python objects only when it is started or reloaded. That means it keeps the state of internal variables while {{% param "product.abbrev" %}} is running. The `init` method is executed as part of the initialization. You can perform any initialization steps that are necessary for your parser to work. For example, if you want to perform a lookup from a file or a database, you can open the file or connect to the database here, or you can initialize a counter that you will increase in the `parse()` method.

The return value of the `init()` method must be `True`. If it returns `False`, or raises an exception, {{% param "product.abbrev" %}} will not start.

`options`: This optional argument contains the contents of the `options()` parameter of the parser object as a Python dict.

```shell
   parser my_python_parser{
        python(
            class("MyParser")
            options("regex", "seq: (?P<seq>\\d+), thread: (?P<thread>\\d+), runid: (?P<runid>\\d+), stamp: (?P<stamp>[^ ]+) (?P<padding>.*$)")
        );
    };
    class MyParser(object):
        def init(self, options):
            pattern = options["regex"]
            self.regex = re.compile(pattern)
            self.counter = 0
            return True
```



## The parse(self, log_message) method

The `parse()` method processes the log messages it receives, and can do virtually anything that you can code in Python. This method is required, otherwise {{% param "product.abbrev" %}} will not start.

The return value of the `parse()` method must be `True`. If it returns `False`, or raises an exception, {{% param "product.abbrev" %}} will drop the message.

{{% include-headless "chunk/python-blocks-nvpairs.md" %}}



## The deinit(self) method (optional)

This method is executed when {{% param "product.abbrev" %}} is stopped or reloaded.

{{< include-headless "wnt/warning-python-parser-deinit.md" >}}

## Example: Parse loggen logs {#python-parser-example}

The following sample code parses the messages of the `loggen` tool (for details, see {{% xref "/app-man-syslog-ng/loggen.1.md" %}}). The following is a sample loggen message:

```shell
   <38>2017-04-05T12:16:46 localhost prg00000[1234]: seq: 0000000000, thread: 0000, runid: 1491387406, stamp: 2017-04-05T12:16:46 PADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADD
```

The {{% param "product.abbrev" %}} parser object references the LoggenParser class and passes a set of regular expressions to parse the loggen messages. The `init()` method of the LoggenParser class compiles these expressions into a pattern. The `parse` method uses these patterns to extract the fields of the message into name-value pairs. The destination template of the {{% param "product.abbrev" %}} log statement uses the extracted fields to format the output message.

```shell
   @version: {{% param "product.configversion" %}}
    @include "scl.conf"
    parser my_python_parser{
        python(
            class("LoggenParser")
            options("regex", "seq: (?P<seq>\\d+), thread: (?P<thread>\\d+), runid: (?P<runid>\\d+), stamp: (?P<stamp>[^ ]+) (?P<padding>.*$)")
        );
    };
    log {
        source { tcp(port(5555)); };
        parser(my_python_parser);
        destination {
            file("/tmp/regexparser.log.txt" template("seq: $seq thread: $thread runid: $runid stamp: $stamp my_counter: $MY_COUNTER"));
        };
    };
    python {
    import re
    class LoggenParser(object):
        def init(self, options):
            pattern = options["regex"]
            self.regex = re.compile(pattern)
            self.counter = 0
            return True
        def deinit(self):
            pass
        def parse(self, log_message):
            match = self.regex.match(log_message['MESSAGE'])
            if match:
                for key, value in match.groupdict().items():
                    log_message[key] = value
                log_message['MY_COUNTER'] = self.counter
                self.counter += 1
                return True
            return False
    };
```



## Example: Parse Windows eventlogs in Python - performance {#python-parser-example-windows-logs}

The following example uses regular expressions to process Windows log messages received in XML format. The parser extracts different fields from messages received from the Security and the Application eventlog containers. Using the following configuration file, {{% param "product.abbrev" %}} could process about 25000 real-life Windows log messages per second.

```shell
   @version: {{% param "product.configversion" %}}
    options {
        keep-hostname(yes);
        keep-timestamp(no);
        stats-level(2);
        use-dns(no);
    };
    source s_network_aa5fdf25c39d4017a8e504cdb641b477 {
        network(
            flags(no-parse)
            ip(0.0.0.0)
            log-fetch-limit(1000)
            log-iw-size(100000)
            max-connections(100)
            port(514)
        );
    };
    parser p_python_parser_79c31da44bb64de6b5de84be4ae15a15 {
        python(options("regex_for_security", ".* Security ID:  (?P<security_id>\\S+)   Account Name:  (?P<account_name>\\S+)   Account Domain:  (?P<account_domain>\\S+)   Logon ID:  (?P<logon_id>\\S+).*Process Name: (?P<process_name>\\S+).*EventID (?P<event_id>\\d+)", "regex_others", "(.*)EventID (?P<event_id>\\d+)")
    class("EventlogParser"));
    };
    destination d_file_78363e1dd90c4ebcbb0ee1eff5a2e310 {
        file(
            "/var/testdb_working_dir/fcd713a2-d48e-4025-9192-ec4a9852cafa.$HOST"
            flush-lines(1000)
            log-fifo-size(200000)
        );
    };
    log {
        source(s_network_aa5fdf25c39d4017a8e504cdb641b477);
        parser(p_python_parser_79c31da44bb64de6b5de84be4ae15a15);
        destination(d_file_78363e1dd90c4ebcbb0ee1eff5a2e310);
        flags(flow-control);
    };
    
    python {
    import re
    class EventlogParser(object):
        def init(self, options):
            self.regex_security = re.compile(options["regex_for_security"])
            self.regex_others = re.compile(options["regex_others"])
            return True
        def deinit(self):
            pass
        def parse(self, log_message):
            security_match = self.regex_security.match(log_message['MESSAGE'])
            if security_match:
                for key, value in security_match.groupdict().items():
                    log_message[key] = value
            else:
                others_match = self.regex_others.match(log_message['MESSAGE'])
                if others_match:
                    for key, value in others_match.groupdict().items():
                        log_message[key] = value
            return True
    };
```

