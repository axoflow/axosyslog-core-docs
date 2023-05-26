---
title: "Pattern parsers of syslog-ng OSE"
weight:  100
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->

The following parsers are available in {{% param "product.abbrev" %}}.


## @ANYSTRING@ {#patterndb-parser-anystring}

Parses everything to the end of the message, you can use it to collect everything that is not parsed specifically to a single macro. In that sense its behavior is similar to the `greedy()` option of the CSV parser.



## @DOUBLE@ {#patterndb-parser-double}

An obsolete alias of the `@FLOAT@` parser.



## @EMAIL@ {#patterndb-parser-email}

This parser matches an email address. The parameter is a set of characters to strip from the beginning and the end of the email address. That way email addresses enclosed between other characters can be matched easily (for example, `\<user@example.com\>` or `"user@example.com"`. Characters that are valid for a hostname are not stripped from the end of the hostname. This includes a trailing period if present.

For example, the `@EMAIL:email:"[\<]\>@` parser will match any of the following email addresses: `\<user@example.com\>`, `[user@example.com]`, `"user@example.com"`, and set the value of the `email` macro to `user@example.com`.



## @ESTRING@ {#patterndb-parser-estring}

This parser has a required parameter that acts as the stopcharacter: the parser parses everything until it finds the stopcharacter. For example, to stop by the next `"` (double quote) character, use `@ESTRING::"@`. You can use the colon (`:`) as stopcharacter as well, for example: `@ESTRING:::@`. You can also specify a stopstring instead of a single character, for example, `@ESTRING::stop_here.@`. The `@` character cannot be a stopcharacter, nor can line-breaks or tabs.



## @FLOAT@ {#patterndb-parser-float}

A floating-point number that may contain a dot (.) character. (Up to syslog-ng 3.1, the name of this parser was `@DOUBLE@`.)



## @HOSTNAME@ {#patterndb-parser-hostname}

Parses a generic hostname. The hostname may contain only alphanumeric characters (A-Z,a-z,0-9), hypen (-), or dot (.).



## @IPv4@ {#patterndb-parser-ipv4}

Parses an IPv4 IP address (numbers separated with a maximum of 3 dots).



## @IPv6@ {#patterndb-parser-ipv6}

Parses any valid IPv6 IP address.



## @IPvANY@ {#patterndb-parser-ipvany}

Parses any IP address.



## @LLADDR@ {#patterndb-parser-lladdr}

Parses a Link Layer Address in the `xx:xx:xx:...` form, where each xx is a 2 digit HEX number (an octet). The parameter specifies the maximum number of octets to match and defaults to 20. The MACADDR parser is a special wrapper using the LLADDR parser. For example, the following parser parses maximally 10 octets, and stores the results in the `link-level-address` macro:

```c
   @LLADDR:link-level-address:10@

```



## @MACADDR@ {#patterndb-parser-macaddr}

Parses the standard format of a MAC-48 address, consisting of is six groups of two hexadecimal digits, separated by colons. For example, `00:50:fc:e3:cd:37`.



## @NLSTRING@ {#patterndb-parser-nlstring}

This parser parses everything until the next new-line character (more precisely, until the next Unix-style LF or Windows-style CRLF character). For single-line messages, NLSTRING is equivalent with ANYSTRING. For multi-line messages, NLSTRING parses to the end of the current line, while ANYSTRING parses to the end of the message. Using NLSTRING is useful when parsing multi-line messages, for example, Windows logs. For example, the following pattern parses information from Windows security auditing logs.

```c
   <pattern>Example-PC\Example: Security Microsoft Windows security auditing.: [Success Audit] A new process has been created.
    
        Subject:
        Security ID: @LNSTRING:.winaudit.SubjectUserSid@
        Account Name: @LNSTRING:.winaudit.SubjectUserName@
        Account Domain: @LNSTRING:.winaudit.SubjectDomainName@
        Logon ID: @LNSTRING:.winaudit.SubjectLogonId@
    
        Process Information:
        New Process ID: @LNSTRING:.winaudit.NewProcessId@
        New Process Name: @LNSTRING:.winaudit.NewProcessName@
        Token Elevation Type: @LNSTRING:.winaudit.TokenElevationType@
        Creator Process ID: @LNSTRING:.winaudit.ProcessId@
        Process Command Line: @LNSTRING:.winaudit.CommandLine@
    
        Token Elevation Type indicates the type of token that was assigned to the new process in accordance with User Account Control policy.</pattern>

```



## @NUMBER@ {#patterndb-parser-number}

A sequence of decimal (0-9) numbers (for example, 1, 0687, and so on). Note that if the number starts with the 0x characters, it is parsed as a hexadecimal number, but only if at least one valid character follows 0x. A leading hyphen (`-`) is accepted for non-hexadecimal numbers, but other separator characters (for example, dot or comma) are not. To parse floating-point numbers, use the @FLOAT@ parser.



## @OPTIONALSET@

Parse any combination of the specified characters. For example, specifying a whitespace character parses any number of whitespaces, and can be used to process paddings (for example, log messages of the Squid application have whitespace padding after the username).

For example, the `@OPTIONALSET:: "@` parser will parse any combination of whitespaces and double-quotes.

Available in 3.31 and later.

{{% alert title="Note" color="info" %}}

The `@OPTIONALSET@` parser works almost exactly like the [`@SET@`](#patterndb-parser-set) parser, but the `@OPTIONALSET@` parser continues parsing even if none of the specified characters are found.

{{% /alert %}}



## @PCRE@ {#patterndb-parser-pcre}

Use Perl-Compatible Regular Expressions (as implemented by the PCRE library), after the identification of the potential patterns has happened by the radix implementation.

Syntax: `@PCRE:name:regexp@`



## @QSTRING@ {#patterndb-parser-qstring}

Parse a string between the quote characters specified as parameter. Note that the quote character can be different at the beginning and the end of the quote, for example: `@QSTRING::"@` parses everything between two quotation marks (`"`), while `@QSTRING:\&lt;\&gt;@` parses from an opening bracket to the closing bracket. The `@` character cannot be a quote character, nor can line-breaks or tabs.



## @SET@

Parse any combination of the specified characters until another character is found. For example, specifying a whitespace character parses any number of whitespaces, and can be used to process paddings (for example, log messages of the Squid application have whitespace padding after the username).

For example, the `@SET:: "@` parser will parse any combination of whitespaces and double-quotes.

Available in {{% param "product.abbrev" %}} 3.4 and later.



## @STRING@

A sequence of alphanumeric characters (0-9, A-z), not including any whitespace. Optionally, other accepted characters can be listed as parameters (for example, to parse a complete sentence, add the whitespace as parameter, like: `@STRING:: @`). Note that the `@` character cannot be a parameter, nor can line-breaks or tabs.

