---
title: "Global objects"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `syslog-ng` application uses the following objects:

  - *Source driver*: A communication method used to receive log messages. For example, `syslog-ng` can receive messages from a remote host via TCP/IP, or read the messages of a local application from a file. For details on source drivers, see {{% xref "/docs/chapter-sources/_index.md" %}}.

  - *Source*: A named collection of configured source drivers.

  - *Destination driver*: A communication method used to send log messages. For example, `syslog-ng` can send messages to a remote host via TCP/IP, or write the messages into a file or database. For details on destination drivers, see {{% xref "/docs/chapter-destinations/_index.md" %}}.

  - *Destination*: A named collection of configured destination drivers.

  - *Filter*: An expression to select messages. For example, a simple filter can select the messages received from a specific host. For details, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/_index.md" %}}.

  - *Macro*: An identifier that refers to a part of the log message. For example, the `${HOST}` macro returns the name of the host that sent the message. Macros are often used in templates and filenames. For details, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/_index.md" %}}.

  - *Parser*: Parsers are objects that parse the incoming messages, or parts of a message. For example, the `csv-parser()` can segment messages into separate columns at a predefined separator character (for example, a comma). Every column has a unique name that can be used as a macro. For details, see {{% xref "/docs/chapter-parsers/_index.md" %}} and {{% xref "/docs/chapter-parsers/chapter-patterndb/_index.md" %}}.

  - *Rewrite rule*: A rule modifies a part of the message, for example, replaces a string, or sets a field to a specified value. For details, see {{% xref "/docs/chapter-manipulating-messages/modifying-messages/_index.md" %}}.

  - *Log paths*: A combination of sources, destinations, and other objects like filters, parsers, and rewrite rules. The `syslog-ng` application sends messages arriving from the sources of the log paths to the defined destinations, and performs filtering, parsing, and rewriting of the messages. Log paths are also called log statements. Log statements can include other (embedded) log statements and junctions to create complex log paths. For details, see {{% xref "/docs/chapter-routing-filters/_index.md" %}}.

  - *Template*: A template is a set of macros that can be used to restructure log messages or automatically generate file names. For example, a template can add the hostname and the date to the beginning of every log message. For details, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/_index.md" %}}.

  - *Option*: Options set global parameters of `syslog-ng`, like the parameters of name resolution and timezone handling. For details, see {{% xref "/docs/chapter-global-options/_index.md" %}}.

For details on the above objects, see {{% xref "/docs/chapter-configuration-file/configuration-syntax/_index.md" %}}.
