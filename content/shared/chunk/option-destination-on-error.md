---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## on-error()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Accepted values:</td>
<td><p>drop-message|drop-property|fallback-to-string|</p>
<p>silently-drop-message|silently-drop-property|silently-fallback-to-string</p></td>
</tr>
<tr class="even">
<td>Default:</td>
<td>Use the global setting (which defaults to `drop-message`)</td>
</tr>
</tbody>
</table>

{{% include-headless "chunk/option-description-destination-on-error.md" %}}

