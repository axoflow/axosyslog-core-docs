// Project-level PostCSS pipeline. Overrides themes/docsy/postcss.config.js
// (which only registers autoprefixer). Adds @fullhuman/postcss-purgecss in
// production builds to strip unused selectors from the SCSS bundle.
// To install the plugin once: `npm install --save-dev @fullhuman/postcss-purgecss`

const autoprefixer = require('autoprefixer');

const isProd =
  process.env.HUGO_ENVIRONMENT === 'production' ||
  process.env.NODE_ENV === 'production';

let purgecss = null;
if (isProd) {
  // postcss-purgecss has shipped both CJS-default and named-default exports
  // across major versions; support both shapes without forcing a pin.
  const mod = require('@fullhuman/postcss-purgecss');
  const factory = mod.default || mod.purgeCSSPlugin || mod;

  purgecss = factory({
    content: [
      // Project-level Hugo source — templates, shortcodes, content, JS.
      './layouts/**/*.{html,js}',
      './content/**/*.{md,html}',
      './assets/**/*.{js,html}',
      './static/**/*.{js,html}',
      // Docsy theme submodule (do not edit; submodule is upstream).
      './themes/docsy/layouts/**/*.html',
      './themes/docsy/assets/**/*.js',
      // Axoflow's Docsy customizations (the layouts + JS this site actually
      // ships with — must be scanned or every override class gets dropped).
      './themes/docsy-axoflow/layouts/**/*.html',
      './themes/docsy-axoflow/assets/**/*.{js,scss}',
    ],

    // Class names use only `[A-Za-z0-9_-]` in Bootstrap 5 and our codebase.
    // The simple extractor is robust against Hugo template syntax (`{{ … }}`)
    // and YAML front matter, where stricter Tailwind-style extractors trip up.
    defaultExtractor: (content) => content.match(/[\w-]+/g) || [],

    safelist: {
      // ---- Literal class names added by JavaScript at runtime ----
      // Sources (verified by grepping classList.add/remove across themes):
      //   themes/docsy/assets/js/dark-mode.js     -> `active` on theme buttons
      //   themes/docsy/assets/js/click-to-copy.js -> `click-to-copy`, `copy-to-clipboard-button`
      //   themes/docsy/assets/js/drawio.js        -> `drawio*`
      //   tocbot.min.js                           -> `is-active-link`, `is-active-li`, …
      //   custom-right-sidebar-elements-bottom    -> `hidden`
      //   layouts/_shortcodes/tabpane.html        -> `show`/`active` toggled by Bootstrap tabs JS
      //   Bootstrap dropdown/modal/collapse/alert -> dynamic state classes below
      standard: [
        // Bootstrap state classes toggled by component JS
        'show', 'active', 'disabled', 'collapsed', 'collapsing',
        'fade', 'fading',
        'modal-open', 'modal-static', 'modal-backdrop',
        'tab-pane', 'tab-body', 'tab-content',
        'dropdown-menu', 'dropdown-item', 'dropdown-toggle',
        'dropdown-menu-end', 'dropdown-menu-start',
        'navbar-toggler', 'navbar-collapse', 'navbar-nav',
        'focus', 'focus-visible',
        // Docsy / Prism / Tocbot / project-specific
        'click-to-copy', 'copy-to-clipboard-button',
        'drawio', 'drawiobtn', 'drawioframe',
        'code-toolbar', 'toolbar', 'toolbar-item',
        // Tocbot builds the right-hand TOC list at runtime, so these never
        // appear in the static HTML. `toc-link` carries the `display:block`
        // rule (tocbot.css) that stops multi-line headings from overlapping —
        // without it that fix gets purged and the bug returns.
        'toc-link', 'toc-list', 'is-collapsible',
        'is-active-link', 'is-active-li',
        'is-collapsed', 'is-position-fixed',
        'hidden',
        // FontAwesome — DELIBERATELY no entries here.
      ],

      // ---- Pattern safelist: deep ----
      // Keep selectors that match these regexes — they are generated at
      // runtime and therefore invisible to the static content scanner.
      deep: [
        // Prism syntax highlighter token classes (Prism injects them after
        // the page loads from /js/prism.js).
        /^token($|[-\s.])/, /^language-/, /^line-numbers/, /^line-highlight/,
        // GLightbox builds its lightbox DOM at runtime in scripts.html.
        /^glightbox-/, /^gslide/, /^goverlay/, /^gclose/, /^gprev/, /^gnext/,
        // Bootstrap attribute selectors like `[data-bs-toggle="modal"]`.
        // PurgeCSS treats attribute selectors via this entry.
        /data-bs-/,
      ],

      // ---- Pattern safelist: greedy ----
      // Empty.
      greedy: [],
    },

    // Don't drop @keyframes, @font-face, or CSS custom properties (--var).
    // These are commonly referenced from inline styles or computed at runtime
    // and PurgeCSS's static analysis can't confirm their use. The bytes saved
    // by purging them are negligible; the risk of breakage isn't.
    variables: false,
    keyframes: false,
    fontFace: false,
  });
}

module.exports = {
  plugins: [autoprefixer, purgecss].filter(Boolean),
};
