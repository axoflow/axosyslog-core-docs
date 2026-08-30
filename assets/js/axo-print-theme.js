// Paper is light. Always.
//
// Why this file exists
// --------------------
// The dark theme survives into the print stylesheet, and on paper it does not
// mean "dark" — it means grey. Measured with the print media emulated on
// /concepts/ with the dark theme stored:
//
//     .td-content p   color  rgb(240, 242, 247)      (near white)
//     body            bg     rgb(15, 20, 37)
//
// Browsers do not print page backgrounds by default, so that is near-white ink
// on white paper: the prose comes out as pale grey, which is what was reported.
// A printout has no theme to honour — there is one colour of paper — so the
// answer is not to tune the dark palette for print but to print in the light one.
//
// Why the attribute and not a print stylesheet
// --------------------------------------------
// Because of how many values there are. Counting every custom property that
// differs between the two themes on this build, on the root element, under the
// print media:
//
//     --axo-*     25
//     --bs-*      56      (Bootstrap 5.3's own [data-bs-theme="dark"] block)
//     --pf-*, --td-*  10
//     ------------------
//     91
//
// Restating 91 declarations inside `@media print` would be a second palette to
// keep in step with the first, and it would be wrong the first time either one
// gained a token. Setting `data-bs-theme="light"` for the duration of the print
// reverts all 91 at once, including Bootstrap's, which this project does not own
// and should not be copying.
//
// What about a reader with JavaScript off
// ---------------------------------------
// They are already covered, and by the same mechanism that causes the problem:
// `data-bs-theme` is written by the inline script in the head. With scripting
// off it is never written, no dark block ever matches, and the page is light on
// screen and on paper. There is no dark mode without JavaScript, so there is no
// grey printout without it either.
//
// Two signals, because one engine does not send the other
// ------------------------------------------------------
// `beforeprint` / `afterprint` is what Chrome, Firefox and Safari 13+ fire, and
// `window.print()` fires it synchronously — which is the path the "Print this
// page" control takes. `matchMedia('print')` is the older signal and is listened
// to as well; both funnel into the same pair of functions and each guards
// against being run twice.
//
// NOT covered, and stated rather than assumed: a headless `page.pdf()` applies
// the print media without firing `beforeprint`, because no print was ever
// started. A harness that renders a PDF has to dispatch the event itself to
// measure what a reader would get.

(function () {
  'use strict';

  var ATTR = 'data-bs-theme';
  // `data-theme-init` carries `html[data-theme-init] * { transition: none
  // !important }` from the head's critical style. Borrowing it around the swap
  // stops every colour transition on the page from running when the theme flips
  // back after the dialog closes — which would be a slow fade of the whole
  // document, i.e. exactly the kind of flicker this work has been removing.
  var FREEZE = 'data-theme-init';

  var active = false;
  var saved = null;

  function thaw() {
    document.documentElement.removeAttribute(FREEZE);
  }

  function freeze() {
    document.documentElement.setAttribute(FREEZE, '');
    // Whichever comes first. `requestAnimationFrame` is the right moment, but a
    // print dialog can hold frames back for as long as it is open, and leaving
    // transitions dead site-wide would be a worse defect than the one being
    // fixed.
    if (window.requestAnimationFrame) requestAnimationFrame(thaw);
    setTimeout(thaw, 250);
  }

  function toLight() {
    if (active) return;
    active = true;
    saved = document.documentElement.getAttribute(ATTR);
    if (saved === 'light') return;   // nothing to change, nothing to restore
    freeze();
    document.documentElement.setAttribute(ATTR, 'light');
  }

  function restore() {
    if (!active) return;
    active = false;
    if (saved === 'light') { saved = null; return; }
    freeze();
    if (saved === null) document.documentElement.removeAttribute(ATTR);
    else document.documentElement.setAttribute(ATTR, saved);
    saved = null;
  }

  window.addEventListener('beforeprint', toLight);
  window.addEventListener('afterprint', restore);

  if (window.matchMedia) {
    var mq = window.matchMedia('print');
    var onChange = function (ev) { if (ev.matches) toLight(); else restore(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();
