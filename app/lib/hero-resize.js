// Hero headline resize: a cursor grabs the frame's right handle and drags it,
// and the headline scales with the frame (like scaling a text layer in Figma).
// Visitors can drag the handle themselves; that stops the auto demo.
// Plain JS so it runs in both the Nuxt site and the static preview.

export function heroResize(root) {
  if (!root || root.__hero) return
  root.__hero = true
  const frame = root.querySelector('[data-hero-frame]')
  const h1 = frame && frame.querySelector('h1')
  const handle = frame && frame.querySelector('[data-h="4"]')
  const cur = root.querySelector('[data-hero-cursor]')
  if (!frame || !h1 || !handle || !cur) return

  let k = 1, auto = true, visible = false, dragging = false
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
  // Spec mode labels show the real, live type values while the frame resizes.
  const specs = root.querySelectorAll('[data-spec]')
  const syncSpecs = () => {
    const fs = parseFloat(getComputedStyle(h1).fontSize)
    specs.forEach((t) => {
      const v = t.dataset.spec
      t.textContent = v === 'bold' ? `Sora 700 · ${Math.round(fs)}px` : v === 'light' ? `Sora 300 · ${Math.round(fs)}px` : `line-height 0.98 · ${Math.round(fs * 0.98)}px`
    })
  }
  const setK = (v) => { k = v; h1.style.setProperty('--k', v.toFixed(4)); syncSpecs() }
  syncSpecs()
  const bounds = () => {
    const wrap = root.closest('[data-hero-bounds]') || root.parentElement
    const avail = wrap.getBoundingClientRect().right - frame.getBoundingClientRect().left - 8
    const base = frame.offsetWidth / k
    return { min: 0.55, max: Math.max(0.6, avail / base) }
  }

  // Handle: make it grabbable, with a bigger invisible hit area.
  handle.style.pointerEvents = 'auto'
  handle.style.cursor = 'ew-resize'
  handle.style.touchAction = 'none'
  handle.setAttribute('title', 'Drag to resize')
  const hit = document.createElement('span')
  hit.style.cssText = 'position:absolute;inset:-14px'
  handle.appendChild(hit)
  const grab = (on) => { handle.style.background = on ? 'var(--color-select)' : ''; handle.style.transform = (handle.dataset.t || '') + (on ? ' scale(1.35)' : '') }
  handle.dataset.t = getComputedStyle(handle).transform === 'none' ? '' : getComputedStyle(handle).transform

  // Cursor: switch from its CSS resting spot to JS-driven positions.
  const at = (el, fx, fy) => { const a = root.getBoundingClientRect(), b = el.getBoundingClientRect(); return [b.left - a.left + b.width * fx, b.top - a.top + b.height * fy] }
  const restPos = () => [frame.offsetWidth * 0.78, frame.offsetHeight + 14]
  const tag = cur.lastElementChild
  const place = ([x, y], ms) => {
    cur.style.transition = ms ? `transform ${ms}ms cubic-bezier(.65,0,.35,1), opacity .3s` : 'opacity .3s'
    cur.style.transform = `translate(${x}px,${y}px)`
    // Flip the name tag to the left of the pointer when it would run off screen.
    const flip = root.getBoundingClientRect().left + x + 110 > document.documentElement.clientWidth
    if (tag) { tag.style.transition = 'transform .3s'; tag.style.transform = flip ? 'translateX(calc(-100% - 26px))' : '' }
  }
  Object.assign(cur.style, { left: '0', top: '0', right: 'auto', bottom: 'auto' })
  place(restPos(), 0)

  const wait = (ms) => new Promise((r) => setTimeout(r, ms))
  const gate = async () => { while (!(auto && visible && root.isConnected)) await wait(250) }
  const sleep = async (ms) => { await gate(); await wait(ms); await gate() }
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  const tween = (from, to, ms) => new Promise((done) => {
    const t0 = performance.now()
    const step = (now) => {
      if (!auto) return done()
      const t = Math.min(1, (now - t0) / ms)
      setK(from + (to - from) * ease(t))
      place(at(handle, 0.5, 0.5), 0)
      t < 1 ? requestAnimationFrame(step) : done()
    }
    requestAnimationFrame(step)
  })

  // Visitor drag
  handle.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    auto = false; dragging = true
    cur.style.opacity = '0'
    handle.setPointerCapture(e.pointerId)
    const x0 = e.clientX, w0 = frame.offsetWidth, k0 = k
    grab(true)
    const move = (ev) => { const b = bounds(); setK(Math.min(b.max, Math.max(b.min, k0 * (w0 + ev.clientX - x0) / w0))) }
    const up = () => { dragging = false; grab(false); handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up) }
    handle.addEventListener('pointermove', move)
    handle.addEventListener('pointerup', up)
    handle.addEventListener('pointercancel', up)
  })
  window.addEventListener('resize', () => { const b = bounds(); if (k > b.max) setK(b.max); syncSpecs(); if (auto) place(restPos(), 0) })

  if ('IntersectionObserver' in window) new IntersectionObserver((en) => { visible = en[0].isIntersecting }, { threshold: 0.3 }).observe(frame)
  else visible = true
  if (reduce) return

  ;(async () => {
    await sleep(1400)
    while (auto) {
      place(at(handle, 0.5, 0.5), 900); await sleep(950)
      if (!auto) break
      grab(true)
      cur.firstElementChild.animate([{ transform: 'scale(1)' }, { transform: 'scale(.85)' }], { duration: 160, fill: 'forwards' })
      await sleep(250)
      const b = bounds()
      const target = b.max > 1.12 ? Math.min(b.max, 1.28) : 0.78
      await tween(1, target, 1500); await sleep(900)
      await tween(target, 1, 1200)
      grab(false)
      cur.firstElementChild.animate([{ transform: 'scale(.85)' }, { transform: 'scale(1)' }], { duration: 160, fill: 'forwards' })
      await sleep(300)
      if (!auto) break
      place(restPos(), 900)
      await sleep(6500)
    }
  })()
}
