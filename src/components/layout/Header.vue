<template>
  <header class="sticky top-0 z-30 h-16 glass border-b border-dark-border">
    <div class="h-full px-6 flex items-center justify-between gap-4">
      <!-- Search Bar -->
      <div class="flex-1 max-w-xl">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search... (Ctrl+K)"
            class="w-full pl-10 pr-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <!-- Notifications -->
        <div class="relative">
          <button
            @click="showNotifications = !showNotifications"
            class="relative p-2 rounded-lg hover:bg-dark-elevated transition-smooth text-gray-400 hover:text-white"
          >
            <Bell class="w-5 h-5" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
          
          <!-- Notifications Dropdown -->
          <Transition name="dropdown">
            <div
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 glass rounded-lg shadow-xl overflow-hidden"
            >
              <div class="p-4 border-b border-dark-border">
                <h3 class="text-sm font-semibold text-white">Notifications</h3>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <div
                  v-for="(notification, index) in notifications"
                  :key="index"
                  class="p-4 hover:bg-dark-elevated transition-smooth border-b border-dark-border/50"
                >
                  <p class="text-sm text-white">{{ notification.message }}</p>
                  <p class="text-xs text-gray-400 mt-1">{{ notification.time }}</p>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- User Menu -->
        <Dropdown position="right">
          <template #trigger>
            <div class="flex items-center gap-2 cursor-pointer">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <User class="w-4 h-4 text-white" />
              </div>
              <ChevronDown class="w-4 h-4 text-gray-400" />
            </div>
          </template>
          
          <div class="py-2">
            <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-dark-elevated transition-smooth text-gray-300 hover:text-white">
              <User class="w-4 h-4" />
              <span class="text-sm">Profile</span>
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-dark-elevated transition-smooth text-gray-300 hover:text-white">
              <Settings class="w-4 h-4" />
              <span class="text-sm">Settings</span>
            </a>
            <div class="border-t border-dark-border my-2"></div>
            <a
              href="/login"
              class="flex items-center gap-3 px-4 py-2 hover:bg-dark-elevated transition-smooth text-rose-400 hover:text-rose-300"
            >
              <LogOut class="w-4 h-4" />
              <span class="text-sm">Logout</span>
            </a>
          </div>
        </Dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-vue-next'
import Dropdown from '../ui/Dropdown.vue'

const showNotifications = ref(false)

const notifications = [
  { message: 'New user registered', time: '5 minutes ago' },
  { message: 'Server backup completed', time: '1 hour ago' },
  { message: 'New order received', time: '2 hours ago' },
]
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
