<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 ml-[280px] transition-all duration-300">
      <Header />
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>
