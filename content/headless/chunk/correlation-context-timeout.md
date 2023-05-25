---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
Note the following points about timeout values:

  - When a new message is added to a context, {{% param "product.abbrev" %}} will restart the timeout using the `context-timeout` set for the new message.

  - When calculating if the timeout has already expired or not, {{% param "product.abbrev" %}} uses the timestamps of the incoming messages, not system time elapsed between receiving the two messages (unless the messages do not include a timestamp, or the **keep-timestamp(no)** option is set). That way {{% param "product.abbrev" %}} can be used to process and correlate already existing log messages offline. However, the timestamps of the messages must be in chronological order (that is, a new message cannot be older than the one already processed), and if a message is newer than the current system time (that is, it seems to be coming from the future), {{% param "product.abbrev" %}} will replace its timestamp with the current system time.
    
    
    ## Example: How {{% param "product.abbrev" %}} calculates context-timeout
    
    Consider the following two messages:
    
    ```c
        <38>1990-01-01T14:45:25 customhostname program6[1234]: program6 testmessage
        <38>1990-01-01T14:46:25 customhostname program6[1234]: program6 testmessage
    
    ```
    
    If the `context-timeout` is 10 seconds and {{% param "product.abbrev" %}} receives the messages within 1 second, the timeout event will occour immediately, because the difference of the two timestamp (60 seconds) is larger than the timeout value (10 seconds).
    

  - Avoid using unnecessarily long timeout values on high-traffic systems, as storing the contexts for many messages can require considerable memory. For example, if two related messages usually arrive within seconds, it is not needed to set the timeout to several hours.
