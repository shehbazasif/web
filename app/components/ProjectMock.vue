<script setup lang="ts">
import type { Mock } from '~/data/site'
defineProps<{ kind: Mock; trigger?: 'hover' | 'auto' }>()
</script>
<template>
  <MotionDemo :kind="kind" :trigger="trigger" />
</template>
