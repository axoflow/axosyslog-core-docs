---
title: "python() and python-fetcher() source options"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `python()` and `python-fetcher()` drivers have the following options.

{{% include-headless "chunk/option-source-chain-hostnames.md" %}}


## class()

|          |        |
| -------- | ------ |
| Type:    | string |
| Default: | N/A    |

*Description:* The name of the Python class that implements the source, for example:

```shell
   python(
        class("MyPythonSource")
    );
```

If you want to store the Python code in an external Python file, the `class()` option must include the name of the Python file containing the class, without the path and the .py extension, for example:

```shell
   python(
        class("MyPythonfilename.MyPythonSource")
    );
```

For details, see {{% xref "/chapter-configuration-file/python-code-external-file/_index.md" %}}

{{% include-headless "chunk/option-source-default-facility.md" %}}

{{% include-headless "chunk/option-source-default-level-journal.md" %}}

{{% include-headless "chunk/option-source-default-priority.md" %}}

{{% include-headless "chunk/option-source-default-severity.md" %}}

{{% include-headless "chunk/option-source-dns-cache.md" %}}

## fetch-no-data-delay()

Available on `python-fetcher()` only.

|          |                     |
| -------- | ------------------- |
| Type:    | integer [seconds] |
| Default: | \-1 (disabled)      |

*Description:* If the `fetch` method of a `python-fetcher()` source returns with the `LogFetcher.FETCH_NO_DATA` constant, the source waits `fetch-no-data-delay()` seconds before calling the `fetch` method again. If you want to call the `fetch` method sooner, set the `fetch-no-data-delay()` option to the number of seconds to wait before calling the `fetch` method.

{{< include-headless "chunk/option-source-flags.md" >}}

For the `python()` and `python-fetcher()` sources you can also set the `check-hostname` flag, which is equivalent with the [`check-hostname()` global option]({{< relref "/chapter-global-options/reference-options/_index.md#global-option-check-hostname" >}}), but only applies to this source.

The flags and the hostname-related options (for example, `use-dns`) set in the configuration file influence the behavior of the `LogMessage.parse()` method of the Python source. They have no effect if you set the message or the hostname directly, without using `LogMessage.parse()`.

{{% include-headless "chunk/option-source-format.md" %}}

{{< include-headless "chunk/option-destination-hook.md" >}}

{{% include-headless "chunk/option-source-host-override.md" %}}

## imports() (DEPRECATED)

Obsolete alias for [`loaders()`](#loaders). When set, behaves identically to `loaders()`. Use `loaders()` instead.

{{% include-headless "chunk/option-source-internal.md" %}}

{{< include-headless "chunk/option-source-keep-hostname.md" >}}

{{% include-headless "chunk/option-source-keep-timestamp.md" %}}

{{% include-headless "chunk/option-source-log-iw-size.md" %}}

{{% include-headless "chunk/option-source-log-prefix.md" %}}

{{% include-headless "chunk/option-source-long-hostnames.md" %}}

{{% include-headless "chunk/option-python-loaders.md" %}}

{{% include-headless "chunk/option-source-normalize-hostnames.md" %}}

{{< include-headless "chunk/option-python-options.md" >}}


{{% include-headless "chunk/option-persist-name.md" %}}

{{< include-headless "wnt/note-python-persist-name.md" >}}


{{% include-headless "chunk/option-source-program-override.md" %}}

{{% include-headless "chunk/option-source-read-old-records.md" %}}

{{% include-headless "chunk/option-source-sdata-prefix.md" %}}

{{% include-headless "chunk/option-source-tags.md" %}}

{{% include-headless "chunk/option-source-time-reopen-py.md" %}}

Available in `python-fetcher()` only.

{{% include-headless "chunk/option-source-time-zone.md" %}}

{{% alert title="Warning" color="warning" %}}

This option is available only when using Python 3.

{{% /alert %}}

{{% include-headless "chunk/option-source-use-dns.md" %}}

{{% include-headless "chunk/option-source-use-fqdn.md" %}}

{{% include-headless "chunk/option-source-use-syslogng-pid.md" %}}
