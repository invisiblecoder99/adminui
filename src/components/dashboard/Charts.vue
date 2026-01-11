<template>
  <div>
    <Card>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
        <div class="flex gap-2">
          <button
            v-for="period in periods"
            :key="period"
            @click="selectedPeriod = period"
            :class="[
              'px-3 py-1 text-sm rounded-lg transition-smooth',
              selectedPeriod === period
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white hover:bg-dark-elevated'
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
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Orders',
        data: [8000, 12000, 10000, 18000, 16000, 22000, 20000],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        fill: true,
        tension: 0.4
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
          'rgba(139, 92, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)',
        ],
        borderColor: [
          '#8b5cf6',
          '#06b6d4',
          '#ec4899',
          '#10b981',
          '#8b5cf6',
          '#06b6d4',
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
          'rgba(139, 92, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          '#8b5cf6',
          '#06b6d4',
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
        color: '#94a3b8',
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(18, 18, 26, 0.9)',
      titleColor: '#ffffff',
      bodyColor: '#94a3b8',
      borderColor: '#2a2a3e',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8
    }
  },
  scales: props.type === 'doughnut' ? {} : {
    x: {
      grid: {
        display: false,
        color: '#2a2a3e'
      },
      ticks: {
        color: '#64748b'
      }
    },
    y: {
      grid: {
        color: '#2a2a3e',
        drawBorder: false
      },
      ticks: {
        color: '#64748b'
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
