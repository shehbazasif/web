<script setup lang="ts">
import { profile } from '~/data/site'
const { on, toggle } = useSpecs()
const nav = [
  { label: 'Work', to: '/#work' },
  { label: 'Process', to: '/#process' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]
function onKey(e: KeyboardEvent) {
  const t = e.target as HTMLElement
  if (t.closest('input, textarea, select, [contenteditable]')) return
  if (e.key.toLowerCase() === 's' && !e.metaKey && !e.ctrlKey && !e.altKey) toggle()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
    <div class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
      <NuxtLink to="/" class="flex items-center gap-2.5 font-medium">
        <span class="relative inline-block size-3.5 outline-[1.5px] outline outline-select" aria-hidden="true">
          <span class="absolute -left-[3px] -top-[3px] size-[5px] border border-select bg-white" />
          <span class="absolute -right-[3px] -bottom-[3px] size-[5px] border border-select bg-white" />
        </span>
        {{ profile.name }}
      </NuxtLink>

      <nav aria-label="Primary" class="hidden md:block">
        <ul class="flex items-center gap-7 text-sm text-muted">
          <li v-for="n in nav" :key="n.to">
            <NuxtLink :to="n.to" class="transition-colors hover:text-ink">{{ n.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        class="group flex items-center gap-2 rounded-full border border-line bg-sheet py-1 pl-1 pr-3 font-mono text-[11px] text-muted transition-colors hover:border-redline/50"
        :aria-pressed="on"
        @click="toggle"
      >
        <span class="relative h-4 w-7 rounded-full transition-colors" :class="on ? 'bg-redline' : 'bg-line'">
          <span class="absolute top-0.5 size-3 rounded-full bg-white shadow-sm transition-all" :class="on ? 'left-3.5' : 'left-0.5'" />
        </span>
        <span :class="on ? 'text-redline' : ''">Spec mode</span>
        <kbd class="hidden rounded border border-line px-1 text-[10px] sm:inline">S</kbd>
      </button>
    </div>
    <nav aria-label="Primary mobile" class="border-t border-line/70 md:hidden">
      <ul class="mx-auto flex max-w-6xl justify-between px-4 py-2 text-sm text-muted">
        <li v-for="n in nav" :key="n.to"><NuxtLink :to="n.to" class="hover:text-ink">{{ n.label }}</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>
