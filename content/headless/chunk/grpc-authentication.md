<!-- This file is under the copyright of Axoflow, and licensed under Apache License 2.0, except for using the Axoflow and AxoSyslog trademarks. -->

<!-- Used in the opentelemetry(), loki(), and axosyslog-otlp drivers -->
## auth() {#auth}

You can set authentication in the `auth()` option of the driver. By default, authentication is disabled (`auth(insecure())`).

The following authentication methods are available in the `auth()` block:

### adc() {#adc}

[Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/application-default-credentials). This authentication method is only available for destinations.

#### service-account-key()

Available in {{< product >}} version 4.15 and later.

Use the specified service account key for ADC authentication. File path must be the absolute path. For example:

```shell
auth(adc(service-account-key("absolute-path-to-key-file")))
```

### alts() {#alts}

[Application Layer Transport Security (ALTS)](https://grpc.io/docs/languages/cpp/alts/) is a simple to use authentication, only available within Google's infrastructure. It accepts the `target-service-account()` option, where you can list service accounts to match against when authenticating the server.

{{< if "opentelemetry" >}}
```shell
  opentelemetry(
    port(4317)
    auth(alts())
  );
```
{{< /if >}}
{{< if "loki" >}}
```shell
destination d_loki {
    loki(
      port(12345)
      auth(alts())
    );
  };
```
{{< /if >}}
{{< if "axosyslog-otlp" >}}
```shell
  axosyslog-otlp(
    port(4317)
    auth(alts())
  );
```
{{< /if >}}

### insecure() {#insecure}

This is the default method, authentication is disabled (`auth(insecure())`).

### tls() {#tls}

{{% alert title="Note" color="info" %}}
gRPC-based drivers have a different `tls()` block implementation from the `network()` or `http()` drivers, but most features are the same.
{{% /alert %}}

{{< if "opentelemetry" >}}
```shell
destination d_otlp {
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
{{< /if >}}
{{< if "loki" >}}
```shell
destination d_loki {
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
{{< /if >}}
{{< if "axosyslog-otlp" >}}
```shell
destination d_otlp {
    axosyslog-otlp(
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
{{< /if >}}
{{< if "bigquery" >}}
```shell
destination d_bigquery {
    bigquery(
      ...
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
{{< /if >}}
{{< if "clickhouse" >}}
```shell
destination d_clickhouse {
    clickhouse(
      ...
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
{{< /if >}}

`tls()` accepts the following options.

#### ca-file()

{{< include-headless "chunk/option-destination-tls-ca-file-description.md" >}}

#### cert-file()

{{< include-headless "chunk/option-destination-tls-cert-file-description.md" >}}

#### key-file()

{{< include-headless "chunk/option-destination-tls-key-file-description.md" >}}

{{< if source_type_grpc >}}
#### peer-verify()

{{< readfile "/headless/chunk/option-destination-tls-peer-verify-description.md" >}}

{{< /if >}}
