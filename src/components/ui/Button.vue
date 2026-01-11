<template>
  <button
    :class="[
      'px-6 py-3 rounded-lg font-medium transition-smooth',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg',
      variantClasses,
      sizeClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'accent', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-primary hover:bg-primary-light text-white glow-primary focus:ring-primary',
    secondary: 'bg-secondary hover:bg-secondary-light text-white glow-secondary focus:ring-secondary',
    accent: 'bg-accent-pink hover:bg-accent-pink-light text-white glow-accent focus:ring-accent-pink',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-gray-300 hover:bg-dark-elevated focus:ring-gray-500'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  }
  return sizes[props.size]
})
</script>
