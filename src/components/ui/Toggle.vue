<template>
  <button
    type="button"
    :class="[
      'relative inline-flex items-center rounded-full transition-all duration-200',
      sizeClasses.track,
      modelValue ? 'bg-primary' : 'bg-surface-3'
    ]"
    :aria-pressed="modelValue"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      :class="[
        'inline-block transform rounded-full bg-white shadow-lg transition-all duration-200',
        sizeClasses.thumb,
        modelValue ? sizeClasses.translateOn : 'translate-x-1'
      ]"
    />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

defineEmits(['update:modelValue'])

const sizeClasses = computed(() => {
  const sizes = {
    sm: {
      track: 'h-5 w-9',
      thumb: 'h-3 w-3',
      translateOn: 'translate-x-5'
    },
    md: {
      track: 'h-6 w-11',
      thumb: 'h-4 w-4',
      translateOn: 'translate-x-6'
    },
    lg: {
      track: 'h-7 w-14',
      thumb: 'h-5 w-5',
      translateOn: 'translate-x-8'
    }
  }
  return sizes[props.size]
})
</script>
