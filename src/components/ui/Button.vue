<template>
  <button
    :class="[
      'font-medium transition-smooth rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base',
      variantClasses,
      sizeClasses,
      { 'opacity-50 cursor-not-allowed': disabled, 'btn-hover': !disabled && variant !== 'ghost' }
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
    validator: (value) => ['primary', 'secondary', 'ghost', 'danger', 'icon'].includes(value)
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
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 focus:ring-primary/20',
    secondary: 'bg-surface-2 text-text-primary border border-surface-3 hover:bg-surface-3 focus:ring-primary/20',
    ghost: 'text-text-secondary hover:bg-surface-2 hover:text-text-primary focus:ring-primary/20',
    danger: 'bg-error/10 text-error hover:bg-error/20 focus:ring-error/20',
    icon: 'rounded-full bg-surface-2 text-text-secondary hover:bg-surface-3 hover:text-text-primary p-2 focus:ring-primary/20'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  if (props.variant === 'icon') {
    const iconSizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12'
    }
    return iconSizes[props.size]
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  }
  return sizes[props.size]
})
</script>
