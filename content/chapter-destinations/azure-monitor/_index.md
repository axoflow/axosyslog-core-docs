---
title: Send data to Azure Monitor
linktitle: "azure-monitor-custom: Send messages to Azure Monitor"
weight:  150
driver: "azure-monitor-custom()"
short_description: "Send messages to Azure Monitor"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.10.0, {{% param "product_name" %}} can send data to [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/overview) using its [HTTP REST Logs ingestion API](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/logs-ingestion-api-overview#rest-api-call).

## Prerequisites

- An Azure subscription.
- A [Microsoft Entra application](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/tutorial-logs-ingestion-portal#create-azure-ad-application). You'll need the Tenant ID, App ID, and App Secret of the application to configure the {{< product >}} destination.
- A [Data Collection Endpoint (DCE)](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-endpoint-overview?tabs=portal)
- A [Data Collection Rule (DCR)](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-create-edit?tabs=portal)
- A [Log Analytics Workspace in Azure](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-workspace-overview).
- A [custom table](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/create-custom-table?tabs=azure-portal-1%2Cazure-portal-2%2Cazure-portal-3#create-a-custom-table) in the Log Analytics Workspace.

For details, see the [Tutorial: Send data to Azure Monitor Logs with Logs ingestion API](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/tutorial-logs-ingestion-portal).

## Configuration

To configure {{% param "product_name" %}}, you'll need the name of the project and the topic where you want to send your data.

Example configuration:

```sh
destination d_azure {
  azure-monitor-custom(
    table-name("my-table")
    dcr-id("my-dcr-id")
    dce-uri("https://dce-uri.ingest.monitor.azure.com")

    auth(tenant-id("my-tenant-id") app-id("my-app-id") app-secret("my-app-secret"))
  );
};
```

{{< include-headless "chunk/destination-note-azure-monitor-table-name.md" >}}

This driver is actually a reusable configuration snippet configured to send log messages using the `http()` driver using a template. You can find the source of this configuration snippet on [GitHub](https://github.com/axoflow/axosyslog/blob/main/scl/azure/azure-monitor.conf).

## Options

The following options are specific to the `azure-monitor-custom()` destination. But since this destination is based on the `http()` destination, you can use the [options of the `http()` destination]({{< relref "/chapter-destinations/configuring-destinations-http-nonjava/reference-destination-http-nonjava/_index.md" >}}) as well if needed.

> Note: The `azure-monitor-custom()` destination automatically configures some of these `http()` destination options as required by the Azure Monitor Logs ingestion API.

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

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* A custom table in the Log Analytics Workspace where {{% param "product_name" %}} sends the data.

{{< include-headless "chunk/destination-note-azure-monitor-table-name.md" >}}
