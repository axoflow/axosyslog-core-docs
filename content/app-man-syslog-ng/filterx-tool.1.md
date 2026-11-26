---
title: "The filterx-tool manual page"
linkTitle: "filterx-tool"
weight:  4900
---

<span id="filterx-tool.1"></span>

## Name

`filterx-tool` — Work with FilterX code outside a running {{% param "product.abbrev" %}}

## Synopsis

`filterx-tool [command] [options] <file>`

## Description

Available in {{< product >}} 4.30 and later.

The `filterx-tool` application is a command-line utility for working with [FilterX]({{< relref "/filterx/_index.md" >}}) code without starting {{% param "product.abbrev" %}}. For example, you can use it to check the syntax of a FilterX script in a CI pipeline before you deploy the configuration that includes it.

{{< warning >}}
`filterx-tool` is experimental. Its commands, options, and output format can change in later releases without notice.
{{< /warning >}}

Running `filterx-tool` without a command prints a short description of the tool and the list of available commands.

## The script command

`script [options] <file>`

Use the `script` command to process a file that contains FilterX code. The file contains FilterX statements, the same code that you write inside a `filterx {}` block, without the enclosing block.

You must set exactly one of the `--syntax-only` and `--print-ast` options. Running a script is not supported yet. The command returns 0 if the file is valid FilterX code, 1 otherwise. On a syntax error, `filterx-tool` prints the error and its location to `stderr`.

The `script` command has the following options:

- `--help` or `-h`

    Display a brief help message.

- `--print-ast` or `-p`

    Parse the file, and print its abstract syntax tree (AST) to the standard output in JSON format.

- `--syntax-only` or `-s`

    Parse the file, and print `Syntax OK` if it is valid FilterX code.

### Example: The script command

Check the syntax of a FilterX script:

```shell
filterx-tool script --syntax-only /etc/syslog-ng/conf.d/normalize.fx
```

If the file is valid, the output is:

```shell
Syntax OK
```

Print the abstract syntax tree of the same file:

```shell
filterx-tool script --print-ast /etc/syslog-ng/conf.d/normalize.fx
```

## Files

`/usr/bin/filterx-tool`

## See also

[syslog-ng.conf.5](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/syslog-ng.conf.5/)

[syslog-ng.8](https://axoflow.com/docs/axosyslog-core/app-man-syslog-ng/syslog-ng.8/)

{{< include-headless "chunk/manpage-more-info.md" >}}
