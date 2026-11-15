<script setup lang="ts">
import { profile } from '~/data/site'
</script>
<template>
  <footer class="border-t border-line">
    <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p>© {{ new Date().getFullYear() }} {{ profile.name }}. Designed in Figma, built with Nuxt.</p>
      <ul class="flex flex-wrap gap-5">
        <li v-for="l in profile.links" :key="l.label"><a :href="l.href" target="_blank" rel="noopener" class="hover:text-ink">{{ l.label }}</a></li>
      </ul>
    </div>
  </footer>
</template>
