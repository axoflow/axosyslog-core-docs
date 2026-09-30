---
description: Compare the man pages in content/app-man-syslog-ng/ against the tool sources in tmp/axosyslog and report or fix undocumented, renamed, and removed options.
---

Audit the man pages under `content/app-man-syslog-ng/` against the actual
command-line tool sources in `tmp/axosyslog`.

Unless I say otherwise, **report findings first and wait for confirmation**
before editing any page.

## Which tool belongs to which page

Do not guess. This mapping is the whole point of the command.

| Man page | Source of truth |
|---|---|
| `syslog-ng.8.md` | `syslog-ng/main.c` **plus** `lib/gprocess.c`, `lib/mainloop-io-worker.c`, `lib/messages.c` |
| `syslog-ng-ctl.1.md` | `syslog-ng-ctl/syslog-ng-ctl.c` **plus every file** in `syslog-ng-ctl/commands/` |
| `dqtool.1.md` | `modules/diskq/dqtool.c` |
| `pdbtool.1.md` | `modules/correlation/pdbtool/pdbtool.c` |
| `persist-tool.1.md` | `persist-tool/persist-tool.c` |
| `loggen.1.md` | `tests/loggen/loggen.c` **plus** `tests/loggen/file_reader.c`, `tests/loggen/socket_plugin/socket_plugin.c`, `tests/loggen/ssl_plugin/ssl_plugin.c` |
| `syslog-ng-debun.1.md` | `contrib/syslog-ng-debun` (shell script, `getopts`) |
| `slogkey.1.md` | `modules/secure-logging/slogkey/slogkey.c` |
| `slogencrypt.1.md` | `modules/secure-logging/slogencrypt/slogencrypt.c` |
| `slogverify.1.md` | `modules/secure-logging/slogverify/slogverify.c` |
| `secure-logging.7.md` | `modules/secure-logging/secure-logging.c` (the `$(slog)` template function options) |
| `syslog-ng.conf.5.md` | Configuration-file format, not a tool. Out of scope — use `/check-options` instead. |

**Ignore `doc/man/*.xml` entirely.** Those are stale man page sources that no
longer match the code. They look authoritative and they are not.

## Step 1: Confirm which source you are reading

```sh
cat tmp/axosyslog/VERSION.txt
git -C tmp/axosyslog log --oneline -1
```

State the version in your report. If `tmp/axosyslog` is missing or unreadable,
say so and stop — do not silently fall back to a GitHub tarball of `main`,
because upstream `main` contains options that are not in the documented
release. (If reads fail with "Operation not permitted", a sandbox
`Read(./**/tmp/**)` deny rule is in effect; that is the user's setting to
change, so report it rather than working around it.)

## Step 2: Extract the options

Most tools use GLib `GOptionEntry` arrays. The secure-logging tools
(`slogkey`, `slogencrypt`, `slogverify`, `secure-logging.c`) instead declare
their names in an `SLogOptions` table and reference them indirectly from the
`GOptionEntry` array as `options[0].longname`, so an extractor that only looks
at `GOptionEntry` returns **nothing** for them and reads as "fully documented".

This extractor covers both table types and both the single-line and
multi-line brace styles used across the tree:

```sh
extract() {
  awk '/(GOptionEntry|SLogOptions)[^;]*\[\] *=/,/^ *};/' "$1" \
    | grep -oE '"[A-Za-z0-9_-]+" *, *(0|'"'"'.'"'"')' \
    | sed -E "s/\" *,.*//; s/\"//"
}
extract tmp/axosyslog/modules/correlation/pdbtool/pdbtool.c | sort -u
```

Read the full blocks too, not just the names — you need the short form, the
argument placeholder, and the description string to write the entry:

```sh
awk '/GOptionEntry/,/^};/' tmp/axosyslog/modules/diskq/dqtool.c
```

`syslog-ng-debun` is a shell script, so read its `getopts` string and its
`debun_usage()` heredoc instead:

```sh
grep -n "while getopts" tmp/axosyslog/contrib/syslog-ng-debun
```

Every letter in the `getopts` string is an option. A letter followed by `:`
takes an argument.

## Step 3: Find missing *commands*, not just missing options

Several of these tools are multi-command. A whole subcommand can be missing
from the docs, which is a much bigger gap than a missing flag and is easy to
overlook if you only diff option names.

Find the command tables:

```sh
grep -n -A25 "modes\[\] *=" tmp/axosyslog/modules/diskq/dqtool.c
grep -n -A25 "CommandDescriptor modes\[\]" tmp/axosyslog/syslog-ng-ctl/syslog-ng-ctl.c
```

`syslog-ng-ctl` also has nested subcommands (`credentials add`, `credentials
status`) declared as their own `CommandDescriptor` array in
`commands/credentials.c`.

**Known blind spot:** `syslog-ng-ctl/commands/credentials.c` cannot be read in
the sandbox. The `Read(./**/credentials*)` deny rule matches it, so both Bash
and the Read tool fail with "Operation not permitted" — a sweep over
`commands/*.c` will print an `awk: can't open file` error and silently skip it.
Do not report the `credentials` options as undocumented on the strength of an
empty result. Either exclude the file and say it was unverified, or ask me to
allow it.

## Step 4: Compare in both directions

- **Source → docs**: every option and command in the source appears on the page.
- **Docs → source**: every option on the page still exists in the source.

The second direction matters. Pages here have accumulated options that were
removed from the tool years ago, and they read as authoritative.

Before reporting an option as undocumented, check the headless chunks — some
option lists are shared and live outside the page:

```sh
grep -rn "<option-name>" content/app-man-syslog-ng/ content/headless/chunk/
```

## Gotchas that have produced wrong answers before

- **Options split across files.** The `syslog-ng` daemon and `loggen` both
  assemble their option list from several translation units. Checking only the
  obvious file under-reports badly. Use the mapping table above.
- **`#ifdef`-guarded options.** `--yydebug` in `syslog-ng/main.c` only exists
  in a `YYDEBUG` build. Do not document options that a normal build lacks.
- **No-op options.** If the description string says the option does nothing
  (for example `seed`: `"Does nothing, ..."`), leave it undocumented.
- **Hidden options.** Entries flagged `G_OPTION_FLAG_HIDDEN` (for example
  `uid` and `gid` in `lib/gprocess.c`) are deliberate aliases and stay out of
  the docs.
- **Short-option shadowing.** When a tool calls
  `g_option_context_add_main_entries()` twice, the first array registered wins
  for a clashing short form. In `pdbtool` the mode options are added before the
  globals (`pdbtool.c:1325-1326`), so in `patternize` mode `-d` is
  `--delimiters`, *not* the global `--debug`. Check the registration order
  before documenting a short form.
- **`G_OPTION_REMAINING` entries are positional arguments, not flags.** Their
  description string often enumerates valid sub-modes that belong in the docs.
  `attach` is the example: its description reads
  `"attach mode: logs, debugger, stdio"`, and `debugger` had been missing from
  the page for that reason.
- **Underscores vs hyphens.** Some option names really do use underscores
  (`--new_path`, `--persist_name` in `dqtool`). Copy the name verbatim from the
  source; do not normalize it to hyphens.
- **Descriptions can be swapped.** Confirm that each description actually
  matches its own option. `pdbtool`'s `--named-parsers` and `--samples` had
  each other's text.

## Step 5: If I ask you to apply the fixes

Match the conventions already on these pages:

- Option entries are a bullet list, alphabetical by long form, with the
  description indented on the following line:

  ```markdown
  - `--force` or `-f`

      Perform the truncation. Without this option, `dqtool` only prints a
      warning and exits.
  ```

- Include the argument placeholder when the option takes one:
  `` - `--persist=<persist-file>` or `-p` ``
- A new subcommand gets an `## The <name> command` section with a synopsis
  line, prose, its option list, and a `### Example: The <name> command`
  subsection. Example headings nest **under** their command section (`###`),
  not at `##`.
- Use `{{< warning >}}` for data-loss and security warnings, not
  `> **Note:**`.
- Follow `.claude/docs/style-guide.md` and `.claude/docs/style-guide.local.md`:
  second person, present tense, `{{% param "product.abbrev" %}}` in prose on
  these pages.
- When you remove a stale option, grep for references to it elsewhere on the
  page and fix those too. Removing `--default-modules` from `syslog-ng.8.md`
  also meant rewriting the `--module-registry` and `--version` descriptions
  that pointed at it.

Then verify:

```sh
hugo --minify 2>&1 | grep -i "app-man"
```

Compare that output against a pre-change run — this directory has pre-existing
link warnings that originate from `content/_index.md`, so a non-empty result is
not automatically your fault.

## Reporting format

Group findings by man page. For each, separate:

1. Missing commands
2. Missing options
3. Wrong names or swapped descriptions
4. Documented but removed from the source

Cite source evidence as `<absolute-path>:<line>` so it is clickable, for
example `/Users/you/project/tmp/axosyslog/syslog-ng-ctl/commands/attach.c:49`.
