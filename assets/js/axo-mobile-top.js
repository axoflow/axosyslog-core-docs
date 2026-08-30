// The brand bar's magnifier, below md, and the one search trigger it opens.
//
// Why this file exists at all
// ---------------------------
// The mobile arrangement puts a magnifier in the brand bar. The search control
// itself is `pagefind-modal-trigger`, and it is rendered once, in the
// documentation column, by layouts/_partials/sidebar-tree.html. It has to stay
// there: at md and up that column is where the search box belongs, and CSS
// cannot move an element between containers.
//
// So there are three ways to have a magnifier in the bar, and this is the first
// of them:
//
//   1. Forward a click. One trigger, hidden below md, and a plain <button> in
//      the bar that calls `.click()` on the component's own button. THIS FILE.
//   2. Restyle the one trigger into a 40px icon at mobile. Cleanest if it were
//      possible — no script at all — but the element is in the documentation
//      column and has to appear in the bar, and no stylesheet moves it.
//   3. Move the element on a `matchMedia` change. Rejected: moving an upgraded
//      custom element re-runs `connectedCallback`, and what
//      pagefind-component-ui does on reconnect is not documented and not
//      measured. The one thing this project already knows about that component
//      is that its behaviour depends on parse-versus-upgrade order — that is the
//      whole of the two-search-boxes bug written up in
//      layouts/_partials/search-input-custom.html — so a route whose correctness
//      turns on a second, unmeasured lifecycle callback is the worst of the
//      three.
//
// Route 1 rests on one fact, and it was measured rather than assumed. On the
// deployed build (localhost:1399, /concepts/processing-elements/, 390px) the
// trigger was forced to `display: none !important` — `offsetParent` null,
// `getClientRects().length` 0 — and then `button.pf-trigger-btn.click()` was
// called on it. `dialog.pf-modal` came back `open: true` at 390x844 with
// `document.activeElement` on `input.pf-input`. `HTMLElement.click()` dispatches
// a synthesised event straight at the element without hit-testing, so the
// component neither knows nor cares that its button is off screen.
//
// What this file must never do
// ----------------------------
// Render, clone, insert or move a `pagefind-modal-trigger`. There must be
// exactly one in the document at every width, on a cold load and on a warm one.
// This file only reads.

(function () {
  'use strict';

  // The script's hook, and deliberately not the class the stylesheet uses.
  // A restyle that renames `.axo-navbar-search` would otherwise leave a button
  // on screen that opens nothing — and a control that looks real and opens
  // nothing is the exact shape of the bug this area of the project has already
  // shipped once.
  var OPENER = '[data-axo-search-open]';

  // `button.pf-trigger-btn` is what the component writes into its own light DOM.
  // It uses no shadow root — measured, `element.shadowRoot` is null — so an
  // ordinary descendant selector reaches it.
  //
  // Scoped through `pagefind-modal-trigger` rather than matching the class on
  // its own: the class belongs to pagefind-component-ui, and a future version of
  // it that puts the same class inside the modal would otherwise make this
  // selector ambiguous. It also states the invariant in the selector — the
  // button this forwards to is a child of the one trigger, not a second control.
  var PF_BUTTON = 'pagefind-modal-trigger button.pf-trigger-btn';

  // Delegated off `document`, not bound to the button.
  //
  // Two reasons. The script is `defer`red, so the button exists by the time this
  // runs and a direct listener would work — but the sidebar is rendered by a
  // partial that Hugo caches per-section and the bar by another, and a delegated
  // listener cannot be desynchronised from a re-render. And the click lands on
  // the <svg> inside the button, not on the button, so a target-identity test
  // would need `closest` in any case.
  document.addEventListener('click', function (ev) {
    var target = ev.target;

    // `closest` lives on Element. A click can be targeted at a text node's
    // parent only, so in practice this is always an Element — but the SVG glyph
    // inside the button is an SVGElement, which is where the `closest` walk is
    // actually needed, and a guard is cheaper than finding out otherwise.
    if (!target || typeof target.closest !== 'function') return;
    if (!target.closest(OPENER)) return;

    var pfButton = document.querySelector(PF_BUTTON);

    // No button means the component has not upgraded: either the page is still
    // fetching pagefind-component-ui.js, or there is no search index at all.
    // The second case is the Hugo dev server, where /pagefind/* is a 404 and the
    // element never upgrades — the same state the documentation column's own
    // search box has been in there for as long as this build has existed.
    //
    // Nothing happens, and deliberately nothing else happens either. Hiding the
    // magnifier when this lookup fails was considered and rejected: on the dev
    // server it would hide the control across the entire site, so the one
    // surface where the mobile layout is developed would not have the control
    // the layout is about. The button's *existence* is gated in the template on
    // `offlineSearchPagefind`, which is the honest condition — it is the same
    // one the trigger itself is gated on, so the two cannot part company.
    if (!pfButton) return;

    // `.click()`, not `dispatchEvent(new MouseEvent('click'))`. Both reach the
    // component's listener, but `.click()` also runs the activation behaviour
    // the element would get from a real press, which is what a <button> in a
    // <form> would need and what the next person will expect to read here.
    pfButton.click();
  });

  // ------------------------------------------------------------------------
  // Leaving the documentation drawer by pressing one of its own links.
  // ------------------------------------------------------------------------
  //
  // Below md the tree is a Bootstrap offcanvas that slides in over the page.
  // The site opts every same-origin navigation into a cross-document view
  // transition — `@view-transition { navigation: auto }` in
  // themes/docsy-axoflow/assets/scss/_styles_project.scss — so the browser
  // snapshots the OUTGOING page and crossfades it into the incoming one.
  //
  // The drawer is in that snapshot. `assets/scss/_axo-frame.scss` drops
  // `view-transition-name` from `aside.td-sidebar` below md (it created a
  // stacking context the drawer could not escape, so the panel opened under the
  // brand bar), and one consequence of dropping the name is that the column is
  // no longer morphed as a landmark of its own — it goes into the root snapshot
  // with everything else. Measured at 390 on the production build, screenshotting
  // 120ms after pressing a tree link without waiting for the load: the drawer's
  // thirty rows of navigation and the incoming article's prose are both half
  // transparent and printed over each other for about a quarter of a second.
  // Luminance does not see it — both are light — so the frames were kept as
  // images and the finding was read off one.
  //
  // The panel is therefore taken out of the picture BEFORE the navigation
  // commits. Two steps, and both are needed:
  //
  //   - a class on <html> that hides the panel and the backdrop instantly. This
  //     is what the snapshot must not contain, and Bootstrap's own `hide()` is
  //     animated over 300ms, so on its own it would still be caught mid-slide.
  //   - `hide()` as well, so the component's state, the scroll lock on <body>
  //     and the backdrop element are all unwound properly in the case where the
  //     navigation does not happen after all — a modified click, a download, a
  //     handler further up calling `preventDefault`. Without it such a click
  //     would leave a drawer that is "open" and invisible.
  //
  // Only plain left clicks that will actually navigate. A modified click opens a
  // new tab and leaves this document exactly where it is, so shutting the drawer
  // under the reader would be wrong.
  document.addEventListener('click', function (ev) {
    if (ev.defaultPrevented) return;
    if (ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) {
      return;
    }

    var target = ev.target;
    if (!target || typeof target.closest !== 'function') return;

    var link = target.closest('#td-section-nav a[href]');
    if (!link) return;
    if (link.target && link.target !== '_self') return;

    var panel = document.getElementById('td-section-nav');
    // `visibility` rather than the `show` class: `show` is also what Docsy's
    // cached-sidebar script puts on `li.active-path`, and keying on the computed
    // property asks the question the snapshot actually answers — is this panel
    // painted right now.
    if (!panel || getComputedStyle(panel).visibility !== 'visible') return;

    document.documentElement.classList.add('axo-drawer-navigating');

    // Bootstrap may not be on the page (no bundle, a failed load); the class
    // above has already done the part that matters, so this is best-effort.
    var bs = window.bootstrap;
    if (bs && bs.Offcanvas && typeof bs.Offcanvas.getInstance === 'function') {
      var inst = bs.Offcanvas.getInstance(panel);
      if (inst) inst.hide();
    }
  });

  // And the flag comes off again when the reader comes BACK.
  //
  // The class above is set on a document that is about to be discarded, so on a
  // normal navigation it dies with the page. A back button does not necessarily
  // discard it: restored from the back/forward cache, the document returns with
  // its DOM exactly as it was left — including this class — and
  // `#td-section-nav` would be `display: none !important` for the life of that
  // page. The documentation menu would open nothing, on the one page a reader is
  // most likely to press it on, and no reload would reproduce it.
  //
  // `pageshow` fires on every load and on every bfcache restore, so this clears
  // it in both cases; `persisted` is not tested because removing a class that is
  // not there costs nothing and the unconditional form cannot be got wrong.
  window.addEventListener('pageshow', function () {
    document.documentElement.classList.remove('axo-drawer-navigating');
  });
})();
