<script setup lang="ts">
import type { Mock } from '~/data/site'
defineProps<{ kind: Mock }>()
</script>

<template>
  <div class="relative h-full w-full overflow-hidden" aria-hidden="true">
    <!-- Booking: public booking page -->
    <div v-if="kind === 'booking'" class="flex h-full items-center justify-center gap-5 p-6">
      <div class="w-full max-w-[250px] rounded-xl bg-white p-4 shadow-[0_12px_40px_-12px_rgb(27_26_46/0.25)]">
        <p class="font-mono text-[10px] text-muted">Maria Beauty Studio · Athens</p>
        <p class="mt-1 text-sm font-semibold">Choose a service</p>
        <ul class="mt-3 space-y-1.5 text-[12px]">
          <li v-for="(s, i) in [['Haircut & styling','45 min','€35'],['Manicure','30 min','€20'],['Hair colour','90 min','€70']]" :key="s[0]"
            class="flex items-center justify-between rounded-lg px-2.5 py-2" :class="i === 0 ? 'bg-select/10 ring-1 ring-select' : 'bg-paper/60'">
            <span><span class="font-medium">{{ s[0] }}</span><span class="block font-mono text-[9px] text-muted">{{ s[1] }}</span></span><span class="font-medium">{{ s[2] }}</span>
          </li>
        </ul>
      </div>
      <div class="hidden w-full max-w-[250px] rounded-xl bg-white p-4 shadow-[0_12px_40px_-12px_rgb(27_26_46/0.25)] sm:block">
        <p class="text-sm font-semibold">Thursday, 14 May</p>
        <p class="mt-0.5 text-[11px] text-muted">Any available · 45 min</p>
        <div class="mt-3 grid grid-cols-3 gap-1.5 font-mono text-[11px]">
          <span v-for="(t, i) in ['10:00','10:45','11:30','12:15','14:00','14:45','15:30','16:15','17:00']" :key="t"
            class="rounded-md py-1.5 text-center" :class="i === 4 ? 'bg-select text-white' : [2, 6].includes(i) ? 'bg-paper/60 text-muted line-through' : 'ring-1 ring-line'">{{ t }}</span>
        </div>
        <div class="mt-4 rounded-lg bg-ink py-2 text-center text-[12px] font-medium text-white">Book 14:00</div>
      </div>
    </div>

    <!-- Onboarding: checklist + progress -->
    <div v-else-if="kind === 'onboarding'" class="flex h-full items-center justify-center p-6">
      <div class="w-full max-w-[300px] rounded-xl bg-white p-5 shadow-[0_12px_40px_-12px_rgb(27_26_46/0.25)]">
        <div class="mb-1 h-1.5 w-full rounded-full bg-paper"><div class="h-full w-3/5 rounded-full bg-select" /></div>
        <p class="mb-4 font-mono text-[10px] text-muted">Step 3 of 5</p>
        <p class="mb-3 text-sm font-semibold">Have these ready</p>
        <ul class="space-y-2.5">
          <li v-for="(d, i) in ['Owner ID or passport', 'Business registration', 'Proof of address', 'Tax number']" :key="d" class="flex items-center gap-2.5 text-[13px]">
            <span class="grid size-4 place-items-center rounded-[4px] border" :class="i < 2 ? 'border-select bg-select text-white' : 'border-line'">
              <svg v-if="i < 2" viewBox="0 0 12 12" class="size-2.5"><path d="M2.5 6.5l2.2 2L9.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8" /></svg>
            </span>
            <span :class="i < 2 ? 'text-muted line-through decoration-line' : ''">{{ d }}</span>
          </li>
        </ul>
        <div class="mt-5 rounded-lg bg-ink py-2.5 text-center text-[13px] font-medium text-white">Continue</div>
      </div>
    </div>

    <!-- Calendar: doctor lanes -->
    <div v-else-if="kind === 'calendar'" class="flex h-full items-center justify-center p-6">
      <div class="w-full max-w-[360px] rounded-xl bg-white p-4 shadow-[0_12px_40px_-12px_rgb(27_26_46/0.25)]">
        <div class="mb-3 flex items-center justify-between text-[12px]"><span class="font-semibold">Monday, 9 AM–1 PM</span><span class="font-mono text-[10px] text-muted">3 doctors</span></div>
        <div class="grid grid-cols-[28px_1fr_1fr_1fr] gap-1.5 text-[10px]">
          <div class="space-y-[22px] pt-1 font-mono text-muted"><div>9</div><div>10</div><div>11</div><div>12</div></div>
          <div class="relative h-[150px] rounded-md bg-paper/60">
            <div class="absolute inset-x-1 top-1 h-9 rounded bg-select/15 p-1 text-select">A. Khan</div>
            <div class="absolute inset-x-1 top-[78px] h-12 rounded bg-select/15 p-1 text-select">R. Ali</div>
          </div>
          <div class="relative h-[150px] rounded-md bg-paper/60">
            <div class="absolute inset-x-1 top-8 h-10 rounded bg-ink/10 p-1">S. Noor</div>
            <div class="absolute inset-x-1 top-[96px] h-9 rounded border-[1.5px] border-dashed border-redline bg-redline/10 p-1 text-redline">Conflict</div>
          </div>
          <div class="relative h-[150px] rounded-md bg-paper/60">
            <div class="absolute inset-x-1 top-14 h-14 rounded bg-select p-1 text-white ring-2 ring-select/30">Moving…</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Design system: tokens + components -->
    <div v-else-if="kind === 'system'" class="grid h-full grid-cols-2 gap-3 p-6">
      <div class="rounded-xl bg-white p-4 shadow-[0_12px_40px_-12px_rgb(27_26_46/0.2)]">
        <p class="mb-3 font-mono text-[10px] text-muted">color / brand</p>
        <div class="grid grid-cols-4 gap-1.5">
          <span v-for="c in ['#1B1A2E','#3D3B5C','#6E6C85','#A9A7BC','#3D6BFF','#7B9BFF','#B8C9FF','#E3EAFF']" :key="c" class="aspect-square rounded-md" :style="{ background: c }" />
        </div>
        <p class="mb-2 mt-4 font-mono text-[10px] text-muted">radius</p>
        <div class="flex gap-2"><span class="size-6 rounded-sm border border-ink/40" /><span class="size-6 rounded-md border border-ink/40" /><span class="size-6 rounded-xl border border-ink/40" /><span class="size-6 rounded-full border border-ink/40" /></div>
      </div>
      <div class="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-[0_12px_40px_-12px_rgb(27_26_46/0.2)]">
        <p class="font-mono text-[10px] text-muted">button</p>
        <span class="rounded-lg bg-ink py-2 text-center text-[12px] font-medium text-white">Primary</span>
        <span class="rounded-lg border border-line py-2 text-center text-[12px] font-medium">Secondary</span>
        <span class="py-1 text-center text-[12px] font-medium text-select">Tertiary</span>
        <p class="mt-auto font-mono text-[10px] text-muted">input</p>
        <span class="rounded-lg border-[1.5px] border-select px-2 py-1.5 text-[12px] text-muted">Search components</span>
      </div>
    </div>

    <!-- Mobile: driver app -->
    <div v-else class="flex h-full items-end justify-center gap-4 px-6 pt-8">
      <div class="h-[92%] w-[170px] rounded-t-[26px] border-[6px] border-b-0 border-ink bg-white p-3">
        <div class="mx-auto mb-3 h-1 w-10 rounded-full bg-ink/20" />
        <p class="font-mono text-[9px] text-muted">STOP 7 OF 22</p>
        <p class="mt-1 text-[13px] font-semibold leading-tight">14 Mall Road, Gate 2</p>
        <div class="mt-3 h-16 rounded-lg bg-[repeating-linear-gradient(45deg,#ECEBF3_0_6px,#F8F8FC_6px_12px)]" />
        <div class="mt-3 rounded-xl bg-select py-3 text-center text-[13px] font-semibold text-white">Take photo</div>
        <div class="mt-2 rounded-xl border-2 border-ink py-3 text-center text-[13px] font-semibold">Report issue</div>
        <p class="mt-3 flex items-center gap-1.5 font-mono text-[9px] text-muted"><span class="size-1.5 rounded-full bg-amber-500" />2 waiting to sync</p>
      </div>
    </div>
  </div>
</template>
