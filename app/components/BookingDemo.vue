<script setup lang="ts">
// @ts-ignore plain JS module shared with the static preview
import { renderBooking, mountBooking, initialState } from '~/lib/booking-demo.js'
const el = ref<HTMLElement | null>(null)
const html = renderBooking(initialState())
onMounted(() => mountBooking(el.value))
</script>
<template>
  <div class="flex h-full w-full items-center justify-center p-4 sm:p-8">
    <div ref="el" data-booking-demo class="w-full" v-html="html" />
  </div>
</template>
