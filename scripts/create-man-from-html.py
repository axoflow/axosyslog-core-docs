#!/usr/bin/env python3
# coding: utf-8

import os
import argparse
import subprocess
from pathlib import Path
from bs4 import BeautifulSoup


def extract_content_from_hugohtml(input_file: Path):
    """Extract <div class="td-content"> from a Hugo-generated HTML file."""
    with input_file.open("r", encoding="utf8") as f:
        soup = BeautifulSoup(f, "html.parser")

    return soup.find("div", attrs={"class": "td-content"})


def create_sanitized_html_content(rawhtml, unix_name: str, section: str):
    """Wrap extracted content in minimal XHTML template and enrich metadata."""

    xhtml_template = """<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title></title>
</head>
<body>
</body>
</html>"""

    soup = BeautifulSoup(xhtml_template, "lxml")

    # Insert extracted content
    soup.body.insert(1, rawhtml)

    # Set title from first h1 if available
    if soup.body.h1:
        soup.head.title.insert(1, soup.body.h1)

    # Convert relative documentation links to absolute
    for entry in soup.find_all("a", href=True):
        if entry["href"].startswith("/docs/"):
            entry["href"] = "https://axoflow.com" + entry["href"]

    # Add metadata for XSLT processing
    soup.head.append(soup.new_tag("meta", unix_name=unix_name))
    soup.head.append(soup.new_tag("meta", section=section))
    soup.head.append(soup.new_tag("meta", author="Axoflow"))

    return soup


def convert_html_to_man(
    sanitized_html,
    original_file: Path,
    output_dir: Path,
    xslt_file: Path,
    unix_name: str,
    section: str,
):
    """Convert XHTML to man page using xsltproc."""

    output_dir.mkdir(parents=True, exist_ok=True)

    base_filename = original_file.parent.name
    temp_html_file = output_dir / f"{base_filename}.html"

    # Write temporary XHTML file
    with temp_html_file.open("w", encoding="utf8") as f:
        f.write(str(sanitized_html))

    # Run xsltproc
    result = subprocess.run(
        ["xsltproc", str(xslt_file), str(temp_html_file)],
        capture_output=True,
        text=True,
    )

    if result.stderr:
        print(f"Error converting {original_file}: {result.stderr}")

    # Remove empty lines
    output = os.linesep.join(
        line for line in result.stdout.splitlines() if line.strip()
    )

    # Fix man page header
    lines = output.splitlines()
    if lines:
        lines[0] = f'.TH "{unix_name}" {section} "" "" {unix_name}'
    output = "\n".join(lines)

    # Write final manpage
    man_file = output_dir / base_filename
    with man_file.open("w", encoding="utf8") as f:
        f.write(output)
        print(f"Man page %s created", man_file)

    # Remove temporary file
    temp_html_file.unlink(missing_ok=True)


def process_manpages(input_dir: Path, output_dir: Path, xslt_file: Path):
    """Walk through input directory and process all manpage HTML files."""

    for root, _, files in os.walk(input_dir):
        for file in files:
            full_path = Path(root) / file

            base_filename = full_path.parent.name

            # Skip unwanted directories
            if "_print" in str(full_path) or input_dir.name in base_filename:
                continue

            print(f"Processing {full_path}")

            # Extract unix_name and section
            try:
                unix_name, section = base_filename.rsplit(".", 1)
            except ValueError:
                print(f"Skipping invalid directory format: {base_filename}")
                continue

            raw_content = extract_content_from_hugohtml(full_path)
            if not raw_content:
                print(f"ERROR extracting content from {full_path}")
                continue

            sanitized_content = create_sanitized_html_content(
                raw_content, unix_name, section
            )

            convert_html_to_man(
                sanitized_content,
                full_path,
                output_dir,
                xslt_file,
                unix_name,
                section,
            )


def main():
    pwd = Path.cwd()

    parser = argparse.ArgumentParser(
        description="Convert Hugo HTML manpages to UNIX man format"
    )

    parser.add_argument(
        "--input-dir",
        type=Path,
        default=pwd / "public" / "app-man-syslog-ng",
        help="Input directory containing generated HTML manpages",
    )

    parser.add_argument(
        "--output-dir",
        type=Path,
        default=pwd / "tmp" / "manpages",
        help="Output directory for generated manpages",
    )

    parser.add_argument(
        "--xslt-file",
        type=Path,
        default=pwd / "scripts" / "xhtml2man.xslt",
        help="Path to xhtml2man.xslt file",
    )

    args = parser.parse_args()

    if not args.xslt_file.exists():
        raise FileNotFoundError(f"XSLT file not found: {args.xslt_file}")

    process_manpages(args.input_dir, args.output_dir, args.xslt_file)

    print("\nGenerated manpages:")
    subprocess.run(["ls", str(args.output_dir)])


if __name__ == "__main__":
    main()