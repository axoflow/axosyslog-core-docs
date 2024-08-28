---
---
Note the following points:

- Regular expressions are case sensitive by default.
- You can use [regexp constants](https://www.gnu.org/software/gawk/manual/html_node/Regexp-Constants.html) (slash-enclosed regexps) within filterx blocks to simplify escaping special characters, for example, `/^beginning and end$/`.
- Filterx regular expressions are interpreted in ["leave the backslash alone mode"](https://www.gnu.org/software/gawk/manual/html_node/Escape-Sequences.html), meaning that a backslash in a string before something that doesn't need to be escaped leave the backslash alone. For example, `string\more-string` is equivalent to `string\\more-string`.
<!--  - For a list of escape sequences, see FIXME -->