<script setup lang="ts">
// @ts-ignore plain JS module shared with the static preview
import { renderDemo, mountDemo, demoCaption } from '~/lib/motion-demos.js'
const props = defineProps<{ kind: string }>()
const el = ref<HTMLElement | null>(null)
const html = renderDemo(props.kind)
onMounted(() => mountDemo(el.value))
</script>
<template>
  <div class="flex h-full w-full items-center justify-center overflow-hidden px-4 pb-4 pt-8 sm:px-8 sm:pt-10">
    <div ref="el" :data-motion-demo="kind" class="relative w-full">
      <p class="sr-only">Animated demo. {{ demoCaption(kind) }}</p>
      <div data-stage v-html="html" />
    </div>
  </div>
</template>
