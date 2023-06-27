---
title: "Tagging messages"
weight:  900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

You can label the messages with custom tags. Tags are simple labels, identified by their names, which must be unique. Currently {{% param "product.abbrev" %}} can tag a message at two different places:

  - at the source when the message is received, and

  - when the message matches a pattern in the pattern database. For details on using the pattern database, see {{% xref "/chapter-parsers/chapter-patterndb/configuring-pattern-databases/_index.md" %}}, for details on creating tags in the pattern database, see {{% xref "/chapter-parsers/chapter-patterndb/reference-parsers-pattern-databases/reference-patterndb-schemes/_index.md" %}}.

  - Tags can be also added and deleted using rewrite rules. For details, see {{% xref "/chapter-manipulating-messages/modifying-messages/rewrite-tags/_index.md" %}}.

When AxoSyslog receives a message, it automatically adds the `.source.<id_of_the_source_statement> tag to the message. Use the `tags()` option of the source to add custom tags, and the `tags()` option of the filters to select only specific messages.

  - Tagging messages and also filtering on the tags is very fast, much faster than other types of filters.

  - Tags are available locally, that is, if you add tags to a message on the client, these tags will not be available on the server.

  - To include the tags in the message, use the `${TAGS}` macro in a template. Alternatively, if you are using the IETF-syslog message format, you can include the `${TAGS}` macro in the `.SDATA.meta` part of the message. Note that the `${TAGS}` macro is available only in {{% param "product.abbrev" %}} 3.1.1 and later.

For an example on tagging, see [Example: Adding tags and filtering messages with tags]({{< relref "/chapter-routing-filters/filters/reference-filters/_index.md" >}}).
