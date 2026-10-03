#!/usr/bin/env python3
"""Compare the Helm chart's values.yaml keys with the parameter tables of the docs.

Commented-out keys in values.yaml (for example `# url: ...`) are options the
templates read, so they count as chart keys. Exits 1 on drift.
"""
import re
import sys

VALUES = "tmp/axosyslog/charts/axosyslog/values.yaml"
PAGE = "content/install/helm/helm-chart-parameters.md"

KEY = re.compile(r"^(\s*)(#)?(\s*)([A-Za-z]\w*):(.*)$")


def chart_keys(path):
    """Leaf key paths of values.yaml, read line by line so commented keys count.

    Commented children of an inline `{}` or `[]` (like the `foo:` sample under
    `rewrites.set: {}`) are free-form examples, not options, so they are skipped.
    So is a commented repeat of a key already set (`# resources:` after
    `resources: {}`), together with its children.
    """
    stack, leaves, seen = [], set(), set()  # stack: (indent, key, is_free_form)
    for line in open(path):
        m = KEY.match(line)
        if not m or line.lstrip().startswith(("# --", "##")):
            continue
        # `#   CAFile:` nests under `# tls:`: count the spaces after the first
        commented, key, rest = m[2], m[4], m[5].strip()
        indent = len(m[1]) + (max(len(m[3]) - 1, 0) if commented else len(m[3]))
        while stack and stack[-1][0] >= indent:
            stack.pop()
        if commented and stack and stack[-1][2]:
            continue
        path = ".".join([k for _, k, _ in stack] + [key])
        if commented and path in seen:
            stack.append((indent, key, True))
            continue
        leaves.discard(".".join(k for _, k, _ in stack))
        stack.append((indent, key, rest.startswith(("{}", "[]"))))
        leaves.add(path)
        seen.add(path)
    return leaves


chart = chart_keys(VALUES)
# first column of a parameter table row
documented = set(re.findall(r"^\|\s+([a-z][\w]*(?:\.[\w]+)+|[a-z]\w+)\s+\|",
                            open(PAGE).read(), re.M))
# grouping rows like `collector.config.destinations` describe a whole subtree
documented = {d for d in documented
              if d in chart or not any(c.startswith(d + ".") for c in chart)}

missing = sorted(chart - documented)
extra = sorted(documented - chart)
for title, keys in (("In the chart, not documented:", missing),
                    ("Documented, not in the chart:", extra)):
    print(title, *keys or ["(none)"], sep="\n  ")
sys.exit(1 if missing or extra else 0)
