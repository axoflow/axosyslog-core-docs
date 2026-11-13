#!/usr/bin/env python3
"""Compare the FilterX functions of the AxoSyslog source with the function reference page.

Functions come from the builtin registrations in lib/filterx/filterx-globals.c
and the FILTERX_*FUNCTION_PLUGIN() entries of the modules. Documented functions
are the level-2 headings of the reference page. Exits 1 on drift.
"""
import argparse
import re
import sys
from pathlib import Path

SOURCE = Path("tmp/axosyslog")
PAGE = Path("content/filterx/function-reference.md")

# Example/test modules that are not shipped.
IGNORED_MODULE_DIRS = {"examples"}

BUILTIN = re.compile(r'filterx_builtin_\w*function\w*_register\(\s*"(\w+)"')
PLUGIN = re.compile(r"FILTERX_\w*FUNCTION_PLUGIN\((\w+)\)")
KEYWORD = re.compile(r'\{\s*"(\w+)",\s*KW_\w+\s*\}')
HEADING = re.compile(r"^##\s+([^{\n]+)")


def source_functions(src):
    """Return {function name: source file} for every FilterX function."""
    found = {}
    for path in sorted((src / "lib/filterx").glob("*.c")):
        for name in BUILTIN.findall(path.read_text(errors="replace")):
            found.setdefault(name, path.relative_to(src))
    for path in sorted((src / "modules").rglob("*.c")):
        if IGNORED_MODULE_DIRS & set(path.relative_to(src / "modules").parts):
            continue
        for name in PLUGIN.findall(path.read_text(errors="replace")):
            if name != "func_name":  # the macro definition itself
                found.setdefault(name, path.relative_to(src))
    return found


def keywords(src):
    """FilterX language keywords; some of them (isset, dpath) read like functions."""
    text = (src / "lib/filterx/filterx-parser.c").read_text(errors="replace")
    return set(KEYWORD.findall(text))


def documented_functions(page):
    """Names in the '## ' headings, for example '## uuid or uuid4' or '## str_strip, str_lstrip'."""
    names = set()
    for line in page.read_text().splitlines():
        m = HEADING.match(line)
        if m:
            names.update(re.findall(r"[a-z_][a-z0-9_]*", m.group(1).replace(" or ", ",")))
    return names


def mentioned_in(name, content):
    """Pages of the FilterX section that show the function as a call, for example `int(`."""
    call = re.compile(rf"(?<![\w.$-]){re.escape(name)}\(")
    return sorted(str(p.relative_to(content)) for p in content.rglob("*.md") if call.search(p.read_text(errors="replace")))


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--source", type=Path, default=SOURCE, help="AxoSyslog source tree (default: %(default)s)")
    parser.add_argument("--page", type=Path, default=PAGE, help="function reference page (default: %(default)s)")
    parser.add_argument("--list", action="store_true", help="also list every function found in the source")
    args = parser.parse_args()

    if not (args.source / "lib/filterx").is_dir():
        sys.exit(f"error: {args.source}/lib/filterx not found; clone AxoSyslog into {SOURCE} first")

    in_source = source_functions(args.source)
    documented = documented_functions(args.page)

    if args.list:
        print(f"FilterX functions in the source ({len(in_source)}):")
        for name, path in sorted(in_source.items()):
            print(f"  {'+' if name in documented else '-'} {name:32} {path}")
        print()

    missing = sorted(set(in_source) - documented)
    extra = sorted(documented - set(in_source) - keywords(args.source))

    print(f"Missing from {args.page} ({len(missing)}):")
    for name in missing:
        elsewhere = [p for p in mentioned_in(name, args.page.parent) if p != args.page.name]
        hint = f"mentioned in: {', '.join(elsewhere)}" if elsewhere else f"not mentioned in {args.page.parent}"
        print(f"  {name:28} {hint}")
    print(f"\nDocumented but not found in the source ({len(extra)}):")
    for name in extra:
        print(f"  {name}")

    return 1 if missing or extra else 0


if __name__ == "__main__":
    sys.exit(main())
