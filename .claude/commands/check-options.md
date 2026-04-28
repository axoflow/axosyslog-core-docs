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

- `destination`, `source` — does **not** include SCL-defined drivers (those whose source lives under the `scl/` directory in the AxoSyslog source repo).
- `parser` — does **not** include FilterX parsers; covers only parsers documented under `content/chapter-parsers`.
- `filter`, `rewrite`
- `options` — lists the global options of AxoSyslog.

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
- Compound deprecation headings (for example, `## sync() or sync-freq() (DEPRECATED)`) document multiple options in one section.
- Legacy aliases (for example, `long-hostnames` for `chain-hostnames`) and deprecated sub-option aliases (`stats-freq`, `stats-level`, `stats-lifetime`, `stats-max-dynamics`) still count as "documented" when cross-referenced.
