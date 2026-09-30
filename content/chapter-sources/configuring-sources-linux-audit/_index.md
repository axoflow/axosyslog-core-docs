---
title: "linux-audit: Collect messages from Linux audit logs"
weight: 1370
driver: "linux-audit()"
short_description: "Collect messages from Linux audit logs"
aliases:
- /chapter-sources/configuring-sources-linux-audit/reference-source-linux-audit/
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

It reads and automatically parses the Linux audit logs. You can override the file name using the filename() parameter and the prefix for the created name-value pairs using the prefix() parameter. Any additional parameters are passed to the file source.

{{% alert title="Note" color="info" %}}

Most recent Linux distributions enable Security-Enhanced Linux (SELinux) or AppArmor as a security measure. If enabled, these technologies might disable access to the Linux Audit log file by default. Consult their manuals to enable Linux Audit log access for {{% param "product.abbrev" %}}.

{{% /alert %}}

## Prerequisites

{{< include-headless "chunk/prereq-package-scl.md" >}}

## Declaration

```shell
   linux-audit(options);
```

## Example: Using the linux-audit() driver {#example-source-linux-audit}

```shell
source s_auditd {
    linux-audit(
        prefix("test.")
        hook-commands(
            startup("auditctl -w /etc/ -p wa")
            shutdown("auditctl -W /etc/ -p wa")
        )
    );
};
            
```

## linux-audit() source options

The `linux-audit()` driver has the following options:

## filename() {#linux-audit-filename}

|          |      |
| -------- | ---- |
| Type:    | path |
| Default: |      |

*Description:* The log file of `linux-audit`. The {{% param "product.abbrev" %}} application reads the Linux audit logs from this file.

## prefix()

|           |          |
| --------- | -------- |
| Synopsis: | prefix() |
| Default:  | .auditd. |

*Description:* Insert a prefix before the name part of the parsed name-value pairs to help further processing. For example:

- To insert the `my-parsed-data.` prefix, use the `prefix(my-parsed-data.)` option.
- To refer to a particular data that has a prefix, use the prefix in the name of the macro, for example, `${my-parsed-data.name}`.
- If you forward the parsed messages using the IETF-syslog protocol, you can insert all the parsed data into the SDATA part of the message using the `prefix(.SDATA.my-parsed-data.)` option.

Names starting with a dot (for example, `.example`) are reserved for use by {{% param "product.abbrev" %}}. Note that if you use an empty prefix (`prefix("")`) or one starting with a dot, {{% param "product.abbrev" %}} might replace the original value of an existing macro (note that only soft macros can be overwritten, see {{% xref "/chapter-manipulating-messages/customizing-message-format/macros-hard-vs-soft/_index.md" %}} for details). To avoid such problems, use a prefix when naming the parsed values, for example, `prefix(my-parsed-data.)`
