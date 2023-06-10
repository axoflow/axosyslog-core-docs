---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
  - ## HTTP mode
    
    The {{% productparam "abbrev" %}} application sends messages over HTTP using the REST API of Elasticsearch, and uses the `cluster-url()` and `cluster()` options from the {{% productparam "abbrev" %}} configuration file. In HTTP mode, {{% productparam "abbrev" %}}`elasticsearch2` driver can send log messages to every Elasticsearch version, including 1.x-6.x. Note that HTTP mode is available in {{% productparam "abbrev" %}} version {{% conditional-text include-if="ose" %}}3.8{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7{{% /conditional-text %}} and newer.
    
    {{% include-headless "chunk/para-elasticsearch-loadbalancing.md" %}}

  - ## HTTPS mode
    
    The {{% productparam "abbrev" %}} application sends messages over an encrypted and optionally authenticated HTTPS channel using the REST API of Elasticsearch, and uses the `cluster-url()` and `cluster()` options from the {{% productparam "abbrev" %}} configuration file. In HTTPS mode, {{% productparam "abbrev" %}}`elasticsearch2` driver can send log messages to every Elasticsearch version, including 1.x-6.x. Note that HTTPS mode is available in {{% productparam "abbrev" %}} version {{% conditional-text include-if="ose" %}}3.10{{% /conditional-text %}}{{% conditional-text include-if="pe" %}}7.0.3{{% /conditional-text %}} and newer.
    
    This mode supports password-based and certificate-based authentication of the client, and can verify the certificate of the server as well.
    
    {{% include-headless "chunk/para-elasticsearch-loadbalancing.md" %}}

  - ## Transport mode
    
    The {{% productparam "abbrev" %}} application uses the transport client API of Elasticsearch, and uses the `server()`, `port()`, and `cluster()` options from the {{% productparam "abbrev" %}} configuration file.

  - ## Node mode
    
    The {{% productparam "abbrev" %}} application acts as an Elasticsearch node (client no-data), using the node client API of Elasticsearch. Further options for the node can be describe in an Elasticsearch configuration file specified in the `resource()` option.
    
    {{% alert title="Note" color="info" %}}
    
    In Node mode, it is required to define the home of the elasticsearch installation with the `path.home` parameter in the `.yml` file. For example: **path.home: /usr/share/elasticsearch**.
    
    {{% /alert %}}

  - ## Search Guard mode
    
    Use the [Search Guard](https://search-guard.com/) Elasticsearch plugin to encrypt and authenticate your connections from {{% productparam "abbrev" %}} to Elasticsearch 2.x. For Elasticsearch versions 5.x and newer, use HTTPS mode. For details on configuring Search Guard mode, see {{% xref "/docs/chapter-destinations/configuring-destinations-elasticsearch2/syslog-ng-elasticsearch2-search-guard/_index.md" %}}.
