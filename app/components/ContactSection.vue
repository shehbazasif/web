<script setup lang="ts">
import { profile } from '~/data/site'
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const form = reactive({ name: '', email: '', message: '' })

async function submit(e: Event) {
  state.value = 'sending'
  const data = new FormData(e.target as HTMLFormElement)
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
    })
    if (!res.ok) throw new Error(String(res.status))
    state.value = 'sent'
    Object.assign(form, { name: '', email: '', message: '' })
  } catch {
    state.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="scroll-mt-20 bg-ink text-paper">
    <div class="mx-auto grid max-w-6xl gap-14 px-4 py-24 sm:px-8 md:grid-cols-[1.1fr_1fr] md:py-32">
      <div>
        <p class="eyebrow !text-paper/50">Contact</p>
        <h2 class="mt-5 text-[clamp(2.5rem,7vw,5.5rem)]">
          <span class="display-wide block">Got a</span>
          <span class="display-narrow block text-paper/70">messy flow?</span>
        </h2>
        <p class="mt-6 max-w-sm text-paper/70">{{ profile.available }}. I reply within two working days.</p>
        <a :href="`mailto:${profile.email}`" class="mt-8 inline-flex items-center gap-2 break-all border-b border-select pb-1 text-lg font-medium text-white hover:text-select">
          {{ profile.email }} <span aria-hidden="true">↗</span>
        </a>
        <p class="mt-4">
          <a :href="profile.phoneHref" class="font-mono text-sm text-paper/70 hover:text-white">{{ profile.phone }}</a>
          <span class="ml-2 text-sm text-paper/40">· {{ profile.location }}</span>
        </p>
      </div>

      <form name="contact" method="POST" data-netlify="true" netlify-honeypot="company" class="space-y-5" @submit.prevent="submit">
        <input type="hidden" name="form-name" value="contact">
        <p class="hidden"><label>Leave this empty <input name="company"></label></p>
        <div>
          <label for="c-name" class="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">Your name</label>
          <input id="c-name" v-model="form.name" name="name" required autocomplete="name" class="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-paper/30 focus:border-select focus:outline-none">
        </div>
        <div>
          <label for="c-email" class="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">Email</label>
          <input id="c-email" v-model="form.email" type="email" name="email" required autocomplete="email" class="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-select focus:outline-none">
        </div>
        <div>
          <label for="c-msg" class="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">What are you working on?</label>
          <textarea id="c-msg" v-model="form.message" name="message" rows="5" required class="w-full resize-y rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-select focus:outline-none" />
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <button type="submit" :disabled="state === 'sending'" class="rounded-lg bg-select px-6 py-3 font-medium text-white transition hover:bg-[#2F5BEF] disabled:opacity-60">
            {{ state === 'sending' ? 'Sending…' : 'Send message' }}
          </button>
          <p role="status" class="text-sm" :class="state === 'error' ? 'text-redline' : 'text-paper/70'">
            <template v-if="state === 'sent'">Message sent. I'll reply within two working days.</template>
            <template v-else-if="state === 'error'">The message didn't send. Email me directly at {{ profile.email }}.</template>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>
