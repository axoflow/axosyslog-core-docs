---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Example: Using junctions

For example, suppose that you have a single network source that receives log messages from different devices, and some devices send messages that are not RFC-compliant (some routers are notorious for that). To solve this problem in earlier versions of {{% productparam "abbrev" %}}, you had to create two different network sources using different IP addresses or ports: one that received the RFC-compliant messages, and one that received the improperly formatted messages (for example, using the **flags(no-parse)** option). Using junctions this becomes much more simple: you can use a single network source to receive every message, then use a junction and two channels. The first channel processes the RFC-compliant messages, the second everything else. At the end, every message is stored in a single file. The filters used in the example can be `host()` filters (if you have a list of the IP addresses of the devices sending non-compliant messages), but that depends on your environment.

```c

    log {
        source {
            syslog(
                ip(10.1.2.3)
                transport("tcp")
                flags(no-parse)
            );
        };
        junction {
            channel {
                filter(f_compliant_hosts);
                parser {
                    syslog-parser();
                };
            };
            channel {
                filter(f_noncompliant_hosts);
            };
        };
        destination {
            file("/var/log/messages");
        };
    };

```

Since every channel receives every message that reaches the junction, use the **flags(final)** option in the channels to avoid the unnecessary processing the messages multiple times:

```c

    log {
        source {
            syslog(
                ip(10.1.2.3)
                transport("tcp")
                flags(no-parse)
            );
        };
        junction {
            channel {
                filter(f_compliant_hosts);
                parser {
                    syslog-parser();
                };
                flags(final);
            };
            channel {
                filter(f_noncompliant_hosts);
                flags(final);
            };
        };
        destination {
            file("/var/log/messages");
        };
    };

``` {{% alert title="Note" color="info" %}}

{{% productparam "abbrev" %}} has several parsers that you can use to parse non-compliant messages. You can even [write a custom syslog-ng parser in Python]({{< relref "/docs/chapter-parsers/python-parser/_index.md" >}}). For details, see {{% xref "/docs/chapter-parsers/_index.md" %}}.

{{% /alert %}}

