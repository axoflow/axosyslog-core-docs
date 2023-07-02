---
title: "Shell-style globbing in the selector"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with in {{% param "product.abbrev" %}} 3.24 and later, you can use shell-style globbing ('\*' and '?' wildcards) in the selector.

To use globs in a selector

1.  Use the `glob()` option within the `selector()` option in your {{% param "product.abbrev" %}} configuration file, for example:
    
    ```shell
        parser p_add_context_data {
            add-contextual-data(
                selector(glob("${HOST}"))
                database("context-info-db.csv")
            );
        };
    ```

2.  Use globs and wildcards in the selector column of your CSV-file, for example:
    
    ```shell
        example-glob-entry1*,sourcetype,:hec:user
        example-glob-entry2*,sourcetype,:hec:user
        postfix*,sourcetype,:hec:mta
    
    ```

Note the following points when using globbing in the selector:

  - The order of the patterns depends on the CSV-file. The order of entries in the database determines the matching order.

  - The globs are matched against the expanded template string sequentially.

  - Put more specific patterns to the top of the CSV-file. The {{% param "product.abbrev" %}} appication does not evaluate other entries after the first match.

  - In debug mode, {{% param "product.abbrev" %}} sends log messages to its `internal()` destination to help troubleshooting. For example:
    
    ```shell
        [2019-09-21T06:01:10.748237] add-contextual-data(): Evaluating glob against message; glob-template='$PROGRAM', string='postfix/smtpd', pattern='example-glob-entry1*', matched='0'
        [2019-09-21T06:01:10.748562] add-contextual-data(): Evaluating glob against message; glob-template='$PROGRAM', string='postfix/smtpd', pattern='example-glob-entry2*', matched='0'
        [2019-09-21T06:01:10.748697] add-contextual-data(): Evaluating glob against message; glob-template='$PROGRAM', string='postfix/smtpd', pattern='postfix*', matched='1'
        [2019-09-21T06:01:10.750084] add-contextual-data(): message lookup finished; message='almafa', resolved_selector='postfix*', selector='postfix*', msg='0x8e15320'
    
    ```
