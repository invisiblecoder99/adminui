<template>
  <div
    :class="[
      'glass rounded-xl p-6 transition-smooth',
      hover ? 'hover:border-primary/50 hover:shadow-lg' : '',
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
