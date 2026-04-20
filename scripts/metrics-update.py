#!/usr/bin/env python3

# Compare metrics from docs against those reported by syslog-ng --metrics-registry

import argparse
import re
import subprocess
import sys
from pathlib import Path

DEFAULT_MD_PATH = Path("content/chapter-log-statistics/metrics-reference/_index.md")
DOCKER_IMAGE = "ghcr.io/axoflow/axosyslog:nightly"
DOCKER_PULL_CMD = ["docker", "pull", DOCKER_IMAGE]
DOCKER_CMD = ["docker", "run", "--rm", DOCKER_IMAGE, "--metrics-registry"]


def parse_md_metrics(path: Path) -> set[str]:
    text = path.read_text(encoding="utf-8")
    return set(re.findall(r"^##\s+([a-zA-Z_:][a-zA-Z0-9_:]*)", text, re.MULTILINE))


def _strip_prefix(name: str) -> str:
    if name.startswith("syslogng_"):
        return name[len("syslogng_") :]
    return name


def parse_live_metrics(output: str) -> set[str]:
    metrics: set[str] = set()
    for line in output.splitlines():
        line = _strip_prefix(line.strip())

        metrics.add(line)

    return metrics


def pull_image() -> None:
    print(f"Pulling latest image: {DOCKER_IMAGE}", file=sys.stderr)
    try:
        subprocess.run(DOCKER_PULL_CMD, check=True, timeout=300)
    except FileNotFoundError:
        sys.exit("Error: 'docker' not found.")
    except subprocess.TimeoutExpired:
        sys.exit("Error: docker pull timed out after 300 seconds.")
    except subprocess.CalledProcessError as e:
        sys.exit(f"Error: docker pull failed with code {e.returncode}.")


def fetch_live_metrics() -> set[str]:
    print(f"Running: {' '.join(DOCKER_CMD)}", file=sys.stderr)
    try:
        result = subprocess.run(
            DOCKER_CMD,
            capture_output=True,
            text=True,
            timeout=15,
        )
    except FileNotFoundError:
        sys.exit("Error: 'docker' not found. Is it installed and on your PATH?")
    except subprocess.TimeoutExpired:
        sys.exit("Error: docker command timed out after 15 seconds.")

    if result.returncode != 0:
        print("docker stderr:", result.stderr, file=sys.stderr)
        sys.exit(f"Error: docker exited with code {result.returncode}.")

    metrics = parse_live_metrics(result.stdout)
    if not metrics:
        print("Warning: no metrics parsed from container output.", file=sys.stderr)
        print("Raw output was:\n", result.stderr, file=sys.stderr)
    return metrics


def print_diff(doc_metrics: set[str], live_metrics: set[str]) -> None:
    removed = sorted(doc_metrics - live_metrics)
    added = sorted(live_metrics - doc_metrics)
    common = doc_metrics & live_metrics

    print(f"\n{'=' * 60}")
    print(f"  Metrics in docs   : {len(doc_metrics)}")
    print(f"  Metrics in image  : {len(live_metrics)}")
    print(f"  Common            : {len(common)}")
    print(f"{'=' * 60}\n")

    if removed:
        print(f"REMOVED from image (in docs, not in nightly) [{len(removed)}]:")
        for m in removed:
            print(f"  - {m}")
    else:
        print("REMOVED: none")

    print()

    if added:
        print(f"ADDED in image (in nightly, not in docs) [{len(added)}]:")
        for m in added:
            print(f"  + {m}")
    else:
        print("ADDED: none")

    print()


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Diff documented vs live syslog-ng metrics."
    )
    parser.add_argument(
        "--md",
        type=Path,
        default=DEFAULT_MD_PATH,
        help=f"Path to the metrics Markdown file (default: {DEFAULT_MD_PATH})",
    )
    parser.add_argument(
        "--no-container",
        metavar="FILE",
        help="Skip docker and read live metrics from FILE instead (for testing).",
    )
    args = parser.parse_args()

    if not args.md.exists():
        sys.exit(f"Error: Markdown file not found: {args.md}")
    doc_metrics = parse_md_metrics(args.md)
    print(f"Parsed {len(doc_metrics)} metrics from {args.md}", file=sys.stderr)

    if args.no_container:
        raw = Path(args.no_container).read_text(encoding="utf-8")
        live_metrics = parse_live_metrics(raw)
    else:
        pull_image()
        live_metrics = fetch_live_metrics()
    print(f"Parsed {len(live_metrics)} metrics from container output", file=sys.stderr)

    print_diff(doc_metrics, live_metrics)


if __name__ == "__main__":
    main()
