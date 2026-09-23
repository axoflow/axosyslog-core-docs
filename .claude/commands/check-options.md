---
description: List the available options of an AxoSyslog config object with axosyslog-cfg-helper, and compare them against the docs.
---

List the available options of an AxoSyslog configuration object (source, destination, parser, filter, rewrite, or the global `options` block) using the `axosyslog-cfg-helper` tool.

## Usage

For objects that have a name (source, destination, parser):

```sh
axosyslog-cfg-helper -c <object-type> -d <object-name>
```

For object types without a name (`options`, `filter`, `rewrite`):

```sh
axosyslog-cfg-helper -c options
```

Example:

```sh
axosyslog-cfg-helper -c destination -d bigquery
```

## Object types

- `destination`, `source`, `parser` — includes both C-implemented drivers and SCL-defined ones (those whose source lives under the `scl/` directory in the AxoSyslog source repo). Does **not** include FilterX parsers.
- `filter`, `rewrite` — includes both the plugin-based drivers and the rules built into the grammar.
- `options` — lists the global options of AxoSyslog.

## Check the tool version first

Run this before trusting any output:

```sh
axosyslog-cfg-helper --version || pipx list | grep cfg-helper
```

Versions **older than 1.23.0 silently under-report**. They list only plugin-based drivers, so grammar built-ins and SCL-defined drivers never appear. On 1.15.0 the counts were source 30, destination 36, parser 22, filter 2, rewrite 3; on 1.26.1 they are 50, 64, 44, 16, 25. The tool exits 0 and prints a clean-looking list either way, so a stale install reads as "everything is documented" when a third of the drivers are invisible.

Sanity-check the counts:

```sh
for c in source destination parser filter rewrite; do
  printf '%-12s ' "$c"; axosyslog-cfg-helper -c $c -n | grep -cE '^  '
done
```

If they are low, upgrade with `pipx upgrade axosyslog-cfg-helper`.

The bundled database is built at package-release time from a specific AxoSyslog version, so options added upstream since then are missing. Check `tmp/axosyslog` for anything the tool does not list. Rebuilding the database needs bison ≥ 3.7.6.

## Tip: strip ANSI colors for scripting

Pipe through `sed` when diffing against the docs:

```sh
axosyslog-cfg-helper -c options | sed -E 's/\x1b\[[0-9;]*m//g'
```

## Where to document the options

- Options of a source or destination go on that object's page (for example, `content/chapter-destinations/google-bigquery/_index.md`) or on a dedicated reference page (for example, `content/chapter-destinations/destination-snmp/reference-destination-snmp/_index.md`).
- Global options go in `content/chapter-global-options/reference-options/_index.md`.
- If an option is unique to the object, document it inline.
- If the option is shared with other objects, reuse or add a chunk under `content/headless/chunk/` and include it:

  ```go-html-template
  {{% include-headless "chunk/option-destination-suppress.md" %}}
  ```

## Comparing cfg-helper output to the docs

When auditing for undocumented options, remember:

- Some options are documented via `include-headless` chunks — their `## name()` heading lives in the chunk, not in the main `_index.md`. Grepping the main file alone will miss them.
- Options that cfg-helper lists but that have no useful effect on a driver are left out on purpose, marked by an HTML comment naming the chunk, for example `<!-- has no useful effect on this source: chunk/option-source-read-old-records.md -->`. Count these as documented. Never put an `include-headless` shortcode inside an HTML comment: Hugo still runs it, the chunk's own copyright comment closes the outer comment early, and the option renders on the page with a stray `-->`.
- Compound deprecation headings (for example, `## sync() or sync-freq() (DEPRECATED)`) document multiple options in one section.
- Legacy aliases (for example, `long-hostnames` for `chain-hostnames`) and deprecated sub-option aliases (`stats-freq`, `stats-level`, `stats-lifetime`, `stats-max-dynamics`) still count as "documented" when cross-referenced.
- Sub-options are printed indented under their parent (for example, `chars()` and `strings()` under the csv-parser `delimiters()` option, or the `rekey()` value-pairs options under `metrics-probe()`'s `labels()`). Documenting them in the parent option's prose or synopsis is enough — they do not need their own headings.
- Cross-references count too. For example, the `windows-eventlog-xml-parser()` page documents its options by pointing at the `xml()` parser page.

## Drivers that are intentionally not documented

Not every driver the tool lists is meant for users. Do not report these as gaps, and do not write pages for them.

Decided already — leave these alone:

- `apache-accesslog-parser-combined()`, `apache-accesslog-parser-vhost()` — helper blocks that `apache-accesslog-parser()` uses internally. The Apache access log parser page covers the user-facing driver, and that is enough.
- `windows-eventlog-parser()` — outdated, superseded in practice. Do not document it. Note that it is a different driver from `windows-eventlog-xml-parser()`, which *is* documented and current.

The same reasoning applies to these categories:

- **SCL helper blocks** that exist only to build a user-facing driver, for example `arr-internal`, `cisco-timestamp-parser`, `cisco-triplet-parser`, and `extract-solaris-msgid`. Check `tmp/axosyslog/scl/` — if a block is only ever referenced from other blocks in the same `.conf`, it is a helper.
- **Example and test modules**, for example `example-destination`, `example-diskq-source`, `example-random-generator`, and `random-choice-generator`.
- **Alternate spellings of a documented driver**, for example `darwinosl` (documented as `darwin-oslog()`) and `sun-stream` (an alias of `sun-streams()`, both mapping to `KW_SUN_STREAMS`). Confirm in the keyword table before assuming a name is missing.

## Cross-check against the source

The bundled database lags upstream, so treat it as a floor rather than the full picture. When the tool's output looks thin for an object, confirm against `tmp/axosyslog`:

- Grammar files (`*-grammar.ym`, `lib/cfg-grammar.y`) list the accepted options, including ones shared through rules like `parser_opt`, `template_option`, and `rewrite_expr_opt`.
- Keyword tables (`*-parser.c`, `lib/cfg-parser.c`) reveal aliases and options marked `KWS_OBSOLETE`. If the source marks an option obsolete, the docs should say so, and should name the replacement from the deprecation message.
- Option names use underscores in C source: grep `fetch_delay`, not `fetch-delay`.
- A grammar rule that accepts an option but has an empty action is a no-op kept for compatibility — document it as accepted-but-ineffective rather than describing behavior it no longer has.
