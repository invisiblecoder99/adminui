<template>
  <div>
    <Card>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-text-primary">{{ title }}</h3>
        <div class="flex gap-2">
          <button
            v-for="period in periods"
            :key="period"
            @click="selectedPeriod = period"
            :class="[
              'px-3 py-1 text-sm rounded-lg transition-smooth',
              selectedPeriod === period
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
            ]"
          >
            {{ period }}
          </button>
        </div>
      </div>
      <div class="h-80">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import Card from '@/components/ui/Card.vue'

Chart.register(...registerables)

const props = defineProps({
  title: {
    type: String,
    default: 'Analytics'
  },
  type: {
    type: String,
    default: 'line',
    validator: (value) => ['line', 'bar', 'doughnut'].includes(value)
  }
})

const chartCanvas = ref(null)
const selectedPeriod = ref('Week')
const periods = ['Day', 'Week', 'Month', 'Year']
let chartInstance = null

const chartData = {
  line: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      },
      {
        label: 'Orders',
        data: [8000, 12000, 10000, 18000, 16000, 22000, 20000],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }
    ]
  },
  bar: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 95],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          '#6366f1',
          '#8b5cf6',
          '#ec4899',
          '#22c55e',
          '#6366f1',
          '#8b5cf6',
        ],
        borderWidth: 1
      }
    ]
  },
  doughnut: {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          '#6366f1',
          '#8b5cf6',
          '#ec4899',
        ],
        borderWidth: 2
      }
    ]
  }
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: props.type !== 'doughnut',
      labels: {
        color: '#a1a1aa',
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(24, 24, 27, 0.95)',
      titleColor: '#fafafa',
      bodyColor: '#a1a1aa',
      borderColor: '#3f3f46',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8
    }
  },
  scales: props.type === 'doughnut' ? {} : {
    x: {
      grid: {
        display: false,
        color: '#27272a'
      },
      ticks: {
        color: '#71717a'
      }
    },
    y: {
      grid: {
        color: '#27272a',
        drawBorder: false
      },
      ticks: {
        color: '#71717a'
      }
    }
  }
}

const createChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }
  
  chartInstance = new Chart(chartCanvas.value, {
    type: props.type,
    data: chartData[props.type],
    options: chartOptions
  })
}

onMounted(() => {
  createChart()
})

watch(() => props.type, () => {
  createChart()
})
</script>
