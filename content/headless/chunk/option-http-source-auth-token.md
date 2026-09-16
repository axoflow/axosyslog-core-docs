---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

## auth-token() {#auth-token}

|          |         |
| -------- | ------- |
| Type:    | string  |
| Default: |         |

*Description:* Requires the clients to authenticate themselves with a token. When set, {{% param "product.abbrev" %}} accepts only the requests whose `Authorization` header exactly matches the value of this option, and rejects every other request with `401 Unauthorized`.

Include the authentication scheme in the value, because {{% param "product.abbrev" %}} compares the whole header:

```shell
auth-token("Bearer s3cr3t")
```

Since the token is sent in clear text, use this option only over HTTPS, that is, together with [`transport(tls)`](#transport).
