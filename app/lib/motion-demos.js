// Motion demos for the case studies: each one is a tiny product UI that a
// cursor operates on its own, like a screen recording, then loops.
// Plain JS (no framework) so the same code runs in the Nuxt site and in the
// static preview. Nothing is saved or sent.

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const CARD = 'rounded-xl bg-white shadow-[0_12px_40px_-12px_rgb(27_26_46/0.25)]'
const CHECK = '<svg viewBox="0 0 12 12" class="size-2.5"><path d="M2.5 6.5l2.2 2L9.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>'

/* ───────────────────────────── RantevouOS · booking ───────────────────────────── */
const SERVICES = [
  { id: 'cut', name: 'Haircut & styling', min: 45, price: 35 },
  { id: 'nails', name: 'Manicure', min: 30, price: 20 },
  { id: 'colour', name: 'Hair colour', min: 90, price: 70 },
]
const STAFF = ['Any available', 'Maria', 'Eleni', 'Nikos']
const DAYS = [
  { short: 'Mon', long: 'Monday', n: 11 },
  { short: 'Tue', long: 'Tuesday', n: 12 },
  { short: 'Wed', long: 'Wednesday', n: 13 },
  { short: 'Thu', long: 'Thursday', n: 14 },
  { short: 'Fri', long: 'Friday', n: 15 },
]

function bookingInitial() {
  const s = { svc: 'cut', staff: 0, day: 3, slot: null, step: 'pick', name: 'Eleni Papadaki' }
  const free = slots(s).filter((x) => !x.taken)
  s.slot = (free.find((x) => x.t >= '14:00') || free[0] || {}).t || null
  return s
}

const pad = (n) => String(n).padStart(2, '0')
const fmt = (m) => pad(Math.floor(m / 60)) + ':' + pad(m % 60)

// Slots from 10:00 until the service would end after 18:00, spaced by the service length.
// "Taken" is deterministic so the same day/staff always looks the same.
function slots(s) {
  const svc = SERVICES.find((x) => x.id === s.svc)
  const out = []
  for (let m = 600; m + svc.min <= 1080 && out.length < 9; m += svc.min) {
    const h = (m * 31 + s.day * 97 + s.staff * 53 + svc.min * 11) % 11
    out.push({ t: fmt(m), taken: h < 3 })
  }
  return out
}

function renderBooking(s) {
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

const BOOKING_RUNS = [
  { svc: 'colour', staff: 1, day: 1, name: 'Sofia K.' },
  { svc: 'nails', staff: 2, day: 4, name: 'Dimitra P.' },
  { svc: 'cut', staff: 3, day: 2, name: 'Andreas M.' },
]
const booking = {
  cursor: 'Customer',
  caption: 'A customer books in under a minute, no account needed.',
  initial: bookingInitial,
  render: renderBooking,
  async play(c, i) {
    const r = BOOKING_RUNS[i % BOOKING_RUNS.length], s = c.s
    const keep = () => { if (!slots(s).some((x) => x.t === s.slot && !x.taken)) s.slot = null }
    await c.tap(`[data-act="svc"][data-v="${r.svc}"]`, () => { s.svc = r.svc; keep() })
    await c.tap(`[data-act="staff"][data-v="${r.staff}"]`, () => { s.staff = r.staff; keep() })
    await c.tap(`[data-act="day"][data-v="${r.day}"]`, () => { s.day = r.day; keep() })
    const free = slots(s).filter((x) => !x.taken)
    const pick = free[Math.min(2, free.length - 1)]
    if (pick) await c.tap(`[data-act="slot"][data-v="${pick.t}"]`, () => { s.slot = pick.t })
    await c.tap('[data-act="book"]', () => { s.step = 'details' })
    await c.type('#bd-name', r.name, 'name')
    await c.tap('[data-act="confirm"]', () => { s.step = 'done' })
    c.rest(); await c.sleep(3200)
    await c.tap('[data-act="reset"]')
  },
}

/* ───────────────────────────── FeroFerto · rider portal ───────────────────────────── */
const STAGES = ['Registration', 'Verification', 'Assignment', 'Live', 'Payroll']
const RIDER_DOCS = [['ID card', 'id_card.jpg'], ['Driving licence', 'licence.jpg'], ['Tax number (AFM)', '0•• ••• 412']]
const rider = {
  cursor: 'Rider',
  caption: 'A rider signs up, gets verified, collects gear and sees pay split by platform.',
  initial: () => ({ stage: 0, platforms: [], city: '', docs: [0, 0, 0], gear: false, toast: '' }),
  render(s) {
    const rail = `<ol class="flex items-center gap-1">${STAGES.map((n, i) => {
      const done = i < s.stage, on = i === s.stage
      return `<li class="flex flex-1 flex-col gap-1.5">
        <span class="h-1 rounded-full transition-colors duration-500 ${done ? 'bg-emerald-500' : on ? 'bg-select' : 'bg-line'}"></span>
        <span class="truncate text-[9px] font-medium ${on ? 'text-ink' : done ? 'text-emerald-600' : 'text-muted'}">${n}</span></li>`
    }).join('')}</ol>`
    let body
    if (s.stage === 0) {
      const chip = (id, label, color) => {
        const on = s.platforms.includes(id)
        return `<span data-plat="${id}" class="flex flex-1 items-center gap-2 rounded-xl p-2.5 transition-colors ${on ? 'bg-select/8 ring-2 ring-select' : 'ring-1 ring-line'}">
          <span class="grid size-7 place-items-center rounded-lg text-[10px] font-bold text-white" style="background:${color}">${label[0]}</span>
          <span class="flex-1 text-[12px] font-semibold">${label}</span>
          <span class="grid size-4 place-items-center rounded-full ${on ? 'bg-select text-white' : 'ring-1 ring-line'}">${on ? CHECK : ''}</span></span>`
      }
      body = `<p class="text-[15px] font-semibold">Where do you want to ride?</p>
        <p class="mt-0.5 text-[11px] text-muted">Pick one or both. You can add more later.</p>
        <div class="mt-3 flex gap-2">${chip('efood', 'EFOOD', '#E5282C')}${chip('wolt', 'Wolt', '#009DE0')}</div>
        <p class="mt-3 text-[11px] font-medium">City</p>
        <span data-city class="mt-1 flex items-center justify-between rounded-lg px-2.5 py-2 text-[12px] ring-1 ${s.city ? 'ring-ink/30' : 'ring-line text-muted'}">${s.city || 'Choose a city'}<span class="text-muted">▾</span></span>
        <span data-next class="mt-4 block rounded-lg py-2.5 text-center text-[12px] font-semibold ${s.platforms.length && s.city ? 'bg-ink text-white' : 'bg-paper text-muted'}">Continue</span>`
    } else if (s.stage === 1) {
      const all = s.docs.every((d) => d === 2)
      body = `<div class="flex items-center justify-between"><p class="text-[15px] font-semibold">Verify your identity</p>
          <span class="rounded-full px-2 py-0.5 text-[9px] font-semibold ${all ? 'bg-emerald-500/15 text-emerald-700' : 'bg-amber-400/20 text-amber-700'}">${all ? 'Verified' : 'In review'}</span></div>
        <p class="mt-0.5 text-[11px] text-muted">Used for ${s.platforms.length > 1 ? 'EFOOD and Wolt' : 'your platform'}. Upload once.</p>
        <ul class="mt-2 divide-y divide-line/70">${RIDER_DOCS.map(([n, f], k) => {
          const st = s.docs[k]
          return `<li class="flex items-center gap-2.5 py-2">
            ${st === 2 ? `<span class="grid size-5 place-items-center rounded-md bg-emerald-500 text-white">${CHECK}</span>` : st === 1 ? '<span class="size-5 animate-spin rounded-full border-2 border-select/25 border-t-select"></span>' : '<span class="size-5 rounded-md ring-1 ring-line"></span>'}
            <span class="flex-1 text-[12px]">${n}</span>
            ${st === 2 ? `<span class="font-mono text-[10px] text-emerald-600">${f}</span>` : st === 1 ? '<span class="font-mono text-[10px] text-muted">Checking…</span>' : `<span data-rdoc="${k}" class="rounded-md px-2 py-1 text-[11px] font-medium text-select ring-1 ring-select/40">Upload</span>`}</li>`
        }).join('')}</ul>
        <span data-next class="mt-3 block rounded-lg py-2.5 text-center text-[12px] font-semibold ${all ? 'bg-ink text-white' : 'bg-paper text-muted'}">Continue</span>`
    } else if (s.stage === 2) {
      body = `<p class="text-[15px] font-semibold">Your gear and first shift</p>
        <div class="mt-3 grid grid-cols-3 gap-2 text-center text-[10px]">
          ${[['Thermal bag', '▣'], ['Helmet', '◒'], ['Phone mount', '▯']].map(([n, i]) => `<div class="rounded-lg bg-paper/70 px-1 py-2.5"><span class="block text-[18px] leading-none">${i}</span><span class="mt-1.5 block font-medium">${n}</span></div>`).join('')}
        </div>
        <div class="mt-3 rounded-lg p-2.5 ring-1 ring-line"><p class="font-mono text-[9px] text-muted">FIRST SHIFT</p><p class="mt-0.5 text-[12px] font-semibold">Mon 18:00–23:00 · ${s.city || 'Athens'} Centre</p></div>
        <span data-gear class="mt-3 block rounded-lg py-2.5 text-center text-[12px] font-semibold ${s.gear ? 'bg-emerald-500 text-white' : 'bg-ink text-white'}">${s.gear ? 'Pickup booked · Sat 11:00' : 'Book gear pickup'}</span>`
    } else {
      body = `<div class="flex items-baseline justify-between"><p class="text-[15px] font-semibold">This week's pay</p><span class="font-mono text-[10px] text-muted">Paid Friday</span></div>
        <p class="mt-2 font-display text-[30px] font-bold tracking-tight">€642.80</p>
        <div class="mt-2 flex h-2 overflow-hidden rounded-full"><span class="bg-[#E5282C]" style="width:64%"></span><span class="bg-[#009DE0]" style="width:36%"></span></div>
        <ul class="mt-3 space-y-1.5 text-[12px]">
          <li class="flex justify-between"><span class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-[#E5282C]"></span>EFOOD · 61 deliveries</span><span class="font-mono">€412.30</span></li>
          <li class="flex justify-between"><span class="flex items-center gap-1.5"><span class="size-2 rounded-full bg-[#009DE0]"></span>Wolt · 34 deliveries</span><span class="font-mono">€230.50</span></li>
        </ul>`
    }
    return `<div class="relative mx-auto w-full max-w-[380px]">
      <div class="${CARD} p-4 sm:p-5">
        <div class="mb-4 flex items-center justify-between"><span class="text-[13px] font-bold tracking-tight">fero<span class="text-select">ferto</span></span><span class="font-mono text-[10px] text-muted">Rider portal</span></div>
        ${rail}
        <div class="mt-4">${body}</div>
      </div>
      ${s.toast ? `<div class="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[11px] text-white shadow-lg"><span class="text-emerald-400">${CHECK}</span>${s.toast}</div>` : ''}
    </div>`
  },
  async play(c) {
    const s = c.s
    await c.tap('[data-plat="efood"]', () => { s.platforms.push('efood') })
    await c.tap('[data-plat="wolt"]', () => { s.platforms.push('wolt') })
    await c.tap('[data-city]', () => { s.city = 'Athens' })
    await c.tap('[data-next]', () => { s.stage = 1 })
    for (let k = 0; k < 3; k++) {
      await c.tap(`[data-rdoc="${k}"]`, () => { s.docs[k] = 1 })
      await c.sleep(550)
      c.set(() => { s.docs[k] = 2 })
    }
    await c.sleep(500)
    await c.tap('[data-next]', () => { s.stage = 2 })
    await c.tap('[data-gear]', () => { s.gear = true; s.toast = 'Gear pickup booked' })
    await c.sleep(1100)
    c.set(() => { s.toast = ''; s.stage = 4 })
    c.rest(); await c.sleep(3200)
  },
}

/* ───────────────────────────── Ledgerly · onboarding ───────────────────────────── */
const DOCS = [
  ['Owner ID or passport', 'id_front.jpg'],
  ['Business registration', 'registration.pdf'],
  ['Proof of address', 'utility_bill.pdf'],
  ['Tax number', 'TIN 104 552 887'],
]
const onboarding = {
  cursor: 'Owner',
  caption: 'An owner sees every document up front, uploads them, and opens the account.',
  initial: () => ({ docs: [0, 0, 0, 0], step: 'list', toast: '' }),
  render(s) {
    const done = s.docs.filter((d) => d === 2).length
    const pct = s.step === 'done' ? 100 : 40 + done * 10
    const bar = `<div class="h-1.5 w-full rounded-full bg-paper"><div class="h-full rounded-full bg-select transition-[width] duration-700" style="width:${pct}%"></div></div>`
    if (s.step === 'done') {
      return `<div class="mx-auto w-full max-w-[360px] ${CARD} p-5">
        ${bar}<p class="mt-2 font-mono text-[10px] text-muted">Step 5 of 5</p>
        <span class="mt-5 grid size-11 place-items-center rounded-full bg-emerald-500/15 text-emerald-600"><svg viewBox="0 0 12 12" class="size-5"><path d="M2.5 6.5l2.2 2L9.5 3.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></span>
        <p class="mt-3 text-base font-semibold">Your account is open</p>
        <p class="mt-1 text-[12px] text-muted">Ledgerly Business · <span class="font-mono">•••• 4821</span></p>
        <div class="mt-4 grid grid-cols-2 gap-2 text-[11px]">
          <div class="rounded-lg bg-paper/60 p-2.5"><p class="text-muted">Time to open</p><p class="mt-0.5 font-mono text-[13px] font-medium">8 min 40 s</p></div>
          <div class="rounded-lg bg-paper/60 p-2.5"><p class="text-muted">Documents</p><p class="mt-0.5 font-mono text-[13px] font-medium">4 of 4</p></div>
        </div>
        <div class="mt-4 rounded-lg bg-ink py-2.5 text-center text-[13px] font-medium text-white">Go to dashboard</div>
      </div>`
    }
    const rows = DOCS.map(([name, file], k) => {
      const st = s.docs[k]
      const box = st === 2 ? `<span class="grid size-5 place-items-center rounded-md bg-select text-white">${CHECK}</span>`
        : st === 1 ? '<span class="size-5 animate-spin rounded-full border-2 border-select/25 border-t-select"></span>'
        : '<span class="size-5 rounded-md border border-line"></span>'
      const right = st === 2 ? `<span class="font-mono text-[10px] text-emerald-600">${file}</span>`
        : st === 1 ? '<span class="font-mono text-[10px] text-muted">Uploading…</span>'
        : `<span data-doc="${k}" class="rounded-md px-2 py-1 text-[11px] font-medium text-select ring-1 ring-select/40">Upload</span>`
      return `<li class="flex items-center gap-3 py-2.5">${box}<span class="flex-1 text-[13px] ${st === 2 ? 'text-muted' : ''}">${name}</span>${right}</li>`
    }).join('')
    const ready = done === 4
    return `<div class="relative mx-auto w-full max-w-[360px]">
      <div class="${CARD} p-5">
        <div class="flex items-center justify-between"><span class="text-[12px] font-semibold tracking-tight">ledgerly</span><span class="font-mono text-[10px] text-muted">Step 3 of 5</span></div>
        <div class="mt-3">${bar}</div>
        <p class="mt-4 text-[15px] font-semibold">Have these ready</p>
        <p class="mt-0.5 text-[11px] text-muted">For a sole trader. Nothing else will be asked later.</p>
        <ul class="mt-2 divide-y divide-line/70">${rows}</ul>
        <div data-continue class="mt-3 rounded-lg py-2.5 text-center text-[13px] font-medium ${ready ? 'bg-ink text-white' : 'bg-paper text-muted'}">Continue</div>
      </div>
      ${s.toast ? `<div class="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[11px] text-white shadow-lg"><span class="text-emerald-400">${CHECK}</span>${s.toast}</div>` : ''}
    </div>`
  },
  async play(c) {
    const s = c.s
    for (let k = 0; k < 4; k++) {
      await c.tap(`[data-doc="${k}"]`, () => { s.docs[k] = 1; s.toast = '' })
      await c.sleep(650)
      c.set(() => { s.docs[k] = 2; s.toast = k === 0 ? 'Saved. You can finish on your phone.' : 'Saved' })
      await c.sleep(350)
    }
    c.set(() => { s.toast = '' })
    await c.tap('[data-continue]', () => { s.step = 'done' })
    c.rest(); await c.sleep(3400)
  },
}

/* ───────────────────────────── Clinicflow · calendar ───────────────────────────── */
const DOCTORS = ['Dr. Khan', 'Dr. Haddad', 'Dr. Noor']
const PX = 52 / 60 // px per minute
const hhmm = (m) => { const t = 540 + m; return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` }
const calendar = {
  cursor: 'Receptionist',
  caption: 'A receptionist moves a booking with the keyboard; clashes show before anything saves.',
  initial: () => ({
    sel: null, key: '', toast: '',
    appts: [
      { id: 'a1', name: 'A. Khan', lane: 0, start: 0, dur: 45 },
      { id: 'a2', name: 'R. Ali', lane: 0, start: 105, dur: 45 },
      { id: 'a3', name: 'S. Noor', lane: 1, start: 45, dur: 60 },
      { id: 'a4', name: 'M. Saad', lane: 2, start: 30, dur: 45 },
      { id: 'a5', name: 'L. Diaz', lane: 1, start: 165, dur: 45 },
      { id: 'a6', name: 'J. Park', lane: 2, start: 120, dur: 60 },
    ],
  }),
  render(s) {
    const clash = (a) => s.appts.some((b) => b !== a && b.lane === a.lane && a.start < b.start + b.dur && b.start < a.start + a.dur)
    const lane = (l) => s.appts.filter((a) => a.lane === l).map((a) => {
      const c = clash(a), on = s.sel === a.id
      const cls = on ? (c ? 'border-[1.5px] border-dashed border-redline bg-redline/10 text-redline z-10' : 'bg-select text-white shadow-lg ring-2 ring-select/30 z-10')
        : c ? 'border-[1.5px] border-dashed border-redline bg-redline/10 text-redline' : 'bg-select/12 text-select'
      return `<div data-appt="${a.id}" class="absolute inset-x-1 overflow-hidden rounded-md px-1.5 py-1 text-[10px] leading-tight transition-all duration-300 ${cls}" style="top:${a.start * PX}px;height:${a.dur * PX - 3}px">
        <span class="font-medium">${a.name}</span><span class="block font-mono text-[9px] opacity-80">${hhmm(a.start)}</span></div>${c && on ? `<span class="absolute right-1 z-20 rounded bg-redline px-1.5 py-0.5 text-[9px] font-medium text-white" style="top:${a.start * PX - 16}px">Clashes with ${s.appts.find((b) => b !== a && b.lane === a.lane && a.start < b.start + b.dur && b.start < a.start + a.dur).name}</span>` : ''}`
    }).join('')
    const keys = ['↑', '↓', '←', '→', 'Enter'].map((k) => `<kbd class="rounded px-1.5 py-0.5 font-mono text-[10px] transition-colors ${s.key === k ? 'bg-ink text-white' : 'bg-white text-muted ring-1 ring-line'}">${k}</kbd>`).join('')
    return `<div class="relative mx-auto w-full max-w-[440px]">
      <div class="${CARD} p-4">
        <div class="mb-3 flex items-center justify-between text-[12px]"><span class="font-semibold">Monday, 9 AM–1 PM</span><span class="rounded-full bg-paper px-2 py-0.5 font-mono text-[10px] text-muted">Today</span></div>
        <div class="grid grid-cols-[26px_1fr_1fr_1fr] gap-1.5 text-[10px]">
          <span></span>${DOCTORS.map((d) => `<span class="truncate text-center font-medium text-muted">${d}</span>`).join('')}
          <div class="relative" style="height:${240 * PX}px">${[0, 1, 2, 3].map((h) => `<span class="absolute font-mono text-muted" style="top:${h * 60 * PX - 2}px">${9 + h}</span>`).join('')}</div>
          ${[0, 1, 2].map((l) => `<div class="relative rounded-md bg-paper/60" style="height:${240 * PX}px">${lane(l)}</div>`).join('')}
        </div>
        <div class="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] text-muted">${keys}<span class="ml-1">move · save</span></div>
      </div>
      ${s.toast ? `<div class="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[11px] text-white shadow-lg"><span class="text-emerald-400">${CHECK}</span>${s.toast}</div>` : ''}
    </div>`
  },
  async play(c) {
    const s = c.s, a = s.appts.find((x) => x.id === 'a2')
    await c.tap('[data-appt="a2"]', () => { s.sel = 'a2' })
    c.rest()
    const press = async (k, fn) => { c.set(() => { s.key = k; fn && fn() }); await c.sleep(520); c.set(() => { s.key = '' }); await c.sleep(260) }
    await press('→', () => { a.lane = 1 })
    await press('↑', () => { a.start -= 15 })
    await c.sleep(700)
    await press('↓', () => { a.start += 15 })
    await press('↓', () => { a.start += 15 })
    await press('Enter', () => { s.sel = null; s.toast = `R. Ali moved to ${DOCTORS[1]}, ${hhmm(a.start)}` })
    await c.sleep(3000)
  },
}

/* ───────────────────────────── Tandem · design system ───────────────────────────── */
const BRANDS = [['Blue', '#3D6BFF'], ['Violet', '#7C4DFF'], ['Emerald', '#0E9F6E'], ['Coral', '#F0533F']]
const RADII = [['4', 4], ['8', 8], ['16', 16], ['Full', 999]]
const system = {
  cursor: 'Designer',
  caption: 'Change a token once and every component follows, then publish to code.',
  initial: () => ({ brand: 0, radius: 1, dark: false, toast: '' }),
  render(s) {
    const col = BRANDS[s.brand][1], r = RADII[s.radius][1], rr = Math.min(r, 12)
    const sw = BRANDS.map(([n, h], i) => `<span data-brand="${i}" title="${n}" class="size-6 rounded-md transition-shadow ${i === s.brand ? 'ring-2 ring-offset-2 ring-ink' : ''}" style="background:${h}"></span>`).join('')
    const rad = RADII.map(([n], i) => `<span data-radius="${i}" class="rounded-md px-2 py-1 font-mono text-[10px] ${i === s.radius ? 'bg-ink text-white' : 'ring-1 ring-line'}">${n}</span>`).join('')
    const bg = s.dark ? '#1B1A2E' : '#FFFFFF', fg = s.dark ? '#F1F0F7' : '#1B1A2E', mu = s.dark ? '#A9A7BC' : '#6E6C85', ln = s.dark ? '#3D3B5C' : '#D6D4E3'
    return `<div class="relative mx-auto flex w-full max-w-[470px] flex-col gap-3 sm:flex-row">
      <div class="${CARD} p-4 sm:w-[170px] sm:shrink-0">
        <p class="font-mono text-[10px] text-muted">color.brand</p><div class="mt-2 flex gap-2">${sw}</div>
        <p class="mt-4 font-mono text-[10px] text-muted">radius</p><div class="mt-2 flex flex-wrap gap-1.5">${rad}</div>
        <p class="mt-4 font-mono text-[10px] text-muted">theme</p>
        <div data-theme-toggle class="mt-2 inline-flex rounded-md p-0.5 text-[10px] ring-1 ring-line"><span class="rounded px-2 py-0.5 ${!s.dark ? 'bg-ink text-white' : ''}">Light</span><span class="rounded px-2 py-0.5 ${s.dark ? 'bg-ink text-white' : ''}">Dark</span></div>
        <div data-publish class="mt-4 rounded-lg bg-ink py-2 text-center text-[11px] font-medium text-white">Publish v2.4</div>
      </div>
      <div class="${CARD} flex-1 p-4">
        <p class="font-mono text-[10px] text-muted">Preview · Invite dialog</p>
        <div class="mt-2 p-4 transition-colors duration-500" style="background:${bg};color:${fg};border-radius:${rr}px;box-shadow:inset 0 0 0 1px ${ln}">
          <div class="flex items-center justify-between"><p class="text-[13px] font-semibold">Invite teammates</p><span class="px-1.5 py-0.5 text-[9px] font-semibold text-white transition-all duration-500" style="background:${col};border-radius:${r}px">PRO</span></div>
          <p class="mt-1 text-[11px]" style="color:${mu}">They'll get access to this workspace.</p>
          <div class="mt-3 px-2.5 py-2 text-[11px] transition-all duration-500" style="border-radius:${rr}px;box-shadow:inset 0 0 0 1.5px ${col};color:${mu}">name@company.com</div>
          <div class="mt-3 flex items-center justify-between gap-2">
            <span class="flex items-center gap-1.5 text-[11px]"><span class="relative h-4 w-7 transition-colors duration-500" style="background:${col};border-radius:999px"><span class="absolute right-0.5 top-0.5 size-3 rounded-full bg-white"></span></span>Admin</span>
            <span class="flex gap-1.5"><span class="px-2.5 py-1.5 text-[11px] font-medium transition-all duration-500" style="border-radius:${r}px;box-shadow:inset 0 0 0 1px ${ln}">Cancel</span><span class="px-2.5 py-1.5 text-[11px] font-medium text-white transition-all duration-500" style="background:${col};border-radius:${r}px">Send invite</span></span>
          </div>
        </div>
      </div>
      ${s.toast ? `<div class="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[11px] text-white shadow-lg"><span class="text-emerald-400">${CHECK}</span>${s.toast}</div>` : ''}
    </div>`
  },
  async play(c, i) {
    const s = c.s, b1 = 1 + (i % 3), b2 = 1 + ((i + 1) % 3)
    await c.tap(`[data-brand="${b1}"]`, () => { s.brand = b1 })
    await c.sleep(500)
    await c.tap('[data-radius="3"]', () => { s.radius = 3 })
    await c.sleep(500)
    await c.tap('[data-theme-toggle]', () => { s.dark = true })
    await c.sleep(600)
    await c.tap(`[data-brand="${b2}"]`, () => { s.brand = b2 })
    await c.tap('[data-radius="2"]', () => { s.radius = 2 })
    await c.tap('[data-publish]', () => { s.toast = 'v2.4 published · synced to Figma and React' })
    c.rest(); await c.sleep(3000)
  },
}

/* ───────────────────────────── Haul · driver app ───────────────────────────── */
const MAP = `<svg viewBox="0 0 200 110" class="h-full w-full" preserveAspectRatio="xMidYMid slice">
  <rect width="200" height="110" fill="#EEF1F6"/>
  <g stroke="#fff" stroke-width="7" fill="none"><path d="M-5 30H210M-5 78H210M40-5V120M120-5V120M170-5V120"/><path d="M60 120L150-5" stroke-width="5"/></g>
  <rect x="128" y="38" width="34" height="30" rx="3" fill="#DCE8D6"/><rect x="48" y="86" width="64" height="20" rx="3" fill="#DCE8D6"/>
  <path d="M20 100V78H120V30H162" fill="none" stroke="#3D6BFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 0"/>
  <circle cx="20" cy="100" r="5" fill="#fff" stroke="#3D6BFF" stroke-width="3"/>
  <path d="M162 18c-6 0-9.5 4.5-9.5 9 0 6.5 9.5 14 9.5 14s9.5-7.5 9.5-14c0-4.5-3.5-9-9.5-9z" fill="#1B1A2E"/><circle cx="162" cy="27" r="3.2" fill="#fff"/>
</svg>`
const mobile = {
  cursor: 'Driver',
  touch: true,
  caption: 'A driver confirms a delivery with a photo; it saves offline and syncs when signal returns.',
  initial: () => ({ screen: 'stop', flash: false, online: false, queue: [['Stop 6 · photo', true]] }),
  render(s) {
    const status = `<div class="flex items-center justify-between px-4 pb-1 pt-2 text-[9px] font-semibold"><span>9:41</span><span class="flex items-center gap-1">
      <span class="flex items-end gap-px">${[3, 5, 7, 9].map((h, i) => `<span class="w-[2px] rounded-sm ${i < (s.online ? 4 : 1) ? 'bg-current' : 'bg-current/25'}" style="height:${h}px"></span>`).join('')}</span>
      <span class="ml-1 h-[8px] w-[15px] rounded-[2px] border border-current p-px"><span class="block h-full w-3/4 rounded-[1px] bg-current"></span></span></span></div>`
    const waiting = s.queue.filter((q) => !q[1]).length
    const pill = s.online && !waiting ? '<span class="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">Synced</span>'
      : `<span class="rounded-full bg-amber-400/20 px-2 py-0.5 text-[9px] font-semibold text-amber-700">Offline${waiting ? ` · ${waiting} waiting` : ''}</span>`
    const header = `<div class="bg-ink px-4 pb-3 pt-1 text-white"><div class="flex items-center justify-between"><p class="text-[13px] font-semibold">Today's route</p>${pill.replace('text-amber-700', 'text-amber-300').replace('text-emerald-700', 'text-emerald-300')}</div>
      <div class="mt-2 flex gap-[2px]">${Array.from({ length: 22 }, (_, i) => `<span class="h-1 flex-1 rounded-full ${i < (s.screen === 'done' ? 7 : 6) ? 'bg-select' : 'bg-white/20'}"></span>`).join('')}</div>
      <p class="mt-1.5 font-mono text-[9px] text-white/60">${s.screen === 'done' ? 7 : 6} of 22 delivered</p></div>`
    let body
    if (s.screen === 'stop') {
      body = `<div class="h-[110px]">${MAP}</div>
        <div class="flex flex-1 flex-col p-3">
          <p class="font-mono text-[9px] text-muted">STOP 7 OF 22 · 0.4 KM</p>
          <p class="mt-0.5 text-[15px] font-bold leading-tight">14 Mall Road, Gate 2</p>
          <p class="mt-1 text-[11px] text-muted">2 parcels · Leave at reception</p>
          <div data-arrived class="mt-auto grid h-14 place-items-center rounded-2xl bg-select text-[15px] font-bold text-white">Arrived</div>
          <div class="mt-2 grid h-11 place-items-center rounded-2xl text-[13px] font-semibold ring-2 ring-ink">Report issue</div>
        </div>`
    } else if (s.screen === 'photo') {
      body = `<div class="relative flex flex-1 flex-col bg-[#111]">
        <p class="p-3 text-center text-[11px] font-medium text-white/80">Photo of parcels at the door</p>
        <div class="relative mx-6 flex-1">
          ${['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'left-0 bottom-0 border-l-2 border-b-2', 'right-0 bottom-0 border-r-2 border-b-2'].map((p) => `<span class="absolute size-5 border-white ${p}"></span>`).join('')}
          <div class="absolute bottom-6 left-1/2 h-14 w-20 -translate-x-1/2 rounded-sm bg-[#C9A36B]"><span class="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-[#A9824E]"></span><span class="absolute -top-6 left-3 h-6 w-12 rounded-sm bg-[#D9B783]"></span></div>
        </div>
        <div class="grid place-items-center py-4"><span data-shutter class="grid size-14 place-items-center rounded-full border-4 border-white/40"><span class="size-10 rounded-full bg-white"></span></span></div>
        ${s.flash ? '<div class="absolute inset-0 bg-white"></div>' : ''}
      </div>`
    } else if (s.screen === 'review') {
      body = `<div class="flex flex-1 flex-col p-3">
        <p class="text-[15px] font-bold">Proof of delivery</p>
        <div class="relative mt-2 h-28 overflow-hidden rounded-xl bg-[#2a2a2a]"><div class="absolute bottom-3 left-1/2 h-12 w-16 -translate-x-1/2 rounded-sm bg-[#C9A36B]"><span class="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[#A9824E]"></span></div>
          <span class="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-semibold text-white">${CHECK} Photo added</span></div>
        <p class="mt-2 text-[11px] text-muted">Left at reception · 09:41</p>
        <div data-complete class="mt-auto grid h-14 place-items-center rounded-2xl bg-select text-[15px] font-bold text-white">Complete delivery</div>
      </div>`
    } else {
      body = `<div class="flex flex-1 flex-col p-3">
        <div class="rounded-2xl bg-emerald-500/12 p-3"><p class="flex items-center gap-1.5 text-[14px] font-bold text-emerald-700">${CHECK} Delivered</p>
          <p class="mt-0.5 text-[11px] text-emerald-800/80">${s.online ? 'Photo uploaded to dispatch.' : 'Saved on the phone. It will upload when you have signal.'}</p></div>
        <p class="mt-4 font-mono text-[9px] text-muted">NEXT · STOP 8 OF 22</p>
        <p class="mt-0.5 text-[15px] font-bold leading-tight">3 Canal View</p>
        <p class="mt-1 text-[11px] text-muted">1 parcel · 1.2 km</p>
        <div class="mt-auto grid h-14 place-items-center rounded-2xl bg-ink text-[15px] font-bold text-white">Start navigation</div>
      </div>`
    }
    const phone = `<div class="relative h-[430px] w-[220px] shrink-0 rounded-[34px] bg-ink p-[7px] shadow-[0_20px_50px_-15px_rgb(27_26_46/0.5)]">
      <div class="flex h-full flex-col overflow-hidden rounded-[28px] bg-white">
        <div class="${s.screen === 'photo' ? 'bg-[#111] text-white' : 'bg-ink text-white'}">${status}</div>
        ${s.screen === 'photo' ? '' : header}
        ${body}
      </div></div>`
    const queue = `<div class="hidden w-[190px] ${CARD} p-4 sm:block">
      <p class="font-mono text-[10px] text-muted">Sync queue</p>
      <ul class="mt-2 space-y-2 text-[11px]">${s.queue.map(([n, ok]) => `<li class="flex items-center justify-between gap-2"><span>${n}</span>${ok ? `<span class="flex items-center gap-1 text-emerald-600">${CHECK} Synced</span>` : '<span class="text-amber-600">Waiting</span>'}</li>`).join('')}</ul>
      <p class="mt-4 border-t border-line pt-3 font-mono text-[10px] text-muted">Touch targets 56–64 px</p>
      <p class="mt-1 font-mono text-[10px] text-muted">Contrast 12.6 : 1 (AAA)</p>
    </div>`
    return `<div class="flex items-center justify-center gap-6">${phone}${queue}</div>`
  },
  async play(c) {
    const s = c.s
    await c.tap('[data-arrived]', () => { s.screen = 'photo' })
    await c.sleep(700)
    await c.tap('[data-shutter]', () => { s.flash = true })
    c.set(() => { s.flash = false; s.screen = 'review' })
    await c.sleep(900)
    await c.tap('[data-complete]', () => { s.screen = 'done'; s.queue.push(['Stop 7 · photo', false]) })
    c.rest(); await c.sleep(2200)
    c.set(() => { s.online = true; s.queue.forEach((q) => { q[1] = true }) })
    await c.sleep(2800)
  },
}

/* ───────────────────────────── engine ───────────────────────────── */
export const DEMOS = { booking, rider, onboarding, calendar, system, mobile }

// Only one demo plays at a time. Demos on screen take turns, one loop each,
// so two cards side by side never move at once.
const TURN = { owner: null }

export function renderDemo(kind) {
  const d = DEMOS[kind]
  return d ? d.render(d.initial()) : ''
}

export function demoCaption(kind) {
  return DEMOS[kind] ? DEMOS[kind].caption : ''
}

export function mountDemo(el) {
  if (!el || el.__demo) return
  const d = DEMOS[el.dataset.motionDemo]
  if (!d) return
  el.__demo = true
  const stage = el.querySelector('[data-stage]')
  stage.inert = true
  stage.setAttribute('aria-hidden', 'true')
  let s = d.initial()
  const draw = () => { stage.innerHTML = d.render(s) }

  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
  let playing = !reduce, visible = false

  const cur = document.createElement('div')
  cur.setAttribute('aria-hidden', 'true')
  cur.style.cssText = 'position:absolute;left:0;top:0;z-index:20;pointer-events:none;transition:transform .85s cubic-bezier(.65,0,.35,1),opacity .3s;will-change:transform'
  const pointer = d.touch
    ? '<span style="display:block;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:9999px;background:rgb(61 107 255/.28);box-shadow:0 0 0 2px #fff,0 2px 8px rgb(0 0 0/.25)"></span>'
    : '<svg width="20" height="22" viewBox="0 0 18 20" style="display:block;filter:drop-shadow(0 2px 3px rgb(0 0 0/.25))"><path d="M1 1l15 7.5-6.5 1.8L6.7 18z" fill="#3D6BFF" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>'
  cur.innerHTML = pointer + `<span class="${d.touch ? 'ml-4 mt-1' : 'ml-3 -mt-1'} block w-max rounded-md rounded-tl-none bg-select px-2 py-0.5 text-[11px] font-medium text-white">${d.cursor}</span>`
  el.appendChild(cur)

  const bar = document.createElement('div')
  bar.className = 'mt-6 flex items-center justify-center'
  bar.innerHTML = '<button type="button" class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-ink ring-1 ring-line hover:ring-ink/40"></button>'
  el.appendChild(bar)
  const btn = bar.firstChild
  const shade = () => { cur.style.opacity = !playing ? '0' : TURN.owner === el ? '1' : '.35' }
  const label = () => { btn.textContent = playing ? 'Pause demo' : 'Play demo'; btn.setAttribute('aria-pressed', String(!playing)); shade() }
  btn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); playing = !playing; label() })
  label()

  if ('IntersectionObserver' in window) new IntersectionObserver((en) => { visible = en[0].isIntersecting }, { threshold: 0.35 }).observe(el)
  else visible = true

  const wait = (ms) => new Promise((r) => setTimeout(r, ms))
  const release = () => { if (TURN.owner === el) TURN.owner = null; shade() }
  const gate = async () => {
    for (;;) {
      if (!(playing && visible && el.isConnected)) { release(); await wait(250); continue }
      if (TURN.owner && TURN.owner !== el) { shade(); await wait(200); continue }
      TURN.owner = el; shade(); return
    }
  }
  const sleep = async (ms) => { await gate(); await wait(ms); await gate() }
  const place = (x, y) => { cur.style.transform = `translate(${x}px,${y}px)` }
  const rest = () => place(Math.max(0, el.clientWidth - 150), Math.max(40, el.clientHeight - 70))
  const point = (t) => { const a = el.getBoundingClientRect(), b = t.getBoundingClientRect(); return [b.left - a.left + b.width * 0.55, b.top - a.top + b.height * 0.55] }
  const moveTo = async (sel) => {
    const t = stage.querySelector(sel)
    if (!t) return null
    place(...point(t)); await sleep(900)
    return t
  }
  const ctx = {
    get s() { return s },
    sleep, rest, draw,
    set(fn) { fn(); draw() },
    async tap(sel, fn) {
      const t = await moveTo(sel)
      if (!t) return
      cur.firstChild.animate([{ transform: 'scale(1)' }, { transform: 'scale(.8)' }, { transform: 'scale(1)' }], { duration: 260 })
      const [x, y] = point(t), dot = document.createElement('span')
      dot.style.cssText = `position:absolute;z-index:19;pointer-events:none;width:28px;height:28px;border-radius:9999px;background:rgb(61 107 255/.35);left:${x - 14}px;top:${y - 14}px`
      el.appendChild(dot)
      dot.animate([{ transform: 'scale(.3)', opacity: 1 }, { transform: 'scale(1.6)', opacity: 0 }], { duration: 500, easing: 'ease-out' }).onfinish = () => dot.remove()
      await wait(140)
      if (fn) { fn(); draw() }
      await sleep(450)
    },
    async type(sel, text, key) {
      const input = await moveTo(sel)
      if (!input) return
      input.value = ''
      for (const ch of text) { await sleep(85); input.value += ch; s[key] = input.value }
      await sleep(400)
    },
  }

  ;(async () => {
    for (let i = 0; ; i++) {
      s = d.initial(); draw(); rest()
      await sleep(1000)
      await d.play(ctx, i)
      // Hand over to the next demo on screen, then reset and wait our turn.
      release(); await wait(900)
      s = d.initial(); draw(); rest()
    }
  })()
}
