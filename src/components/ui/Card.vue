<template>
  <div
    :class="[
      'rounded-2xl p-6 transition-smooth',
      'bg-surface-1/50 backdrop-blur-xl border border-surface-3/50',
      'shadow-xl shadow-black/20',
      hover ? 'card-hover cursor-pointer' : '',
      glow ? 'glow-primary' : ''
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  hover: {
    type: Boolean,
    default: false
  },
  glow: {
    type: Boolean,
    default: false
  }
})
</script>
