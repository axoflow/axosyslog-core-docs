---
title: AxoSyslog on macOS
linktitle: macOS
weight: 450
description: "Build AxoSyslog from source on macOS with Homebrew dependencies, and see which modules the macOS build leaves out."
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

{{% param "product.name" %}} has no official macOS package or Homebrew formula. For production use, run {{% param "product.name" %}} on a Linux host or as a container. For details, see {{% xref "/install/_index.md" %}} and {{% xref "/install/docker/_index.md" %}}.

To develop, test, or collect logs locally on a Mac, build {{% param "product.name" %}} from source. The upstream CI builds and tests {{% param "product.name" %}} on macOS 15 and the latest macOS GitHub runner.

{{% alert title="Note" color="info" %}}
The [macOS CI workflow](https://github.com/axoflow/axosyslog/blob/main/.github/workflows/macos.yml) is the authoritative source for the exact environment variables and build flags. The steps on this page are an outline, and the flags can change between releases.
{{% /alert %}}

## Build from source

1. Install [Homebrew](https://brew.sh/), then clone the source code.

    ```shell
    git clone https://github.com/axoflow/axosyslog.git
    cd axosyslog
    ```

1. Install the build dependencies listed in the [`contrib/Brewfile`](https://github.com/axoflow/axosyslog/blob/main/contrib/Brewfile).

    ```shell
    brew update
    brew bundle --file=contrib/Brewfile
    ```

1. Point the build to the Homebrew libraries and to the Homebrew version of `bison`.

    ```shell
    HOMEBREW_PREFIX="$(brew --prefix)"
    export PKG_CONFIG_PATH="${HOMEBREW_PREFIX}/opt/openssl@3/lib/pkgconfig:${HOMEBREW_PREFIX}/opt/net-snmp/lib/pkgconfig:${HOMEBREW_PREFIX}/lib/pkgconfig:${PKG_CONFIG_PATH}"
    export PATH="${HOMEBREW_PREFIX}/opt/bison/bin:${PATH}"
    export CFLAGS="-I${HOMEBREW_PREFIX}/include"
    export LDFLAGS="-L${HOMEBREW_PREFIX}/lib"
    ```

1. Configure, build, and install {{% param "product.name" %}}. Replace `<install-dir>` with the directory to install to. You can use either autotools or CMake.

    - With autotools:

        ```shell
        ./autogen.sh
        ./configure --prefix=<install-dir> \
          --with-ivykis=system --with-python=3 --with-systemd-journal=no \
          --disable-smtp --disable-java --disable-java-modules \
          --disable-pacct --disable-stackdump --disable-jit
        make
        make install
        ```

    - With CMake:

        ```shell
        cmake --install-prefix <install-dir> -B build . \
          -DIVYKIS_SOURCE=system -DPYTHON_VERSION=3 -DENABLE_JOURNALD=OFF \
          -DENABLE_AFSMTP=OFF -DENABLE_GRPC=OFF -DENABLE_JAVA=OFF \
          -DENABLE_JAVA_MODULES=OFF -DENABLE_PACCT=OFF -DENABLE_LIBUNWIND=OFF
        cmake --build build --target install
        ```

## Limitations

The macOS builds disable the following modules:

- the `systemd-journal()` source
- the `smtp()` destination
- Java and the Java-based modules
- the `pacct()` source
- stack dumps on crash (`--disable-stackdump`)

The CMake build also disables the gRPC-based modules, for example, `opentelemetry()`, `loki()`, and `bigquery()`. On macOS 14, an incompatibility between Apache Arrow and Apple clang ([apache/arrow#49841](https://github.com/apache/arrow/issues/49841)) breaks the `arrow-flight` module. Disable it with `--disable-arrow-flight` (autotools) or `-DENABLE_ARROW_FLIGHT=OFF` (CMake).

## Collect macOS system logs

macOS has its own logging system. To collect its logs, use the `darwin-oslog()` and `darwin-oslog-stream()` sources. For details, see {{% xref "/chapter-sources/darwin/_index.md" %}}.

## Run as a service

The source tree includes a sample `launchd` property list at [`contrib/com.syslog-ng.syslog-ng.plist`](https://github.com/axoflow/axosyslog/blob/main/contrib/com.syslog-ng.syslog-ng.plist). Adjust the paths to match your `<install-dir>` before you use it.
