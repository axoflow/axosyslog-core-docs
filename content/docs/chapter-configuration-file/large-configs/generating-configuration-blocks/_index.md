---
title: "Generating configuration blocks from a script"
weight:  500
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->


## Purpose:

The {{% param "product.abbrev" %}} application can automatically execute scripts when it is started, and can include the output of such script in the configuration file. To create and use a script that generates a part of the {{% param "product.abbrev" %}} configuration file (actually, a configuration block), complete the following steps. The steps include examples for collecting Apache access log files (`access.log`) from subdirectories, but you can create any script that creates a valid {{% param "product.abbrev" %}} configuration snippet.



## Steps:

1.  Navigate to the directory where you have installed {{% param "product.abbrev" %}} (for example, `/opt/syslog-ng/share/include/scl/`), and create a new directory, for example, `apache-access-logs`. The name of the directory will be used in the {{% param "product.abbrev" %}} configuration file as well, so use a descriptive name.

2.  Create a file called `plugin.conf` in this new directory.

3.  Edit the `plugin.conf` file and add the following line:
    
    ```c
        @module confgen context(source) name(<directory-name>) exec("`scl-root`/<directory-name>/<my-script>")
    
    ```
    
    Replace `\<directory-name\>` with the name of the directory (for example, `apache-access-logs`), and `\<my-script\>` with the filename of your script (for example, `apache-access-logs.sh`). You can reference the script in your {{% param "product.abbrev" %}} configuration file as a configuration block using the value `name` option.
    
    The `context` option determines the type of the configuration snippet that the script generates, and must be one of the following: `destination`, `filter`, `log`, `parser`, `rewrite`, `root`, `source`. The `root` blocks can be used in the "root" context of the configuration file, that is, outside any other statements. In the example, `context(source)` means that the output of the script will be used within a source statement.
    
    You can pass parameters to the script. In the script these parameters are available as environment variables, and have the `confgen_` prefix. For example, passing the `--myparameter` parameter becomes available in the script as the `confgen_myparameter` environment variable.

4.  Write a script that generates the output you need, and formats it to a configuration snippet that {{% param "product.abbrev" %}} can use. The filename of the script must match with the filename used in `plugin.conf`, for example, `apache-access-logs.sh`.
    
    The following example checks the `/var/log/apache2/` directory and its subdirectories, and creates a source driver for every directory that contains an `access.log` file.
    
    ```c
        #!/bin/bash
        for i in `find /var/log/apache2/ -type d`; do
            echo "file(\"$i/access.log\" flags(no-parse) program-override(\"apache2\"));";
        done;
    
    ```
    
    The script generates an output similar to this one, where `service\*` is the actual name of a subdirectory:
    
    ```c
        file("/var/log/apache2/service1/access.log" flags(no-parse) program-override("apache2"));
        file("/var/log/apache2/service2/access.log" flags(no-parse) program-override("apache2"));
    
    ```

5.  Include the `plugin.conf` file in the `syslog-ng.conf` file — or a file already included into `syslog-ng.conf`. Version {{% conditional-text include-if="ose" %}}3.7{{% /conditional-text %}} and newer automatically includes the `\*.conf` files from the `\<directory-where-syslog-ng-is-installed\>/scl/\*/` directories. For details on including configuration files, see {{% xref "/docs/chapter-configuration-file/large-configs/including-config-files/_index.md" %}}.

6.  Add the block you defined in the `plugin.conf` file to your {{% param "product.abbrev" %}} configuration file. You can reference the block using the value of the `name` option from the `plugin.conf` file, followed by parentheses, for example, `apache-access-logs()`. Make sure to use the block in the appropriate context of the configuration file, for example, within a source statement if the value of the `context` option in the `plugin.conf` file is source.
    
    ```c
        @include "scl.conf"
        ...
        source s_apache {
            file("/var/log/apache2/access.log" flags(no-parse) program-override("apache2"));
            file("/var/log/apache2/error.log" flags(no-parse) program-override("apache2"));
            file("/var/log/apache2/ssl.log" flags(no-parse) program-override("apache2"));
            apache-access-logs();
        };
        
        log {
            source(s_apache); destination(d_central);
        };
        ...
    
    ```

7.  Check if your modified {{% param "product.abbrev" %}} configuration file is syntactically correct using the **syslog-ng --syntax-only** command.

8.  If your modified configuration is syntactically correct, load the new configuration file using the **syslog-ng-ctl reload** command.

