---
title: "Python LogMessage API"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The LogMessage API allows you to create LogMessage objects in Python sources, parse syslog messages, and set the various fields of the log message.


## LogMessage() method: Create log message objects

You can use the **LogMessage()** method to create a structured log message instance. For example:

```c
   from syslogng import LogMessage
    
    msg = LogMessage() # Initialize an empty message with default values (recvd timestamp, rcptid, hostid, ...)
    msg = LogMessage("string or bytes-like object") # Initialize a message and set its ${MESSAGE} field to the specified argument

```

You can also explicitly set the different values of the log message. For example:

```c
   msg["MESSAGE"] = "message"
    msg["HOST"] = "hostname"

```

You can set certain special field (timestamp, priority) by using specific methods.

Note the following points when creating a log message:

  - When setting the hostname, {{% param "product.abbrev" %}} takes the following hostname-related options of the configuration into account: `chain-hostnames()`, `keep-hostname()`, `use-dns()`, and `use-fqdn()`.

  - Python sources ignore the `log-msg-size()` option.

  - The {{% param "product.abbrev" %}} application accepts only one message from every `LogSource::post_message()` or `fetch()` call, batching is currently not supported. If your Python code accepts batches of messages, you must pass them to {{% param "product.abbrev" %}} one-by-one. Similarly, if you need to split messages in the source, you must do so in your Python code, and pass the messages separately.

  - Do not reuse or store LogMessage objects after posting (calling `post_message()`) or returning the message from `fetch()`.



## parse() method: Parse syslog messages

The `parse()` method allows you to parse incoming messages as syslog messages. By default, the `parse()` method attempts to parse the message as an IETF-syslog (RFC5424) log message. If that fails, it parses the log message as a BSD-syslog (RFC3164) log message. Note that {{% param "product.abbrev" %}} takes the parsing-related options of the configuration into account: `flags()`, `keep-hostname()`, `recv-time-zone()`.

If `keep-hostname()` is set to **no**, {{% param "product.abbrev" %}} ignores the hostname set in the message, and uses the IP address of the {{% param "product.abbrev" %}} host as the hostname (to use the hostname instead of the IP address, set the `use-dns()` or `use-fqdn()` options in the Python source).

```c
   msg_ietf = LogMessage.parse('<165>1 2003-10-11T22:14:15.003Z mymachine.example.com evntslog - ID47 [exampleSDID@32473 iut="3" eventSource="Application" eventID="1011"] An application event log entry', self.parse_options)
    msg_bsd = LogMessage.parse('<34>Oct 11 22:14:15 mymachine su: \'su root\' failed for lonvick on /dev/pts/8', self.parse_options)

```



## set_pri() method

You can set the priority of the message with the `set_pri()` method.

```c
   msg.set_pri(165)

```



## set_timestamp() method

You can use the `set_timestamp()` method to set the date and time of the log message.

```c
   timestamp = datetime.fromisoformat("2018-09-11T14:49:02.100+02:00")
    msg.set_timestamp(timestamp) # datetime object, includes timezone information

```

In Python 2, timezone information cannot be attached to the datetime instance without using an external library. The {{% param "product.abbrev" %}} represents naive datetime objects in UTC.

In Python 3, naive and timezone-aware datetime objects are both supported.

