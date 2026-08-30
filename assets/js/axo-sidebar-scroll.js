// Bring the page you are on into view inside the documentation tree.
//
// Why this file exists
// --------------------
// The tree is a pane with its own scrollbar again (see the long note on
// `.td-sidebar-nav` in assets/scss/_styles_project.scss). The submodule already
// restores a scroll position — themes/docsy-axoflow/layouts/_partials/scripts.html
// saves `#td-section-nav.scrollTop` on `beforeunload` and writes it back on load
// — and with the scrollbar back that write works again. This file is the part
// that write cannot do.
//
// What it cannot do, and why replaying a pixel offset is not enough:
//
//   1. The saved number belongs to the PREVIOUS page's tree, and the two are not
//      the same height. Docsy expands the branch the reader is in and collapses
//      the others, so navigating from /concepts/ to a vendor deep under Sources
//      changes the tree's height by hundreds of pixels. The replayed offset then
//      lands somewhere near where the reader was, not on the row they pressed.
//   2. It is empty on a first visit, on a hard reload, and in any browser where
//      localStorage is unavailable — a private window with storage blocked
//      throws on `setItem` and the saved value never appears at all.
//   3. It says nothing about arriving from a link elsewhere on the site, from a
//      search result, or from a bookmark. In all of those the reader has no idea
//      where in the tree they have landed, and that is the case this fixes that
//      the submodule's mechanism never addressed.
//
// So the position is computed from the tree itself: find the row that is marked
// as the current page and put it in the middle of the pane.
//
// What it must never do
// ---------------------
// Touch the window's scroll position. The article has to start at its own top.
// `Element.scrollIntoView()` is therefore NOT used — it scrolls every scrollable
// ancestor including the document, so on a page whose active row is far down the
// tree it would scroll the reader past the article's first heading before they
// had read a word. `scrollTop` is assigned directly on the pane and on nothing
// else.
//
// It also must not fight the submodule. That script runs inline in the body;
// this one is deferred, so it runs after and its value is the one that stands.
// If the active row cannot be found, this file does nothing at all and the
// submodule's replayed offset is left exactly as it was.

(function () {
  'use strict';

  var PANE = '#td-section-nav';

  // Docsy marks the current row in two ways and which one appears depends on
  // whether the sidebar is being served from cache: `a.active` is written by the
  // template, and `.td-sidebar-nav-active-item` is the span the cached-sidebar
  // script in themes/docsy/layouts/_partials/sidebar.html adds client-side. Both
  // are looked for, in that order, because a build with `sidebarcache` on has
  // only the second and a build without it has only the first.
  var ACTIVE = [
    'a.td-sidebar-link.active',
    'a.active',
    '.td-sidebar-nav-active-item',
  ];

  function activeRow(pane) {
    for (var i = 0; i < ACTIVE.length; i++) {
      var el = pane.querySelector(ACTIVE[i]);
      if (el) return el.closest('a') || el;
    }
    return null;
  }

  function centre() {
    var pane = document.querySelector(PANE);
    if (!pane) return;

    // Only when the pane is actually a scroller. Below md it is an offcanvas
    // drawer and it IS one; at md and up it is one only when the tree is taller
    // than the window. On a short tree there is nothing to centre and assigning
    // scrollTop would be a no-op with a layout read for no reason.
    if (pane.scrollHeight <= pane.clientHeight + 1) return;

    var row = activeRow(pane);
    if (!row) return;

    var paneBox = pane.getBoundingClientRect();
    var rowBox = row.getBoundingClientRect();

    // Already comfortably inside the pane: leave the reader's own position
    // alone. The margin is one row's height, so a row sitting right against the
    // top or bottom edge still gets pulled into the open.
    var margin = Math.max(rowBox.height, 24);
    if (rowBox.top >= paneBox.top + margin &&
        rowBox.bottom <= paneBox.bottom - margin) {
      return;
    }

    // The row's offset within the pane's scrollable content, computed from the
    // two rectangles and the current scroll rather than from `offsetTop` —
    // `offsetTop` is measured against the nearest positioned ancestor, and
    // themes/docsy/assets/scss/td/_nav.scss states `position: relative` on
    // `nav.foldable-nav#td-section-nav`, so which element that is depends on a
    // menu-folding flag.
    var offset = (rowBox.top - paneBox.top) + pane.scrollTop;
    var target = offset - (pane.clientHeight - rowBox.height) / 2;

    pane.scrollTop = Math.max(0, Math.min(target,
      pane.scrollHeight - pane.clientHeight));
  }

  // Run once the tree is final. Two things can still change it after
  // `DOMContentLoaded`: the cached-sidebar script marks the active row
  // client-side, and web fonts can reflow every row's height. `requestAnimationFrame`
  // twice puts this after the next paint, which is after both in practice; the
  // `load` handler is the belt for a slow font.
  function run() {
    requestAnimationFrame(function () { requestAnimationFrame(centre); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  window.addEventListener('load', run);

  // A back/forward-cache restore does not re-run any of the above, and the pane
  // comes back with whatever scroll position it was left with — which after a
  // navigation is the position of a DIFFERENT page's active row.
  window.addEventListener('pageshow', function (ev) {
    if (ev.persisted) run();
  });
})();
