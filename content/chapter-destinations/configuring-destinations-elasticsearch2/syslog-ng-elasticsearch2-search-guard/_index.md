---
title: "Search Guard"
weight:  700
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Purpose:

Version 3.9 and later supports the [Search Guard](https://floragunn.com/searchguard/) Elasticsearch plugin (version 2.4.1.16 and newer) to encrypt and authenticate your connections to from {{% param "product.abbrev" %}} to Elasticsearch 2 and newer. To configure {{% param "product.abbrev" %}} to send messages to an Elasticsearch 2.x cluster that uses Search Guard, complete the following steps.

To connect to an Elasticsearch 5.x or newer cluster, use HTTPS mode.



## Steps:

1.  Install the Search Guard plugin on your {{% param "product.abbrev" %}} host. Use the plugin version that matches the version of your Elasticsearch installation.
    
    ```shell
    sudo /usr/share/elasticsearch/bin/plugin install -b com.floragunn/search-guard-ssl/<version-number-of-the-plugin>
    ```

2.  Create a certificate for your {{% param "product.abbrev" %}} host, and add the certificate to the `SYSLOG_NG-NODE_NAME-keystore.jks` file. You can configure the location of this file in the Elasticsearch resources file under the `path.conf` parameter. For details, see the [Search Guard documentation](https://github.com/floragunncom/search-guard-ssl-docs/blob/master/certificates.md).

3.  Configure an Elasticsearch destination in {{% param "product.abbrev" %}} that uses the `searchguard` client mode. For example:
    
    ```shell
    
        destination d_elasticsearch {
          elasticsearch2(
            client-lib-dir("/usr/share/elasticsearch/plugins/search-guard-ssl/*.jar:/usr/share/elasticsearch/lib")
            index("syslog-${YEAR}.${MONTH}.${DAY}")
            type("syslog")
            time-zone("UTC")
            client-mode("searchguard")
            resource("/etc/syslog-ng/elasticsearch.yml")
          );
        };
    ```

4.  Configure the Elasticsearch resource file (for example, `/etc/syslog-ng/elasticsearch.yml`) as needed for your environment. Note the `searchguard:` section.
    
    ```shell
        cluster:
          name: elasticsearch
        discovery:
          zen:
            ping:
              unicast:
                hosts:
                  - <ip-address-of-the-elasticsearch-server>
        node:
          name: syslog_ng_secure
          data; false
          master: false
        path:
          home: /etc/syslog-ng
          conf: /etc/syslog-ng
        searchguard:
          ssl:
            transport:
              keystore_filepath: syslog_ng-keystore.jks
              keystore_password: changeit
              truststore_filepath: truststore.jks
              truststore_password: changeit
              enforce_hostname_verification: true
    ```
