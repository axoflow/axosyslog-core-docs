---
---
<!-- DISCLAIMER: This file is based on the syslog-ng Open Source Edition documentation https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2 and is used under the terms of The syslog-ng Open Source Edition Documentation License. The file has been modified by Axoflow. -->
# SELinux prevents syslog-ng OSE from using the execmem access on a process

If you are using a recent enough PCRE library, {{% productparam "abbrev" %}} will automatically use the JIT of the regexp engine, which will result in a similar error:

```c

    setroubleshoot [21631 ] : SELinux is preventing <syslog-ng path> from using the execmem access on a process. (...)
    
    python [21631 ] : SELinux is preventing <syslog-ng path> from using the execmem access on a process.

```

To resolve this issue, switch off the PCRE JIT compile function by using the [disable-jit]({{< relref "/docs/chapter-manipulating-messages/regular-expressions/reference-regexp-types/regexp-flags-options/regexp-flags-options-pcre/_index.md" >}}) <span class="code">flags()</span> option in the given filter or rewrite rule of your configuration.
