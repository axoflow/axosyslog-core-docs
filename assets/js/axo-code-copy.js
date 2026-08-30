// The copy control on a code block.
//
// Neither of the theme's two mechanisms reaches this build, and they are mutually
// exclusive by construction. `scripts.html` in the submodule ships prism.js when
// `prism_syntax_highlighting` is set and `click-to-copy.js` only when it is not:
//
//   {{ if .Site.Params.prism_syntax_highlighting }} prism.js
//   {{ else if not .Site.Params.disable_click2copy_chroma }} click-to-copy.js
//
// The flag is set, so Prism is the one that ships — and Prism finds nothing. Its
// toolbar and copy-to-clipboard plugins look for `pre[class*="language-"]`, and
// the code on this site is highlighted at build time by Chroma, which emits
// `<pre class="chroma" data-language="shell">`. Measured against the live
// documentation, which does get Prism's: there `.highlight > pre` is 0 by the
// time the page settles because Prism has rewrapped it into `div.code-toolbar`,
// and five `button.copy-to-clipboard-button` exist; here `.highlight > pre` is
// still 5 and there is no button anywhere. That is the whole of the defect: the
// build-time highlighting this design needs is what took Prism's copy button
// away, and the theme's own fallback is switched off by the same flag.
//
// So the control is built here, in the shape of the frame it belongs to: a 36x32
// wrapper absolutely placed at right 9px, holding a 32x32 button with a 3.2px
// radius on the block's own surface, invisible at rest and faded in over 0.2s; on
// a terminal frame it clears the title bar. The `aria-live` region is what makes
// the confirmation audible to a screen reader, since the visible change is a
// tooltip.
//
// Nothing here reads a language or a token: the text copied is the block's own
// `textContent`, which is the highlighted markup flattened, and that is exactly
// what a reader selecting the block by hand would get.

(function () {
  var LABEL = 'Copy to clipboard';
  var DONE = 'Copied!';

  // The glyph, from the same set as the rest of the page's actions.
  var ICON =
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="9" y="9" width="11" height="11" rx="2"/>' +
    '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

  function textOf(pre) {
    // `innerText` rather than `textContent`: Chroma wraps every line in a
    // `<span class="line">`, and textContent runs them together without the
    // newlines. innerText honours the line boxes, which is what a reader
    // selecting the block would copy.
    var t = pre.innerText || pre.textContent || '';
    return t.replace(/\s+$/, '') + '\n';
  }

  function attach(frame) {
    var pre = frame.querySelector('pre');
    if (!pre || frame.querySelector('.axo-copy')) return;

    var wrap = document.createElement('div');
    wrap.className = 'axo-copy';

    var live = document.createElement('div');
    live.setAttribute('aria-live', 'polite');
    live.className = 'axo-copy-live';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'axo-copy-btn';
    btn.title = LABEL;
    btn.setAttribute('aria-label', LABEL);
    btn.innerHTML = ICON;

    var timer;
    btn.addEventListener('click', function () {
      var done = function () {
        btn.classList.add('is-copied');
        btn.title = DONE;
        btn.setAttribute('aria-label', DONE);
        live.textContent = DONE;
        clearTimeout(timer);
        timer = setTimeout(function () {
          btn.classList.remove('is-copied');
          btn.title = LABEL;
          btn.setAttribute('aria-label', LABEL);
          live.textContent = '';
        }, 2000);
      };

      var text = textOf(pre);
      // `navigator.clipboard` is absent on a page served over plain http, which
      // is how this build is reviewed locally. The textarea path is the fallback
      // rather than the primary, because it moves focus and the async API does
      // not.
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          fallback(text) && done();
        });
      } else if (fallback(text)) {
        done();
      }
    });

    wrap.appendChild(live);
    wrap.appendChild(btn);
    frame.appendChild(wrap);
  }

  function fallback(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  function start() {
    // The frame is what the button is positioned against — it is the element
    // this stylesheet makes `position: relative`. A block outside the
    // axo-code-block wrapper (a shortcode's own `<pre>`) gets nothing, which is
    // the same as before this file existed.
    var frames = document.querySelectorAll('.td-content .axo-code-block .frame');
    Array.prototype.forEach.call(frames, attach);
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
