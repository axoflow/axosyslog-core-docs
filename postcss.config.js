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

    // WHY PRISM'S DEAD RULES SURVIVE ANYWAY, and what would be needed to drop
    // them — recorded because the obvious two fixes were both tried and neither
    // works.
    //
    // `prism_syntax_highlighting` is off (config/_default/config.toml): Hugo's
    // Chroma highlights at build time, Prism's JavaScript no longer loads, and
    // nothing injects `.token.*` any more. The docsy-axoflow submodule still
    // states ten such rules for the dark theme in
    // `assets/scss/_styles_project.scss`, about 1.5KB of the compiled sheet.
    //
    // 1. Taking `/^token/` out of the safelist below saved 44 bytes. The content
    //    globs include `themes/docsy-axoflow/assets/**/*.scss`, so every class
    //    that submodule STYLES is also a word the extractor finds in the very
    //    same file: theme rules keep themselves alive.
    // 2. `blocklist: [/^token$/, /^token-/]` dropped them in an isolated
    //    PurgeCSS run and did nothing here. Every one of the ten is written as
    //    `[data-bs-theme=dark] .token.…`, and `/data-bs-/` in the DEEP safelist
    //    below keeps any rule whose selector matches — safelist beats blocklist.
    //
    // Narrowing `/data-bs-/` is what it would take, and that entry carries the
    // whole dark theme. Not worth 1.5KB; left in place deliberately.

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
        // PRISM'S CLASSES ARE NO LONGER SAFELISTED — `prism_syntax_highlighting`
        // is off (config/_default/config.toml) because Hugo's Chroma does the
        // highlighting at build time and Prism's JavaScript never runs. With the
        // script gone, `.token.*` is injected by nothing and the ~30 rules the
        // docsy-axoflow submodule states for the dark theme
        // (assets/scss/_styles_project.scss) are dead weight this entry was
        // keeping alive.
        //
        // `/^language-/` STAYS. Chroma does not emit it, but one page in the
        // build does — `/onboard-hosts/hosts/bulk-update-hosts/`, as
        // `language-none` — and the theme's `pre[class*="language-"]` background
        // rules are what keep that block from painting on the page's own
        // surface. The class is written by a render hook, not by a file this
        // scanner reads.
        /^language-/,
        // GLightbox builds its lightbox DOM at runtime in scripts.html.
        /^glightbox-/, /^gslide/, /^goverlay/, /^gclose/, /^gprev/, /^gnext/,
        // Bootstrap attribute selectors like `[data-bs-toggle="modal"]`.
        // PurgeCSS treats attribute selectors via this entry.
        /data-bs-/,
        // The sidebar tree's per-level class. Docsy composes it at render time —
        // `<ul class="ul-{{ $ulNr }}">` in sidebar-tree.html, both here and in
        // the submodule — so the literal `ul-2` never appears in any file this
        // scanner reads, and every rule naming one was dropped from production
        // while the development server kept it. Measured before this entry:
        // nested rows shipped at 16px/22.4px in the body navy with no indent,
        // against the 14px/19.6px slate indented 17px per level that the styles
        // ask for and that the dev server rendered. Comparing the two servers
        // is what finds this class of bug.
        /^ul-\d$/,
        // Pagefind's search UI builds its trigger button and its modal in the
        // browser, so none of its class names is in a file either — and the rules
        // that make the trigger match the control above it were dropped from the
        // shipped sheet exactly as the tree's were. Measured on the production
        // build: 36px tall against the 40 it should be, a 6px radius against 8,
        // and set in Arial, which moved the whole tree under it 4px up the page.
        /^pf-/,
        // ...and the elements Pagefind's own stylesheet names, which the search
        // UI creates in the browser: `pagefind-modal`, `pagefind-searchbox`, and
        // the rest. They appear in no file this scanner reads either.
        /^pagefind-/,
        // Silktide's consent dialog. Nothing about it is in this repository at
        // all — the GTM container injects the script — so the rules that give it
        // the site's typeface and palette name selectors the scanner has never
        // seen.
        /^stcm/,
        // ...and HubSpot's chat launcher, for the same reason and with the same
        // consequence. The rule that takes it off the printed page names an id
        // that appears in no file this scanner reads, so it was dropped from the
        // shipped sheet and the launcher went on printing over the prose.
        // Nothing on localhost carries the real widget, so this was only caught
        // by planting a stand-in with the same id; without it the loss would
        // have shown up in production only.
        /^hubspot-/,
        // HubSpot's other prefix. The launcher is `hubspot-*`, but the same
        // container also injects `#hs-web-interactives-top-anchor` — a
        // full-viewport fixed div at z-index 9999 that anchors pop-up CTAs —
        // and `.hs-chat-widget`. Both are named in the print rule beside the
        // launcher's id, and without this entry those two arms of the selector
        // were dropped from the shipped sheet while the development server kept
        // them, which is the `ul-*` trap for the fifth time. The anchor only
        // came to light once a probe stopped requiring the element to be round:
        // the launcher's own container is a 100x96 *transparent rectangle* whose
        // circle is painted inside a cross-origin iframe, so every earlier walk
        // that tested for roundness or for paint walked straight past it.
        /^hs-/,
        // Bootstrap's offcanvas, both of them: the site menu in the brand bar
        // and the documentation tree below md. Two of its class names are never
        // in any file this scanner reads, and each one is load-bearing.
        //
        //   `offcanvas-backdrop` — created by offcanvas.js when a panel opens.
        //     Measured on the shipped sheet before this entry: 0 occurrences,
        //     against 3 for `offcanvas-end`, which IS in navbar.html. The
        //     element was still being inserted, unstyled — no dimming, no fixed
        //     full-window box, so click-outside-to-close had nothing to be
        //     clicked. That is a defect the site menu has today and this entry
        //     is what fixes it.
        //   `offcanvas-start` — written only in sidebar-tree.html… which the
        //     scanner does read, so this one is not about discovery. It is here
        //     because the rule it carries, `transform: translateX(-100%)`, is
        //     the ONLY thing holding the drawer off screen when it is shut. Lose
        //     it and production ships a documentation tree pinned open across
        //     every page below md while the development server looks perfect —
        //     the `ul-*` trap again, with the worst possible symptom.
        //
        // A prefix rather than two literals, so `showing`/`hiding` and anything
        // else Bootstrap adds to this component cannot be dropped either.
        /^offcanvas/,
        // The copy control on a code block. assets/js/axo-code-copy.js builds it
        // in the browser, so none of its class names is in a file this scanner
        // reads — the same trap as `ul-*`, `pf-*`, `stcm*` and `hubspot-` before
        // it, and the same consequence: the rules would ship only to the
        // development server.
        /^axo-copy/,
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
