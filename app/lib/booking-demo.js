// Clickable booking demo for the RantevouOS case study.
// Plain JS (no framework) so the same code runs in the Nuxt site and the static preview.
// It's a demo: nothing is saved or sent.

export const SERVICES = [
  { id: 'cut', name: 'Haircut & styling', min: 45, price: 35 },
  { id: 'nails', name: 'Manicure', min: 30, price: 20 },
  { id: 'colour', name: 'Hair colour', min: 90, price: 70 },
]
export const STAFF = ['Any available', 'Maria', 'Eleni', 'Nikos']
export const DAYS = [
  { short: 'Mon', long: 'Monday', n: 11 },
  { short: 'Tue', long: 'Tuesday', n: 12 },
  { short: 'Wed', long: 'Wednesday', n: 13 },
  { short: 'Thu', long: 'Thursday', n: 14 },
  { short: 'Fri', long: 'Friday', n: 15 },
]

export function initialState() {
  const s = { svc: 'cut', staff: 0, day: 3, slot: null, step: 'pick', name: 'Eleni Papadaki' }
  const free = slots(s).filter((x) => !x.taken)
  s.slot = (free.find((x) => x.t >= '14:00') || free[0] || {}).t || null
  return s
}

const pad = (n) => String(n).padStart(2, '0')
const fmt = (m) => pad(Math.floor(m / 60)) + ':' + pad(m % 60)
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

// Slots from 10:00 until the service would end after 18:00, spaced by the service length.
// "Taken" is deterministic so the same day/staff always looks the same.
export function slots(s) {
  const svc = SERVICES.find((x) => x.id === s.svc)
  const out = []
  for (let m = 600; m + svc.min <= 1080 && out.length < 9; m += svc.min) {
    const h = (m * 31 + s.day * 97 + s.staff * 53 + svc.min * 11) % 11
    out.push({ t: fmt(m), taken: h < 3 })
  }
  return out
}

export function renderBooking(s) {
  const svc = SERVICES.find((x) => x.id === s.svc)
  const day = DAYS[s.day]
  const card = 'w-full rounded-xl bg-white p-4 shadow-[0_12px_40px_-12px_rgb(27_26_46/0.25)] sm:p-5'
  const left = `
    <div class="${card} sm:max-w-[290px]">
      <p class="font-mono text-[10px] text-muted">Maria Beauty Studio · Athens</p>
      <p class="mt-1 text-sm font-semibold">Choose a service</p>
      <div class="mt-3 grid gap-1.5 text-[12px]">
        ${SERVICES.map((x) => `
          <button type="button" data-act="svc" data-v="${x.id}" aria-pressed="${x.id === s.svc}"
            class="flex items-center justify-between rounded-lg px-2.5 py-2 text-left transition-colors ${x.id === s.svc ? 'bg-select/10 ring-1 ring-select' : 'bg-paper/60 hover:bg-paper'}">
            <span><span class="font-medium">${x.name}</span><span class="block font-mono text-[9px] text-muted">${x.min} min</span></span>
            <span class="font-medium">€${x.price}</span>
          </button>`).join('')}
      </div>
      <p class="mt-4 text-[11px] font-semibold">With</p>
      <div class="mt-1.5 flex flex-wrap gap-1.5 text-[11px]">
        ${STAFF.map((n, i) => `
          <button type="button" data-act="staff" data-v="${i}" aria-pressed="${i === s.staff}"
            class="rounded-full px-2.5 py-1 transition-colors ${i === s.staff ? 'bg-ink text-white' : 'ring-1 ring-line hover:ring-ink/40'}">${n}</button>`).join('')}
      </div>
    </div>`

  let right
  if (s.step === 'done') {
    right = `
    <div class="${card} sm:max-w-[290px]" role="status">
      <span class="grid size-9 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
        <svg viewBox="0 0 12 12" class="size-4"><path d="M2.5 6.5l2.2 2L9.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>
      </span>
      <p class="mt-3 text-sm font-semibold">Booked for ${day.long}, ${day.n} May at ${s.slot}</p>
      <dl class="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12px]">
        <dt class="text-muted">Service</dt><dd>${svc.name} · €${svc.price}</dd>
        <dt class="text-muted">With</dt><dd>${STAFF[s.staff]}</dd>
        <dt class="text-muted">Name</dt><dd>${esc(s.name)}</dd>
      </dl>
      <p class="mt-3 text-[11px] leading-relaxed text-muted">No account needed. In the real app a confirmation email goes out now and a reminder 24 hours before.</p>
      <button type="button" data-act="reset" class="mt-4 w-full rounded-lg ring-1 ring-line py-2 text-[12px] font-medium hover:ring-ink/40">Book another</button>
      <p class="mt-2 text-center font-mono text-[9px] text-muted">Demo · nothing was saved</p>
    </div>`
  } else if (s.step === 'details') {
    right = `
    <div class="${card} sm:max-w-[290px]">
      <p class="text-sm font-semibold">Your details</p>
      <p class="mt-0.5 text-[11px] text-muted">${day.long}, ${day.n} May · ${s.slot} · ${svc.name}</p>
      <label class="mt-3 block text-[11px] font-medium" for="bd-name">Full name</label>
      <input id="bd-name" data-field="name" value="${esc(s.name)}" class="mt-1 w-full rounded-lg px-2.5 py-1.5 text-[12px] ring-1 ring-line focus:ring-select focus:outline-none">
      <label class="mt-2 block text-[11px] font-medium" for="bd-phone">Phone</label>
      <input id="bd-phone" value="+30 690 123 4567" class="mt-1 w-full rounded-lg px-2.5 py-1.5 font-mono text-[12px] ring-1 ring-line focus:ring-select focus:outline-none">
      <div class="mt-4 grid grid-cols-[auto_1fr] gap-2">
        <button type="button" data-act="back" class="rounded-lg px-3 py-2 text-[12px] font-medium ring-1 ring-line hover:ring-ink/40">Back</button>
        <button type="button" data-act="confirm" class="rounded-lg bg-ink py-2 text-[12px] font-medium text-white hover:bg-ink/85">Confirm booking</button>
      </div>
    </div>`
  } else {
    const list = slots(s)
    right = `
    <div class="${card} sm:max-w-[290px]">
      <div class="flex gap-1">
        ${DAYS.map((d, i) => `
          <button type="button" data-act="day" data-v="${i}" aria-pressed="${i === s.day}" aria-label="${d.long} ${d.n} May"
            class="flex-1 rounded-lg py-1.5 text-center transition-colors ${i === s.day ? 'bg-ink text-white' : 'hover:bg-paper'}">
            <span class="block text-[9px] uppercase tracking-wide opacity-70">${d.short}</span><span class="block text-[13px] font-semibold">${d.n}</span>
          </button>`).join('')}
      </div>
      <p class="mt-3 text-[11px] text-muted">${STAFF[s.staff]} · ${svc.min} min</p>
      <div class="mt-2 grid grid-cols-3 gap-1.5 font-mono text-[11px]">
        ${list.map((x) => x.taken
          ? `<span class="rounded-md bg-paper/60 py-1.5 text-center text-muted line-through" aria-label="${x.t} taken">${x.t}</span>`
          : `<button type="button" data-act="slot" data-v="${x.t}" aria-pressed="${x.t === s.slot}"
              class="rounded-md py-1.5 text-center transition-colors ${x.t === s.slot ? 'bg-select text-white' : 'ring-1 ring-line hover:ring-select'}">${x.t}</button>`).join('')}
      </div>
      <button type="button" data-act="book" ${s.slot ? '' : 'disabled'}
        class="mt-4 w-full rounded-lg py-2 text-[12px] font-medium transition-colors ${s.slot ? 'bg-ink text-white hover:bg-ink/85' : 'bg-paper text-muted'}">${s.slot ? 'Book ' + s.slot : 'Pick a time'}</button>
    </div>`
  }
  return `<div class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-start">${left}${right}</div>`
}

// Draws the demo into el's [data-stage] and returns a small API to drive it.
export function mountBooking(el) {
  if (!el || el.__booking) return el && el.__booking
  const stage = el.querySelector('[data-stage]') || el
  const s = initialState()
  const keepSlot = () => {
    if (!slots(s).some((x) => x.t === s.slot && !x.taken)) s.slot = null
  }
  const draw = () => { stage.innerHTML = renderBooking(s) }
  const apply = (act, v) => {
    if (act === 'svc') { s.svc = v; keepSlot(); s.step = 'pick' }
    else if (act === 'staff') { s.staff = +v; keepSlot(); s.step = 'pick' }
    else if (act === 'day') { s.day = +v; keepSlot() }
    else if (act === 'slot') s.slot = v
    else if (act === 'book') s.step = 'details'
    else if (act === 'confirm') s.step = 'done'
    else if (act === 'reset') Object.assign(s, initialState())
    draw()
  }
  el.__booking = { s, apply, stage }
  return el.__booking
}

// Motion version: a cursor walks through a booking on its own, then loops.
// Pauses when off screen, starts paused for reduced-motion users, and has a Pause/Play button.
const RUNS = [
  { svc: 'colour', staff: 1, day: 1, name: 'Sofia K.' },
  { svc: 'nails', staff: 2, day: 4, name: 'Dimitra P.' },
  { svc: 'cut', staff: 3, day: 2, name: 'Andreas M.' },
]

export function autoplayBooking(el, api) {
  if (!el || !api || el.__autoplay) return
  el.__autoplay = true
  const { s, apply, stage } = api
  stage.inert = true
  stage.setAttribute('aria-hidden', 'true')

  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
  let playing = !reduce
  let visible = false

  const cur = document.createElement('div')
  cur.setAttribute('aria-hidden', 'true')
  cur.style.cssText = 'position:absolute;left:0;top:0;z-index:10;pointer-events:none;transition:transform .85s cubic-bezier(.65,0,.35,1),opacity .3s;will-change:transform'
  cur.innerHTML = '<svg width="20" height="22" viewBox="0 0 18 20" style="display:block;filter:drop-shadow(0 2px 3px rgb(0 0 0/.25))"><path d="M1 1l15 7.5-6.5 1.8L6.7 18z" fill="#3D6BFF" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>' +
    '<span class="ml-3 -mt-1 block w-max rounded-md rounded-tl-none bg-select px-2 py-0.5 text-[11px] font-medium text-white">Customer</span>'
  el.appendChild(cur)

  const bar = document.createElement('div')
  bar.className = 'mt-5 flex items-center justify-center gap-3 text-[12px] text-muted'
  bar.innerHTML = '<button type="button" class="rounded-full bg-white px-3 py-1 font-medium text-ink ring-1 ring-line hover:ring-ink/40"></button><span>A customer books in under a minute, no account needed.</span>'
  el.appendChild(bar)
  const btn = bar.querySelector('button')
  const label = () => { btn.textContent = playing ? 'Pause demo' : 'Play demo'; btn.setAttribute('aria-pressed', String(!playing)); cur.style.opacity = playing ? '1' : '0' }
  btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); playing = !playing; label() })
  label()

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((en) => { visible = en[0].isIntersecting }, { threshold: 0.35 }).observe(el)
  } else visible = true

  const wait = (ms) => new Promise((r) => setTimeout(r, ms))
  const gate = async () => { while (!(playing && visible && el.isConnected)) await wait(250) }
  const sleep = async (ms) => { await gate(); await wait(ms); await gate() }

  const place = (x, y) => { cur.style.transform = `translate(${x}px,${y}px)` }
  const rest = () => place(el.clientWidth * 0.82, el.clientHeight * 0.9)
  const moveTo = async (sel) => {
    const t = stage.querySelector(sel)
    if (!t) return null
    const a = el.getBoundingClientRect(), b = t.getBoundingClientRect()
    place(b.left - a.left + b.width * 0.55, b.top - a.top + b.height * 0.55)
    await sleep(900)
    return t
  }
  const tap = async (sel, act, v) => {
    const t = await moveTo(sel)
    if (!t) return
    cur.firstChild.animate([{ transform: 'scale(1)' }, { transform: 'scale(.8)' }, { transform: 'scale(1)' }], { duration: 260 })
    const a = el.getBoundingClientRect(), b = t.getBoundingClientRect()
    const dot = document.createElement('span')
    dot.style.cssText = `position:absolute;z-index:9;pointer-events:none;width:28px;height:28px;border-radius:9999px;background:rgb(61 107 255/.35);left:${b.left - a.left + b.width * 0.55 - 14}px;top:${b.top - a.top + b.height * 0.55 - 14}px`
    el.appendChild(dot)
    dot.animate([{ transform: 'scale(.3)', opacity: 1 }, { transform: 'scale(1.6)', opacity: 0 }], { duration: 500, easing: 'ease-out' }).onfinish = () => dot.remove()
    await wait(140)
    apply(act, v)
    await sleep(450)
  }
  const type = async (text) => {
    const input = await moveTo('#bd-name')
    if (!input) return
    input.value = ''
    for (const ch of text) { await sleep(85); input.value += ch; s.name = input.value }
    await sleep(400)
  }

  ;(async () => {
    rest()
    for (let i = 0; ; i = (i + 1) % RUNS.length) {
      const r = RUNS[i]
      await sleep(1100)
      await tap(`[data-act="svc"][data-v="${r.svc}"]`, 'svc', r.svc)
      await tap(`[data-act="staff"][data-v="${r.staff}"]`, 'staff', r.staff)
      await tap(`[data-act="day"][data-v="${r.day}"]`, 'day', r.day)
      const free = slots(s).filter((x) => !x.taken)
      const pick = free[Math.min(2, free.length - 1)]
      if (pick) await tap(`[data-act="slot"][data-v="${pick.t}"]`, 'slot', pick.t)
      await tap('[data-act="book"]', 'book')
      await type(r.name)
      await tap('[data-act="confirm"]', 'confirm')
      rest()
      await sleep(3200)
      await tap('[data-act="reset"]', 'reset')
      rest()
    }
  })()
}
