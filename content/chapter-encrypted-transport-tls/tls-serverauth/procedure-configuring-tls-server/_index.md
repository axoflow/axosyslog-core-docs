---
title: "Configuring TLS on the AxoSyslog server"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Purpose:

Complete the following steps on the AxoSyslog server:



## Steps:

1.  Create an X.509 certificate for the AxoSyslog server.
    
    {{< include-headless "wnt/note-cert-common-name.md" >}}

2.  Copy the certificate (for example, `syslog-ng.cert`) of the AxoSyslog server to the AxoSyslog server host, for example, into the `/opt/syslog-ng/etc/syslog-ng/cert.d` directory. The certificate must be a valid X.509 certificate in PEM format.

3.  Copy the private key (for example, `syslog-ng.key`) matching the certificate of the AxoSyslog server to the AxoSyslog server host, for example, into the `/opt/syslog-ng/etc/syslog-ng/key.d` directory. The key must be in PEM format. If you want to use a password-protected key, see {{% xref "/chapter-encrypted-transport-tls/tls-password-protected-keys/_index.md" %}}.

4.  Add a source statement to the `syslog-ng.conf` configuration file that uses the `tls( key-file(key_file_fullpathname) cert-file(cert_file_fullpathname) )` option and specify the key and certificate files. The source must use the source driver (`network()` or `syslog()`) matching the destination driver used by the AxoSyslog client.
    
    
    ## Example: A source statement using TLS
    
    The following source receives log messages encrypted using TLS, arriving to the `1999/TCP` port of any interface of the AxoSyslog server.
    
    ```c
        source demo_tls_source {
            network(ip(0.0.0.0) port(1999)
                transport("tls")
                tls( 
                    key-file("/opt/syslog-ng/etc/syslog-ng/key.d/syslog-ng.key")
                    cert-file("/opt/syslog-ng/etc/syslog-ng/cert.d/syslog-ng.cert")
                )
            );
        };
    ```
    
    A similar source for receiving messages using the IETF-syslog protocol:
    
    ```c
        source demo_tls_syslog_source {
            syslog(ip(0.0.0.0) port(1999)
            transport("tls")
            tls(
                key-file("/opt/syslog-ng/etc/syslog-ng/key.d/syslog-ng.key")
                cert-file("/opt/syslog-ng/etc/syslog-ng/cert.d/syslog-ng.cert")
                )
            );
        };
    ```
    

5.  Disable mutual authentication for the source by setting the following TLS option in the source statement: `tls( peer-verify(optional-untrusted);`
    
    If you want to authenticate the clients, you have to configure mutual authentication. For details, see {{% xref "/chapter-encrypted-transport-tls/tls-mutualauth/_index.md" %}}.
    
    For the details of the available `tls()` options, see {{% xref "/chapter-encrypted-transport-tls/tlsoptions/_index.md" %}}.
    
    
    ## Example: Disabling mutual authentication
    
    The following source receives log messages encrypted using TLS, arriving to the `1999/TCP` port of any interface of the AxoSyslog server. The identity of the AxoSyslog client is not verified.
    
    ```c
        source demo_tls_source {
            network(
                ip(0.0.0.0) port(1999)
                transport("tls")
                tls(
                    key-file("/opt/syslog-ng/etc/syslog-ng/key.d/syslog-ng.key")
                    cert-file("/opt/syslog-ng/etc/syslog-ng/cert.d/syslog-ng.cert")
                    peer-verify(optional-untrusted)
                )
            );
        };
    ```
    
    A similar source for receiving messages using the IETF-syslog protocol:
    
    ```c
        source demo_tls_syslog_source {
            syslog(
                ip(0.0.0.0) port(1999)
                transport("tls")
                tls(
                    key-file("/opt/syslog-ng/etc/syslog-ng/key.d/syslog-ng.key")
                    cert-file("/opt/syslog-ng/etc/syslog-ng/cert.d/syslog-ng.cert")
                    peer-verify(optional-untrusted)
                )
            );
        };
    ```
    
    
    {{% alert title="Warning" color="warning" %}}
Do not forget to update the certificate and key files when they expire.
    {{% /alert %}}

