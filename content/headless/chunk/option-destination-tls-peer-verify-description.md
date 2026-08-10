<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

|                  |       |
| ---------------- | ----- |
| Accepted values: | `optional-trusted` , `optional-untrusted` , `required-trusted` , `required-untrusted` {{< if plain_tls >}}, `yes` , `no`{{< /if >}} |
| Default:         | `required-trusted`   |

*Description:* Verification method of the peer, the four possible values is a combination of two properties of validation:

- Whether the peer is required to provide a certificate (required or optional prefix).
- Whether the certificate provided needs to be valid or not.

The following table summarizes the possible options and their results depending on the certificate of the peer.

<table class="TableStyle-RuledTableWithoutHeading_DoNotEdit" style="WIDTH: 100%; mc-table-style: url('../../Resources/TableStyles/RuledTableWithoutHeading_DoNotEdit.css')" cellspacing="0">
<thead>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Head-Header1">
<th class="TableStyle-RuledTableWithoutHeading_DoNotEdit-HeadH-Column1-" rowspan="2" colspan="2">
<p></p></th>
<th class="TableStyle-RuledTableWithoutHeading_DoNotEdit-HeadG-Column1-" colspan="3">The remote peer has:</th></tr>
<tr class="TableStyle-RuledTableWithHeading_VerticallyRuled_DoNotEdit-Head-Header1">
<th class="TableStyle-RuledTableWithoutHeading_DoNotEdit-HeadH-Column1-">no certificate </th>
<th class="TableStyle-RuledTableWithoutHeading_DoNotEdit-HeadH-Column1-">invalid certificate </th>
<th class="TableStyle-RuledTableWithoutHeading_DoNotEdit-HeadG-Column1-">valid certificate </th></tr></thead>
<tbody>
<tr class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1" rowspan="4"><i style="FONT-STYLE: normal">Local peer-verify() setting</i> </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1"><i style="FONT-STYLE: normal">optional-untrusted</i> </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">TLS-encryption </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">TLS-encryption </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyD-Column1-Body1">TLS-encryption </td></tr>
<tr class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1"><i style="FONT-STYLE: normal">optional-trusted</i> </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">TLS-encryption </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">rejected connection </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyD-Column1-Body1">TLS-encryption </td></tr>
<tr class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1"><i style="FONT-STYLE: normal">required-untrusted</i> </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">rejected connection </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyE-Column1-Body1">TLS-encryption </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyD-Column1-Body1">TLS-encryption </td></tr>
<tr class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Body-Body1">
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyB-Column1-Body1"><i style="FONT-STYLE: normal">required-trusted</i> </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyB-Column1-Body1">rejected connection </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyB-Column1-Body1">rejected connection </td>
<td class="TableStyle-RuledTableWithoutHeading_DoNotEdit-BodyA-Column1-Body1">TLS-encryption </td></tr></tbody>
<colgroup>
<col class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Column-Column1" style="WIDTH: 0.3in">
<col class="TableStyle-RuledTableWithoutHeading_DoNotEdit-Column-Column1" style="WIDTH: 0.3in"></colgroup></table>

{{< include-headless "chunk/option-destination-tls-peer-verify-notes.md" >}}
