// Opening and closing the marketing menu's panels.
//
// axoflow.com is hover-driven on pointer devices. Hover alone is not reachable
// by keyboard or touch, so every menu is also a real button with aria-expanded,
// Escape closes and returns focus to its trigger, and a click outside closes
// everything. Nothing here writes a class or a `hidden` attribute: aria-expanded
// is the whole state, and _axo-navbar.scss turns it into `display`. The same
// contract serves three lists: the bar at 1248+, the compact dropdown between,
// and the drawer's own list below md — that one is a SEPARATE render from
// separate data (navbar-drawer.html, `mobile.items`), because axoflow.com's phone
// menu is a different menu from its bar and not a narrower drawing of it.

// Live axoflow.com, sampled every 2ms from the pointerenter that opens the
// panel, all five menus at 1440px: 6.0, 6.1, 6.4, 7.2, 8.6 ms — the polling
// granularity, not a delay. The live bar has no open delay at all.
const OPEN_DELAY = 0;
// The close is the same story on live (4.6-5.3ms), and we deviate deliberately.
// The panel's top edge is exactly the item's bottom edge, so a straight move
// from the toggle into the panel never leaves the item — but a diagonal one
// does, and with no hysteresis the panel closed under the pointer on the way in.
const CLOSE_DELAY = 120;

// Hover is only offered where a pointer can actually hover. On touch the same
// button works by click, which is what the marketing site falls back to too.
const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');

// 800px is `$axo-md` in _variables_project.scss — the width `navbar-expand-md`
// and every `media-breakpoint-down(md)` block in _axo-navbar.scss switch on.
// Stated as a number because a stylesheet variable cannot reach this file; if
// that breakpoint moves, this moves with it.
const barWidth = window.matchMedia('(min-width: 800px)');
const inDrawer = () => !barWidth.matches;

function setOpen(toggle, panel, open) {
  if (!toggle || !panel) return;
  toggle.setAttribute('aria-expanded', String(open));
  // A flyout left open would reopen with its parent, beside a panel the reader
  // has not asked for yet.
  if (!open) {
    panel.querySelectorAll('.axo-nav-submenu-toggle[aria-expanded="true"]')
      .forEach((t) => {
      t.setAttribute('aria-expanded', 'false');
    });
  }
}

// NOTE. A `wireSecondLevel()` helper stood here and wired
// `.axo-nav-group-toggle` — the button that used to be injected beside each group
// title so the bar's markup could be made to look like a phone menu. The drawer
// is its own render from its own data now (navbar-drawer.html, `mobile.items`),
// its groups are ordinary `.axo-nav-submenu` rows, and the block further down
// that wires those is the only second level left. The helper had no caller after
// that and is deleted rather than left in the bundle with a comment describing
// machinery that no longer runs.

// One menu: the element that owns a toggle and the panel it controls. For the
// bar that is each `.axo-nav-item`; for the compact dropdown the whole block,
// whose panel is the outline list itself.
function wire(root, items) {
  let timer;

  const pair = (item) => [
    item.querySelector('.axo-nav-toggle'),
    item.querySelector('.axo-nav-panel, .axo-nav--compact'),
  ];

  const closeAll = (except) => {
    items.forEach((item) => {
      if (item === except) return;
      const [t, p] = pair(item);
      setOpen(t, p, false);
    });
  };

  items.forEach((item) => {
    const [toggle, panel] = pair(item);
    if (!toggle || !panel) return;

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      // In the bar, opening one menu closes the others — two mega panels cannot
      // share the space. In the drawer every section is open at once by design
      // (see openDrawerSections below), so closing the siblings would undo the
      // shape the moment the reader touched a heading.
      if (!inDrawer()) closeAll(item);
      setOpen(toggle, panel, !open);
    });

    // Hover opens a menu in the BAR only. In the drawer the sections are open
    // already, so the enter is a no-op and the LEAVE would shut a section the
    // reader is scrolling past — reachable on any hover-capable device with a
    // window narrower than md, which is a desktop browser at phone width and
    // every automated browser check.
    item.addEventListener('pointerenter', (event) => {
      if (inDrawer()) return;
      if (!hoverCapable.matches || event.pointerType !== 'mouse') return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        closeAll(item);
        setOpen(toggle, panel, true);
      }, OPEN_DELAY);
    });

    item.addEventListener('pointerleave', (event) => {
      if (inDrawer()) return;
      if (!hoverCapable.matches || event.pointerType !== 'mouse') return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setOpen(toggle, panel, false), CLOSE_DELAY);
    });

    // Escape closes and hands focus back, so keyboard users are not left inside
    // a panel they cannot see.
    item.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      event.stopPropagation();
      setOpen(toggle, panel, false);
      toggle.focus();
    });

    // Tabbing out of the last link in a panel should close it behind you — in
    // the bar. In the drawer the sections are open on purpose and tabbing from
    // the end of one into the next is the ordinary way through the menu, so
    // closing behind the reader would collapse the list under them.
    item.addEventListener('focusout', () => {
      window.setTimeout(() => {
        if (inDrawer()) return;
        if (!item.contains(document.activeElement)) setOpen(toggle, panel, false);
      }, 0);
    });

    // The flyouts. In the bar these are the three under Resources; in the drawer
    // every labelled group is one. Same rules one level down; no close
    // hysteresis here, because the flyout's left edge is the row's right edge,
    // so the pointer never crosses a gap.
    const subs = [...item.querySelectorAll('.axo-nav-submenu')];
    subs.forEach((sub) => {
      const subToggle = sub.querySelector('.axo-nav-submenu-toggle');
      if (!subToggle) return;
      const closeSiblings = () =>
        subs.forEach((other) => {
          if (other !== sub) other.querySelector('.axo-nav-submenu-toggle')
            .setAttribute('aria-expanded', 'false');
        });

      subToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const open = subToggle.getAttribute('aria-expanded') === 'true';
        closeSiblings();
        subToggle.setAttribute('aria-expanded', String(!open));
      });

      sub.addEventListener('pointerenter', (event) => {
        if (!hoverCapable.matches || event.pointerType !== 'mouse') return;
        closeSiblings();
        subToggle.setAttribute('aria-expanded', 'true');
      });

      sub.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (subToggle.getAttribute('aria-expanded') !== 'true') return;
        event.stopPropagation();
        subToggle.setAttribute('aria-expanded', 'false');
        subToggle.focus();
      });
    });

    // Anywhere else inside the panel is not a flyout, so leaving the rows closes
    // them — otherwise the flyout hangs over the links the reader moved on to.
    panel.addEventListener('pointerover', (event) => {
      if (!hoverCapable.matches) return;
      if (event.target.closest('.axo-nav-submenu')) return;
      subs.forEach((sub) => {
        const t = sub.querySelector('.axo-nav-submenu-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Clicking away closes the bar's panels. NOT in the drawer, and this is not a
  // tidy-up: the press that opens the drawer is itself a click outside this root,
  // so it bubbled to here and ran `closeAll()` in the same event that
  // `show.bs.offcanvas` had just opened every section in — measured, all five
  // toggles back to `aria-expanded="false"` before the drawer had finished
  // animating. In the drawer there is nothing this rule is needed for either: a
  // click outside lands on the backdrop and closes the whole panel.
  document.addEventListener('click', (event) => {
    if (inDrawer()) return;
    if (!root.contains(event.target)) closeAll();
  });
}

document.querySelectorAll('.axo-nav--bar, .axo-nav--drawer').forEach((nav) => {
  wire(nav, [...nav.querySelectorAll('.axo-nav-item')]);
});

document.querySelectorAll('.axo-nav-compact').forEach((nav) => {
  wire(nav, [nav]);
});

// Below md the drawer is an accordion and its rows write the SAME `aria-expanded`
// the bar's do — two renders, one attribute, and it means the same thing in both.
// That is what makes the drawer work with no new state, and it is also the one way
// this can go wrong: a reader opens
// `Solutions` in the drawer, closes the drawer, then widens the window past md,
// and a mega panel is hanging open in the bar over the article with no pointer
// anywhere near it. Not reachable by resizing a phone, very reachable by rotating
// a tablet, and invisible in a screenshot of either width on its own.
//
// So the state is dropped at both edges of its own life: when the drawer closes,
// and when the viewport crosses the breakpoint in either direction. Closing every
// toggle is always safe — a closed menu is the state both surfaces load in.
//
// `hidden.bs.offcanvas` is a plain CustomEvent dispatched on the element, so this
// listens for it without importing Bootstrap; if the plugin is not on the page the
// listener simply never fires and the breakpoint belt still holds.
//
// 800px is `$axo-md` in _variables_project.scss, the width Bootstrap's
// `navbar-expand-md` and every `media-breakpoint-down(md)` block in
// _axo-navbar.scss switch on. Stated as a number here because a stylesheet
// variable cannot reach this file; if that breakpoint moves, this moves with it.
function collapseAllMenus() {
  document.querySelectorAll(
    '.axo-nav-toggle[aria-expanded="true"],' +
    ' .axo-nav-submenu-toggle[aria-expanded="true"]'
  ).forEach((t) => t.setAttribute('aria-expanded', 'false'));
}

// THE DRAWER'S TOP LEVEL IS OPEN, AND WHY THAT IS NOT THE OLD DUMP.
//
// axoflow.com's phone menu is one scrolling list: each top-level menu is a
// heading — `.v3-navbar_mobile-menu-label`, 16px/700 uppercase in the brand
// orange — and its contents follow it. There is no top-level accordion there.
//
// This drawer WAS a dump of exactly that kind once and it was reported as wrong,
// for reasons recorded at length in _axo-navbar.scss: 116 links in one scroll,
// and the top-level rows set at the same 14px/500 as the group titles inside
// them, so `Case studies` read as a sibling of `Solutions`. Both faults are
// answered here rather than reintroduced — the headings carry live's own orange
// uppercase weight, and the SECOND level is what collapses now, closed at rest
// behind its own chevron. Live does the same one level down.
//
// Written as `aria-expanded="true"` on the real toggles rather than as a
// stylesheet rule forcing the panels open. The rule was the old shape's, and it
// left `aria-expanded="false"` on a panel that was plainly open — a lie to a
// screen reader, and one that also made the rows unpressable (`pointer-events:
// none`) so nothing could be collapsed at all. Here the attribute is true because
// the section is open, and a reader who wants a section shut can still shut it.
//
// Only below md, and only for the drawer's own copy of the menu.
function openDrawerSections(drawer) {
  if (!inDrawer()) return;
  drawer.querySelectorAll('.axo-nav--drawer .axo-nav-toggle').forEach((t) => {
    t.setAttribute('aria-expanded', 'true');
  });
}

document.querySelectorAll('#mainNavOffcanvas').forEach((drawer) => {
  drawer.addEventListener('show.bs.offcanvas', () => openDrawerSections(drawer));
  drawer.addEventListener('hidden.bs.offcanvas', collapseAllMenus);

  // The hamburger IS the close control, so it has to know it is open.
  //
  // Bootstrap's offcanvas plugin does not manage `aria-expanded` on its toggler
  // the way the collapse plugin does — measured, the attribute was absent on the
  // button with the drawer open — so the state is written here. _axo-navbar.scss
  // keys the glyph swap (bars <-> X) on it, and a reader on a screen reader is
  // told the control's state by the same attribute.
  const togglers = document.querySelectorAll(
    '[data-bs-toggle="offcanvas"][data-bs-target="#mainNavOffcanvas"]'
  );
  const setExpanded = (v) => togglers.forEach((t) => t.setAttribute('aria-expanded', v));
  drawer.addEventListener('show.bs.offcanvas', () => setExpanded('true'));
  drawer.addEventListener('hide.bs.offcanvas', () => setExpanded('false'));
});

window.matchMedia('(min-width: 800px)').addEventListener('change', collapseAllMenus);

// The bar's two states.
//
// axoflow.com shrinks its bar once the page moves — measured on the live
// marketing bar at 1440, `.v3-navbar-component` goes 141px at rest to 113px
// scrolled — and this build carries the same behaviour over the documentation,
// 113 -> 85. The live *docs* bar does neither: it measures a flat 102px at every
// scroll position, which is why this is new here.
//
// Nothing about how the two states look is decided here. This records which one
// is current as `data-scrolled` on <html>, and _axo-navbar.scss turns that into
// the bar's height, its padding and its logo; _styles_project.scss carries the
// height on to the band and the sticky navigation column, which hang off the
// bar's bottom edge and have to follow it down.
//
// The two edges are not symmetric, and that is the live bar's own behaviour
// rather than an oversight: it shrinks somewhere between 28 and 29px of scroll
// and only springs back at the very top — at 10px on the way up it is still
// small. `<= 0` and not `=== 0` because an overscroll bounce reports a negative
// scrollY, and the bar should come back for that too.
const scrollRoot = document.documentElement;

function syncScrollState() {
  const y = window.scrollY;
  if (y > 28) scrollRoot.dataset.scrolled = '';
  else if (y <= 0) delete scrollRoot.dataset.scrolled;
}

syncScrollState();
window.addEventListener('scroll', syncScrollState, { passive: true });
