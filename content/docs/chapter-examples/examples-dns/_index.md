---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
# Using name resolution in syslog-ng

The syslog-ng application can resolve the hostnames of the clients and include them in the log messages. However, the performance of syslog-ng is severely degraded if the domain name server is unaccessible or slow. Therefore, it is not recommended to resolve hostnames in syslog-ng. If you must use name resolution from syslog-ng, consider the following:

  - Use DNS caching. Verify that the DNS cache is large enough to store all important hostnames. (By default, the syslog-ng DNS cache stores `1007` entries.)
    
    ```c
        options { dns-cache-size(2000); };
    
    ```

  - If the IP addresses of the clients change only rarely, set the expiry of the DNS cache large.
    
    ```c
        options { dns-cache-expire(87600); };
    
    ```

  - If possible, resolve the hostnames locally. For details, see {{% xref "/docs/chapter-examples/examples-dns/example-local-dns/_index.md" %}}.

{{% alert title="Note" color="info" %}}

Domain name resolution is important mainly in relay and server mode.

{{% /alert %}}
