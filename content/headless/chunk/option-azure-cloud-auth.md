---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
To authenticate, register a [Microsoft Entra application](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/tutorial-logs-ingestion-portal#create-azure-ad-application). You need the Tenant ID and the App ID of the application. The application can authenticate in one of the following ways:

- With a client secret: set the [`app-secret()`](#app-secret) option.
- With a client certificate: set the [`cert-file()`](#azure-cert-file) and [`key-file()`](#azure-key-file) options. Upload the certificate to the Microsoft Entra application. Available in {{< product >}} 4.30 and later.

To authenticate with a certificate, set the following options in the `auth()` option of the `azure-monitor()` destination, or in the `cloud-auth(azure(monitor()))` option of the `http()` destination:

```shell
tenant-id("my-tenant-id")
app-id("my-app-id")
cert-file("/etc/syslog-ng/azure/client.crt")
key-file("/etc/syslog-ng/azure/client.key")
```

In version 4.30 and later, if Azure rejects a request with the `401 Unauthorized` HTTP status, {{< product >}} requests a new access token before it retries the request.

<!-- headings are intentionally level 4, don't change it -->
#### app-id()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         |  |

*Description:* Application (client) ID of the Microsoft Entra application.

#### app-secret()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         |  |

*Description:* The client secret of the Microsoft Entra application. You can use `client-secret()` as an alias of this option. You can't use `app-secret()` together with `cert-file()` and `key-file()`. Otherwise, the configuration is invalid.

#### auth-url()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         | `https://login.microsoftonline.com` |

Available in {{< product >}} 4.29 and later.

*Description:* The Microsoft Entra login host that {{< product >}} requests the OAuth2 access token from. {{< product >}} sends the token request to `<auth-url>/<tenant-id>/oauth2/v2.0/token`. Set this option to reach a national or sovereign cloud instead of the public Azure cloud. For example, for Azure Government, use `auth-url("https://login.microsoftonline.us")`.

#### ca-dir() {#azure-ca-dir}

|                  |                  |
| ---------------- | ---------------- |
| Type: | path |
| Default:         |  |

Available in {{< product >}} 4.30 and later.

*Description:* A directory that contains the CA certificates that {{< product >}} uses to verify the certificate of the login host (see [`auth-url()`](#auth-url)), when it requests the access token. By default, {{< product >}} uses the CA certificates of the system. This option affects only the token request. To verify the server of the destination, use the TLS options of the destination.

#### ca-file() {#azure-ca-file}

|                  |                  |
| ---------------- | ---------------- |
| Type: | path |
| Default:         |  |

Available in {{< product >}} 4.30 and later.

*Description:* A file that contains the CA certificates that {{< product >}} uses to verify the certificate of the login host (see [`auth-url()`](#auth-url)), when it requests the access token. By default, {{< product >}} uses the CA certificates of the system. This option affects only the token request. To verify the server of the destination, use the TLS options of the destination.

#### cert-file() {#azure-cert-file}

|                  |                  |
| ---------------- | ---------------- |
| Type: | path |
| Default:         |  |

Available in {{< product >}} 4.30 and later.

*Description:* The client certificate of the Microsoft Entra application in PEM format, to authenticate with a certificate instead of a client secret. Upload the same certificate to the Microsoft Entra application. You must also set the [`key-file()`](#azure-key-file) option. Otherwise, the configuration is invalid, and {{< product >}} logs the `cert_file() and key_file() must be set together` error. You can use `client-cert()` as an alias of this option.

#### key-file() {#azure-key-file}

|                  |                  |
| ---------------- | ---------------- |
| Type: | path |
| Default:         |  |

Available in {{< product >}} 4.30 and later.

*Description:* The RSA private key of the client certificate (see [`cert-file()`](#azure-cert-file)) in PEM format. {{< product >}} uses it to sign the client assertion of the token request. You can use `client-key()` as an alias of this option.

#### scope()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         | `https://monitor.azure.com//.default` |

*Description:* The scope to request for the access token.

#### tenant-id()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         |  |

*Description:* Directory (tenant) ID of the Microsoft Entra application.
