<template>
  <aside
    :class="[
      'fixed left-0 top-0 h-screen backdrop-blur-xl border-r transition-all duration-300',
      'flex flex-col z-40',
      'bg-surface-1/50 border-surface-3',
      collapsed ? 'w-20' : 'w-[280px]'
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center h-16 px-4 border-b border-surface-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
          <Zap class="w-6 h-6 text-white" />
        </div>
        <span v-if="!collapsed" class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          AdminUI
        </span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4 px-2">
      <div v-for="(section, sectionIndex) in menuSections" :key="sectionIndex" class="mb-6">
        <div v-if="!collapsed && section.label" class="px-4 mb-2">
          <span class="text-xs uppercase tracking-wider text-text-muted font-medium">
            {{ section.label }}
          </span>
        </div>
        <div v-for="(item, index) in section.items" :key="index" class="mb-1">
          <router-link
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth relative',
              'hover:bg-surface-2',
              isActive(item.path) 
                ? 'bg-primary/10 text-primary' 
                : 'text-text-secondary hover:text-text-primary'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5 flex-shrink-0 stroke-[1.5]" />
            <span v-if="!collapsed" class="font-medium">{{ item.label }}</span>
            <div
              v-if="isActive(item.path)"
              class="absolute left-0 w-1 h-8 bg-primary rounded-r"
            ></div>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- User Profile -->
    <div class="p-4 border-t border-surface-3">
      <div :class="['flex items-center gap-3', collapsed ? 'justify-center' : '']">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-info to-primary flex items-center justify-center">
          <User class="w-5 h-5 text-white" />
        </div>
        <div v-if="!collapsed" class="flex-1 min-w-0">
          <p class="text-sm font-medium text-text-primary truncate">Admin User</p>
          <p class="text-xs text-text-secondary truncate">admin@example.com</p>
        </div>
        <button v-if="!collapsed" class="text-text-muted hover:text-text-primary transition-smooth">
          <LogOut class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Toggle Button -->
    <button
      @click="collapsed = !collapsed"
      class="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-smooth shadow-lg shadow-primary/20"
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
  ChevronRight,
  LogOut
} from 'lucide-vue-next'

const route = useRoute()
const collapsed = ref(false)

const menuSections = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    ]
  },
  {
    label: 'Management',
    items: [
      { label: 'Users', path: '/users', icon: Users },
      { label: 'Products', path: '/products', icon: Package },
      { label: 'Orders', path: '/orders', icon: ShoppingBag },
      { label: 'Messages', path: '/messages', icon: MessageSquare },
    ]
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', path: '/settings', icon: Settings },
    ]
  }
]

const isActive = (path) => {
  return route.path === path
}
</script>
