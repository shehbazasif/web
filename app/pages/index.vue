<script setup lang="ts">
import { profile, projects, process, skills, experience } from '~/data/site'
</script>

<template>
  <div>
    <!-- HERO: the headline is a selected layer on a canvas -->
    <section class="canvas-dots relative overflow-hidden">
      <div class="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-8 md:pb-32 md:pt-24">
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p class="eyebrow">{{ profile.role }} · {{ profile.location }}</p>
          <p class="flex items-center gap-2 rounded-full bg-sheet px-2.5 py-1 text-xs text-muted ring-1 ring-line">
            <span class="relative flex size-2"><span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span class="relative inline-flex size-2 rounded-full bg-emerald-500" /></span>
            Available from January
          </p>
        </div>

        <div class="relative mt-12 inline-block md:mt-16">
          <SelectionFrame label="Headline" class="hero-in">
            <h1 class="px-3 py-2 text-[clamp(2.75rem,11vw,8.5rem)] sm:px-5 sm:py-3">
              <span class="hero-word display-wide block">Interfaces</span>
              <span class="hero-word display-narrow block pb-[0.06em] text-muted">that get out</span>
              <span class="hero-word display-wide block whitespace-nowrap">of the way.</span>
            </h1>
          </SelectionFrame>

          <!-- cursor + name tag, like a collaborator in the file -->
          <div class="cursor-in pointer-events-none absolute -bottom-12 right-[8%] flex items-start sm:-bottom-10" aria-hidden="true">
            <svg width="18" height="20" viewBox="0 0 18 20" class="drop-shadow-sm"><path d="M1 1l15 7.5-6.5 1.8L6.7 18z" fill="#E5337A" stroke="#fff" stroke-width="1.5" stroke-linejoin="round" /></svg>
            <span class="ml-0.5 mt-4 rounded-md rounded-tl-none bg-redline px-2 py-1 text-xs font-medium text-white">{{ profile.first }}</span>
          </div>

          <div class="spec absolute left-0 top-full mt-4" aria-hidden="true">
            <div class="flex flex-wrap gap-1">
              <span class="spec-tag">Sora 700 · −4.5%</span>
              <span class="spec-tag">Sora 300 · −4.5%</span>
              <span class="spec-tag">line-height 0.98</span>
            </div>
          </div>
        </div>

        <div class="mt-20 grid gap-8 md:mt-24 md:grid-cols-[1fr_auto] md:items-end">
          <p class="spec-outline max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl">{{ profile.intro }}</p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/#work" class="rounded-lg bg-ink px-5 py-3 font-medium text-white transition hover:bg-ink/85">See selected work</NuxtLink>
            <a :href="`mailto:${profile.email}`" class="rounded-lg border border-ink/20 bg-sheet px-5 py-3 font-medium transition hover:border-ink/50">Email me</a>
          </div>
        </div>
      </div>
    </section>

    <SpecGap :px="96" />

    <!-- WORK -->
    <section id="work" class="scroll-mt-20">
      <div class="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <div class="mb-14 flex flex-wrap items-end justify-between gap-4">
          <h2 class="text-[clamp(2.25rem,5vw,3.75rem)]"><span class="display-wide">Selected</span> <span class="display-narrow text-muted">work</span></h2>
          <p class="max-w-xs text-sm text-muted">Four projects from the last three years. Hover a frame to select it.</p>
        </div>

        <ul class="grid gap-x-8 gap-y-16 md:grid-cols-2">
          <li v-for="p in projects" :key="p.slug">
            <NuxtLink :to="`/work/${p.slug}`" class="group block focus:outline-none">
              <p class="mb-2.5 flex items-center gap-1.5 font-mono text-[11px] text-muted transition-colors group-hover:text-select group-focus-visible:text-select">
                <svg viewBox="0 0 12 12" class="size-3" aria-hidden="true"><path d="M3 0v12M9 0v12M0 3h12M0 9h12" stroke="currentColor" fill="none" /></svg>
                {{ p.client }} / {{ p.platform }}
              </p>
              <SelectionFrame :always="false">
                <div class="spec-outline aspect-[4/3] bg-sheet ring-1 ring-line transition-colors group-hover:bg-white">
                  <ProjectMock :kind="p.mock" />
                </div>
              </SelectionFrame>
              <div class="mt-7 grid gap-3">
                <h3 class="text-xl font-semibold leading-snug tracking-tight group-hover:underline group-hover:decoration-select group-hover:decoration-2 group-hover:underline-offset-4">{{ p.title }}</h3>
                <p class="text-muted">{{ p.summary }}</p>
                <dl class="mt-2 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-4">
                  <div v-for="o in p.outcome" :key="o.label">
                    <dt class="sr-only">{{ o.label }}</dt>
                    <dd><span class="font-display text-lg font-semibold tracking-tight">{{ o.value }}</span> <span class="text-sm text-muted">{{ o.label }}</span></dd>
                  </div>
                </dl>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <SpecGap :px="96" />

    <!-- PROCESS: a real sequence, so it's numbered -->
    <section id="process" class="scroll-mt-20 border-y border-line bg-sheet">
      <div class="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <div class="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 class="text-[clamp(2.25rem,5vw,3.75rem)]"><span class="display-wide block">How I</span><span class="display-narrow block text-muted">work</span></h2>
            <p class="mt-5 max-w-xs text-muted">The same six steps, whether it's a single feature or a whole product. Steps 3–5 usually loop.</p>
          </div>
          <ol class="grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="(s, i) in process" :key="s.step" class="group bg-sheet p-6 transition-colors hover:bg-white">
              <span class="font-mono text-xs text-select">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="mt-6 font-display text-2xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-select">{{ s.step }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-muted">{{ s.body }}</p>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <SpecGap :px="96" />

    <!-- ABOUT -->
    <section id="about" class="scroll-mt-20">
      <div class="mx-auto grid max-w-6xl gap-16 px-4 py-24 sm:px-8 md:grid-cols-2">
        <div>
          <h2 class="text-[clamp(2.25rem,5vw,3.75rem)]"><span class="display-wide">About</span></h2>
          <div class="mt-8 space-y-5 text-lg leading-relaxed text-ink/80">
            <p>I'm {{ profile.first }}, a product designer who started out building websites and never stopped caring how things get made. I've spent the last six years on fintech, health and logistics products.</p>
            <p>I'm happiest in the space between research and pixels: turning interview notes into a flow, then a prototype that settles an argument faster than a meeting would.</p>
          </div>
          <h3 class="eyebrow mt-14">Experience</h3>
          <ul class="mt-4 divide-y divide-line border-y border-line">
            <li v-for="x in experience" :key="x.years" class="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 text-sm sm:grid-cols-[9rem_1fr_auto]">
              <span class="font-mono text-muted">{{ x.years }}</span>
              <span class="font-medium">{{ x.role }}</span>
              <span class="col-start-2 text-muted sm:col-start-auto">{{ x.org }}</span>
            </li>
          </ul>
        </div>

        <div class="grid content-start gap-8 sm:grid-cols-2">
          <div v-for="(items, group) in skills" :key="group" class="rounded-xl bg-sheet p-6 ring-1 ring-line">
            <h3 class="eyebrow">{{ group }}</h3>
            <ul class="mt-4 space-y-2">
              <li v-for="it in items" :key="it" class="text-[15px]">{{ it }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <ContactSection />
  </div>
</template>

<style scoped>
.hero-word { transition: color .3s ease; }
.hero-word:hover { color: var(--color-select); }

@media (prefers-reduced-motion: no-preference) {
  .hero-in { animation: frame-in .9s cubic-bezier(.2,.8,.2,1) both; }
  .hero-in .hero-word { animation: word-in .9s cubic-bezier(.2,.8,.2,1) both; }
  .hero-in .hero-word:nth-child(2) { animation-delay: .08s; }
  .hero-in .hero-word:nth-child(3) { animation-delay: .16s; }
  .cursor-in { animation: cursor-in 1.4s cubic-bezier(.2,.8,.2,1) .5s both; }
}
@keyframes frame-in { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 -20% -40% -20%); } }
@keyframes word-in { from { transform: translateY(.35em); opacity: 0; } }
@keyframes cursor-in { from { transform: translate(-260px, -120px); opacity: 0; } 40% { opacity: 1; } }
</style>
