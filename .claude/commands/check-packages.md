---
description: Check the module/package matrix and the per-page Prerequisites sections against the AxoSyslog source tree.
---

Verify that the documented module/package matrix still matches the AxoSyslog
source, and fix whatever drifted.

## 1. Refresh the source checkout

The script reads `tmp/axosyslog` by default. Make sure it's present and current:

```sh
git -C tmp/axosyslog pull --ff-only 2>/dev/null \
  || git clone --depth 1 https://github.com/axoflow/axosyslog tmp/axosyslog
```

To check against a release rather than `main`, check out that tag first.

## 2. Run the check

```sh
python3 scripts/package-matrix-update.py
```

Exits `0` when the docs match the source, `1` when something needs review.
Useful flags: `--source`, `--matrix`, `--content`, `--json`.

## 3. Act on each finding

| Finding | What it means | Fix |
|---|---|---|
| **Packages missing from the matrix** | A new package appeared in `packaging/debian/control` or `packaging/rhel/axosyslog.spec`. | Add a row to `content/headless/chunk/package-matrix.md`. |
| **Packages in the matrix that no longer exist** | A package was renamed or dropped upstream. | Update or remove the row, and fix every page whose Prerequisites names it. |
| **Rows naming the wrong package** | A module moved between packages (for example, from a `-mod-` package into the base package). | Correct the row, then correct the pages of the affected drivers. |
| **Drivers not mentioned in the matrix** | A new driver was added that needs an optional module. | Add it to the "Provides" cell of the right row, and add a Prerequisites section to its page. |
| **Invalid package names in prereq snippet calls** | A page passes a package name that doesn't exist. | Fix the arguments in that page's `include-headless` call. |

## 4. Update the pages, not just the matrix

The matrix is only half of it. Each source, destination, and parser also names
its package in a Prerequisites section, using one of these snippets:

| Snippet | Arguments | Use for |
|---|---|---|
| `chunk/prereq-package.md` | DEB package, RPM package | A module with a separate package on both distros |
| `chunk/prereq-package-deb-only.md` | DEB package | A module that's separate on Debian but in the `axosyslog` base package on RPM |
| `chunk/prereq-package-scl.md` | none | An SCL-provided driver |
| `chunk/prereq-platform-only.md` | platform name | A driver built only for Solaris, macOS, or OpenBSD |

For example:

```go-html-template
{{< include-headless "chunk/prereq-package.md" "axosyslog-mod-grpc" "axosyslog-grpc" >}}
```

Rules:

- Put the snippet directly under `## Prerequisites`. If there are other prerequisites, put it as the first entry of the bullet list, unless the list's first entry is similar to `- {{% param "product.name" %}} version 3.16 or later.` In this case put it as the second entry. For SCLs, the `prereq-package-scl.md` and `scl-config-snippet.md` files belong to the same list item, like this (with the proper macro invocation):

    ```
    - {{< include-headless "chunk/prereq-package-scl.md" >}}

        {{< include-headless "chunk/scl-config-snippet.md" "iptables-parser()" "scl/iptables/iptables.conf" >}}
    ```

- If the page has no Prerequisites section, create one and fold any
  "Available in ... version X" or "Starting with version X" sentence into it.
- A driver that needs both the SCL and a module gets two snippets: the SCL one
  first, then the module one.
- For drivers documented inside a reference page (template functions, FilterX
  functions), put the snippet next to the availability line instead of adding a
  section.

## 5. Verify

```sh
hugo -e development                          # must build clean
python3 scripts/package-matrix-update.py     # must exit 0
```

Then check that the conditional table still renders per distro: the
`/install/debian-ubuntu/` page must show only `axosyslog-mod-*` names and
`/install/rhel-fedora-almalinux/` only `axosyslog-*` names. The `{{< if deb >}}`
and `{{< if rpm >}}` shortcodes read the `deb:`/`rpm:` front matter of the
install pages, which only works because those pages pull the snippet in with
`readfile` rather than `include-headless`.

## Notes on what the script can and can't see

- It doesn't rewrite the matrix. The "Provides" column groups drivers
  editorially and a generator would flatten that.
- SCL blocks are scanned per block, not per file, so two blocks in one `.conf`
  can have different requirements (as `sumologic-syslog()` and
  `sumologic-http()` do).
- Drivers in the base package, and platform-only modules that ship in no
  package, are not reported as missing.
- Driver names in prose around the table count as documented, so the note about
  the Solaris/macOS/OpenBSD drivers is enough to cover them.
- If a new module's `.so` name doesn't match its directory name, add it to
  `SO_ALIASES` in the script. If a new SCL keyword implies a module dependency,
  add it to `SCL_KEYWORD_MODULE`.
