---
title: "system: Collecting the system-specific log messages of a platform"
weight:  4100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Starting with version 3.2, {{% param "product.abbrev" %}} can automatically collect the system-specific log messages of the host on a number of platforms using the <code>system()</code> driver. If the <code>system()</code> driver is included in the {{% param "product.abbrev" %}} configuration file, {{% param "product.abbrev" %}} automatically adds the following sources to the {{% param "product.abbrev" %}} configuration.

{{% alert title="Note" color="info" %}}

{{% param "product.abbrev" %}} versions 3.2-3.3 used an external script to generate the <code>system()</code> source, but this was problematic in certain situations, for example, when the host used a strict AppArmor profile. Therefore, the <code>system()</code> source is now generated internally in {{% param "product.abbrev" %}}.

{{% /alert %}}

The <code>system()</code> driver is also used in the default configuration file of {{% param "product.abbrev" %}}. For details on the default configuration file, see [Example: The default configuration file of [%=General.OSE%]]({{< relref "/docs/chapter-quickstart/configure-clients/_index.md" >}}). Starting with {{% param "product.abbrev" %}} version 3.6, you can use the <code>system-expand</code> command-line utility (which is a shell script, located in the <code>modules/system-source/</code> directory) to display the configuration that the <code>system()</code> source will use.

{{% alert title="Warning" color="warning" %}}

If {{% param "product.abbrev" %}} does not recognize the platform it is installed on, it does not add any sources.

{{% /alert %}}

Starting with version 3.6, {{% param "product.abbrev" %}} parses messages complying with the [Splunk Common Information Model (CIM)](http://docs.splunk.com/Documentation/CIM/latest/User/Overview) and marked with <code>@cim</code> as JSON messages (for example, the ulogd from the netfilter project can emit such messages). That way, you can forward such messages without losing any information to CIM-aware applications (for example, Splunk).

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
<td><code>
unix-dgram(&quot;/dev/log&quot;);
</code></td>
</tr>
<tr class="even">
<td>FreeBSD</td>
<td><code>
unix-dgram(&quot;/var/run/log&quot;);
</code>
<code>
unix-dgram(&quot;/var/run/logpriv&quot; perm(0600));
</code>
<code>
file(&quot;/dev/klog&quot; follow-freq(0) program-override(&quot;kernel&quot;) flags(no-parse));
</code>
<p>For FreeBSD versions earlier than 9.1, <code>follow-freq(1)</code> is used.</p></td>
</tr>
<tr class="odd">
<td>GNU/kFreeBSD</td>
<td><code>
unix-dgram(&quot;/var/run/log&quot;);
</code>
<code>
file(&quot;/dev/klog&quot; follow-freq(0) program-override(&quot;kernel&quot;));
</code></td>
</tr>
<tr class="even">
<td>HP-UX</td>
<td><code>
pipe(&quot;/dev/log&quot; pad-size(2048));
</code></td>
</tr>
<tr class="odd">
<td>Linux</td>
<td><code>
unix-dgram(&quot;/dev/log&quot;);
</code>
<code>
file(&quot;/proc/kmsg&quot; program-override(&quot;kernel&quot;) flags(kernel));
</code>
<p>Note that on Linux, the <code>so-rcvbuf()</code> option of the <code>system()</code> source is automatically set to 8192.</p>
<p>If the host is running under systemd, {{% param "product.abbrev" %}} reads directly from the systemd journal file using the <code>systemd-journal()</code> source.</p>
<p>If the kernel of the host is version 3.5 or newer, and <code>/dev/kmsg</code> is seekable, {{% param "product.abbrev" %}} will use that instead of <code>/proc/kmsg</code>, using the <code>multi-line-mode(indented)</code>, <code>keep-timestamp(no)</code>, and the <code>format(linux-kmsg)</code> options.</p>
<p>If {{% param "product.abbrev" %}} is running in a jail or a Linux Container (LXC), it will not read from the <code>/dev/kmsg</code> or <code>/proc/kmsg</code> files.</p></td>
</tr>
<tr class="even">
<td>macOS</td>
<td><code>
file(&quot;/var/log/system.log&quot; follow-freq(1));
</code>
{{< include-headless "wnt/note-solaris-msgid.md" >}}</td>
</tr>
<tr class="odd">
<td>NetBSD</td>
<td><code>
unix-dgram(&quot;/var/run/log&quot;);
</code>
{{< include-headless "wnt/note-solaris-msgid.md" >}}</td>
</tr>
<tr class="even">
<td>Solaris 8</td>
<td><code>
sun-streams(&quot;/dev/log&quot;);
</code>
{{< include-headless "wnt/note-solaris-msgid.md" >}}</td>
</tr>
<tr class="odd">
<td>Solaris 9</td>
<td><code>
sun-streams(&quot;/dev/log&quot; door(&quot;/etc/.syslog_door&quot;));
</code>
{{< include-headless "wnt/note-solaris-msgid.md" >}}</td>
</tr>
<tr class="even">
<td>Solaris 10</td>
<td><code>
sun-streams(&quot;/dev/log&quot; door(&quot;/var/run/syslog_door&quot;));
</code>
{{< include-headless "wnt/note-solaris-msgid.md" >}}</td>
</tr>
</tbody>
</table>
