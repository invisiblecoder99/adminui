<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
      <p class="text-text-secondary">Welcome back! Here's what's happening today.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Revenue"
        value="45.2K"
        :icon="DollarSign"
        :trend="12"
        variant="primary"
      />
      <StatsCard
        title="Total Users"
        value="2,845"
        :icon="Users"
        :trend="8"
        variant="secondary"
      />
      <StatsCard
        title="Active Orders"
        value="1,234"
        :icon="ShoppingCart"
        :trend="-3"
        variant="accent"
      />
      <StatsCard
        title="Conversion Rate"
        value="3.2%"
        :icon="TrendingUp"
        :trend="5"
        variant="success"
      />
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="lg:col-span-2">
        <Charts title="Revenue Overview" type="line" />
      </div>
      <div>
        <Charts title="Traffic Sources" type="doughnut" />
      </div>
    </div>

    <!-- Activity and Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <ActivityTimeline />
      </div>
      
      <!-- Quick Actions -->
      <div>
        <Card>
          <h3 class="text-lg font-semibold text-text-primary mb-6">Quick Actions</h3>
          <div class="space-y-3">
            <button
              v-for="action in quickActions"
              :key="action.label"
              class="w-full flex items-center gap-3 p-4 bg-surface-2/50 border border-surface-3 rounded-lg hover:bg-surface-2 hover:border-surface-2 transition-smooth group"
            >
              <div :class="['p-2 rounded-lg', action.color]">
                <component :is="action.icon" class="w-5 h-5 text-white stroke-[1.5]" />
              </div>
              <div class="flex-1 text-left">
                <p class="text-text-primary font-medium group-hover:text-primary transition-smooth">
                  {{ action.label }}
                </p>
                <p class="text-text-muted text-sm">{{ action.description }}</p>
              </div>
              <ChevronRight class="w-5 h-5 text-text-muted group-hover:text-primary transition-smooth" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DollarSign, Users, ShoppingCart, TrendingUp, UserPlus, FileText, Package, Settings, ChevronRight } from 'lucide-vue-next'
import StatsCard from '@/components/dashboard/StatsCard.vue'
import Charts from '@/components/dashboard/Charts.vue'
import ActivityTimeline from '@/components/dashboard/ActivityTimeline.vue'
import Card from '@/components/ui/Card.vue'

const quickActions = [
  {
    label: 'Add New User',
    description: 'Create user account',
    icon: UserPlus,
    color: 'bg-primary/20'
  },
  {
    label: 'Generate Report',
    description: 'Export analytics',
    icon: FileText,
    color: 'bg-secondary/20'
  },
  {
    label: 'Manage Products',
    description: 'Update inventory',
    icon: Package,
    color: 'bg-pink-500/20'
  },
  {
    label: 'System Settings',
    description: 'Configure system',
    icon: Settings,
    color: 'bg-success/20'
  }
]
</script>
