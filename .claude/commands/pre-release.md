---
description: Run all documentation preparation tasks for a new AxoSyslog release — source checks, What's new, and version bumps.
---

Run all documentation preparation tasks for a new {{% param "product.name" %}}
release.

Work through the seven tasks below in order. After completing each task, pause
and summarize what changed before moving on. Do not start the next task until
the user confirms the previous one is done.

Task 4 is **blocked** until a pending pull request lands — see the task for what
to do in the meantime.

Ask up front: **"Which AxoSyslog release are we preparing for? (for example,
4.28)"** Everything below refers to that number as `<release>`.

---

## Task 1: Point the source checkout at the release

Every check that follows reads `tmp/axosyslog`. If it is on the wrong ref, all
of them produce confident, wrong answers — so do this first and state what you
ended up on.

```sh
git -C tmp/axosyslog fetch --tags --depth 1 origin
git -C tmp/axosyslog checkout axosyslog-<release>.0
git -C tmp/axosyslog log --oneline -1
cat tmp/axosyslog/VERSION.txt
```

If the tag does not exist yet (the docs often go out ahead of the release), stay
on `main` and **say so explicitly in every later finding** — `main` carries
options that are not in the release, and documenting them early is the most
common way this process goes wrong.

Then read the upstream changelog. It drives Tasks 3 and 5:

```sh
sed -n '1,120p' tmp/axosyslog/NEWS.md
```

---

## Task 2: Check the man pages

Run `/check-manpages`.

That command holds the page-to-source mapping and the gotchas (options split
across several files, `#ifdef`-guarded and no-op options, short-option
shadowing, the unreadable `credentials.c`). Do not re-derive any of it here.

Report findings grouped per man page, apply only what the user approves, and
remember the audit runs in both directions — options removed upstream have to
come *out* of the pages, not just new ones go in.

---

## Task 3: Check the options of the changed configuration objects

Do **not** audit all of the drivers. Scope this to what the release actually
touched.

From `tmp/axosyslog/NEWS.md` for `<release>`, build the list of sources,
destinations, parsers, filters, and rewrite rules that were added or changed.
For each one, run `/check-options` and compare against its docs page.

Pay particular attention to:

- **New drivers** — these need a whole page, not just an option list. Check
  whether one exists at all.
- **Deprecated options** — the docs should say so and name the replacement from
  the upstream deprecation message.
- **New global options** — these belong in
  `content/chapter-global-options/reference-options/_index.md`.
- **FilterX functions** — these are *not* covered by `axosyslog-cfg-helper`.
  Check `content/filterx/function-reference.md` against the source by hand.

`/check-options` carries the important caveat that its bundled database lags
upstream, so treat its output as a floor and confirm anything thin against
`tmp/axosyslog`.

---

## Task 4: Check the module and package matrix — BLOCKED

> **Placeholder.** This task becomes available once
> <https://github.com/axoflow/axosyslog-core-docs/pull/239> ("Documents Module
> and package requirements") is merged. Until then, **skip it** and say so in
> the summary — do not improvise a package audit by hand, and do not report the
> matrix as verified.

Check whether the PR has landed before skipping:

```sh
gh pr view 239 --repo axoflow/axosyslog-core-docs --json state,mergedAt
ls .claude/commands/check-packages.md scripts/package-matrix-update.py
```

The PR adds all four pieces this task needs: the `/check-packages` command, the
`scripts/package-matrix-update.py` checker, `content/headless/chunk/package-matrix.md`,
and the `chunk/prereq-package*.md` snippets. A local
`.claude/commands/check-packages.md2` already exists — that is the draft, parked
with a non-`.md` extension precisely because the script it calls is not in the
repo yet. Do not rename it to activate it; take the merged version instead.

**Once the PR is merged**, replace this placeholder with:

> Run `/check-packages`.
>
> It verifies `content/headless/chunk/package-matrix.md` against
> `packaging/debian/control` and `packaging/rhel/axosyslog.spec` in
> `tmp/axosyslog`, and checks that every driver page names its package in a
> Prerequisites section. New drivers found in Task 3 are the likely source of
> drift here, so run it after that task, not before.
>
> `python3 scripts/package-matrix-update.py` exits `0` when the docs match the
> source and `1` when something needs review.

---

## Task 5: Check the metrics reference

```sh
python3 scripts/metrics-update.py
```

The script compares the `##` headings in
`content/chapter-log-statistics/metrics-reference/_index.md` against the output
of `syslog-ng --metrics-registry`, which it gets by running the
`ghcr.io/axoflow/axosyslog:nightly` Docker image.

Two things to watch:

- It pulls the **nightly** image, not the release. On a release check, its
  metric list can be ahead of `<release>`. Cross-check anything it reports as
  missing against `tmp/axosyslog` before documenting it.
- It needs a working Docker daemon. If Docker is unavailable, do not report "no
  drift" — either capture the metric list elsewhere and feed it in, or say the
  task could not run:

  ```sh
  python3 scripts/metrics-update.py --no-container <file-with-metrics-registry-output>
  ```

Add a section for each genuinely new metric; remove the ones that no longer
exist.

---

## Task 6: Finalize the What's new section

Docs page: `content/whats-new/_index.md`.

New entries are written continuously during development, so the `## Version
<release>` heading usually already exists with a list under it. The release-time
work is to finish it, not to write it from scratch.

Compare the existing list against `tmp/axosyslog/NEWS.md` and:

1. **Add the release date to the heading.** Released versions read
   `## Version 4.27 (2026-08-19)`; the in-progress one is just `## Version 4.28`.
   Use the date of the upstream release, not today's date.
2. **Add the bugfix link** as the last line of the section, matching the
   existing wording exactly:

   ```markdown
   For a list of bugfixes, see the [GitHub release page](https://github.com/axoflow/axosyslog/releases/tag/axosyslog-<release>.0).
   ```

3. **Fill the gaps.** Anything user-facing in `NEWS.md` with no entry needs one.
   Every entry links to the page documenting the feature with `{{< relref >}}`.
4. **Check the links resolve.** These entries are written before their target
   pages exist, so they are the single most common source of broken `relref`s in
   this repo.

   This page carries a large backlog of pre-existing broken links — 22 of them
   as of 4.27 — so "no warnings" is not the bar and never will be on this page.
   Take a baseline **before** editing and compare:

   ```sh
   hugo --minify 2>&1 | grep -oE 'content/whats-new/_index\.md:[0-9]+' \
     | sort -u > /tmp/whatsnew-before.txt
   # ...make the edits...
   hugo --minify 2>&1 | grep -oE 'content/whats-new/_index\.md:[0-9]+' \
     | sort -u > /tmp/whatsnew-after.txt
   diff /tmp/whatsnew-before.txt /tmp/whatsnew-after.txt
   ```

   Line numbers shift when you add entries, so read the diff for *new* warnings
   rather than treating it as a pass/fail. The reliable check is that every
   `relref` in the section you just edited resolves — verify those by line
   number against the build output. Fixing the older backlog is a separate job;
   do not fold it into the release.

---

## Task 7: Bump the version numbers

This repo couples five fields in `config/_default/config.toml` to
`data/versions.yaml`. Hugo config takes no template functions, so none of it is
derived — every one has to move by hand.

Construct from `<release>` (for example `4.28`):

- Train version: `4.28` — the docs describe the whole `4.28.x` line
- Patch version: `4.28.0`

### config/_default/config.toml

| Field | Section | New value |
|---|---|---|
| `version` | `[params]` | `"4.28.0"` |
| `version` | `[params.product]` | `"4.28"` |
| `techversion` | `[params.product]` | `"4.28.0"` |
| `configversion` | `[params.product]` | `"4.28"` |
| `body_attribute` | `[[cascade]]` | `'data-pagefind-filter="section:4.28 (current)"'` |

Note the two different `version` keys: the one under `[params]` carries the
patch number, the one under `[params.product]` does not. Do not unify them.

### data/versions.yaml

- Add the new entry at the top, with `name: "<release> (current)"` and
  `latest: true`, and **no** `ref`.
- On the outgoing entry: drop `latest`, drop the ` (current)` from its `name`,
  and add `ref: "release-<previous>"`.

The `name` of the `latest` entry and the `body_attribute` string must match
**character for character**, including the ` (current)`. Pagefind draws the
filter value itself as the dropdown label, so if they disagree the version
switcher and the search filter name the same release differently.

### The step that is easy to miss

CI overlays `data/versions.yaml` from `main` onto archived builds, but **not**
`config.toml` — an archived version is built from its own release ref and keeps
whatever that ref says. So the outgoing release branch needs its own edit:

1. On `main`: add ` (current)` to the new version's `body_attribute`.
2. On `release-<previous>`: strip ` (current)` from that branch's
   `body_attribute`, then republish the branch.

Skip step 2 and the unified search index ends up with two options both claiming
to be the current release.

Show the user a diff of every change and get confirmation before writing.

---

## Done

When all seven tasks are complete, verify the whole build once more and report:

```sh
hugo --minify
```

Then remind the user:

> All pre-release documentation tasks are done. Remaining manual steps: cut the
> `release-<release>` branch, run the **Publish versions** workflow so the
> archived sub-sites pick up the new version list, and strip ` (current)` from
> `body_attribute` on `release-<previous>` before that branch is republished.

If Task 4 was skipped, state that explicitly in the closing summary — name it as
unverified rather than letting it disappear from the list of completed work. Do
the same for Task 5 if Docker was unavailable.

Do not commit, tag, or push anything as part of this command.
