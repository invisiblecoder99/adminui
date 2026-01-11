<template>
  <Card>
    <!-- Header with Search and Filters -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div class="flex-1 max-w-md">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 bg-dark-elevated border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
        </div>
      </div>
      <div class="flex gap-2">
        <button class="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-dark-elevated transition-smooth text-gray-300 hover:text-white">
          <Filter class="w-4 h-4" />
          <span class="text-sm">Filter</span>
        </button>
        <slot name="header-actions" />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-dark-border">
            <th
              v-if="selectable"
              class="text-left py-3 px-4"
            >
              <input
                type="checkbox"
                v-model="selectAll"
                @change="toggleSelectAll"
                class="w-4 h-4 rounded border-gray-600 bg-dark-elevated text-primary focus:ring-primary"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              class="text-left py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
            <th v-if="$slots.actions" class="text-right py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in filteredData"
            :key="index"
            class="border-b border-dark-border/50 hover:bg-dark-elevated transition-smooth group"
          >
            <td v-if="selectable" class="py-4 px-4">
              <input
                type="checkbox"
                v-model="selectedRows"
                :value="row"
                class="w-4 h-4 rounded border-gray-600 bg-dark-elevated text-primary focus:ring-primary"
              />
            </td>
            <td
              v-for="column in columns"
              :key="column.key"
              class="py-4 px-4 text-sm text-gray-300"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
            <td v-if="$slots.actions" class="py-4 px-4 text-right">
              <slot name="actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-6 pt-6 border-t border-dark-border">
      <p class="text-sm text-gray-400">
        Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredData.length) }} of {{ filteredData.length }} results
      </p>
      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-2 glass rounded-lg hover:bg-dark-elevated transition-smooth text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-2 rounded-lg transition-smooth text-sm',
            currentPage === page
              ? 'bg-primary text-white'
              : 'glass text-gray-300 hover:bg-dark-elevated hover:text-white'
          ]"
        >
          {{ page }}
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 glass rounded-lg hover:bg-dark-elevated transition-smooth text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  selectable: {
    type: Boolean,
    default: false
  },
  perPage: {
    type: Number,
    default: 10
  }
})

const searchQuery = ref('')
const currentPage = ref(1)
const selectedRows = ref([])
const selectAll = ref(false)

const filteredData = computed(() => {
  if (!searchQuery.value) return props.data
  
  return props.data.filter(row => {
    return Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / props.perPage)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * props.perPage
})

const endIndex = computed(() => {
  return currentPage.value * props.perPage
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedRows.value = [...filteredData.value]
  } else {
    selectedRows.value = []
  }
}
</script>
