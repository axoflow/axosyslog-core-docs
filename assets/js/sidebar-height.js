/*
 * Publish two measured heights the stylesheet cannot work out for itself.
 *
 * `.td-sidebar__inner` is sticky. When it is taller than the window — 5411px of
 * tree against 900px of viewport on /data-sources/appliances/cisco/ — a positive
 * sticky offset pins its head under the bar and puts everything past the fold out
 * of reach, because the element never scrolls: it is the page that scrolls past
 * it. Giving the offset the overflow as a negative number lets the column travel
 * up until its last item is on screen, and hold there.
 *
 * The announcement strip is the second. It is fixed to the top of the window, so
 * the page underneath has to be given its height back as padding — and that
 * height is one line at 1440 and two at 390, because the sentence wraps. 28px was
 * hard-coded, which left the strip's second line over the bar on a phone.
 *
 * Both numbers have to come from here because CSS cannot measure an element's own
 * height into a length. Nothing else is done in this file: the rules that consume
 * `--axo-sidebar-height` and `--axo-strip-height` are in
 * assets/scss/_styles_project.scss, and both fall back to a fixed value when this
 * script does not run.
 */
(() => {
	const root = document.documentElement

	const watch = (selector, property) => {
		const el = document.querySelector(selector)
		if (!el) return

		const publish = () => {
			const h = Math.round(el.getBoundingClientRect().height)
			root.style.setProperty(property, `${h}px`)
		}

		publish()

		// The tree folds and unfolds and the strip rewraps, both of which change a
		// height without a window resize. The observer covers those and the resize
		// alike; it cannot loop, because what it writes moves the page, never the
		// element it measured.
		if (window.ResizeObserver) new ResizeObserver(publish).observe(el)
		else window.addEventListener('resize', publish)
	}

	watch('.td-sidebar__inner', '--axo-sidebar-height')
	watch('.axo-announcement', '--axo-strip-height')
	// Only the builds under /<version>/ carry the archived-version band, and it
	// wraps to two and three lines as the window narrows — 34px at 1440, 51 at
	// 768, 85 at 390. `watch` returns without writing anything when the element is
	// absent, which is what keeps the fallback at 0 on the latest version.
	watch('.version-banner', '--axo-notice-height')
})()
