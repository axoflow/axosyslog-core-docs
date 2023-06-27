---
title: "Configuring TLS on the AxoSyslog clients"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Purpose:

Complete the following steps on every AxoSyslog client host. Examples are provided using both the legacy BSD-syslog protocol (using the `network()` driver) and the new IETF-syslog protocol standard (using the `syslog()` driver):



## Steps:

1.  Copy the CA certificate (for example, `cacert.pem`) of the Certificate Authority that issued the certificate of the AxoSyslog server (or the self-signed certificate of the AxoSyslog server) to the AxoSyslog client hosts, for example, into the `/opt/syslog-ng/etc/syslog-ng/ca.d` directory.
    
    Issue the following command on the certificate: `openssl x509 -noout -hash -in cacert.pem` The result is a hash (for example, `6d2962a8`), a series of alphanumeric characters based on the Distinguished Name of the certificate.
    
    Issue the following command to create a symbolic link to the certificate that uses the hash returned by the previous command and the `.0` suffix.
    
    `ln -s cacert.pem 6d2962a8.0`

2.  Add a destination statement to the `syslog-ng.conf` configuration file that uses the `tls( ca-dir(path_to_ca_directory) )` option and specify the directory using the CA certificate. The destination must use the `network()` or the `syslog()` destination driver, and the IP address and port parameters of the driver must point to the AxoSyslog server.
    
    
    ## Example: A destination statement using TLS
    
    The following destination encrypts the log messages using TLS and sends them to the `6514/TCP` port of the AxoSyslog server having the `10.1.2.3` IP address.
    
    ```c
        destination demo_tls_destination {
            network("10.1.2.3" port(6514)
                transport("tls")
                tls( ca_dir("/opt/syslog-ng/etc/syslog-ng/ca.d"))
            );
        };
    ```
    
    A similar statement using the IETF-syslog protocol and thus the `syslog()` driver:
    
    ```c
        destination demo_tls_syslog_destination {
            syslog("10.1.2.3" port(6514)
                                transport("tls")
                tls(ca_dir("/opt/syslog-ng/etc/syslog-ng/ca.d"))
            );
        };
    ```
    

3.  Include the destination created in Step 2 in a log statement.
    
    {{% alert title="Warning" color="warning" %}}
The encrypted connection between the server and the client fails if the `Common Name` or the `subject_alt_name` parameter of the server certificate does not contain the hostname or the IP address (as resolved from the AxoSyslog clients and relays) of the server.
    
Do not forget to update the certificate files when they expire.
    {{% /alert %}}

