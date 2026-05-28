# AxoSyslog Documentation Style Guide

This style guide is specific to the AxoSyslog project and extends the generic style guide (`.claude/docs/style-guide.md`).

## Terminology

| Use | Avoid |
|-----|-------|
| AxoSyslog | Axosyslog, axosyslog, AxoSysLog |
| syslog-ng | syslog_ng, SyslogNG, Syslog-ng |
| destination | sink, output (unless quoting config keys) |
| source | input (unless quoting config keys) |
| parser | Parse filter |
| log path | pipeline |
| configuration file | config, conf |

- In prose, use the `{{% param "product.name" %}}` shortcode instead of "AxoSyslog". In the frontmatter of a page, use AxoSyslog.

## Code and configuration

- For AxoSyslog configuration syntax, use `shell` as the
  language identifier in fenced code blocks.

## Versioning notes

- When documenting a feature introduced in a specific AxoSyslog version, add the following at the top of the relevant section: "Available in {{% param "product.name" %}} <version-number> and later."
