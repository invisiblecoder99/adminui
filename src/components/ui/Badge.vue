<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
      variantClasses
    ]"
  >
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'success', 'warning', 'error', 'info'].includes(value)
  }
})

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-gray-500/20 text-gray-300',
    primary: 'bg-primary/20 text-primary-light',
    success: 'bg-emerald-500/20 text-emerald-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    error: 'bg-rose-500/20 text-rose-400',
    info: 'bg-secondary/20 text-secondary-light'
  }
  return variants[props.variant]
})
</script>
