---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
  - Installing the `eclipse-paho-mqtt-c` library.
    
    {{% alert title="Note" color="info" %}}
The default package manager for some Linux operating systems contains the `eclipse-paho-mqtt-c` library, but depending on your OS, you may have to install the library manually. For more information about how you can download and install the `eclipse-paho-mqtt-c` library, see [Eclipse Paho](https://www.eclipse.org/paho/index.php?page=clients/c/index.php) on the Eclipse Foundation website.
    {{% /alert %}}

  - Having a `broker` entity in a functional MQTT system.
    
    {{% alert title="Note" color="info" %}}
In your configuration, you will specify the `broker` entity of your MQTT system in the `address()` option of your `mqtt()` source.
    {{% /alert %}}
