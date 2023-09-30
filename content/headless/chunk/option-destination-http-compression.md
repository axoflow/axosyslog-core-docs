---
---
Use `"identity"` for no compression.

- If you want to accept multiple compression types, list them separated by commas inside the quotation mark.
- To enable all available compression types, use `"all"`.

For example:

```shell
destination d_http_compressed{
  http(url("127.0.0.1:80"), content-compression("deflate"), accept-encoding("all"));
};
```
