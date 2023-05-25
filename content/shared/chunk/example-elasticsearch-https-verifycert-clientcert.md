---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
Verify the certificate of the Elasticsearch server and perform certificate authentication (this is actually a mutual, certificate-based authentication between the {{% param "product.abbrev" %}} client and the Elasticsearch server):

```c

    destination d_elastic {
        elasticsearch2(
            client-mode("https")
            cluster("es-syslog-ng")
            index("x201")
            cluster-url("http://192.168.33.10:9200")
            type("slng_test_type")
            flush-limit("0")
            http-auth-type("clientcert")
            java-keystore-filepath("&amp;lt;path-to-your-java-keystore&amp;gt;.jks")
            java-keystore-password("password-to-your-keystore")
            java-truststore-filepath("&amp;lt;path-to-your-java-keystore&amp;gt;.jks")
            java-truststore-password("password-to-your-keystore")
        );
    };

```
