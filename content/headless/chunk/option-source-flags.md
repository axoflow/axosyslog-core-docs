---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

## flags()

|          |       |
| -------- | ----- |
| Type:    | assume-utf8, dont-store-legacy-msghdr, empty-lines, expect-hostname, kernel, no-hostname, no-multi-line, no-parse, sanitize-utf8, store-legacy-msghdr, store-raw-message, syslog-protocol, validate-utf8 |
| Default: | empty set |

*Description:* Specifies the log parsing options of the source.

- *assume-utf8*: The `assume-utf8` flag assumes that the incoming messages are UTF-8 encoded, but does not verify the encoding. If you explicitly want to validate the UTF-8 encoding of the incoming message, use the `validate-utf8` flag.
- *dont-store-legacy-msghdr*: By default, AxoSyslog stores the original incoming header of the log message. This is useful if the original format of a non-syslog-compliant message must be retained (AxoSyslog automatically corrects minor header errors, for example, adds a whitespace before `msg` in the following message: `Jan 22 10:06:11 host program:msg`). If you do not want to store the original header of the message, enable the `dont-store-legacy-msghdr` flag.

    For Python sources, see `store-legacy-msghdr`.

- *empty-lines*: Use the `empty-lines` flag to keep the empty lines of the messages. By default, {{% param "product.abbrev" %}} removes empty lines automatically.
- *exit-on-eof*: If this flag is set on a source, {{< product >}} stops when an EOF (end of file) is received. Available in version 4.9 and later.
- *expect-hostname*: If the `expect-hostname` flag is enabled, {{% param "product.abbrev" %}} will assume that the log message contains a hostname and parse the message accordingly. This is the default behavior for TCP sources. Note that pipe sources use the `no-hostname` flag by default.
- *guess-timezone*: Attempt to guess the timezone of the message if this information is not available in the message. Works when the incoming message stream is close to real time, and the timezone information is missing from the timestamp.
- *kernel*: The `kernel` flag makes the source default to the `LOG_KERN | LOG_NOTICE` priority if not specified otherwise.
- *no-header*: The `no-header` flag triggers {{% param "product.abbrev" %}} to parse only the `PRI` field of incoming messages, and put the rest of the message contents into `$MSG`.

    Its functionality is similar to that of the `no-parse` flag, except the `no-header` flag does not skip the `PRI` field.

    {{% alert title="Note" color="info" %}}
Essentially, the `no-header` flag signals {{% param "product.abbrev" %}} that the `syslog` header is not present (or does not adhere to the conventions / RFCs), so the entire message (except from the `PRI` field) is put into `$MSG`.
    {{% /alert %}}

    ### Example: using the no-header flag with the syslog-parser() parser
    
    The following example illustrates using the `no-header` flag with the `syslog-parser()` parser:
    
    ```shell
        parser p_syslog {
          syslog-parser(
            flags(no-header)
          );
        };
    ```

- *no-hostname*: Enable the `no-hostname` flag if the log message does not include the hostname of the sender host. That way {{% param "product.abbrev" %}} assumes that the first part of the message header is ${PROGRAM} instead of ${HOST}. For example:
    
    ```shell
        source s_dell {
            network(
                port(2000)
                flags(no-hostname)
            );
        };
    ```

- *no-multi-line*: The `no-multi-line` flag disables line-breaking in the messages: the entire message is converted to a single line. Note that this happens only if the underlying transport method actually supports multi-line messages. Currently the `file()` and `pipe()` drivers support multi-line messages.
- *no-parse*: By default, {{% param "product.abbrev" %}} parses incoming messages as syslog messages. The `no-parse` flag completely disables syslog message parsing and processes the complete line as the message part of a syslog message. The {{% param "product.abbrev" %}} application will generate a new syslog header (timestamp, host, and so on) automatically and put the entire incoming message into the MESSAGE part of the syslog message (available using the `${MESSAGE}` macro). This flag is useful for parsing messages not complying to the syslog format.

    {{% include-headless "chunk/para-flags-no-parse.md" %}}

- *sanitize-utf8*: When using the `sanitize-utf8` flag, {{% param "product.abbrev" %}} converts non-UTF-8 input to an escaped form, which is valid UTF-8.

    Prior to version 4.6, this flag worked only when parsing RFC3164 messages. Starting with version 4.6, it works also for RFC5424 and raw messages.

- *store-legacy-msghdr*: Available only when using the Python sources ([`python()`]({{< relref "/chapter-sources/python-source/_index.md" >}}) and [`python-fetcher()`]({{< relref "/chapter-sources/python-fetcher-source/_index.md" >}})). If set, {{< product >}} stores the original incoming header of the log message.

    For other sources, see `dont-store-legacy-msghdr`.

- *store-raw-message*: Save the original message as received from the client in the `${RAWMSG}` macro. You can forward this raw message in its original form to another AxoSyslog node using the [`syslog-ng()` destination]({{< relref "/chapter-destinations/destination-syslog-ng/_index.md" >}}), or to a SIEM system, ensuring that the SIEM can process it. Available only in 3.16 and later.
- *syslog-protocol*: The `syslog-protocol` flag specifies that incoming messages are expected to be formatted according to the new IETF syslog protocol standard (RFC5424), but without the frame header. Note that this flag is not needed for the `syslog` driver, which handles only messages that have a frame header.

- *validate-utf8*: The `validate-utf8` flag enables encoding-verification for messages.

    Prior to version 4.6, this flag worked only when parsing RFC3164 messages. Starting with version 4.6, it works also for RFC5424 and raw messages.

    For RFC5424-formatted messages, if the BOM character is missing, but the message is otherwise UTF-8 compliant, {{% param "product_name" %}} automatically adds the BOM character to the message.

    {{% include-headless "chunk/para-bom-definition.md" %}}
