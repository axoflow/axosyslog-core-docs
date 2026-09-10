# AxoSyslog documentation

Documentation for the AxoSyslog release, originally based on [this version of the syslog-ng Open Source Edition documentation](https://github.com/balabit/syslog-ng-ose-guides/commit/2f4a52ee61d1ea9ad27cb4f3168b95408fddfdf2). We are continuously working on to keep it up-to-date with the latest released version of [AxoSyslog](https://github.com/axoflow/axosyslog/).

## Licensing

See [content/docs/_index.md](content/docs/_index.md).

## Using this repository

The documentation is built using [Hugo](https://gohugo.io/) and the [Docsy theme](https://www.docsy.dev/docs/).

You can run the website locally using Hugo (Extended version).

To use this repository, you need the following installed locally:

- [npm](https://www.npmjs.com/)
- [Go](https://go.dev/)
- [Hugo (Extended version)](https://gohugo.io/), at least version 0.92.3, but not higher than 0.122 (https://github.com/gohugoio/hugo/releases/tag/v0.122.0, see the **Assets** section for binaries)

1. Install the dependencies. Clone the repository and navigate to the directory:

    ```bash
    git clone https://github.com/axoflow/axosyslog-docs/
    cd axosyslog-docs
    ```

1. The documentation site uses the [Docsy Hugo theme](https://github.com/google/docsy#readme). Pull in the submodule:

    ```shell
    git submodule update --init --recursive --depth 1
    ```

1. Install the dependencies of Docsy:

    ```shell
    cd themes/docsy
    npm install
    cd ../../
    ```

1. Run the website locally using Hugo:

    ```shell
    hugo serve
    ```

    This starts the local Hugo server, by default on port 1313 (or another one if this port is already in use). Open `http://localhost:1313` in your browser to view the website. As you make changes to the source files, Hugo automatically updates the website and refreshes the browser.

    Common build errors:

    - `error: failed to transform resource: TOCSS: failed to transform "scss/main.scss" (text/x-scss): this feature is not available in your current Hugo version`: You have installed the regular version of Hugo, not the extended version.
    - `execute of template failed: template: docs/single.html:30:7: executing "docs/single.html" at <partial "scripts.html" .>: error calling partial`: You haven't run `npm install` in the `themes/docsy` directory.

## Documentation versions

The current release is published at the site root
(`https://axoflow.com/docs/axosyslog-core/`); every older version is published
under its own version segment (`.../4.26/`) and built from its release branch.

`data/versions.yaml` is the single source of truth: the version switcher, the
"no longer current" banner, the print header, the publish workflows and the
local preview script all read it. The switcher appears as soon as that file
exists — there is no param to turn it on.

Preview the whole tree locally, current release from your working tree and each
older version from its `ref:`:

```shell
scripts/serve-local-versions.sh   # http://localhost:8181/
```

Publishing:

| What | How |
|------|-----|
| Current release | Automatic, on every push to `main` (`publish.yaml`) |
| An older version | Automatic, on every push to its release branch (`publish-version-on-push.yaml`) |
| Every older version | Actions → **Publish versions**, leave the version blank |
| One older version | Actions → **Publish versions**, version = `4.26` |

Adding an entry to `data/versions.yaml` does not republish anything by itself —
run **Publish versions** afterwards so the archived sub-sites pick up the new
list. Check what a live page was built from in its `<meta name="docs-build-ref">`
tag.

### Cutting a new release

1. Branch the outgoing release: `git switch -c release-<old> <commit>`.
2. On that branch, strip `" (current)"` from the `body_attribute` cascade in
   `config/_default/config.toml`.
3. On `main`, bump `params.version`, `params.product.version`, `techversion`,
   `configversion`, and the `body_attribute` cascade to the new version.
4. In `data/versions.yaml`, make the new version `latest: true` and give the
   outgoing one a `ref:`.
5. Push `main`, then run **Publish versions** to rebuild the older sub-sites.

Every release branch also needs `publish-docs.yaml` and
`publish-version-on-push.yaml` present: on a push, GitHub runs the workflow
definitions from the pushed branch, not from `main`.

## Generating Markdown output for LLMs

The site can be converted to Markdown files suitable for LLM consumption using the `hugo_to_markdown.py` script.

### Prerequisites

- Python 3.10+
- Install the required Python packages:

    ```bash
    pip install beautifulsoup4 html2text
    ```

### Build and convert

1. Build the site:

    ```bash
    hugo --minify
    ```

1. Run the conversion script (writes `.md` files alongside the HTML in `public/`):

    ```bash
    python3 themes/docsy-axoflow/scripts/hugo_to_markdown.py --input public --output public
    ```

The script mirrors the Hugo output directory structure, converting each `index.html` to an `index.md` file in the same directory. Internal links are converted to relative Markdown links.
