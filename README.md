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
- [Hugo (Extended version)](https://gohugo.io/), at least version 0.139.0

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
    npm install -D autoprefixer
    npm install -D postcss-cli
    npm install -D postcss
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
