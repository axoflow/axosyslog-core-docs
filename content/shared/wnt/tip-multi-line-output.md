---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
{{% alert title="Note" color="info" %}}

To format multi-line messages to your individual needs, consider the following:

  - To make multi-line messages more readable when written to a file, use a template in the destination and instead of the `${MESSAGE}` macro, use the following: **$(indent-multi-line ${MESSAGE})**. This expression inserts a tab after every newline character (except when a tab is already present), indenting every line of the message after the first. For example:
    
    ```c
    
        destination d_file {
            file ("/var/log/messages"
                template("${ISODATE} ${HOST} $(indent-multi-line ${MESSAGE})\n")
            );
        };
    
    ```
    
    For details on using templates, see {{% xref "/docs/chapter-manipulating-messages/customizing-message-format/configuring-macros/_index.md" %}}.

  - To actually convert the lines of multi-line messages to single line (by replacing the newline characters with whitespaces), use the **flags(no-multi-line)** option in the source.

{{% /alert %}}
