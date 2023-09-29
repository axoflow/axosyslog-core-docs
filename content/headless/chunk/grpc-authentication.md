---
---
<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

<!-- Used in the opentelemetry() and loki() drivers -->
## auth() {#auth}

You can set authentication in the `auth()` option of the driver. By default, authentication is disabled (`auth(insecure())`).

The following authentication methods are available in the `auth()` block:

### adc() {#adc}

[Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/application-default-credentials). This authentication method is only available for destinations.

### alts() {#alts}

[Application Layer Transport Security (ALTS)](https://grpc.io/docs/languages/cpp/alts/) is a simple to use authentication, only available within Google's infrastructure. It accepts the `target-service-account()` option, where you can list service accounts to match against when authenticating the server.

{{< tabpane text=true right=true >}}
{{% tab header="Driver:" disabled=true /%}}
{{% tab header="`opentelemetry()`" lang="opentelemetry" %}}
```shell
source {
    opentelemetry(
      port(12345)
      auth(alts())
    );
  };
```
{{% /tab %}}
{{% tab header="`loki()`" lang="loki" %}}
```shell
destination {
    loki(
      port(12345)
      auth(alts())
    );
  };
```
{{% /tab %}}
{{< /tabpane >}}

### insecure() {#insecure}

This is the default method, authentication is disabled (`auth(insecure())`).

### tls() {#tls}

<!-- FIXME xinclude these from the other tls blocks -->

`tls()` accepts the `key-file()`, `cert-file()`, `ca-file()` and `peer-verify()` (possible values:
`required-trusted`, `required-untrusted`, `optional-trusted` and `optional-untrusted`) options.

{{< tabpane text=true right=true >}}
{{% tab header="Driver:" disabled=true /%}}
{{% tab header="`opentelemetry()`" lang="opentelemetry" %}}
```shell
destination {
    opentelemetry(
      url("your-otel-server:12346")
      auth(
        tls(
          ca-file("/path/to/ca.pem")
          key-file("/path/to/key.pem")
          cert-file("/path/to/cert.pem")
        )
      )
    );
  };
```
{{% /tab %}}
{{% tab header="`loki()`" lang="loki" %}}
```shell
destination {
    loki(
      url("your-loki-server:12346")
      auth(
        tls(
          ca-file("/path/to/ca.pem")
          key-file("/path/to/key.pem")
          cert-file("/path/to/cert.pem")
        )
      )
    );
  };
```
{{% /tab %}}
{{< /tabpane >}}

> Note:
>
> - `tls(peer-verify())` is not available for the `opentelemetry()` and `loki()` destination.
> - The gRPC-based drivers (`opentelemetry()` and `loki()`) have a different `tls()` block implementation from the `network()` or `http()` drivers. Most features are the same.
