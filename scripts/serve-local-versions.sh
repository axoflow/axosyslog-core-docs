#!/usr/bin/env bash
#
# Build every version listed in data/versions.yaml into one tree and serve it, so
# you can test the version switcher / banner locally (dropdown, active state,
# per-page switching, "no longer current" banner, cross-version search filter).
#
#   scripts/serve-local-versions.sh [PORT]
#     PORT   http-server port (default: 8181)
#
# What it builds:
#   - the `latest` entry  → from your CURRENT WORKING TREE, served at /
#     (so you can preview uncommitted edits as the latest docs)
#   - every other entry   → from the git ref in its `ref:` field, served at
#     /<version>/  (this is the real archived content, not the working tree).
#     The ref is fetched and resolved against `origin` first, so you build what CI
#     builds rather than a stale local branch of the same name.
#
# Each non-latest version is built in a throwaway `git worktree` checked out at
# its ref, so your working tree, branch, and index are never touched. The
# worktree reuses this checkout's themes/ (symlinked), so it renders with the
# current theme and needs no submodule/npm re-provisioning. As in production, the
# current data/versions.yaml is overlaid so the switcher shows the full list.
#
# Builds run in the `development` environment (a bare `hugo` defaults to
# `production`, which would invoke PostCSS): it compiles Sass directly and skips
# PostCSS, so no `npm install` / postcss binary is needed in the build dir.
#
# Note: the switcher renders on any version whose theme submodule carries the
# version partials — the symlink above takes care of that here, which is exactly
# why an archived version can look right locally and have no switcher in
# production, where CI uses the theme revision that ref pins.
#
# No manpages: CI generates those per version (see publish-docs.yaml); nothing
# about the switcher needs them.
set -euo pipefail

PORT="${1:-8181}"
BASE="http://localhost:${PORT}"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
VERSIONS_FILE="data/versions.yaml"

cd "$REPO"

# Fail early if the port is taken: http-server prints its startup banner before
# it actually binds, then dies asynchronously on EADDRINUSE — so a collision
# looks like a clean run while the browser silently hits whatever else owns the
# port (e.g. a container/VM forward), 404-ing every docs page.
if lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "==> ERROR: port ${PORT} is already in use. Free it or pass a different port:" >&2
  echo "      $(basename "$0") <PORT>" >&2
  exit 1
fi

# Emit one "version|ref|isLatest(0 or 1)" line per entry in data/versions.yaml.
# A '|' delimiter (no field contains it) keeps the reader POSIX-safe.
parse_versions() {
  python3 - "$VERSIONS_FILE" <<'PY'
import sys
path = sys.argv[1]
try:
    import yaml
    data = yaml.safe_load(open(path)) or []
except Exception:
    # Minimal fallback for the simple list-of-dicts format (no pyyaml).
    data, cur = [], None
    for raw in open(path):
        line = raw.split('#', 1)[0].rstrip()
        if not line.strip():
            continue
        s = line.lstrip()
        if s.startswith('- '):
            cur = {}; data.append(cur); s = s[2:]
        if cur is None or ':' not in s:
            continue
        k, _, v = s.partition(':')
        cur[k.strip()] = v.strip().strip('"').strip("'")
for v in data:
    ver = str(v.get('version', '')).strip()
    if not ver:
        continue
    ref = str(v.get('ref', '') or '').strip()
    latest = str(v.get('latest', '')).strip().lower() in ('true', '1', 'yes')
    print(f"{ver}|{ref}|{'1' if latest else '0'}")
PY
}

# Resolve a `ref:` from data/versions.yaml the way CI does — to the state on the
# remote. `git worktree add <ref>` on its own prefers a same-named LOCAL branch,
# which is silently stale unless you happened to pull it: the usual reason edits
# pushed to an archived release branch seem to have no effect locally.
resolve_ref() {
  git fetch --quiet origin "$1" 2>/dev/null ||
    echo "==> WARNING: could not fetch '${1}' from origin; falling back to the local copy" >&2
  if git rev-parse --verify --quiet "refs/remotes/origin/${1}" >/dev/null; then
    git rev-parse "refs/remotes/origin/${1}"
  elif git rev-parse --verify --quiet "refs/tags/${1}" >/dev/null; then
    git rev-parse "refs/tags/${1}^{commit}"
  else
    git rev-parse "$1"
  fi
}

# Both temp paths below are created from an explicit template under this dir, so
# TMPDIR is honored. A bare `mktemp` would not honor it: macOS's mktemp only reads
# TMPDIR when it is given a template or -t, and otherwise writes straight to the
# per-user /var/folders directory — which a restricted environment may refuse.
TMPROOT="${TMPDIR:-/tmp}"
TMPROOT="${TMPROOT%/}"

worktree=""; tmp_parent=""; verlist=""
cleanup() {
  [ -n "$worktree" ] && [ -d "$worktree" ] && git worktree remove --force "$worktree" 2>/dev/null || true
  [ -n "$tmp_parent" ] && rm -rf "$tmp_parent"
  [ -n "$verlist" ] && rm -f "$verlist"
  git worktree prune 2>/dev/null || true
}
trap cleanup EXIT

rm -rf public

# HUGO_PARAMS_BUILD* become <meta name="docs-build-*"> in every page's <head>, so
# you can tell at a glance which ref a page in the served tree came from. Every
# build here renders with THIS checkout's themes/ — the archived worktrees symlink
# to it (see below) — so the theme revisions are the same for all of them and only
# need resolving once.
docsy_commit="$(git -C themes/docsy rev-parse HEAD 2>/dev/null || true)"
docsy_axoflow_commit="$(git -C themes/docsy-axoflow rev-parse HEAD 2>/dev/null || true)"

# 1. Latest — from the working tree, served at the root. Build first: Hugo cleans
#    its destination (public/), so it must run before the version sub-dirs exist.
echo "==> Building latest (working tree) at ${BASE}/"
latest_ref="$(git rev-parse --abbrev-ref HEAD)"
latest_commit="$(git rev-parse HEAD)"
git diff --quiet HEAD || latest_commit="${latest_commit}-dirty"
HUGO_PARAMS_BUILDREF="$latest_ref" \
HUGO_PARAMS_BUILDCOMMIT="$latest_commit" \
HUGO_PARAMS_BUILDVERSION="latest" \
HUGO_PARAMS_BUILDDOCSYCOMMIT="$docsy_commit" \
HUGO_PARAMS_BUILDDOCSYAXOFLOWCOMMIT="$docsy_axoflow_commit" \
hugo --environment development --baseURL "${BASE}/" --destination public
# The latest's search index is built once at the very end, over the whole tree,
# so it covers every version (the cross-version "Version" filter) — see below.

# 2. Every other version — from its git ref, into public/<version>/.
# Read from a temp file (not process substitution) so the loop also works when
# the script is run with `sh` on macOS, where `< <(...)` is unavailable.
verlist="$(mktemp "${TMPROOT}/axo-versions.XXXXXX")"
parse_versions > "$verlist"
while IFS='|' read -r version ref latest; do
  [ -z "$version" ] && continue
  [ "$latest" = "1" ] && continue
  if [ -z "$ref" ]; then
    echo "==> WARNING: version ${version} has no 'ref:' in ${VERSIONS_FILE}; skipping"
    continue
  fi

  commit="$(resolve_ref "$ref")"
  if local_sha="$(git rev-parse --verify --quiet "refs/heads/${ref}")" &&
     [ "$local_sha" != "$commit" ]; then
    echo "==> NOTE: local branch '${ref}' ($(git rev-parse --short=12 "$local_sha")) differs from origin; building origin's state, as CI does"
  fi

  echo "==> Building ${version} from ref '${ref}' ($(git rev-parse --short=12 "$commit")) at ${BASE}/${version}/"
  tmp_parent="$(mktemp -d "${TMPROOT}/axo-worktree.XXXXXX")"
  worktree="${tmp_parent}/src"
  git worktree add --quiet --detach "$worktree" "$commit"
  (
    cd "$worktree"
    # Reuse the main checkout's fully-provisioned themes/ (initialised submodules
    # and npm deps) instead of re-provisioning them in the throwaway worktree. The
    # archived docs therefore render with the CURRENT theme — fine for testing the
    # switcher, which is what this script is for.
    rm -rf themes
    ln -s "${REPO}/themes" themes
    # Mirror production: show the current version list in the archived switcher.
    # mkdir first — a ref old enough to predate the version switcher has no data/
    # directory at all, and `set -e` turned that cp into a hard failure with no
    # explanation. CI's equivalent step is a `git show > data/versions.yaml`
    # redirect, which fails the same way for the same reason.
    mkdir -p "$(dirname "$VERSIONS_FILE")"
    cp "${REPO}/${VERSIONS_FILE}" "$VERSIONS_FILE"
    HUGO_PARAMS_BUILDREF="$ref" \
    HUGO_PARAMS_BUILDCOMMIT="$commit" \
    HUGO_PARAMS_BUILDVERSION="$version" \
    HUGO_PARAMS_BUILDDOCSYCOMMIT="$docsy_commit" \
    HUGO_PARAMS_BUILDDOCSYAXOFLOWCOMMIT="$docsy_axoflow_commit" \
    hugo --environment development --baseURL "${BASE}/${version}/" --destination "${REPO}/public/${version}"
  )
  npx pagefind --output-subdir pagefind --site "${REPO}/public/${version}"
  git worktree remove --force "$worktree"
  rm -rf "$tmp_parent"
  worktree=""; tmp_parent=""
done < "$verlist"
rm -f "$verlist"; verlist=""

# 3. Unified search index for the LATEST site: index the whole tree (latest +
#    every version sub-dir) into public/pagefind/, so the modal's Version filter
#    (data-pagefind-filter="section:<version>") lists and filters across all
#    versions natively — no client-side index merging. The per-version indexes
#    built above keep each archived sub-site's own search working.
echo "==> Building unified search index over all versions"
npx pagefind --output-subdir pagefind --site ./public

# 4. Serve the combined tree.
echo "==> Serving on ${BASE}/  (older versions under their /<version>/ paths)"
http-server ./public -p "${PORT}"
