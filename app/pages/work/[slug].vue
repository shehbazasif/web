<script setup lang="ts">
import { projects, profile } from '~/data/site'
const route = useRoute()
const i = projects.findIndex(p => p.slug === route.params.slug)
if (i < 0) throw createError({ statusCode: 404, statusMessage: 'Case study not found', fatal: true })
const p = projects[i]!
const next = projects[(i + 1) % projects.length]!
useSeoMeta({ title: `${p.client}: ${p.title} — ${profile.name}`, description: p.summary })
</script>

<template>
  <article>
    <header class="canvas-dots">
      <div class="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-8 md:pt-16">
        <NuxtLink to="/#work" class="font-mono text-xs text-muted hover:text-ink">← All work</NuxtLink>
        <p class="eyebrow mt-10">{{ p.client }} · {{ p.year }}</p>
        <h1 class="mt-4 max-w-4xl font-display text-[clamp(2.25rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-balance">{{ p.title }}</h1>
        <dl class="mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-line pt-6 text-sm sm:grid-cols-4">
          <div><dt class="eyebrow">Role</dt><dd class="mt-1.5">{{ p.role }}</dd></div>
          <div><dt class="eyebrow">Platform</dt><dd class="mt-1.5">{{ p.platform }}</dd></div>
          <div v-for="o in p.outcome" :key="o.label"><dt class="eyebrow">{{ o.label }}</dt><dd class="mt-1.5 font-display text-lg font-bold">{{ o.value }}</dd></div>
        </dl>
      </div>
    </header>

    <div class="mx-auto max-w-6xl px-4 sm:px-8">
      <p v-if="p.mock === 'booking'" class="mb-8 text-sm text-muted">This is clickable. Pick a service, a day and a time, then book.</p>
      <SelectionFrame :label="`${p.client} / Final`">
        <div class="w-full bg-sheet ring-1 ring-line" :class="p.mock === 'booking' ? 'md:min-h-[480px]' : 'h-[340px] sm:h-auto sm:aspect-[16/9]'"><ProjectMock :kind="p.mock" /></div>
      </SelectionFrame>
    </div>

    <div class="mx-auto grid max-w-6xl gap-16 px-4 py-24 sm:px-8 md:grid-cols-[1fr_2fr]">
      <h2 class="eyebrow">The problem</h2>
      <p class="text-xl leading-relaxed md:text-2xl">{{ p.problem }}</p>

      <h2 class="eyebrow">What I did</h2>
      <ol class="space-y-10">
        <li v-for="(a, n) in p.approach" :key="a.title" class="grid grid-cols-[2.5rem_1fr]">
          <span class="font-mono text-xs text-select pt-1.5">{{ String(n + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="text-lg font-semibold">{{ a.title }}</h3>
            <p class="mt-2 leading-relaxed text-muted">{{ a.body }}</p>
          </div>
        </li>
      </ol>

      <h2 class="eyebrow">What I learned</h2>
      <blockquote class="border-l-2 border-redline pl-6 font-display text-2xl font-light leading-snug tracking-[-0.02em] md:text-3xl">{{ p.learned }}</blockquote>
    </div>

    <NuxtLink :to="`/work/${next.slug}`" class="group block border-t border-line">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-12 sm:px-8">
        <div>
          <p class="eyebrow">Next case study</p>
          <p class="mt-2 text-xl font-semibold group-hover:text-select md:text-2xl">{{ next.client }}: {{ next.title }}</p>
        </div>
        <span class="text-3xl transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
      </div>
    </NuxtLink>
  </article>
</template>
