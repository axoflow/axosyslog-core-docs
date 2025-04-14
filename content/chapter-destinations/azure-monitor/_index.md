---
title: Send data to Azure Monitor and Sentinel
linktitle: "azure-monitor: Azure Monitor and Sentinel"
weight:  150
driver: "azure-monitor()"
short_description: "Send messages to Azure Monitor and Sentinel"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.10.0, {{% param "product_name" %}} can send data to [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/overview) using its [HTTP REST Logs ingestion API](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/logs-ingestion-api-overview#rest-api-call). Data sent to Azure Monitor's Log Analytics is also available from [Microsoft Sentinel](https://learn.microsoft.com/en-us/azure/sentinel/data-transformation).

{{% alert title="Note" color="info" %}}
Version 4.10 introduced the `azure-monitor-builtin()` and `azure-monitor-custom()` destinations. These were deprecated and unified as `azure-monitor()` in version 4.11.

Also, the `table-name()` option of the driver has been renamed to `stream-name()`.
{{% /alert %}}

## Prerequisites

- An Azure subscription.
- A [Microsoft Entra application](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/tutorial-logs-ingestion-portal#create-azure-ad-application). You'll need the Tenant ID, App ID, and App Secret of the application to configure the {{< product >}} destination.
- A [Data Collection Endpoint (DCE)](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-endpoint-overview?tabs=portal)
- A [Data Collection Rule (DCR)](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-create-edit?tabs=portal)
- A [Log Analytics Workspace in Azure](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-workspace-overview).

For details, see the [Tutorial: Send data to Azure Monitor Logs with Logs ingestion API](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/tutorial-logs-ingestion-portal).

## Configuration

The `azure-monitor()` driver sends data to the built-in tables of Azure Monitor. The body of the message (`${MESSAGE}`) must be in JSON format. The keys in the JSON array must have the same names as the columns of the table (you can use [`format-json`]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-format-json" >}}) or ['FilterX`]({{< relref "/filterx/_index.md" >}})). If a field is empty, or Azure cannot parse it, it will be blank. The following example sends data to the [syslog table](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/syslog).

```sh
destination d_azure_builtin {
  azure-monitor(
    stream-name("syslog")
    dcr-id("my-dcr-id")
    dce-uri("https://dce-uri.ingest.monitor.azure.com")
    template("$MESSAGE")
    auth(tenant-id("my-tenant-id") app-id("my-app-id") app-secret("my-app-secret"))
  );
};
```

This driver is actually a reusable configuration snippet configured to send log messages using the `http()` driver using a template. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/main/scl/azure/azure-monitor.conf).

## Options

The following options are specific to the `azure-monitor()` destination. But since this destination is based on the `http()` destination, you can use the [options of the `http()` destination]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}) as well if needed.

> Note: The `azure-monitor()` destination automatically configures some of these `http()` destination options as required by the Azure Monitor Logs ingestion API.

<!-- FIXME xinclude the http options -->

## auth()

Options for OAUTH2 authentication for Azure.

{{< include-headless "chunk/option-azure-cloud-auth.md" >}}

## dce-uri()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The URI of your Data Collection Endpoint (DCE).

## dcr-id()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The ID of the Azure Monitor Data Collection Rule (DCR) where {{% param "product_name" %}} sends the data.

## table-name()

This option was available in version 4.10, but has been deprecated in 4.11. Use [`stream-name()`](#stream-name) instead.

## stream-name()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The name of the table in the Log Analytics Workspace where {{% param "product_name" %}} sends the data, for example, [syslog](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/syslog).
