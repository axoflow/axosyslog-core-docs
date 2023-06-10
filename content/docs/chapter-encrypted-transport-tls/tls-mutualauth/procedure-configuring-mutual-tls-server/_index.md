---
title: "Configuring TLS on the syslog-ng server"
weight:  300
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Purpose:

Complete the following steps on the syslog-ng server:



## Steps:

1.  Copy the certificate (for example, `syslog-ng.cert`) of the syslog-ng server to the syslog-ng server host, for example, into the `/opt/syslog-ng/etc/syslog-ng/cert.d` directory. The certificate must be a valid X.509 certificate in PEM format.

2.  Copy the CA certificate (for example, `cacert.pem`) of the Certificate Authority that issued the certificate of the syslog-ng clients to the syslog-ng server, for example, into the `/opt/syslog-ng/etc/syslog-ng/ca.d` directory.
    
    Issue the following command on the certificate: **openssl x509 -noout -hash -in cacert.pem** The result is a hash (for example, `6d2962a8`), a series of alphanumeric characters based on the Distinguished Name of the certificate.
    
    Issue the following command to create a symbolic link to the certificate that uses the hash returned by the previous command and the **.0** suffix.
    
    `ln -s cacert.pem 6d2962a8.0`

3.  Copy the private key (for example, `syslog-ng.key`) matching the certificate of the syslog-ng server to the syslog-ng server host, for example, into the `/opt/syslog-ng/etc/syslog-ng/key.d` directory. The key must be in PEM format. If you want to use a password-protected key, see {{% xref "/docs/chapter-encrypted-transport-tls/tls-password-protected-keys/_index.md" %}}.

4.  Add a source statement to the syslog-ng configuration file that uses the `tls( key-file(key_file_fullpathname) cert-file(cert_file_fullpathname) )` option and specify the key and certificate files. The source must use the source driver (`network()` or `syslog()`) matching the destination driver used by the syslog-ng client. Also specify the directory storing the certificate of the CA that issued the client's certificate.
    
    For the details of the available `tls()` options, see {{% xref "/docs/chapter-encrypted-transport-tls/tlsoptions/_index.md" %}}.
    
    
    ## Example: A source statement using TLS
    
    The following source receives log messages encrypted using TLS, arriving to the `1999/TCP` port of any interface of the syslog-ng server.
    
    ```c
        source demo_tls_source {
            network(
                ip(0.0.0.0) port(1999)
                transport("tls")
                tls(
                    key-file("/opt/syslog-ng/etc/syslog-ng/key.d/syslog-ng.key")
                    cert-file("/opt/syslog-ng/etc/syslog-ng/cert.d/syslog-ng.cert")
                    ca-dir("/opt/syslog-ng/etc/syslog-ng/ca.d")
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
                    ca-dir("/opt/syslog-ng/etc/syslog-ng/ca.d")        
                )
            );
        };
    ```
    
    
    {{% alert title="Warning" color="warning" %}}
Do not forget to update the certificate and key files when they expire.
    {{% /alert %}}

