Starting with {{% param "product.abbrev" %}} version 4.5, you can omit the `columns()` option, and extract the values into matches (`$1`, `$2`, `$3`, and so on), which are available as the anonymous list `$*`. For example:

```sh
@version: current

log {
    source { tcp(port(2000) flags(no-parse)); };

    parser { csv-parser(delimiters(',') dialect(escape-backslash)); };
    destination { stdout(template("$ISODATE $*\n")); };
};
```
