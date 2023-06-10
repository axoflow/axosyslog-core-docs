---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## value-pairs()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Type:</td>
<td>parameter list of the `value-pairs()` option</td>
</tr>
<tr class="even">
<td>Default:</td>
<td>```c
scope(&quot;selected-macros&quot; &quot;nv-pairs&quot;)
```</td>
</tr>
</tbody>
</table>

*Description:* The `value-pairs()` option creates structured name-value pairs from the data and metadata of the log message. For details on using `value-pairs()`, see {{% xref "/docs/chapter-concepts/concepts-value-pairs/_index.md" %}}.

{{% alert title="Note" color="info" %}}

Empty keys are not logged.

{{% /alert %}}

