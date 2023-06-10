---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## PEM routines:PEM_read_bio:no start line

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Error message:</td>
<td>```c
testuser@thor-x1:~/cert_no_start_line/certs$ openssl x509 -in cert.pem -text
unable to load certificate
140178126276248:error:0906D06C:PEM routines:PEM_read_bio:no start 
line:pem_lib.c:701:Expecting: TRUSTED CERTIFICATE
```</td>
</tr>
<tr class="even">
<td>Description:</td>
<td><p>The error message is displayed when using Transport Layer Security (TLS). The syslog-ng application uses OpenSSL for TLS and this message indicates that the certificate contains characters that OpenSSL cannot process.</p>
<p>The error occurs when the certificate comes from Windows and you want to use it on a Linux-based computer. On Windows, the end of line (EOL) character is different (\r\n) compared to Linux (\n).</p>
<p>To verify this, open the certificate in a text editor, for example, MCEdit. Notice the `^M` characters as shown in the image below:</p>
<p><img src="../../Images/Screenshots/wrong_linex.png" class="Image" /></p></td>
</tr>
<tr class="odd">
<td>Solution:</td>
<td><ul>
<li><p>On Windows, save the certificate using UTF-8, for example, using Notepad++.</p>
<p>{{% alert title="Note" color="info" %}}</p>
<p>Windows Notepad is not able to save the file in normal UTF-8, even if you select it.</p>
<p>{{% /alert %}}</p>
<ol>
<li><p>In Notepad++, from the menu, select<strong>Encoding</strong>.</p></li>
<li><p>Change the value from<strong>UTF-8-BOM</strong>to<strong>UTF-8</strong>.</p></li>
<li><p>Save.</p></li>
</ol></li>
<li><p>On Linux, run dos2unix cert.pem. This will convert the file to a Linux-compatible style.</p>
<p>Alternatively, replace the EOL characters in the file manually.</p></li>
</ul></td>
</tr>
</tbody>
</table>

