---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

<!-- headings are intentionally level 4, don't change it -->
#### service-account()

Authenticate to a service account using Service Account Key-Based Authentication. This method works both inside and outside GCP It uses a [service account key](https://cloud.google.com/iam/docs/keys-create-delete) generated and downloaded through the GCP IAM & Admin console. The long-term service account key is used to generate short-term tokens for authentication (also called [self-signed JWT](https://google.aip.dev/auth/4111)).

##### audience()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         |  |

{{% alert title="Note" color="info" %}}
When using the `google-pubsub()` destination, the `audience()` option is set to `https://pubsub.googleapis.com/google.pubsub.v1.Publisher`. Don't change it.
{{% /alert %}}

##### key()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string (path) |
| Default:         |  |

Path to the service account key.

##### token-validity-duration()

|                  |                  |
| ---------------- | ---------------- |
| Type: | integer (seconds) |
| Default:         | `3600` |

#### user-managed-service-account()

Available in {{< product >}} version 4.6 and later.

{{% alert title="Note" color="info" %}}
The `user-managed-service-account()` method is only available for VMs running within GCP.
{{% /alert %}}

Authenticate to a [user-managed service account](https://cloud.google.com/iam/docs/service-account-types#user-managed) of a GCP virtual machine using the VM Metadata Server Method. {{< product >}} interacts with the internal GCP metadata server, which provides an OAuth2 token for authentication. You can attach the [default service accounts](https://cloud.google.com/iam/docs/service-account-types#default) as well.

##### metadata-url()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         | `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts` |

The URL of the metadata server. When specifying the port, use the `URL:port` format.

##### name()

|                  |                  |
| ---------------- | ---------------- |
| Type: | string |
| Default:         | `default` |

Name of the service account to use.
