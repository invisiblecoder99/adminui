<template>
  <div class="relative">
    <div class="relative">
      <div v-if="$slots.icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <slot name="icon" />
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full rounded-lg bg-surface-1 border transition-smooth',
          'focus:outline-none focus:ring-2 focus:ring-primary/20',
          'shadow-inner',
          error ? 'border-error focus:border-error' : 'border-surface-3 focus:border-primary',
          $slots.icon ? 'pl-10 pr-4 py-3' : 'px-4 py-3',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          'text-text-primary placeholder-text-muted',
          hasValue || isFocused ? 'pt-6 pb-2' : ''
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <label
        v-if="label"
        :for="id"
        :class="[
          'absolute left-3 transition-smooth pointer-events-none',
          $slots.icon ? 'left-10' : 'left-3',
          hasValue || isFocused
            ? 'top-1.5 text-xs text-text-secondary'
            : 'top-3 text-sm text-text-muted'
        ]"
      >
        {{ label }}
      </label>
    </div>
    <p v-if="error" class="mt-1 text-sm text-error">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-text-muted">{{ hint }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  error: String,
  hint: String,
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])

const isFocused = ref(false)
const hasValue = computed(() => props.modelValue && props.modelValue.toString().length > 0)
</script>
