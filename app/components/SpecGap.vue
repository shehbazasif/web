<script setup lang="ts">
// Vertical redline showing the gap between two sections. Only visible in spec mode.
defineProps<{ px: number }>()
</script>
<template>
  <div class="spec pointer-events-none relative mx-auto max-w-6xl px-4 sm:px-8" aria-hidden="true">
    <div class="absolute left-4 sm:left-8 flex -translate-y-1/2 items-center gap-2" :style="{ height: px + 'px' }">
      <div class="relative h-full w-px bg-redline before:absolute before:-left-1 before:top-0 before:h-px before:w-[9px] before:bg-redline after:absolute after:-left-1 after:bottom-0 after:h-px after:w-[9px] after:bg-redline" />
      <span class="spec-tag">{{ px }}</span>
    </div>
  </div>
</template>
