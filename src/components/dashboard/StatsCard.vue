<template>
  <Card :glow="true" :hover="true" class="relative overflow-hidden">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <p class="text-gray-400 text-sm font-medium mb-1">{{ title }}</p>
        <div class="flex items-baseline gap-2">
          <h3 class="text-3xl font-bold text-white">{{ animatedValue }}</h3>
          <div
            v-if="trend"
            :class="[
              'flex items-center gap-1 text-sm font-medium px-2 py-1 rounded',
              trendColor
            ]"
          >
            <component :is="trendIcon" class="w-3 h-3" />
            <span>{{ Math.abs(trend) }}%</span>
          </div>
        </div>
        <p class="text-gray-500 text-xs mt-2">{{ subtitle }}</p>
      </div>
      <div :class="['p-3 rounded-xl', iconBgColor]">
        <component :is="icon" :class="['w-6 h-6', iconColor]" />
      </div>
    </div>
    
    <!-- Gradient overlay -->
    <div :class="['absolute bottom-0 left-0 right-0 h-1 rounded-b-xl', gradientColor]"></div>
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
  return props.trend >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
})

const iconBgColor = computed(() => {
  const colors = {
    primary: 'bg-primary/20',
    secondary: 'bg-secondary/20',
    accent: 'bg-accent-pink/20',
    success: 'bg-emerald-500/20'
  }
  return colors[props.variant]
})

const iconColor = computed(() => {
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent-pink',
    success: 'text-emerald-500'
  }
  return colors[props.variant]
})

const gradientColor = computed(() => {
  const colors = {
    primary: 'bg-gradient-to-r from-primary to-primary-light',
    secondary: 'bg-gradient-to-r from-secondary to-secondary-light',
    accent: 'bg-gradient-to-r from-accent-pink to-accent-pink-light',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-400'
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
      animatedValue.value = (current / 1000).toFixed(1) + 'K'
    } else if (typeof props.value === 'string' && props.value.includes('$')) {
      animatedValue.value = '$' + Math.round(current).toLocaleString()
    } else if (typeof props.value === 'string' && props.value.includes('%')) {
      animatedValue.value = Math.round(current) + '%'
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
