---
title: "The structure of the pattern database"
weight:  4900
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The pattern database is organized as follows:

![](../Images/Figures/fig-patterndb-structure.png)

  - The pattern database consists of rulesets. A ruleset consists of a Program Pattern and a set of rules: the rules of a ruleset are applied to log messages if the name of the application that sent the message matches the Program Pattern of the ruleset. The name of the application (the content of the ${PROGRAM} macro) is compared to the Program Patterns of the available rulesets, and then the rules of the matching rulesets are applied to the message. (If the content of the ${PROGRAM} macro is not the proper name of the application, you can use the `program-template()` option to specify it.)

  - The Program Pattern can be a string that specifies the name of the application or the beginning of its name (for example, to match for sendmail, the program pattern can be sendmail, or just send), and the Program Pattern can contain pattern parsers. Note that pattern parsers are completely independent from the syslog-ng parsers used to segment messages. Additionally, every rule has a unique identifier: if a message matches a rule, the identifier of the rule is stored together with the message.

  - Rules consist of a message pattern and a class. The Message Pattern is similar to the Program Pattern, but is applied to the message part of the log message (the content of the ${MESSAGE} macro). If a message pattern matches the message, the class of the rule is assigned to the message (for example, Security, Violation, and so on).

  - Rules can also contain additional information about the matching messages, such as the description of the rule, an URL, name-value pairs, or free-form tags.{{% conditional-text include-if="ssb" %}} This information is displayed by the {{% productparam "name" %}} in the email alerts (if alerts are requested for the rule), and are also displayed on the search interface.{{% /conditional-text %}}

  - Patterns can consist of literals (keywords, or rather, keycharacters) and pattern parsers.
    
    {{% alert title="Note" color="info" %}}
    
    If the ${PROGRAM} part of a message is empty, rules with an empty Program Pattern are used to classify the message.
    
    If the same Program Pattern is used in multiple rulesets, the rules of these rulesets are merged, and every rule is used to classify the message. Note that message patterns must be unique within the merged rulesets, but the currently only one ruleset is checked for uniqueness.
    
    If the content of the ${PROGRAM} macro is not the proper name of the application, you can use the `program-template()` option to specify it.
    
    {{% /alert %}}
