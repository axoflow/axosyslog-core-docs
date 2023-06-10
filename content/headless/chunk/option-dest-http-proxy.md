---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## proxy()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Type:</td>
<td><p>The proxy server address, in `proxy("PROXY_IP:PORT")` format.</p>
<p>For example, `proxy("http://myproxy:3128")`</p></td>
</tr>
<tr class="even">
<td>Default:</td>
<td>None</td>
</tr>
</tbody>
</table>

*Description:*

{{% include-headless "chunk/destination-http-proxy-settings.md" %}}

{{% include-headless "chunk/destination-http-proxy-settings2.md" %}}

{{% include-headless "chunk/destination-http-proxy-settings4.md" %}}


## Example: the proxy() option in configuration

The following example illustrates including the `proxy()` option in your configuration.

```c
   destination {
      http( url("SYSLOG_SERVER_IP:PORT") proxy("PROXY_IP:PORT") method("POST"));
    }; 

```


