// The widened frame.
//
// The default frame is the site's own 1280 box — the same one the bar and the
// footer keep — so on a wide monitor the tree, the prose and the contents column
// all sit in the middle third of the screen. This control pushes the two side
// columns out to the edges of the window and lets the article take everything
// between them. Both columns stay: they are moved, not hidden.
//
// It fills the browser window rather than the screen. Nothing is asked of
// `requestFullscreen`, the bar, the strip and the footer all stay, and nothing here
// touches `font-size` — the measure gets longer, the type does not get bigger.
//
// The preference is stored, because every link on this site is a full page load. A
// toggle that reset on the next page would be a novelty rather than a reading
// setting. The stored value is read back in `layouts/_partials/hooks/head-end.html`
// by a blocking script in the head, for the same reason the theme reads
// `td-color-theme` there: applied from here, on a deferred script, the frame would
// paint at one width and jump to the other on every single page.
//
// The control is a plain icon at the article's top-right — where the reader's eye
// already is when they decide the page is too narrow. Whether it is shown at all is
// the stylesheet's decision: below `$axo-grid + 2 * $axo-page-gutter` the row
// already reaches its cap and widening would only add gutters, so there it is
// `display: none` rather than present and pointless.

(function () {
  var KEY = 'axo-wide';
  var ATTR = 'data-axo-wide';
  var WIDEN = 'Widen the page';
  var RESTORE = 'Restore the width';

  // Arrows pushing out to the sides, and coming back in — the two columns moving,
  // which is what this actually does. The same 16px box and stroke as the copy
  // control on a code block.
  function svg(paths) {
    return '<svg class="axo-wide-toggle__icon" viewBox="0 0 16 16" width="16" ' +
      'height="16" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      paths + '</svg>';
  }
  var OUT = svg('<path d="M6.5 3.5L2 8l4.5 4.5"/><path d="M9.5 3.5L14 8l-4.5 4.5"/>');
  // The apexes are 4px apart, not 2. Drawn closer they nearly touch at 16px with a
  // 1.5 stroke and the pair reads as a cross — i.e. as "close", which is the one
  // thing this control does not do.
  var IN = svg('<path d="M1.5 3.5L6 8l-4.5 4.5"/><path d="M14.5 3.5L10 8l4.5 4.5"/>');

  function on() {
    return document.documentElement.hasAttribute(ATTR);
  }

  function start() {
    var main = document.querySelector('.td-main > .row > main');
    if (!main || main.querySelector('.axo-page-tools')) return;

    var group = document.createElement('div');
    group.className = 'axo-page-tools';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'axo-wide-toggle';

    function paint() {
      var wide = on();
      btn.innerHTML = wide ? IN : OUT;
      btn.title = wide ? RESTORE : WIDEN;
      btn.setAttribute('aria-label', wide ? RESTORE : WIDEN);
      btn.setAttribute('aria-pressed', wide ? 'true' : 'false');
    }

    btn.addEventListener('click', function () {
      var wide = !on();
      if (wide) {
        document.documentElement.setAttribute(ATTR, '');
      } else {
        document.documentElement.removeAttribute(ATTR);
      }
      try {
        localStorage.setItem(KEY, wide ? '1' : '0');
      } catch (e) {
        // Private browsing refuses to write. The frame still changes for this page;
        // it just will not follow the reader to the next one.
      }
      paint();
    });

    paint();
    group.appendChild(btn);
    main.insertBefore(group, main.firstChild);
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
