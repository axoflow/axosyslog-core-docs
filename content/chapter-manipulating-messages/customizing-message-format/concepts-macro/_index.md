---
title: "Formatting messages, filenames, directories, and tablenames"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The {{% param "product.abbrev" %}} application can dynamically create filenames, directories, or names of database tables using macros that help you organize your log messages. Macros refer to a property or a part of the log message, for example, the `${HOST}` macro refers to the name or IP address of the client that sent the log message, while `${DAY}` is the day of the month when the message was received. Using these macros in the path of the destination log files allows you for example, to collect the logs of every host into separate files for every day.

A set of macros can be defined as a template object and used in multiple destinations.

Another use of macros and templates is to customize the format of the syslog message, for example, to add elements of the message header to the message text.

{{< include-headless "wnt/note-formatting-messages.md" >}}

  - For details on using templates and macros, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/configuring-macros/_index.md" %}}.

  - For a list and description of the macros available in {{% param "product.abbrev" %}}, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/reference-macros/_index.md" %}}.

  - For details on using custom macros created with CSV parsers and pattern databases, see {{% xref "/docs/chapter-parsers/_index.md" %}} and {{% xref "/docs/chapter-parsers/chapter-patterndb/configuring-pattern-databases/patterndb-filters/_index.md" %}}, respectively.
