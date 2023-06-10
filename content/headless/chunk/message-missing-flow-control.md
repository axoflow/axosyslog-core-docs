---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Destination queue full

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Error message:</td>
<td>```c
Destination queue full, dropping messages; queue_len=&#39;10000&#39;, 
log_fifo_size=&#39;10000&#39;, count=&#39;4&#39;, 
persist_name=&#39;afsocket_dd_qfile(stream,serverdown:514)&#39; 
```</td>
</tr>
<tr class="even">
<td>Description:</td>
<td><p>This message indicates message loss.</p>
<p>Flow-control must be enabled in the log path. When flow-control is enabled, `syslog-ng` will stop reading messages from the sources of the log statement if the destinations are not able to process the messages at the required speed.</p>
<p>If flow-control is enabled, `syslog-ng` will only drop messages if the destination queues/window sizes are improperly sized.</p></td>
</tr>
<tr class="odd">
<td>Solution:</td>
<td><p>Enable flow-control in the log path.</p>
<p>If flow-control is disabled, `syslog-ng` will drop messages if the destination queues are full. Note that `syslog-ng` will drop messages even if the server is alive. If the remote server accepts logs at a slower rate than the sender `syslog-ng` receives them, the sender `syslog-ng` will fill up the destination queue, then drop the newer messages. Sometimes this error occurs only at a specific time interval, for example, only between<code>7:00</code>AM and<code>8:00</code>AM or between<code>16:00</code>PM and<code>17:00</code>PM when your users log in or log off and that generates a lot of messages within a short interval.</p>
<p>For more information, see {{% xref "/docs/chapter-routing-filters/concepts-flow-control/_index.md" %}}.</p></td>
</tr>
</tbody>
</table>

