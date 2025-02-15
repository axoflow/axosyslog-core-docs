When receiving messages, {{< product >}} can check whether the hostname contains valid characters.

Valid characters are:

- alphanumeric characters (A-Z, a-z, 0-9)
- the dash (`-`) and underscore (`_`) characters
- the dot (`.`) and the colon (`:`) characters
- the `@` and slash (`/`)

If the hostname contains invalid characters, {{< product >}} sets the `syslog.invalid_hostname` tag for the message, and doesn't parse the `${HOST}` field from the message.
