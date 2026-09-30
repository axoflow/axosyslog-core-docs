#!/usr/bin/env python3

# Compare the documented module/package matrix against the AxoSyslog source tree.
#
# Ground truth comes from the packaging files and the plugin registrations in the
# AxoSyslog source (tmp/axosyslog by default):
#
#   packaging/debian/control      -> the list of DEB packages
#   packaging/debian/*.install    -> which .so each DEB package ships
#   packaging/rhel/axosyslog.spec -> the RPM subpackages and their %files
#   modules/**/*.c, *.cc          -> which driver each module registers
#   scl/*/*.conf                  -> which drivers the SCL provides
#
# The docs side is content/headless/chunk/package-matrix.md plus every
# prereq-package* snippet call under content/.
#
# This reports drift, it does not rewrite the matrix: the "Provides" column
# groups drivers editorially, which a generator would flatten.

import argparse
import json
import re
import sys
from pathlib import Path

DEFAULT_SOURCE = Path("tmp/axosyslog")
DEFAULT_MATRIX = Path("content/headless/chunk/package-matrix.md")
DEFAULT_CONTENT = Path("content")

BASE_DEB = "axosyslog-core"
BASE_RPM = "axosyslog"

# Module directory name -> shared object name, where the two differ.
SO_ALIASES = {
    "json": "json-plugin",
    "geoip2": "geoip2-plugin",
    "getent": "tfgetent",
    "python": "mod-python",
    "java": "mod-java",
    "diskq": "disk-buffer",
    "systemd-journal": "sdjournal",
    "filterx": "grpc-filterx",  # modules/grpc/filterx
}

# Packages that ship no .so and therefore cannot be discovered from the
# .install/%files parsing, but still belong in the matrix.
CONTENT_ONLY_PACKAGES = {"axosyslog-scl"}

# Packages that are not modules and are intentionally absent from the matrix.
IGNORED_PACKAGES = {
    "axosyslog",
    "axosyslog-core",
    "axosyslog-dev",
    "axosyslog-dbg",
    "axosyslog-devel",
    "axosyslog-debuginfo",
    "axosyslog-logrotate",
}

PLUGIN_RE = re.compile(
    r'\.type\s*=\s*LL_CONTEXT_([A-Z_0-9]+)[^,]*,\s*\.name\s*=\s*"([^"]+)"', re.S
)
PLUGIN_RE_SWAPPED = re.compile(
    r'\.name\s*=\s*"([^"]+)"\s*,\s*\.type\s*=\s*LL_CONTEXT_([A-Z_0-9]+)', re.S
)
TEMPLATE_FUNC_RE = re.compile(r'TEMPLATE_FUNCTION_PLUGIN\(\s*\w+\s*,\s*"([^"]+)"')
SCL_BLOCK_RE = re.compile(r"^\s*block\s+(source|destination|parser|rewrite|filter)\s+([\w.-]+)", re.M)

# Contexts that name something a user writes in a configuration file and would
# hit an "unexpected LL_IDENTIFIER" error for.
USER_FACING_CONTEXTS = {"SOURCE", "DESTINATION", "PARSER", "REWRITE", "FILTER", "INNER_DEST", "INNER_SRC"}

# Top-level drivers get their own matrix entry. Inner options (disk-buffer(),
# cloud-auth(), ...) are listed only when they matter, so don't demand them.
TOPLEVEL_CONTEXTS = {"SOURCE", "DESTINATION", "PARSER"}

# The matrix lists representative example plugins, not every test helper.
UNLISTED_MODULES = {"examples"}

# SCL keyword -> the shared object that has to be installed for it to work.
# Used to find SCL blocks that silently depend on an optional module.
SCL_KEYWORD_MODULE = {
    "http": "http",
    "opentelemetry": "otel",
    "loki": "loki",
    "bigquery": "bigquery",
    "clickhouse": "clickhouse",
    "google-pubsub-grpc": "pubsub",
    "kafka-c": "kafka",
    "python": "mod-python",
    "python-fetcher": "mod-python",
    "java": "mod-java",
    "snmp": "afsnmp",
    "snmptrapd-parser": "afsnmp",
    "cloud-auth": "cloud_auth",
    "geoip2": "geoip2-plugin",
    "xml": "xml",
    "add-contextual-data": "add-contextual-data",
    "map-value-pairs": "map-value-pairs",
    "stomp": "afstomp",
    "mongodb": "afmongodb",
    "amqp": "afamqp",
    "redis": "redis",
    "riemann": "riemann",
    "mqtt": "mqtt",
    "sql": "afsql",
    "smtp": "afsmtp",
    "arrow-flight": "arrow-flight",
}


def normalize(name: str) -> str:
    """Fold - and _ so that add_contextual_data and add-contextual-data match."""
    return name.replace("_", "-")


# --------------------------------------------------------------------------
# Ground truth: packaging
# --------------------------------------------------------------------------


def parse_deb_packages(source: Path) -> dict[str, set[str]]:
    """DEB package name -> set of shared objects it ships."""
    control = source / "packaging/debian/control"
    if not control.exists():
        sys.exit(f"Error: {control} not found. Is --source pointing at an AxoSyslog checkout?")

    packages = {
        m.group(1)
        for m in re.finditer(r"^Package:\s*(\S+)", control.read_text(errors="ignore"), re.M)
    }

    result: dict[str, set[str]] = {p: set() for p in packages}
    for install in (source / "packaging/debian").glob("*.install"):
        pkg = install.name[: -len(".install")]
        if pkg not in result:
            continue
        for so in re.findall(r"lib([\w.-]+)\.so\b", install.read_text(errors="ignore")):
            result[pkg].add(so)
    return result


def parse_rpm_packages(source: Path) -> dict[str, set[str]]:
    """RPM package name -> set of shared objects it ships."""
    spec = source / "packaging/rhel/axosyslog.spec"
    if not spec.exists():
        sys.exit(f"Error: {spec} not found.")
    text = spec.read_text(errors="ignore")

    name = re.search(r"^Name:\s*(\S+)", text, re.M)
    base = name.group(1) if name else BASE_RPM

    subpackages = {base} | {
        f"{base}-{m.group(1)}" for m in re.finditer(r"^%package\s+(\S+)", text, re.M)
    }

    result: dict[str, set[str]] = {p: set() for p in subpackages}
    # Split on %files sections; the bare "%files" belongs to the base package.
    for m in re.finditer(r"^%files\s*(\S*)\s*$(.*?)(?=^%\w|\Z)", text, re.M | re.S):
        suffix, body = m.group(1), m.group(2)
        pkg = base if not suffix else f"{base}-{suffix}"
        if pkg not in result:
            continue
        for so in re.findall(r"lib([\w.-]+)\.so\b", body):
            result[pkg].add(so)
    return result


# --------------------------------------------------------------------------
# Ground truth: which driver each module registers
# --------------------------------------------------------------------------


def module_so_name(plugin_file: Path, modules_root: Path) -> str | None:
    """Guess the .so basename from the module directory holding a plugin file."""
    try:
        rel = plugin_file.relative_to(modules_root)
    except ValueError:
        return None
    parts = rel.parts
    if not parts:
        return None
    # modules/grpc/otel/otel-plugin.c -> "otel"; modules/http/http-plugin.c -> "http"
    for candidate in reversed(parts[:-1]):
        return SO_ALIASES.get(candidate, candidate)
    return None


def parse_module_drivers(source: Path) -> dict[str, dict[str, set[str]]]:
    """Shared object name -> {"drivers", "toplevel", "template_functions"}."""
    modules_root = source / "modules"
    if not modules_root.is_dir():
        sys.exit(f"Error: {modules_root} not found.")

    result: dict[str, dict[str, set[str]]] = {}
    for path in modules_root.rglob("*"):
        if path.suffix not in {".c", ".cc", ".cpp"} or "tests" in path.parts:
            continue
        text = path.read_text(errors="ignore")

        hits: list[tuple[str, str]] = [(c, n) for c, n in PLUGIN_RE.findall(text)]
        hits += [(c, n) for n, c in PLUGIN_RE_SWAPPED.findall(text)]
        tfuncs = TEMPLATE_FUNC_RE.findall(text)
        if not hits and not tfuncs:
            continue

        so = module_so_name(path, modules_root)
        if so is None:
            continue
        entry = result.setdefault(
            so, {"drivers": set(), "toplevel": set(), "template_functions": set()}
        )
        for context, driver in hits:
            if context in USER_FACING_CONTEXTS:
                entry["drivers"].add(normalize(driver))
            if context in TOPLEVEL_CONTEXTS:
                entry["toplevel"].add(normalize(driver))
        entry["template_functions"].update(normalize(t) for t in tfuncs)
    return result


def iter_scl_block_bodies(text: str):
    """Yield (name, body) for every `block <kind> <name>(...) { ... }` definition.

    Scanning per block matters: scl/sumologic/sumologic.conf defines both
    sumologic-syslog() (core only) and sumologic-http() (needs the http module),
    so attributing the whole file's keywords to every block in it is wrong.
    """
    for m in SCL_BLOCK_RE.finditer(text):
        i, depth = m.end(), 0
        # Walk the argument list.
        while i < len(text):
            if text[i] == "(":
                depth += 1
            elif text[i] == ")":
                depth -= 1
                if depth == 0:
                    i += 1
                    break
            i += 1
        start = text.find("{", i)
        if start == -1:
            continue
        depth, j = 0, start
        while j < len(text):
            if text[j] == "{":
                depth += 1
            elif text[j] == "}":
                depth -= 1
                if depth == 0:
                    break
            j += 1
        yield m.group(2), text[m.end() : j]


def parse_scl_blocks(source: Path) -> dict[str, set[str]]:
    """SCL block name -> the shared objects that block needs beyond the base package."""
    confs = [c for c in (source / "scl").glob("*/*.conf")]
    confs += [
        c
        for c in (source / "modules/python-modules/syslogng/modules").glob("*/scl/*.conf")
        # The example Python module ships with axosyslog-mod-examples, not with
        # the drivers the matrix documents.
        if "example" not in c.parts
    ]

    blocks: dict[str, set[str]] = {}
    for conf in confs:
        text = re.sub(r"^\s*#.*$", "", conf.read_text(errors="ignore"), flags=re.M)
        for name, body in iter_scl_block_bodies(text):
            needed = {
                so
                for keyword, so in SCL_KEYWORD_MODULE.items()
                if re.search(r"(?<![\w./-])" + re.escape(keyword) + r"\s*\(", body)
            }
            blocks.setdefault(normalize(name), set()).update(needed)
    return blocks


# --------------------------------------------------------------------------
# Docs side
# --------------------------------------------------------------------------


def parse_matrix(path: Path) -> tuple[list[dict], set[str], set[str], set[str]]:
    """Return (rows, deb packages named, rpm packages named, drivers named in prose)."""
    if not path.exists():
        sys.exit(f"Error: matrix not found: {path}")
    rows, deb_named, rpm_named, prose = [], set(), set(), set()

    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.startswith("|") or line.startswith("|--") or "| Provides |" in line:
            # Prose around the table (for example the note about the
            # platform-specific drivers) also counts as documenting a driver.
            prose.update(normalize(n) for n in re.findall(r"`([\w.-]+)\(\)`", line))
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 3:
            continue
        label, provides, package = cells[0], cells[1], cells[2]

        def cell_for(flag: str) -> str:
            m = re.search(r"\{\{<\s*if\s+%s\s*>\}\}(.*?)\{\{<\s*/if\s*>\}\}" % flag, package, re.S)
            return m.group(1) if m else ""

        deb_cell, rpm_cell = cell_for("deb"), cell_for("rpm")
        deb_pkgs = set(re.findall(r"`(axosyslog[\w.-]*)`", deb_cell))
        rpm_pkgs = set(re.findall(r"`(axosyslog[\w.-]*)`", rpm_cell))
        deb_named |= deb_pkgs
        rpm_named |= rpm_pkgs

        rows.append(
            {
                "label": label,
                "drivers": {normalize(n) for n in re.findall(r"`([\w.-]+)\(\)`", provides)},
                "template_functions": {
                    normalize(n) for n in re.findall(r"`\$\(([\w.-]+)[^)]*\)`", provides)
                },
                "deb": deb_pkgs,
                "rpm": rpm_pkgs,
                "deb_is_base": "base package" in deb_cell,
                "rpm_is_base": "base package" in rpm_cell,
                "unavailable": "Not available" in package,
            }
        )
    return rows, deb_named, rpm_named, prose


PREREQ_CALL_RE = re.compile(
    r'include-headless\s+"chunk/(prereq-package(?:-deb-only)?)\.md"((?:\s+"[^"]+")*)'
)


def parse_prereq_calls(content: Path) -> list[tuple[Path, str, list[str]]]:
    calls = []
    for md in content.rglob("*.md"):
        text = md.read_text(encoding="utf-8", errors="ignore")
        for m in PREREQ_CALL_RE.finditer(text):
            args = re.findall(r'"([^"]+)"', m.group(2))
            calls.append((md, m.group(1), args))
    return calls


# --------------------------------------------------------------------------
# Checks
# --------------------------------------------------------------------------


def run_checks(source: Path, matrix_path: Path, content: Path) -> dict:
    deb = parse_deb_packages(source)
    rpm = parse_rpm_packages(source)
    modules = parse_module_drivers(source)
    scl_blocks = parse_scl_blocks(source)
    rows, deb_named, rpm_named, prose_drivers = parse_matrix(matrix_path)

    findings: dict[str, list[str]] = {
        "missing_packages": [],
        "stale_packages": [],
        "wrong_package": [],
        "undocumented_drivers": [],
        "bad_prereq_args": [],
    }

    # 1. Package inventory drift.
    real_deb = (set(deb) | CONTENT_ONLY_PACKAGES) - IGNORED_PACKAGES
    real_rpm = set(rpm) - IGNORED_PACKAGES
    for pkg in sorted(real_deb - deb_named):
        findings["missing_packages"].append(f"DEB package {pkg} exists in the source but is not in the matrix")
    for pkg in sorted(real_rpm - rpm_named):
        findings["missing_packages"].append(f"RPM package {pkg} exists in the source but is not in the matrix")
    for pkg in sorted(deb_named - set(deb) - CONTENT_ONLY_PACKAGES - IGNORED_PACKAGES):
        findings["stale_packages"].append(f"DEB package {pkg} is in the matrix but no longer exists in the source")
    for pkg in sorted(rpm_named - set(rpm) - IGNORED_PACKAGES):
        findings["stale_packages"].append(f"RPM package {pkg} is in the matrix but no longer exists in the source")

    # 2. Which package actually ships each driver.
    so_to_deb = {so: pkg for pkg, sos in deb.items() for so in sos}
    so_to_rpm = {so: pkg for pkg, sos in rpm.items() for so in sos}

    driver_truth: dict[str, tuple[str | None, str | None, str]] = {}
    for so, entry in modules.items():
        for name in entry["drivers"] | entry["template_functions"]:
            driver_truth[name] = (so_to_deb.get(so), so_to_rpm.get(so), so)

    for row in rows:
        for name in row["drivers"] | row["template_functions"]:
            truth = driver_truth.get(name)
            if truth is None:
                continue  # SCL-provided or not a compiled driver
            real_deb_pkg, real_rpm_pkg, so = truth
            if real_deb_pkg and real_deb_pkg != BASE_DEB and real_deb_pkg not in row["deb"]:
                findings["wrong_package"].append(
                    f"{name}() ships in DEB {real_deb_pkg} (lib{so}.so) but the "
                    f"{row['label']!r} row names {sorted(row['deb']) or 'nothing'}"
                )
            if real_rpm_pkg and real_rpm_pkg != BASE_RPM and real_rpm_pkg not in row["rpm"]:
                findings["wrong_package"].append(
                    f"{name}() ships in RPM {real_rpm_pkg} (lib{so}.so) but the "
                    f"{row['label']!r} row names {sorted(row['rpm']) or 'nothing'}"
                )
            if real_deb_pkg == BASE_DEB and (row["deb"] - {BASE_DEB}) and not row["deb_is_base"]:
                findings["wrong_package"].append(
                    f"{name}() is in the DEB base package but the {row['label']!r} row "
                    f"names {sorted(row['deb'])}"
                )

    # 3. Drivers with no mention in the matrix.
    documented = set(prose_drivers)
    for row in rows:
        documented |= row["drivers"] | row["template_functions"]

    for so, entry in modules.items():
        if so in UNLISTED_MODULES:
            continue
        deb_pkg = so_to_deb.get(so)
        rpm_pkg = so_to_rpm.get(so)
        if deb_pkg in (None, BASE_DEB) and rpm_pkg in (None, BASE_RPM):
            continue  # core or unpackaged: no package note needed
        for name in sorted(entry["toplevel"]):
            if name not in documented:
                findings["undocumented_drivers"].append(
                    f"{name}() from lib{so}.so ({deb_pkg or 'no DEB package'} / "
                    f"{rpm_pkg or 'no RPM package'}) is not listed in the matrix"
                )

    # An SCL block that needs an optional module is the case that bites users,
    # so those have to be findable in the matrix. Pure-SCL blocks need only the
    # axosyslog-scl package and are covered by the SCL row.
    for block, needed in sorted(scl_blocks.items()):
        if not needed or block in documented:
            continue
        packages = sorted({so_to_deb[so] for so in needed if so in so_to_deb} - {BASE_DEB})
        if packages:
            findings["undocumented_drivers"].append(
                f"SCL block {block}() needs {', '.join(packages)} but is not listed in the matrix"
            )

    # 4. Package names passed to the prereq snippets must be real.
    for md, snippet, args in parse_prereq_calls(content):
        rel = md.relative_to(content.parent) if content.parent != Path(".") else md
        if snippet == "prereq-package" and len(args) != 2:
            findings["bad_prereq_args"].append(f"{rel}: prereq-package.md needs 2 arguments, got {len(args)}")
            continue
        if snippet == "prereq-package-deb-only" and len(args) != 1:
            findings["bad_prereq_args"].append(f"{rel}: prereq-package-deb-only.md needs 1 argument, got {len(args)}")
            continue
        if args[0] not in deb and args[0] not in CONTENT_ONLY_PACKAGES:
            findings["bad_prereq_args"].append(f"{rel}: {args[0]!r} is not a DEB package")
        if snippet == "prereq-package" and args[1] not in rpm:
            findings["bad_prereq_args"].append(f"{rel}: {args[1]!r} is not an RPM package")

    return {
        "counts": {
            "deb_packages": len(deb),
            "rpm_packages": len(rpm),
            "modules": len(modules),
            "scl_blocks": len(scl_blocks),
            "matrix_rows": len(rows),
        },
        "findings": findings,
    }


TITLES = {
    "missing_packages": "Packages missing from the matrix",
    "stale_packages": "Packages in the matrix that no longer exist",
    "wrong_package": "Rows naming the wrong package",
    "undocumented_drivers": "Drivers not mentioned in the matrix",
    "bad_prereq_args": "Invalid package names in prereq snippet calls",
}


def report(result: dict) -> int:
    c = result["counts"]
    print(f"\n{'=' * 66}")
    print(f"  DEB packages : {c['deb_packages']:>3}    Modules   : {c['modules']:>3}")
    print(f"  RPM packages : {c['rpm_packages']:>3}    SCL blocks: {c['scl_blocks']:>3}")
    print(f"  Matrix rows  : {c['matrix_rows']:>3}")
    print(f"{'=' * 66}\n")

    total = 0
    for key, title in TITLES.items():
        items = result["findings"][key]
        total += len(items)
        if not items:
            print(f"{title}: none")
            continue
        print(f"{title} [{len(items)}]:")
        for item in items:
            print(f"  - {item}")
        print()

    print()
    if total:
        print(f"{total} item(s) need review. Update content/headless/chunk/package-matrix.md")
        print("and the Prerequisites section of the affected pages.")
    else:
        print("The package matrix matches the source tree.")
    return 1 if total else 0


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Diff the documented package matrix against the AxoSyslog source tree."
    )
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE,
                        help=f"AxoSyslog source checkout (default: {DEFAULT_SOURCE})")
    parser.add_argument("--matrix", type=Path, default=DEFAULT_MATRIX,
                        help=f"Path to the matrix snippet (default: {DEFAULT_MATRIX})")
    parser.add_argument("--content", type=Path, default=DEFAULT_CONTENT,
                        help=f"Content directory to scan (default: {DEFAULT_CONTENT})")
    parser.add_argument("--json", action="store_true", help="Emit JSON instead of a report.")
    args = parser.parse_args()

    if not args.source.is_dir():
        sys.exit(
            f"Error: {args.source} not found. Clone the source first:\n"
            f"  git clone --depth 1 https://github.com/axoflow/axosyslog {args.source}"
        )

    result = run_checks(args.source, args.matrix, args.content)
    if args.json:
        print(json.dumps(result, indent=2, default=sorted))
        sys.exit(1 if any(result["findings"].values()) else 0)
    sys.exit(report(result))


if __name__ == "__main__":
    main()
