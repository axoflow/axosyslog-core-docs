---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

<!-- Used for both HTTP and gRPC-based pubsub destination -->

- A [Google Pub/Sub subscription](https://cloud.google.com/pubsub?hl=en).
- An [IAM service account](https://cloud.google.com/iam/docs/service-account-overview) that {{% param "product_name" %}} uses for authentication.
- A Google Cloud project that has the Pub/Sub API enabled.

For details, see the [Google Pub/Sub tutorial](https://cloud.google.com/pubsub/docs/building-pubsub-messaging-system#before_you_begin).

<!-- FIXME Do we need more details about how to set up the Google side? -->