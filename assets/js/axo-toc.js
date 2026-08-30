// The contents column: which entry is marked while you read, and where a click
// on one lands.
//
// Docsy builds the list with tocbot and lets tocbot mark the entry too. tocbot
// compares each heading's own top against the scroll position with no allowance
// for fixed chrome, and this site has 141px of it. Measured on three pages at
// 1440, every heading was marked one heading late: the reader is under
// "FilterX" and the column still says "Classify". tocbot also
// takes the click on an entry and scrolls the heading to the very top of the
// window — measured at 0, which is 141px behind the bar, so the heading you
// asked for is the one thing you cannot see.
//
// This file decides the entry the other way round: an IntersectionObserver
// watches a 53px band that starts 32px under the bar, and whatever content
// crosses that band names the heading. The walk back from an arbitrary element
// to its heading is deliberately not a simple loop — its edge cases (an element
// before the first heading, a heading nested inside a wrapper) are the reason.
//
// tocbot still builds the list — it is already the right list, and it already
// carries the class names the stylesheet expects. Its markup is snapshotted,
// tocbot is destroyed so its scroll and click handlers leave the page, and the
// markup is put back for this observer to own. The click then falls through to
// plain anchor navigation, which honours the `scroll-padding-top` set in
// _axo-frame.scss.

(function () {
  // The id given to the page title, and the target of the column's first
  // contents entry. Docsy's h1 carries no id at all, so nothing could link to
  // it and no observer could name it.
  var TITLE_ID = '_top';

  // Docsy passes `h2, h3, h4` to tocbot. Stopping at h3 would be the tidier
  // list, but one page in the tree uses h4 (provisioning/axorouter/linux) and
  // dropping those rows would take navigation off it, so the list keeps them and
  // the observer has to know about them.
  var HEADINGS = 'h1#' + TITLE_ID + ',:where(h2,h3,h4)[id]';

  var CONTENT = '.td-content';
  var TOC = '.td-toc';

  function chromeBottom() {
    var bar = document.querySelector('.td-navbar');
    if (!bar) return 0;
    // `bottom` rather than `height`: the bar is fixed under the announcement
    // strip, so its own height is 28px short of the chrome a reader sees.
    var rect = bar.getBoundingClientRect();
    // ...and the bar's *scrolled* height, whatever it happens to measure right
    // now. The bar shrinks by 28px once the page moves, and the observer's
    // rootMargin cannot be changed after it is built, so this has to be a
    // constant — but the constant a reader lives under is the small one, because
    // a reader who is reading has scrolled. Measured from the resting height
    // instead, the band sat 60px under the bar rather than the intended 32.
    //
    // Only where the bar is fixed. Below md it is in the flow and scrolls away,
    // so there is no shrink to normalise and its own box is the answer.
    var small = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--axo-bar-small')
    );
    if (isNaN(small) || getComputedStyle(bar).position !== 'fixed') return rect.bottom;
    return rect.bottom + (small - rect.height);
  }

  // Take the list off tocbot and give it to this file. Returns the anchors.
  function adopt(toc) {
    var html = toc.innerHTML;
    if (window.tocbot && typeof window.tocbot.destroy === 'function') {
      window.tocbot.destroy();
    }
    toc.innerHTML = html;

    // tocbot marked one entry before it left, and it collapsed the nested lists
    // it would have expanded on scroll. Neither has an owner any more.
    Array.prototype.forEach.call(
      toc.querySelectorAll('.is-active-link,.is-active-li,.is-collapsed,.is-collapsible'),
      function (el) {
        el.classList.remove('is-active-link', 'is-active-li', 'is-collapsed', 'is-collapsible');
      }
    );

    // The page title gets an id, and the column opens with a row that points at
    // it — labelled "Overview" rather than repeating the page's own title.
    //
    // The id is what lets the observer name the title: everything above the
    // first heading belongs to the page as a whole, and `headingFor` walks back
    // to this element for all of it. Without a row to match, that walk ended in
    // nothing and a reader at the top of a page had no entry marked at all.
    var h1 = document.querySelector(CONTENT + ' h1');
    if (h1 && !h1.id) h1.id = TITLE_ID;

    var list = toc.querySelector('.toc-list');
    if (h1 && list && !toc.querySelector('a[href="#' + TITLE_ID + '"]')) {
      var item = document.createElement('li');
      item.className = 'toc-list-item';
      var link = document.createElement('a');
      link.className = 'toc-link node-name--H1';
      link.href = '#' + TITLE_ID;
      link.textContent = 'Overview';
      item.appendChild(link);
      list.insertBefore(item, list.firstChild);
    }

    // tocbot's click handler outlives `destroy()` — measured on
    // /reference/man-page/axorouter-ctl/, a click on an entry left the page at
    // scrollY 0 and the heading three screens down. It cancels the event and
    // then scrolls with state it no longer has, so the entry does nothing at
    // all. Taking the click in the capture phase runs ahead of it wherever it
    // is bound, and `scrollIntoView` honours the `scroll-padding-top` that puts
    // the heading clear of the bar.
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest && e.target.closest(TOC + ' a[href^="#"]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      var target = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      target.scrollIntoView({ block: 'start' });
      if (window.history && history.pushState) history.pushState(null, '', a.hash);
    }, true);

    return Array.prototype.slice.call(toc.querySelectorAll('a'));
  }

  function spy(toc, links) {
    var current = null;

    function mark(link) {
      if (link === current) return;
      if (current) current.classList.remove('is-active-link');
      link.classList.add('is-active-link');
      current = link;
    }

    function isHeading(el) {
      return el.matches(HEADINGS);
    }

    // From any observed element, the heading it belongs to.
    // Walks up, then back through previous siblings' deepest
    // children, and falls back to the page title at the top of the content.
    function headingFor(el) {
      if (!el) return null;
      var origin = el;
      while (el) {
        if (el.matches(CONTENT + ', main > *')) return document.getElementById(TITLE_ID);
        if (isHeading(el)) return el;
        var child = el.querySelector(HEADINGS);
        if (child) return child;
        el = el.previousElementSibling;
        while (el && el.lastElementChild) el = el.lastElementChild;
        var h = headingFor(el);
        if (h) return h;
      }
      return headingFor(origin.parentElement);
    }

    function onIntersect(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) continue;
        var heading = headingFor(entries[i].target);
        if (!heading) continue;
        var hash = '#' + encodeURIComponent(heading.id);
        for (var j = 0; j < links.length; j++) {
          if (links[j].hash === hash) {
            mark(links[j]);
            return;
          }
        }
      }
    }

    // The band: 32px under the bar, 53px tall. 53 is slightly more than the
    // largest `margin-top` the prose uses, so no gap between two blocks can
    // fall through it without either block being seen.
    function rootMargin() {
      var top = chromeBottom() + 32;
      var bottom = top + 53;
      return '-' + top + 'px 0% ' + (bottom - document.documentElement.clientHeight) + 'px';
    }

    var watched = document.querySelectorAll(
      [
        'main :where(' + HEADINGS + ')',
        'main :where(' + HEADINGS + ') ~ *:not(:has(' + HEADINGS + '))',
        'main ' + CONTENT + ' > *:not(:has(' + HEADINGS + '))',
        'main > *:not(:has(' + HEADINGS + '))'
      ].join(',')
    );

    var observer;
    function observe() {
      if (observer) return;
      observer = new IntersectionObserver(onIntersect, { rootMargin: rootMargin() });
      Array.prototype.forEach.call(watched, function (el) {
        observer.observe(el);
      });
    }
    observe();

    // The band is measured from the bar, and the bar changes height when the
    // window changes width, so the observer is rebuilt rather than kept.
    var timer;
    window.addEventListener('resize', function () {
      if (observer) {
        observer.disconnect();
        observer = undefined;
      }
      clearTimeout(timer);
      timer = setTimeout(observe, 200);
    });
  }

  // tocbot's own init is an inline listener in the submodule's scripts.html,
  // registered while the document parses and therefore before this deferred
  // file's listener — so the list exists by the time this runs. Waiting for it
  // anyway costs one frame and survives that order changing.
  function start(tries) {
    var toc = document.querySelector(TOC);
    if (!toc) return;
    if (!toc.querySelector('a')) {
      if (tries > 0) requestAnimationFrame(function () { start(tries - 1); });
      return;
    }
    spy(toc, adopt(toc));
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', function () { start(120); });
  } else {
    start(120);
  }
})();
