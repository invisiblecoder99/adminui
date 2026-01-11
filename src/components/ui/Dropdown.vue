<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="isOpen = !isOpen"
      :class="[
        'flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth',
        'hover:bg-surface-2 text-text-secondary hover:text-text-primary'
      ]"
    >
      <slot name="trigger">
        <span>Options</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </slot>
    </button>
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        :class="[
          'absolute mt-2 bg-surface-1 backdrop-blur-xl border border-surface-3 rounded-lg shadow-xl overflow-hidden',
          'min-w-[200px] z-50',
          position === 'left' ? 'left-0' : 'right-0'
        ]"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  position: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  }
})

const isOpen = ref(false)
const dropdownRef = ref(null)

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
