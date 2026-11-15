<script setup lang="ts">
// @ts-ignore plain JS module shared with the static preview
import { renderBooking, mountBooking, autoplayBooking, initialState } from '~/lib/booking-demo.js'
const el = ref<HTMLElement | null>(null)
const html = renderBooking(initialState())
onMounted(() => autoplayBooking(el.value, mountBooking(el.value)))
</script>
<template>
  <div class="flex h-full w-full items-center justify-center p-4 sm:p-8">
    <div
      ref="el"
      data-booking-demo
      class="relative w-full"
    >
      <p class="sr-only">Animated demo: a customer picks a service, a staff member, a day and a time, enters their name and confirms the booking.</p>
      <div data-stage v-html="html" />
    </div>
  </div>
</template>
