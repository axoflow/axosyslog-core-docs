---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->
To authenticate, you need to register a [Microsoft Entra application](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/tutorial-logs-ingestion-portal#create-azure-ad-application). You'll need the Tenant ID, App ID, and App Secret of this application to configure the {{< product >}} destination.

### app-id()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         |  |

*Description:* Application (client) ID of the Microsoft Entra application.

### app-secret()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         |  |

*Description:* The Client secret of the Microsoft Entra application.

### tenant-id()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         |  |

*Description:* Directory (tenant) ID of the Microsoft Entra application.
