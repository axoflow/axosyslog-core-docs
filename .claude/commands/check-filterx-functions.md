---
description: Compare the FilterX functions in the AxoSyslog source with the FilterX function reference page.
---

Check that every FilterX function in the AxoSyslog source has an entry in
`content/filterx/function-reference.md`, and that the page lists no function
that no longer exists. `axosyslog-cfg-helper` (and so `/check-options`) does not
cover FilterX functions, so this is the only check for them.

## 1. Refresh the source checkout

The script reads `tmp/axosyslog` by default. Make sure it's present and current:

```sh
git -C tmp/axosyslog pull --ff-only 2>/dev/null \
  || git clone --depth 1 https://github.com/axoflow/axosyslog tmp/axosyslog
```

To check against a release rather than `main`, check out that tag first.

## 2. Run the check

```sh
python3 scripts/filterx-functions-check.py
```

Exits `0` when the page matches the source, `1` when something needs review.
Add `--list` to print every function found in the source, marked `+`
(documented) or `-` (missing). Use `--source` and `--page` to point it somewhere
else.

The script collects:

- **Source:** the names registered with `filterx_builtin_*function*_register()`
  in `lib/filterx/`, and the `FILTERX_*FUNCTION_PLUGIN()` entries in `modules/`.
  The `examples` module is skipped because it is not shipped.
- **Docs:** the names in the `## ` headings of the page. A heading can name
  several functions (`## uuid or uuid4`, `## str_strip, str_lstrip, str_rstrip`).
  Language keywords that look like functions (`isset`, `dpath`) are not reported
  as removed.

For each missing function, it also lists the other pages under `content/filterx/`
that call it, which tells you whether a stub is enough.

## 3. Act on each finding

| Finding | What it means | Fix |
|---|---|---|
| **Missing, mentioned on another FilterX page** | The function is documented on a topic page (for example, `ip()` on the subnet page) but has no entry in the reference. | Add a stub heading that links to that page with `{{% xref %}}`, like the existing `get_sdata` or `set_timezone` entries. |
| **Missing, not mentioned anywhere** | The function is undocumented. | Read its source (the file the script lists with `--list`) and write a full entry: availability, usage, arguments, an example, and error behavior. |
| **Documented but not found in the source** | The function was removed or renamed upstream. | Check `NEWS.md` and the source history. Remove the entry, or rename it and add a note for the old name. |

Rules for the entries:

- Keep the headings in alphabetical order. Use one heading for functions that
  belong together, separated by commas, and give it an explicit anchor
  (`{#failure-info}`).
- Start each entry with `Available in {{< product >}} <version> and later.`
  `tmp/axosyslog` is usually a shallow clone, so `git log` can't tell when a
  function was added. Check the release tags on GitHub instead:

  ```sh
  for v in 4.11.0 4.12.0; do
    printf "%s: " $v
    gh api "repos/axoflow/axosyslog/contents/lib/filterx/filterx-globals.c?ref=axosyslog-$v" \
      --jq .content | base64 -d | grep -c '"<function>"'
  done
  ```

  For a module function, use the module's plugin file instead of
  `filterx-globals.c`.
- Functions that come from a module need a package prerequisite next to the
  availability line. See `/check-packages`.

## 4. Verify

```sh
python3 scripts/filterx-functions-check.py   # the fixed functions no longer appear
hugo --renderToMemory                        # no new errors in content/filterx/
```

## What the script can't see

- It only checks that a function has a heading. It doesn't check arguments,
  defaults, or return types; for those, compare the entry with the function's
  `*_USAGE` string and argument parsing in the source.
- Type casts (`int`, `bool`, `dict`, `list`, ...) are registered as functions,
  so they are reported like any other function.
- It reads the source on whatever ref `tmp/axosyslog` is on. On `main`, it
  reports functions that are not in any release yet.
