<template>
  <button
    type="button"
    :class="[
      'relative inline-flex h-6 w-11 items-center rounded-full transition-smooth',
      modelValue ? 'bg-primary glow-primary' : 'bg-gray-600'
    ]"
    :aria-pressed="modelValue"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      :class="[
        'inline-block h-4 w-4 transform rounded-full bg-white transition-smooth',
        modelValue ? 'translate-x-6' : 'translate-x-1'
      ]"
    />
  </button>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>
