---
title: Hypr Audit Trail and Hypr App Audit Trail
linktitle: Hypr
weight: 1250
driver: "hypr-audit-trail(), hypr-app-audit-trail()"
short_description: "Fetch events from the Hypr REST API"
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

Starting with version 4.2.0, {{% param "product_name" %}} can fetch events from the [Hypr REST API](https://apidocs.hypr.com/) using the `hypr-audit-trail()` and `hypr-app-audit-trail()` source drivers.

- `hypr-audit-trail()`: is a source driver that pulls messages from the Hypr API, associated to any RP Application ID.
- `hypr-app-audit-trail()`: is a source driver that pulls messages from the Hypr API, but only those associated to a specific RP Application ID.

## Hypr Audit Trail

The `hypr-audit-trail()` source queries the Hypr API for the list of potential applications at startup, then monitors the audit trail for each of the detected applications.

> Note: Applications that are registered after `syslog-ng` is started are not recognized.

To start following those audit trails, you must restart `syslog-ng`.

Example minimal configuration:

```shell
source s_hypr {
    hypr-audit-trail(
        url('https://<custom domain>.hypr.com')
        bearer-token('<base64 encoded bearer token>')
    );
};
```

A more detailed example:

```shell
source s_hypr {
    hypr-audit-trail(
        url('https://<custom domain>.hypr.com')
        bearer-token('<base64 encoded bearer token>')
        page-size(<number of results to return in a single page>)
        initial-hours(<number of hours to search backward on initial fetch>)
        application-skip-list('HYPRDefaultApplication', 'HYPRDefaultWorkstationApplication')
        log-level('INFO')
        flags(<optional flags passed to the source>)
        ignore-persistence(<yes/no>)
    );
};
```

Available options:

- `url()`: custom URL for Hypr API access (`'https://<custom domain>.hypr.com'`)
- `bearer-token()`: base64 encoded authentication token from Hypr
- `page-size()`: number of results to return in a single page (optional - defaults to `100`)
- `initial-hours()`: number of hours to search backward on initial fetch (optional - defaults to `4`)
- `application-skip-list()`: list of rpAppIds not to retrieve from Hypr (optional - defaults to `'HYPRDefaultApplication', 'HYPRDefaultWorkstationApplication'`)
- `log-level()`: logging level, possible values: `"DEBUG"`, `"INFO"`, `"WARNING"`, `"ERROR"`, `"CRITICAL"` (optional - defaults to `"INFO"`)
- `flags()`: flags passed to the source, can be used for example to disable message parsing with `flags(no-parse)` (optional - defaults to empty)
- `ignore-persistence()`: ignores the saved value in the persist file, and starts querying from the current time (optional - defaults to no)

## Hypr App Audit Trail

The `hypr-app-audit-trail()` monitors the audit trail for one specific RP Application ID. This driver requires the `rp-app-id()` parameter in order to operate.

Available options:

- `url()`: custom URL for Hypr API access (`'https://<custom domain>.hypr.com'`)
- `bearer-token()`: base64 encoded authentication token from Hypr
- `rp-app-id()`: the RP Application ID for the application to monitor
- `page-size()`: number of results to return in a single page (optional - defaults to `100`)
- `initial-hours()`: number of hours to search backward on initial fetch (optional - defaults to `4`)
- `log-level()`: logging level, possible values: `"DEBUG"`, `"INFO"`, `"WARNING"`, `"ERROR"`, `"CRITICAL"` (optional - defaults to `"INFO"`)
- `flags()`: flags passed to the source, can be used for example to disable message parsing with `flags(no-parse)` (optional - defaults to empty)
- `ignore-persistence()`: ignores the saved value in the persist file, and starts querying from the current time (optional - defaults to `no`)

## Acknowledgements

This documentation page is based on the README file of the `hypr-audit-trail()` source, written by Dan Elder.
