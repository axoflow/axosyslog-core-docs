---
title: "Kerberos authentication with the hdfs() destination"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

Version 3.10 and later supports Kerberos authentication to authenticate the connection to your Hadoop cluster. {{% param "product.abbrev" %}} assumes that you already have a Hadoop and Kerberos infrastructure.

{{% alert title="Note" color="info" %}}

If you configure Kerberos authentication for a `hdfs()` destination, it affects all `hdfs()` destinations. Kerberos and non-Kerberos `hdfs()` destinations cannot be mixed in a {{% param "product.abbrev" %}} configuration. This means that if one `hdfs()` destination uses Kerberos authentication, you have to configure all other `hdfs()` destinations to use Kerberos authentication too.

Failing to do so results in non-Kerberos `hdfs()` destinations being unable to authenticate to the HDFS server.

{{% /alert %}} {{% alert title="Note" color="info" %}}

If you want to configure your `hdfs()` destination to stop using Kerberos authentication, namely, to remove Kerberos-related options from the `hdfs()` destination configuration, make sure to restart {{% param "product.abbrev" %}} for the changes to take effect.

{{% /alert %}}


## Prerequisites:

  - You have configured your Hadoop infrastructure to use Kerberos authentication.

  - You have a keytab file and a principal for the host running {{% param "product.abbrev" %}}. For details, see the [Kerberos documentation](http://web.mit.edu/Kerberos/krb5-1.5/krb5-1.5.4/doc/krb5-install/The-Keytab-File.html).

  - You have installed and configured the Kerberos client packages on the host running {{% param "product.abbrev" %}}. (That is, Kerberos authentication works for the host, for example, from the command line using the `kinit user@REALM -k -t \<keytab_file\>` command.)

{{% include-headless "chunk/synopsis-hdfs-kerberos-example.md" %}}

