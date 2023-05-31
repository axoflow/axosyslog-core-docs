---
title: "Possible error messages you may encounter while using the mqtt() destination"
linktitle: "Possible error messages"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

While using the <code>mqtt()</code> destination, you may encounter issues and corresponding error messages originating from the MQTT system. The following table contains the error messages you may encounter, the possible reasons behind them, and potential workaround methods.


<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Complete error message</th>
<th>Possible reason(s)</th>
<th>Possible solution(s)</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>ERROR, while init threaded dest.</code></td>
<td><p>The {{% param "product.abbrev" %}} application will not start.</p></td>
<td><p>You can try the following methods:</p>
<ul>
<li><p>Restart {{% param "product.abbrev" %}}.</p></li>
<li><p>Stop some of the programs running on your computer.</p></li>
<li><p>Restart your computer, and then restart {{% param "product.abbrev" %}}.</p></li>
</ul></td>
</tr>
<tr class="even">
<td><code>mqtt: the topic() argument is required for mqtt destinations.</code></td>
<td><p>The <code>topic()</code> option is not set in your configuration. The {{% param "product.abbrev" %}} application will not start.</p></td>
<td><p>Set the missing <code>topic()</code> option in your configuration, then restart .</p></td>
</tr>
<tr class="odd">
<td><code>The mqtt destination does not support the batching of messages, ... </code></td>
<td><p>Your configuration may contain the <code>batch-timeout()</code> and / or <code>batch-lines()</code> options, which are not supported by the <code>mqtt()</code> destination. The {{% param "product.abbrev" %}} application will not start.</p></td>
<td><p>If your configuration contains the <code>batch-timeout()</code> and / or <code>batch-lines()</code> options, remove them from your configuration, and restart .</p></td>
</tr>
<tr class="even">
<td><code>Disconnected during publish!</code></td>
<td><p>The {{% param "product.abbrev" %}} application can not send the message, because {{% param "product.abbrev" %}} disconnected from the broker. By default, {{% param "product.abbrev" %}} attempts to reconnect to the broker and send the messages 3 times.</p></td>
<td><p>If {{% param "product.abbrev" %}} fails all 3 attempts to reconnect to the broker and send the messages, you can try checking your configuration or restarting your MQTT system with {{% param "product.abbrev" %}} as a client.</p></td>
</tr>
<tr class="odd">
<td><code>Max message inflight! (publish)</code></td>
<td><p>The {{% param "product.abbrev" %}} application can not send the message due to the <code>max message inflight</code> broker response code (which signals that the broker has received too many messages, and it needs more time to process them). The {{% param "product.abbrev" %}} application will attempt to resend the message.<br />
<br />
</p></td>
<td><p>Wait until the broker can process the in-flight messages and {{% param "product.abbrev" %}} can attempt to resend the message.</p></td>
</tr>
<tr class="even">
<td><code>Failure during publishing!</code></td>
<td><p>The {{% param "product.abbrev" %}} application can not send the message due to the <code>failure</code> broker response code. The {{% param "product.abbrev" %}} application will attempt to resend the message.<br />
<br />
</p></td>
<td><p>N/A</p></td>
</tr>
<tr class="odd">
<td><code>Error during publish!</code></td>
<td><p>The {{% param "product.abbrev" %}} application can not send the message, and drops it.</p>
<p>Possible reason: <code>bad_utf8_string (topic), NULL parameter`.</p>
<p>That is, the most probable reasons behind this issue are either that the topic name in your configuration is not correct, or that the message field is empty.</p></td>
<td><p>You can try the following methods:</p>
<ul>
<li><p>Modify the name of the <code>topic()</code> option in your configuration.</p></li>
<li><p>Make sure that the message field is not empty.</p></li>
</ul></td>
</tr>
<tr class="even">
<td><code>Disconnected while waiting the response!</code></td>
<td><p>The {{% param "product.abbrev" %}} application has sent the message, but the client disconnected from the broker before {{% param "product.abbrev" %}} received the response. The {{% param "product.abbrev" %}} application will attempt to reconnect, or to resend the message.</p></td>
<td><p>The {{% param "product.abbrev" %}} application will attempt to reconnect to the broker and send the in-flight message. If the reconnect attempt fails, {{% param "product.abbrev" %}} will resend the message.</p></td>
</tr>
<tr class="odd">
<td>&quot;Error while waiting the response!&quot;</td>
<td><p>The {{% param "product.abbrev" %}} application can not get any response from the broker, due to the <code>failure</code> broker response code. The {{% param "product.abbrev" %}} will attempt to resend the message.</p></td>
<td><p>In this case, you will receive a further error message, depending on what the problem is. Wait for the second error message for more information about how you can proceed.</p></td>
</tr>
<tr class="even">
<td>&quot;Error constructing topic ...&quot;</td>
<td><p>Due to an issue with the configured topic template, the <code>mqtt()</code> destination will use the <code>fallback-topic()</code> option instead.<br />
<br />
</p></td>
<td>N/A</td>
</tr>
<tr class="odd">
<td><code>mqtt dest: topic name is illegal, it can&#39;t be empty</code></td>
<td><p>This error message is related to the <code>"Error constructing topic ..."</code> error message.<br />
<br />
In this case, the topic template returns a <code>0</code> length string. As a result, the <code>mqtt()</code> destination will use the <code>fallback-topic()</code> option instead.</p></td>
<td>N/A</td>
</tr>
<tr class="even">
<td><code>Error connecting mqtt client ...</code></td>
<td><p>The {{% param "product.abbrev" %}} application can not connect to broker, and it will attempt to reconnect later.</p></td>
<td><p>If the issue persists, you can try the following:</p>
<ul>
<li><p>Update your <code>eclipse-paho-mqtt-c</code> library.</p></li>
<li><p>Restart {{% param "product.abbrev" %}}.</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><code>Error creat mqtt client ...</code></td>
<td><p>The {{% param "product.abbrev" %}} application encountered an error while creating the MQTT client, and it will attempt to create it later.</p>
<p>Possible reasons:</p>
<ul>
<li><p>There is a wrong <code>address()</code> set in your configuration.</p></li>
<li><p>The broker is not running.</p></li>
</ul></td>
<td><p>You can try the following methods:</p>
<ul>
<li><p>Check the <code>address()</code> option in your configuration, and modify if necessary.</p></li>
<li><p>Check if the specified broker is running by connecting to it manually, and then sending the broker a message.</p></li>
</ul></td>
</tr>
</tbody>
</table>

