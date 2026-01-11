<template>
  <Card>
    <h3 class="text-lg font-semibold text-text-primary mb-6">Recent Activity</h3>
    <div class="space-y-6">
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="flex gap-4 relative"
      >
        <!-- Timeline line -->
        <div
          v-if="index < activities.length - 1"
          class="absolute left-5 top-12 bottom-0 w-px bg-surface-3"
        ></div>
        
        <!-- Avatar -->
        <div
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10',
            activity.color
          ]"
        >
          <component :is="activity.icon" class="w-5 h-5 text-white stroke-[1.5]" />
        </div>
        
        <!-- Content -->
        <div class="flex-1 pt-1">
          <p class="text-text-primary font-medium mb-1">{{ activity.title }}</p>
          <p class="text-text-secondary text-sm mb-2">{{ activity.description }}</p>
          <div class="flex items-center gap-2 text-xs text-text-muted">
            <Clock class="w-3 h-3" />
            <span>{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { UserPlus, ShoppingCart, FileText, Settings, Clock } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'

const activities = [
  {
    title: 'New User Registration',
    description: 'John Doe signed up for a new account',
    time: '5 minutes ago',
    icon: UserPlus,
    color: 'bg-gradient-to-br from-primary to-primary-light'
  },
  {
    title: 'New Order Placed',
    description: 'Order #1234 has been placed by Sarah Wilson',
    time: '1 hour ago',
    icon: ShoppingCart,
    color: 'bg-gradient-to-br from-secondary to-secondary-light'
  },
  {
    title: 'Invoice Generated',
    description: 'Invoice #INV-2024-001 was created',
    time: '2 hours ago',
    icon: FileText,
    color: 'bg-gradient-to-br from-pink-500 to-pink-400'
  },
  {
    title: 'Settings Updated',
    description: 'System settings were modified',
    time: '3 hours ago',
    icon: Settings,
    color: 'bg-gradient-to-br from-success to-emerald-400'
  }
]
</script>
