<template>
  <Card :hover="true" class="relative overflow-hidden">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <p class="text-text-secondary text-sm font-medium mb-2">{{ title }}</p>
        <div class="flex items-baseline gap-2 mb-3">
          <h3 class="text-3xl font-bold text-text-primary">{{ animatedValue }}</h3>
        </div>
        <div
          v-if="trend"
          :class="[
            'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
            trendColor
          ]"
        >
          <component :is="trendIcon" class="w-3 h-3 stroke-[2]" />
          <span>{{ Math.abs(trend) }}% from last month</span>
        </div>
      </div>
      <div :class="['p-3 rounded-full', iconBgColor]">
        <component :is="icon" :class="['w-6 h-6 stroke-[1.5]', iconColor]" />
      </div>
    </div>
  </Card>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: Object,
    required: true
  },
  trend: {
    type: Number,
    default: null
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'accent', 'success'].includes(value)
  }
})

const animatedValue = ref(0)

const trendIcon = computed(() => {
  return props.trend >= 0 ? TrendingUp : TrendingDown
})

const trendColor = computed(() => {
  return props.trend >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
})

const iconBgColor = computed(() => {
  const colors = {
    primary: 'bg-primary/10',
    secondary: 'bg-secondary/10',
    accent: 'bg-pink-500/10',
    success: 'bg-success/10'
  }
  return colors[props.variant]
})

const iconColor = computed(() => {
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-pink-500',
    success: 'text-success'
  }
  return colors[props.variant]
})

// Animate value counting up
const animateValue = () => {
  const numericValue = typeof props.value === 'number' ? props.value : parseFloat(props.value.replace(/[^0-9.]/g, ''))
  
  if (isNaN(numericValue)) {
    animatedValue.value = props.value
    return
  }
  
  const duration = 1000
  const steps = 30
  const increment = numericValue / steps
  let current = 0
  
  const timer = setInterval(() => {
    current += increment
    if (current >= numericValue) {
      current = numericValue
      clearInterval(timer)
    }
    
    // Format back to original format
    if (typeof props.value === 'string' && props.value.includes('K')) {
      animatedValue.value = '$' + (current / 1000).toFixed(1) + 'K'
    } else if (typeof props.value === 'string' && props.value.includes('$')) {
      animatedValue.value = '$' + Math.round(current).toLocaleString()
    } else if (typeof props.value === 'string' && props.value.includes('%')) {
      animatedValue.value = current.toFixed(1) + '%'
    } else {
      animatedValue.value = Math.round(current).toLocaleString()
    }
  }, duration / steps)
}

onMounted(() => {
  animateValue()
})

watch(() => props.value, () => {
  animateValue()
})
</script>
