---
title: "Rewrite the timezone of a message"
weight:  2700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with version {{% conditional-text include-if="pe" %}}7.0.18{{% /conditional-text %}}{{% conditional-text include-if="ose" %}}3.24{{% /conditional-text %}} of the {{% productparam "name" %}} ({{% productparam "abbrev" %}}) application, you can manipulate the timezone information of messages using rewrite rules. You can:

  - [Set a timezone](#rewrite-timezone-set) to a specific value

  - [Fix a timezone](#rewrite-timezone-fix) if it was improperly parsed

  - Assuming the sender is sending messages in near-real-time, {{% productparam "abbrev" %}} can [guess the timezone](#rewrite-timezone-guess)

By default, these operations modify the date-related macros of the message that correspond to the date the message was sent (that is, the S_ macros). You can modify the dates when {{% productparam "abbrev" %}} has received the messages (that is, the R_ macros), but this is rarely needed. To do so, include the `time-stamp(recvd)` option in the operation, for example:

```c

    rewrite { fix-time-zone("EST5EDT" time-stamp(recvd)); };

```


## {#rewrite-timezone-fix}

Use the `fix-time-zone()` operation to correct the timezone of a message if it was parsed incorrectly for some reason, or if the client did not include any timezone information in the message. You can specify the new timezone as the name of a timezone, or as a template string. For example, use the following rewrite rule to set the timezone to EST5EDT:

```c

    rewrite { fix-time-zone("EST5EDT"); };

```

If you have lots of clients that do not send timezone information in the log messages, you can create a database file that stores the timezone of the clients, and feed this data to {{% productparam "abbrev" %}} using the `add-contextual-data()` feature. For details, see {{% xref "/docs/chapter-enrich-data/data-enrichment-add-contextual-data/_index.md" %}}.



## {#rewrite-timezone-guess}

Use the `guess-time-zone()` operation attempts to set the timezone of the message automatically, using heuristics on the timestamps. Normally the {{% productparam "abbrev" %}} application performs this operation automatically when it parses the incoming message. Using this operation in a rewrite rule can be useful if you cannot parse the incoming message for some reason (and use the **flags(no-parse)** option in your source, but you want to set the timezone automatically later (for example, after you have preprocessed the message).

Using this operation is identical to using the `flags(guess-timezone)` flag in the source.



## {#rewrite-timezone-set}

Use the `set-time-zone()` operation to set the timezone of the message to a specific value, that is to convert an existing timezone to a different one. This operation is identical to setting the `time-zone()` option in a destination or as a global option, but can be applied selectively to the messages using conditions.

