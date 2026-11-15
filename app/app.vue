<script setup lang="ts">
const { on } = useSpecs()
useHead({ htmlAttrs: { class: computed(() => (on.value ? 'specs' : '')) } })
</script>
<template>
  <div class="min-h-dvh">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
    <SiteHeader />
    <main id="main"><NuxtPage /></main>
    <SiteFooter />
  </div>
</template>
