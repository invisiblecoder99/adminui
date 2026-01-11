<template>
  <header class="sticky top-0 z-30 h-16 backdrop-blur-xl bg-surface-1/50 border-b border-surface-3">
    <div class="h-full px-6 flex items-center justify-between gap-4">
      <!-- Search Bar -->
      <div class="flex-1 max-w-xl">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted stroke-[1.5]" />
          <input
            type="text"
            placeholder="Search... (⌘K)"
            class="w-full pl-10 pr-4 py-2 bg-surface-1 border border-surface-3 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          />
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-3">
        <!-- Notifications -->
        <div class="relative">
          <button
            @click="showNotifications = !showNotifications"
            class="relative p-2 rounded-lg hover:bg-surface-2 transition-smooth text-text-secondary hover:text-text-primary"
          >
            <Bell class="w-5 h-5 stroke-[1.5]" />
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface-1"></span>
          </button>
          
          <!-- Notifications Dropdown -->
          <Transition name="dropdown">
            <div
              v-if="showNotifications"
              v-click-outside="() => showNotifications = false"
              class="absolute right-0 mt-2 w-80 bg-surface-1 backdrop-blur-xl border border-surface-3 rounded-lg shadow-xl overflow-hidden"
            >
              <div class="p-4 border-b border-surface-3">
                <h3 class="text-sm font-semibold text-text-primary">Notifications</h3>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <div
                  v-for="(notification, index) in notifications"
                  :key="index"
                  class="p-4 hover:bg-surface-2 transition-smooth border-b border-surface-3/50 cursor-pointer"
                >
                  <p class="text-sm text-text-primary">{{ notification.message }}</p>
                  <p class="text-xs text-text-muted mt-1">{{ notification.time }}</p>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- User Menu -->
        <Dropdown position="right">
          <template #trigger>
            <div class="flex items-center gap-2 cursor-pointer hover:bg-surface-2 rounded-lg px-2 py-1.5 transition-smooth">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-info to-primary flex items-center justify-center">
                <User class="w-4 h-4 text-white" />
              </div>
              <ChevronDown class="w-4 h-4 text-text-muted" />
            </div>
          </template>
          
          <div class="py-2">
            <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-surface-2 transition-smooth text-text-secondary hover:text-text-primary rounded-lg mx-1">
              <User class="w-4 h-4 stroke-[1.5]" />
              <span class="text-sm">Profile</span>
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-surface-2 transition-smooth text-text-secondary hover:text-text-primary rounded-lg mx-1">
              <Settings class="w-4 h-4 stroke-[1.5]" />
              <span class="text-sm">Settings</span>
            </a>
            <div class="border-t border-surface-3 my-2"></div>
            <a
              href="/login"
              class="flex items-center gap-3 px-4 py-2 hover:bg-surface-2 transition-smooth text-error hover:text-error rounded-lg mx-1"
            >
              <LogOut class="w-4 h-4 stroke-[1.5]" />
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

// Simple click outside directive implementation
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
