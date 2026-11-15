<script setup lang="ts">
// A Figma-style selection box: outline, 8 handles, live W × H readout.
const props = withDefaults(defineProps<{ label?: string; always?: boolean }>(), { always: true })
const el = ref<HTMLElement | null>(null)
const size = reactive({ w: 0, h: 0 })
let ro: ResizeObserver | undefined
onMounted(() => {
  if (!el.value) return
  ro = new ResizeObserver(([e]) => {
    size.w = Math.round(e.contentRect.width)
    size.h = Math.round(e.contentRect.height)
  })
  ro.observe(el.value)
})
onBeforeUnmount(() => ro?.disconnect())
const handles = ['-left-[5px] -top-[5px]', 'left-1/2 -translate-x-1/2 -top-[5px]', '-right-[5px] -top-[5px]',
  '-left-[5px] top-1/2 -translate-y-1/2', '-right-[5px] top-1/2 -translate-y-1/2',
  '-left-[5px] -bottom-[5px]', 'left-1/2 -translate-x-1/2 -bottom-[5px]', '-right-[5px] -bottom-[5px]']
</script>

<template>
  <div ref="el" class="group/sel relative">
    <div
      class="pointer-events-none absolute inset-0 outline-[1.5px] outline-select transition-opacity duration-200"
      :class="props.always ? 'outline' : 'opacity-0 outline group-hover/sel:opacity-100 group-focus-within/sel:opacity-100'"
      aria-hidden="true"
    >
      <span v-for="(h, i) in handles" :key="i" :data-h="i" class="sel-h" :class="h" />
      <span
        v-if="size.w"
        class="absolute left-1/2 top-full mt-2.5 -translate-x-1/2 rounded-[3px] bg-select px-1.5 py-1 font-mono text-[10px] leading-none whitespace-nowrap text-white"
      >{{ size.w }} × {{ size.h }}</span>
      <span v-if="label" class="absolute -top-6 left-0 font-mono text-[11px] text-select">{{ label }}</span>
    </div>
    <slot />
  </div>
</template>
