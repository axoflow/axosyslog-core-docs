---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
To authenticate, you need to register a [Microsoft Entra application](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/tutorial-logs-ingestion-portal#create-azure-ad-application). You'll need the Tenant ID, App ID, and App Secret of this application to configure the {{< product >}} destination.

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

*Description:* The Client secret of the Microsoft Entra application.

#### auth-url()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         | `https://login.microsoftonline.com` |

Available in {{< product >}} 4.29 and later.

*Description:* The Microsoft Entra login host that {{< product >}} requests the OAuth2 access token from. {{< product >}} sends the token request to `<auth-url>/<tenant-id>/oauth2/v2.0/token`. Set this option to reach a national or sovereign cloud instead of the public Azure cloud. For example, for Azure Government, use `auth-url("https://login.microsoftonline.us")`.

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
