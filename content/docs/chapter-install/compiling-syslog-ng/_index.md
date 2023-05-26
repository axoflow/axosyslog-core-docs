---
title: "Compiling syslog-ng from source"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Purpose:

To compile `syslog-ng` from the source code, complete the following steps. Alternatively, you can use precompiled binary packages on several platforms. For a list of third-party packages available for various Linux, UNIX, and other platforms, see [syslog-ng Open Source Edition installation packages](https://github.com/syslog-ng/syslog-ng/#installation-from-binaries).



## Steps:

1.  Download the latest source code release from [GitHub](https://github.com/syslog-ng/syslog-ng/releases). The source code is available as a tar.gz archive file.

2.  Install the following required packages. These packages are available for most UNIX/Linux systems. Alternatively, you can also download the sources and compile them.
    
      - A version of the *gcc* C compiler that properly supports Thread Local Storage (TLS), for example, version 4.5.
    
      - The *GNU flex* lexical analyser generator, [available here](https://github.com/westes/flex).
    
      - The *bison* parser generator, [available here](http://ftp.gnu.org/gnu/bison/).
    
      - The development files of the *glib* library, [available here](http://freshmeat.net/projects/glib/).
    
      - The development files of the *Autoconf Archive* package, [available here](http://www.gnu.org/software/autoconf-archive/).
    
      - The {{% param "product.abbrev" %}} application now uses PCRE-type regular expressions by default. It requires the `libpcre` library package, [available here](https://sourceforge.net/projects/pcre/files/pcre/).
    
      - {{% include-headless "chunk/para-java-requirements.md" %}}

3.  If you want to post log messages as HTTP requests using the `http()` destination, install the development files of the *libcurl* library. This library is not needed if you use the `--disable-http` compile option. Alternatively, you can use a Java-based implementation of the HTTP destination.

4.  If you want to use the spoof-source function of `syslog-ng`, install the development files of the *libnet* library, [available here](http://libnet.sourceforge.net).

5.  If you want to send emails using the `smtp()` destination, install the development files of the *libesmtp* library. This library is not needed if you use the `--disable-smtp` compile option.

6.  If you want to send SNMP traps using the `snmp()` destination, install the development files of the Net-SNMP library *libsnmp-dev*. This library is not needed if you use the `--disable-snmp` compile option.

7.  If you want to use the */etc/hosts.deny* and */etc/hosts.allow* for TCP access, install the development files of the *libwrap* (also called TCP-wrappers) library, [available here](http://ftp.porcupine.org/pub/security/index.html).

8.  Enter the new directory and issue the following commands. (If the `./configure` file does not exist, for example, because you cloned the repository from GitHub instead of using a release tarball, execute the `./autogen.sh` command.)
    
    ```c
        $ ./configure
        $ make
        $ make install
    ```

9.  Uncompress the `syslog-ng` archive using the
    
    ```c
        tar xvfz syslog-ng-x.xx.tar.gz
    ```
    
    or the
    
    ```c
        unzip -c syslog-ng-x.xx.tar.gz | tar xvf -
    ```
    
    command. A new directory containing the source code of `syslog-ng` will be created.

10. Enter the new directory and issue the following commands:
    
    ```c
        $ ./configure
        $ make
        $ make install
    ```
    
    These commands will build `syslog-ng` using its default options.
    
    {{% alert title="Note" color="info" %}}
When using the `make` command, consider the following:
    
- On Solaris, use `gmake` (GNU make) instead of `make`.

- To build {{% param "product.abbrev" %}} with less verbose output, use the `make V=0` command. This results in shorter, less verbose output, making warnings and other anomalies easier to notice. Note that silent-rules support is only available in recent automake versions.
    {{% /alert %}}

11. If needed, use the following options to change how `syslog-ng` is compiled using the following command syntax:
    
    ```c
        $ ./configure --compile-time-option-name
    
    ```
    
    {{% alert title="Note" color="info" %}}
You can also use *--disable options*, to explicitly disable a feature and override autodetection. For example, to disable the TCP-wrapper support, use the *--disable-tcp-wrapper* option. For the list of available compiling options, see {{% xref "/docs/chapter-install/syslog-ng-compile-options/_index.md" %}}.
    {{% /alert %}}
    
    {{% alert title="Warning" color="warning" %}}
The default linking mode of `syslog-ng` is `dynamic`. This means that `syslog-ng` might not be able to start up if the `/usr` directory is on NFS. On platforms where `syslog-ng` is used as a system logger, the `--enable-mixed-linking` is preferred.
    {{% /alert %}}

