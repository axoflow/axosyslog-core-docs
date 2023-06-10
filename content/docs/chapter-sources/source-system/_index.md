---
title: "system: Collecting the system-specific log messages of a platform"
weight:  4100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with version 3.2, {{% param "product.abbrev" %}} can automatically collect the system-specific log messages of the host on a number of platforms using the `system()` driver. If the `system()` driver is included in the {{% param "product.abbrev" %}} configuration file, {{% param "product.abbrev" %}} automatically adds the following sources to the {{% param "product.abbrev" %}} configuration.

{{% alert title="Note" color="info" %}}

{{% param "product.abbrev" %}} versions 3.2-3.3 used an external script to generate the `system()` source, but this was problematic in certain situations, for example, when the host used a strict AppArmor profile. Therefore, the `system()` source is now generated internally in {{% param "product.abbrev" %}}.

{{% /alert %}}

The `system()` driver is also used in the default configuration file of {{% param "product.abbrev" %}}. For details on the default configuration file, see [Example: The default configuration file of [%=General.OSE%]]({{< relref "/docs/chapter-quickstart/configure-clients/_index.md" >}}). Starting with {{% param "product.abbrev" %}} version 3.6, you can use the `system-expand` command-line utility (which is a shell script, located in the `modules/system-source/` directory) to display the configuration that the `system()` source will use.

{{% alert title="Warning" color="warning" %}}

If {{% param "product.abbrev" %}} does not recognize the platform it is installed on, it does not add any sources.

{{% /alert %}}

Starting with version 3.6, {{% param "product.abbrev" %}} parses messages complying with the [Splunk Common Information Model (CIM)](http://docs.splunk.com/Documentation/CIM/latest/User/Overview) and marked with `@cim` as JSON messages (for example, the ulogd from the netfilter project can emit such messages). That way, you can forward such messages without losing any information to CIM-aware applications (for example, Splunk).

<table>
<caption>Sources automatically added by {{% param "product.name" %}}</caption>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Platform</th>
<th>Message source</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>AIX</td>
<td>```c
unix-dgram(&quot;/dev/log&quot;);
```</td>
</tr>
<tr class="even">
<td>FreeBSD</td>
<td>```c
unix-dgram(&quot;/var/run/log&quot;);
```
```c
unix-dgram(&quot;/var/run/logpriv&quot; perm(0600));
```
```c
file(&quot;/dev/klog&quot; follow-freq(0) program-override(&quot;kernel&quot;) flags(no-parse));
```
<p>For FreeBSD versions earlier than 9.1, `follow-freq(1)` is used.</p></td>
</tr>
<tr class="odd">
<td>GNU/kFreeBSD</td>
<td>```c
unix-dgram(&quot;/var/run/log&quot;);
```
```c
file(&quot;/dev/klog&quot; follow-freq(0) program-override(&quot;kernel&quot;));
```</td>
</tr>
<tr class="even">
<td>HP-UX</td>
<td>```c
pipe(&quot;/dev/log&quot; pad-size(2048));
```</td>
</tr>
<tr class="odd">
<td>Linux</td>
<td>```c
unix-dgram(&quot;/dev/log&quot;);
```
```c
file(&quot;/proc/kmsg&quot; program-override(&quot;kernel&quot;) flags(kernel));
```
<p>Note that on Linux, the `so-rcvbuf()` option of the `system()` source is automatically set to 8192.</p>
<p>If the host is running under systemd, {{% param "product.abbrev" %}} reads directly from the systemd journal file using the `systemd-journal()` source.</p>
<p>If the kernel of the host is version 3.5 or newer, and `/dev/kmsg` is seekable, {{% param "product.abbrev" %}} will use that instead of `/proc/kmsg`, using the `multi-line-mode(indented)`, `keep-timestamp(no)`, and the `format(linux-kmsg)` options.</p>
<p>If {{% param "product.abbrev" %}} is running in a jail or a Linux Container (LXC), it will not read from the `/dev/kmsg` or `/proc/kmsg` files.</p></td>
</tr>
<tr class="even">
<td>macOS</td>
<td>```c
file(&quot;/var/log/system.log&quot; follow-freq(1));
```
{{% include-headless "wnt/note-solaris-msgid.md" %}}</td>
</tr>
<tr class="odd">
<td>NetBSD</td>
<td>```c
unix-dgram(&quot;/var/run/log&quot;);
```
{{% include-headless "wnt/note-solaris-msgid.md" %}}</td>
</tr>
<tr class="even">
<td>Solaris 8</td>
<td>```c
sun-streams(&quot;/dev/log&quot;);
```
{{% include-headless "wnt/note-solaris-msgid.md" %}}</td>
</tr>
<tr class="odd">
<td>Solaris 9</td>
<td>```c
sun-streams(&quot;/dev/log&quot; door(&quot;/etc/.syslog_door&quot;));
```
{{% include-headless "wnt/note-solaris-msgid.md" %}}</td>
</tr>
<tr class="even">
<td>Solaris 10</td>
<td>```c
sun-streams(&quot;/dev/log&quot; door(&quot;/var/run/syslog_door&quot;));
```
{{% include-headless "wnt/note-solaris-msgid.md" %}}</td>
</tr>
</tbody>
</table>
