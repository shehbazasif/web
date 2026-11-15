<script setup lang="ts">
import type { Mock } from '~/data/site'
defineProps<{ kind: Mock }>()
</script>
<template>
  <MotionDemo :kind="kind" />
</template>
