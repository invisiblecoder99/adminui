<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="show"
        :class="[
          'fixed top-4 right-4 z-50 glass rounded-lg shadow-2xl p-4',
          'flex items-center gap-3 min-w-[300px] max-w-md',
          typeClasses
        ]"
      >
        <div class="flex-shrink-0">
          <component :is="icon" class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <p class="font-medium text-white">{{ message }}</p>
        </div>
        <button
          @click="close"
          class="flex-shrink-0 text-gray-400 hover:text-white transition-smooth"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['update:modelValue'])

const show = ref(props.modelValue)
let timeout = null

const icon = computed(() => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  }
  return icons[props.type]
})

const typeClasses = computed(() => {
  const classes = {
    success: 'border-l-4 border-emerald-500',
    error: 'border-l-4 border-rose-500',
    warning: 'border-l-4 border-yellow-500',
    info: 'border-l-4 border-secondary'
  }
  return classes[props.type]
})

const close = () => {
  show.value = false
  emit('update:modelValue', false)
  if (timeout) clearTimeout(timeout)
}

watch(() => props.modelValue, (newVal) => {
  show.value = newVal
  if (newVal && props.duration > 0) {
    timeout = setTimeout(close, props.duration)
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
