---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## Alert unknown CA

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Error message:</td>
<td>```c
SSL error while writing stream; tls_error=&#39;SSL routines:ssl3_read_bytes:tlsv1 alert unknown ca&#39;
```</td>
</tr>
<tr class="even">
<td>Description:</td>
<td><p>This message indicates that the other (remote) side could not verify the certificate sent by `syslog-ng`.</p></td>
</tr>
<tr class="odd">
<td>Solution:</td>
<td><p>Check the logs on the remote site and identify why the receiving `syslog-ng` could not find the CA certificate that signed this certificate.</p></td>
</tr>
</tbody>
</table>

