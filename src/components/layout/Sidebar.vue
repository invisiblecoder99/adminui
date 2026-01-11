<template>
  <aside
    :class="[
      'fixed left-0 top-0 h-screen glass border-r border-dark-border transition-all duration-300',
      'flex flex-col z-40',
      collapsed ? 'w-20' : 'w-64'
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center h-16 px-4 border-b border-dark-border">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center glow-primary">
          <Zap class="w-6 h-6 text-white" />
        </div>
        <span v-if="!collapsed" class="text-xl font-bold bg-gradient-to-r from-primary to-accent-pink bg-clip-text text-transparent">
          AdminUI
        </span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4 px-2">
      <div v-for="(item, index) in menuItems" :key="index" class="mb-1">
        <router-link
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth',
            'hover:bg-dark-elevated group relative',
            isActive(item.path) ? 'bg-primary/20 text-primary glow-primary' : 'text-gray-400'
          ]"
        >
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span v-if="!collapsed" class="font-medium">{{ item.label }}</span>
          <div
            v-if="isActive(item.path)"
            class="absolute left-0 w-1 h-8 bg-primary rounded-r"
          ></div>
        </router-link>
      </div>
    </nav>

    <!-- User Profile -->
    <div class="p-4 border-t border-dark-border">
      <div :class="['flex items-center gap-3', collapsed ? 'justify-center' : '']">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
          <User class="w-5 h-5 text-white" />
        </div>
        <div v-if="!collapsed" class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">Admin User</p>
          <p class="text-xs text-gray-400 truncate">admin@example.com</p>
        </div>
      </div>
    </div>

    <!-- Toggle Button -->
    <button
      @click="collapsed = !collapsed"
      class="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-smooth glow-primary"
    >
      <ChevronLeft v-if="!collapsed" class="w-4 h-4" />
      <ChevronRight v-else class="w-4 h-4" />
    </button>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  ShoppingBag,
  Package,
  MessageSquare,
  Zap,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

const route = useRoute()
const collapsed = ref(false)

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Users', path: '/users', icon: Users },
  { label: 'Products', path: '/products', icon: Package },
  { label: 'Orders', path: '/orders', icon: ShoppingBag },
  { label: 'Messages', path: '/messages', icon: MessageSquare },
  { label: 'Settings', path: '/settings', icon: Settings },
]

const isActive = (path) => {
  return route.path === path
}
</script>
