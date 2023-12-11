---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

AxoSyslog provides [cloud-ready `syslog-ng` images](https://github.com/axoflow/axosyslog-docker/). These images differ from the [upstream syslog-ng images](https://hub.docker.com/r/balabit/syslog-ng/), because:

- They're based on Alpine Linux, instead of Debian testing for reliability and smaller size (thus smaller attack surface).
- They incorporate cloud-native features and settings, such as the Kubernetes source.
- They incorporate container-level optimizations for better performance and improved security. For example, they use an alternative malloc library.
- They support the ARM architecture.

The AxoSyslog images support the following architectures:

- amd64
- arm/v7
- arm64
