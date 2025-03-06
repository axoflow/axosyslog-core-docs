---
title: Send data to Azure Monitor and Sentinel
linktitle: "azure-monitor-builtin, azure-monitor-custom: Azure Monitor and Sentinel"
weight:  150
driver: "azure-monitor-builtin(), azure-monitor-custom()"
short_description: "Send messages to Azure Monitor and Sentinel"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.10.0, {{% param "product_name" %}} can send data to [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/overview) using its [HTTP REST Logs ingestion API](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/logs-ingestion-api-overview#rest-api-call). Data sent to Azure Monitor's Log Analytics is also available from [Microsoft Sentinel](https://learn.microsoft.com/en-us/azure/sentinel/data-transformation).

## Prerequisites

- An Azure subscription.
- A [Microsoft Entra application](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/tutorial-logs-ingestion-portal#create-azure-ad-application). You'll need the Tenant ID, App ID, and App Secret of the application to configure the {{< product >}} destination.
- A [Data Collection Endpoint (DCE)](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-endpoint-overview?tabs=portal)
- A [Data Collection Rule (DCR)](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-create-edit?tabs=portal)
- A [Log Analytics Workspace in Azure](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-workspace-overview).
- To send logs to a [custom table](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/create-custom-table?tabs=azure-portal-1%2Cazure-portal-2%2Cazure-portal-3#create-a-custom-table) with the `azure-monitor-custom()` destination, create the table in the Log Analytics Workspace.

For details, see the [Tutorial: Send data to Azure Monitor Logs with Logs ingestion API](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/tutorial-logs-ingestion-portal).

## Configuration

To configure {{% param "product_name" %}}, you'll need the name of the table and and the topic where you want to send your data.

The body of the message (`${MESSAGE}`) must be in JSON format. The keys in the JSON array must have the same names as the columns of the table (you can use [`format-json`]({{< relref "/chapter-manipulating-messages/customizing-message-format/reference-template-functions/_index.md#template-function-format-json" >}}) or ['FilterX`]({{< relref "/filterx/_index.md" >}})). If a field is empty, or Azure cannot parse it, it will be blank.

- The `azure-monitor-builtin()` driver sends data to the built-in tables of Azure Monitor, for example, the [syslog table](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/syslog).

    ```sh
    destination d_azure_builtin {
      azure-monitor-builtin(
        table_name("syslog")
        dcr-id("my-dcr-id")
        dce-uri("https://dce-uri.ingest.monitor.azure.com")
        template("$MESSAGE")
        auth(tenant-id("my-tenant-id") app-id("my-app-id") app-secret("my-app-secret"))
      );
    };
    ```

- To send data into custom tables, use the `azure-monitor-custom()` driver. For example:

    ```sh
    destination d_azure_custom {
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

*Description:* The URI of your [Data Collection Endpoint (DCE)](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-endpoint-overview?tabs=portal).

## dcr-id()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* The ID of the Azure Monitor [Data Collection Rule (DCR)](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-create-edit?tabs=portal) where {{% param "product_name" %}} sends the data.

## table-name()

|          |                            |
| -------- | -------------------------- |
| Type:    | string |
| Default: | - |

*Description:* A custom table in the Log Analytics Workspace where {{% param "product_name" %}} sends the data.

{{< include-headless "chunk/destination-note-azure-monitor-table-name.md" >}}