---
title: "python() and python-fetcher() source options"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The `python()` and `python-fetcher()` drivers have the following options.


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



## fetch-no-data-delay()

|          |                     |
| -------- | ------------------- |
| Type:    | integer [seconds] |
| Default: | \-1 (disabled)      |

*Description:* If the `fetch` method of a `python-fetcher()` source returns with the `LogFetcher.FETCH_NO_DATA` constant, the source waits `fetch-no-data-delay()` seconds before calling the `fetch` method again. If you want to call the `fetch` method sooner, set the `fetch-no-data-delay()` option to the number of seconds to wait before calling the `fetch` method.



{{< include-headless "chunk/option-source-flags.md" >}}

The flags and the hostname-related options (for example, `use-dns`) set in the configuration file influence the behavior of the `LogMessage.parse()` method of the Python source. They have no effect if you set the message or the hostname directly, without using `LogMessage.parse()`.


{{< include-headless "chunk/option-source-keep-hostname.md" >}}

{{% include-headless "chunk/option-source-log-iw-size.md" %}}

{{% include-headless "chunk/option-python-loaders.md" %}}

{{< include-headless "chunk/option-python-options.md" >}}


{{% include-headless "chunk/option-persist-name.md" %}}

{{< include-headless "wnt/note-python-persist-name.md" >}}


{{% include-headless "chunk/option-source-tags.md" %}}

{{% include-headless "chunk/option-source-time-reopen-py.md" %}}


{{% include-headless "chunk/option-source-time-zone.md" %}}

{{% alert title="Warning" color="warning" %}}

This option is available only when using Python 3.

{{% /alert %}}

