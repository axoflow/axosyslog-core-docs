---
---
When configured, it changes the newline definition used in PCRE regular expressions to accept either of the following:

- a single carriage-return
- linefeed
- the sequence carriage-return and linefeed (`\\r`, `\\n` and `\\r\\n`, respectively)

This newline definition is used when the circumflex and dollar patterns (`^` and `$`) are matched against an input. By default, PCRE interprets the linefeed character as indicating the end of a line. It does not affect the `\\r`, `\\n` or `\\R` characters used in patterns.
