<template>
  <div class="relative">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-300 mb-2"
    >
      {{ label }}
    </label>
    <div class="relative">
      <div v-if="$slots.icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="icon" />
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full rounded-lg bg-dark-card border transition-smooth',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg',
          error ? 'border-red-500 focus:ring-red-500' : 'border-dark-border focus:border-primary focus:ring-primary',
          $slots.icon ? 'pl-10 pr-4 py-3' : 'px-4 py-3',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          'text-white placeholder-gray-500'
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup>
defineProps({
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
</script>
