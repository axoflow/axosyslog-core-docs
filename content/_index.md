---
title: AxoSyslog documentation
type: docs
cascade:
  type: docs
aliases:
- /ose-preface/feedback/
- /ose-preface/acknowledgements/
---

{{< include-headless "axosyslog-intro.md" >}}

If you want to try running `syslog-ng` in a container, or use it as a log collector in Kubernetes, try {{% param "product.abbrev" %}}! See {{% xref "/install/_index.md" %}} to get started.

## Feedback

Any feedback is greatly appreciated, especially on what else this document should cover. General comments, errors found in the text, and any suggestions about how to improve the documentation are also welcome as [GitHub issues](https://github.com/axoflow/axosyslog-core-docs/issues), or on the [Axoflow Discord server](https://discord.gg/583Z4wjem2).

## Support

{{< include-headless "chunk/support.md" >}}

## Documentation license

This documentation is originally based on the [syslog-ng Open Source Edition documentation](https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2) for version 3.38 and is used in compliance with the terms of [The syslog-ng Open Source Edition Documentation License]({{< relref "/documentation-license/_index.md" >}}). We are continuously working on it to keep it up-to-date with the latest released version of [AxoSyslog](https://github.com/axoflow/axosyslog/) (currently {{% param "product.version" %}}).

In compliance with the above license, `syslog-ng` is used only to refer to the binary of the application, or in filenames, pathnames, and similar technical terms. For all other references, we use the AxoSyslog name. Syslog-ng is a trademark of One Identity.

New files and modifications compared to the [syslog-ng Open Source Edition documentation](https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2) are under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks.

The Axoflow and AxoSyslog trademarks and logos are trademarks of Axoflow Inc. All other trademarks are property of their respective owners.

This documentation is maintained by Axoflow, and continually updated for new releases.

## Acknowledgements

We would like to express our gratitude to everyone involved with the project, including the syslog-ng developers, advocates, and documentation maintainers who worked at BalaBit or are still working at One Identity, or who helped the project as external contributors, users, or as part of the community.
