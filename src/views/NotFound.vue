<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="text-center">
      <div class="mb-8">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent-pink glow-primary mb-6">
          <AlertCircle class="w-12 h-12 text-white" />
        </div>
        <h1 class="text-6xl font-bold text-white mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
        <p class="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>
      </div>
      
      <div class="flex gap-4 justify-center">
        <Button variant="primary" @click="$router.push('/dashboard')">
          <Home class="w-4 h-4 mr-2" />
          Go to Dashboard
        </Button>
        <Button variant="outline" @click="$router.back()">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertCircle, Home, ArrowLeft } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
</script>
