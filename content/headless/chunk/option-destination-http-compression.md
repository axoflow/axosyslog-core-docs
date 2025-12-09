---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

For example:

```shell
destination d_http_compressed{
  http(url("127.0.0.1:80"), content-compression("deflate"), accept-encoding("all"));
};
```
