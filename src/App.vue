<template>
  <div class="min-h-screen">
    <component :is="layoutComponent">
      <router-view />
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './components/layout/MainLayout.vue'

const route = useRoute()

const layoutComponent = computed(() => {
  // Auth pages don't use the main layout
  if (route.meta.layout === 'auth') {
    return 'div'
  }
  return MainLayout
})
</script>
