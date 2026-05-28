# AxoSyslog Core Docs — Claude Code Context

## Project overview

This is the **AxoSyslog Core documentation** site — a technical reference for
AxoSyslog, a syslog-ng fork. Documentation is written in Markdown and built
with [Hugo](https://gohugo.io/) (Extended version, ≤ 0.146) using the
[Docsy](https://www.docsy.dev/) theme.

- Published site: <https://axoflow.com/docs/axosyslog-core/>
- Source code for the product itself: <https://github.com/axoflow/axosyslog>

## Repo layout

```
content/        # All documentation pages (Markdown + front matter)
content/headless  # Documentation snippets that are reused at multiple places of the documentation (using the include-headless or the readfile shortcodes)
assets/              # SCSS / JS overrides for the Docsy theme
config/              # Hugo site configuration (TOML/YAML)
layouts/             # Project-level Hugo and Docsy  template overrides
themes/docsy/        # Docsy theme (Git submodule — do not edit directly)
themes/docsy-axoflow/        # Customizations and overrides for the Docsy theme, used in multiple Axoflow documentation projects (Git submodule — do not edit directly)
scripts/             # Helper / automation scripts
```

All prose lives under `content/`. Most pages are plain `.md` files;
section landing pages are `_index.md`.

## Hugo / Docsy conventions

- Front matter is **YAML** (delimited by `---`).
- Required front matter fields: `title`, `weight` (controls sidebar order).
  Optional but common: `aliases`, `linkTitle`.
- Section pages (`_index.md`)
- Do **not** use raw HTML inside Markdown unless there is no shortcode
  alternative; Hugo's Goldmark renderer has `unsafe: true` enabled but
  raw HTML makes future theme upgrades harder.

## Writing style

See `.claude/docs/style-guide.md` for the full guide. Key rules:

- Second-person ("you"), active voice, present tense.
- Sentence case for headings (not title case).
- In prose, use the `{{% param "product.name" %}}` shortcode instead of "AxoSyslog".
- Refer to the product's predecessor as "syslog-ng" (hyphenated, lowercase).
- Code values, file paths, option names, and config keys → `inline code`.
- Use definition lists (`term\n: definition`) for option references.

## Local development

```bash
# First time: pull the Docsy submodule
git submodule update --init --recursive

# Install Node dependencies (required by Docsy's PostCSS pipeline)
npm install

# Serve locally (hot-reload)
hugo server --disableFastRender

# Full build
hugo --minify

# Convert html files to markdown for llms (requires full build)
python3 themes/docsy-axoflow/scripts/hugo_to_markdown.py --input public --output public
```

The dev server starts on <http://localhost:1313> by default.

Hugo version constraint: **≤ 0.146.0** (Extended build required).

## Validation / CI checks

```bash
# Check for broken internal links (requires the built site)
hugo --minify && npx broken-link-checker http://localhost:1313 --ordered --recursive
```

The CI pipeline (`.github/workflows/`) runs `hugo --minify` and fails on any
build error. Always verify the build locally before pushing.

## What Claude should NOT do

- Do not edit files inside `themes/docsy/` — it is a submodule.
- Do not change `config/` files without explicit instruction; misconfiguration
  breaks the build globally.
- Do not move, rename, or delete content pages manually. Always use `/move-page`
  (which runs `themes/docsy-axoflow/scripts/move_hugo_files.py`) to preserve git
  history, add URL aliases, and update all cross-references.
- Do not invent shortcodes — only use those documented in
  `.claude/docs/shortcodes.md` or already present in the codebase.
- Do not add `draft: true` to front matter unless explicitly asked.

## Reference docs

For task-specific guidance, read the relevant file before starting:

| Task | File |
|------|------|
| Writing or editing docs pages | `.claude/docs/style-guide.md`, `.claude/docs/style-guide.local.md` |
| Hugo shortcodes available | `.claude/docs/shortcodes.md` |
| Front matter reference | `.claude/docs/frontmatter.md` |
| Adding a new docs section | `.claude/docs/new-section.md` |
| Moving a page or directory | `.claude/commands/move-page.md` |

## Agents

- `review-agent` — use for reviewing draft pages against the style guide
- `technical-writer` — use for all writing task that includes the `content` directory
- `visual-storyteller` - use for creating illustrations and figures