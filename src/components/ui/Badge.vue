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
    default: 'neutral',
    validator: (value) => ['neutral', 'primary', 'success', 'warning', 'error', 'info', 'premium'].includes(value)
  }
})

const variantClasses = computed(() => {
  const variants = {
    neutral: 'bg-surface-3/50 text-text-secondary',
    primary: 'bg-primary/10 text-primary-light',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    info: 'bg-info/10 text-info',
    premium: 'bg-gradient-to-r from-primary via-secondary to-pink-500 text-white'
  }
  return variants[props.variant]
})
</script>
