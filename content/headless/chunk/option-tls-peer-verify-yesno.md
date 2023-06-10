---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
<table cellspacing="0">
<thead>
<tr >
<th rowspan="2" colspan="2">
<p></p></th>
<th colspan="3">The remote peer has:</th></tr>
<tr >
<th >no certificate </th>
<th >invalid certificate </th>
<th >valid certificate </th></tr></thead>
<tbody>
<tr>
<td  rowspan="2"><i>Local peer-verify() setting</i> </td>
<td ><i>no (optional-untrusted)</i> </td>
<td >TLS-encryption </td>
<td >TLS-encryption </td>
<td >TLS-encryption </td></tr>
<tr >
<td ><i>yes (required-trusted)</i> </td>
<td >rejected connection </td>
<td >rejected connection </td>
<td >TLS-encryption </td></tr></tbody>
<colgroup>
<col >
<col >
<col >
<col ></colgroup></table>
