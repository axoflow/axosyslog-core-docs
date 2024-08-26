---
---
Note the following points:

- Regular expressions are case sensitive by default.
- You can use [regexp constants](https://www.gnu.org/software/gawk/manual/html_node/Regexp-Constants.html) (slash-enclosed regexps) within filterx blocks to simplify escaping special characters, for example, `/^beginning and end$/`.
- Filterx regular expressions are interpreted in ["leave the backslash alone mode"](https://www.gnu.org/software/gawk/manual/html_node/Escape-Sequences.html), meaning that a backslash in a string before something that doesn't need to be escaped leave the backslash alone. For example, `string\more-string` is equivalent to `string\\more-string`.
- Like the `awk` tool, {{< product >}} always returns the first argument as the `0` capturing group. If you don't need it, you must explicitly unset it, for example:

    ```shell
    $MY-LIST = json();
    $MY-LIST = regexp_search("first-word second-part third", /(first-word)(second-part)(third)/);
    # $MY-LIST contains: ["first-word second-part third", "first-word", "second-part", "third"]
    unset($MY-LIST[0]);
    # $MY-LIST contains: ["first-word", "second-part", "third"]
    ```

<!--  - For a list of escape sequences, see FIXME -->