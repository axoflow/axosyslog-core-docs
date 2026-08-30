// The search modal opens with the version you are already reading ticked.
//
// A reader inside /docs/axoflow/0.81/ who searches wants 0.81 answers. Today
// the version filter opens with nothing ticked, so the archived reader gets the
// current release's pages at the top of every search and has to notice the
// control, open it, and choose — on a page they reached precisely because they
// are pinned to an old release.
//
// WHY THIS IS A SCRIPT AT ALL. There is no declarative hook, and I looked for
// one before writing a line:
//
//   * <pagefind-filter-dropdown> observedAttributes is
//     ["filter","label","single-select","show-empty","wrap","sort","hide-clear"]
//     — nothing for an initial value.
//   * <pagefind-config> reads bundle-path, base-url, excerpt-length, lang,
//     meta-cache-tag, highlight-param, exact-diacritics, no-worker, faceted and
//     preload. No filter attribute of any kind.
//   * The Component UI never touches location.search, location.hash,
//     URLSearchParams or history — grepped, zero hits. It reads a query-string
//     parameter for exactly one thing, `highlight`, and that is handled by
//     pagefind-highlight.js, not by the filters.
//   * The instance manager's defaultOptions is {bundlePath} and nothing else.
//     Everything else passed to configureInstance() is forwarded to pagefind.js
//     as pagefindOptions, where the only filter-shaped option is `mergeFilter`
//     — and that is add_synthetic_filter, which STAMPS a value onto every page
//     of an index rather than selecting one. It would corrupt the counts the
//     dropdown shows and the reader could not clear it. Rejected.
//     configureInstance() is also unusable here for a second reason: it warns
//     and ignores when the instance already exists, and the instance is created
//     by whichever Pagefind element connects first.
//
// WHY THIS IS NOT POKING AT INTERNALS. The bundle marks its own boundary and
// this script stays on the public side of it. Internals carry dunders —
// __load__, __doLoad__, __search__, __clear__, __dispatch__, __hooks__,
// __pagefind__, __searchID__, __loadPromise__. The surface does not: on(),
// triggerLoad(), triggerSearch(), triggerSearchWithFilters(), triggerFilters(),
// triggerFilter(), registerFilter(), getFilters(). And the last line of
// pagefind-component-ui.js is
//
//     typeof window < "u" && (window.PagefindComponents = Bt);
//
// where Bt exports the element classes plus getInstanceManager() and
// configureInstance() — two functions that are of no use to the bundle itself
// and exist for a caller outside it. `triggerFilter(name, values)` is the exact
// call <pagefind-filter-dropdown> makes from its own dispatchFilterChange().
// This asks the component to do what a click would do; it does not reach past
// it. The one property read rather than called, `searchFilters`, is on the same
// side of the same convention.
//
// THE UPGRADE RACE, which this project has already lost once. The component
// script is not on the page: layouts/_partials/head.html imports it lazily on
// the first pointerdown/keydown/touchstart/focusin, or on requestIdleCallback
// with a 2500ms timeout. So there is no moment after DOMContentLoaded at which
// the elements can be assumed to exist, and a script that assumed one is how
// this site once ended up with two search boxes in the sidebar. The signal used
// here is customElements.whenDefined(), which is the platform's answer to
// exactly this question: it cannot resolve before the module body has run to
// completion, so by then define() has upgraded the elements already in the DOM
// and window.PagefindComponents is assigned. The rAF poll after it is a
// belt-and-braces for the manager, not the mechanism.
//
// WHEN THE SELECTION IS APPLIED, and why not sooner. On the instance's first
// "filters" event. Not at page load: triggerFilter() awaits __load__(), so
// calling it eagerly would pull the wasm and the index down for every reader on
// every page, which is the opposite of what the lazy import in the head is
// arranged to achieve. The "filters" event is dispatched at the end of
// __doLoad__(), i.e. the moment the index is there because something asked for
// it — opening the modal, focusing the field, focusing the control. That is
// also the first moment there is anything to tick.
//
// FAIL-SAFE. If the "filters" event somehow fires before this handler is
// registered, nothing happens: no pre-selection, no wrong state, the control
// behaves exactly as it does today. Every guard below fails in that direction.

(function () {
  'use strict';

  // Applied once per page load and never again. Not a de-bounce: it is the
  // whole of "must not fight the reader". <pagefind-modal> here has no
  // reset-on-close, so a reader's choice survives closing and reopening the
  // modal, and anything that re-applied on each open would silently undo it.
  var applied = false;

  // The value to tick is the one the build already stamped on <body> for the
  // indexer:  data-pagefind-filter="section:0.86 (current)". Read from the DOM
  // rather than restated here, because a copy is a thing that can disagree: the
  // string is a per-release value edited by hand in
  // config/_default/config.toml, it currently carries a space and parentheses,
  // and a second copy in this file would be wrong on exactly the release nobody
  // remembers to check.
  //
  // The parse is Pagefind's own attribute grammar — comma between filters,
  // first colon between key and value — so a value this splits differently from
  // the indexer cannot exist.
  function filterValueFromBody(key) {
    var body = document.body;
    var attr = body && body.getAttribute('data-pagefind-filter');
    if (!attr) return null;
    var parts = attr.split(',');
    for (var i = 0; i < parts.length; i++) {
      var colon = parts[i].indexOf(':');
      if (colon === -1) continue;
      if (parts[i].slice(0, colon).trim() === key) {
        return parts[i].slice(colon + 1).trim();
      }
    }
    return null;
  }

  function arm(dropdown) {
    var api = window.PagefindComponents;
    if (!api || typeof api.getInstanceManager !== 'function') return false;

    var manager = api.getInstanceManager();
    // The same name resolution the components use for their own lookup.
    var name = dropdown.getAttribute('instance') || 'default';
    // hasInstance rather than getInstance: getInstance CREATES one when it is
    // missing, and an instance created here would be a second, empty one with
    // default options that no component is attached to.
    if (!manager.hasInstance(name)) return false;
    var instance = manager.getInstance(name);

    var key = dropdown.getAttribute('filter');
    if (!key) return true;
    var value = filterValueFromBody(key);
    if (!value) return true;

    instance.on('filters', function (payload) {
      if (applied) return;

      // The value has to exist in the index. If the cascade and the index ever
      // disagree — a page-level override, a release where config.toml moved and
      // the archived build did not — ticking a value that is not there would
      // give the reader a filter that returns nothing, which is worse than no
      // pre-selection at all. `total` is the map of value -> count that the
      // dropdown itself draws from.
      var total = payload && payload.total && payload.total[key];
      if (!total || !Object.prototype.hasOwnProperty.call(total, value)) return;

      // Do not overwrite a choice that is already there. Nothing on this site
      // sets one today, but a filter arriving from a link, from a restored
      // session, or from a reader who reached the control before the index
      // landed is the reader's, not ours.
      var existing = instance.searchFilters && instance.searchFilters[key];
      if (existing && existing.length) return;

      // Set before the call, not after: triggerFilter re-enters here. It
      // dispatches "search" and then runs the search, and with an empty term
      // that search ends in __clear__(), which dispatches "filters" again.
      applied = true;
      instance.triggerFilter(key, [value]);
    });
    return true;
  }

  if (!window.customElements || !customElements.whenDefined) return;

  customElements.whenDefined('pagefind-filter-dropdown').then(function () {
    var tries = 0;
    (function attempt() {
      var dropdown = document.querySelector('pagefind-filter-dropdown');
      if (!dropdown) return;
      if (arm(dropdown)) return;
      // Only reached if the element is defined but no instance is registered
      // yet. ~10 frames is a sixth of a second at 60Hz and costs nothing; the
      // index cannot have loaded in that window without something having called
      // triggerLoad(), and if it has, the fail-safe above applies.
      if (tries++ < 10) requestAnimationFrame(attempt);
    })();
  });
})();
