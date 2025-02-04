---
---
- Empty, normal disk-buffer file

    ```shell
    /opt/syslog-ng/bin/dqtool info /opt/syslog-ng/var/syslog-ng-00000.qf/var/lib/syslog-ng/syslog-ng-00000.qf
    ```

    Example output:

    ```shell
    Disk-buffer state loaded; filename='/opt/syslog-ng/var/syslog-ng-00000.qf/var/lib/syslog-ng/syslog-ng-00000.qf', number_of_messages='0'
    ```

- Non-empty, reliable disk-buffer queue file

    ```shell
    /opt/syslog-ng/bin/dqtool info /opt/syslog-ng/var/syslog-ng-00000.rqf
    ```

    ```shell
    Reliable disk-buffer state loaded; filename='/opt/syslog-ng/var/syslog-ng-00000.rqf', number_of_messages='10'
    ```
