<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <!-- Forgot Password Card -->
    <div class="w-full max-w-md relative z-10">
      <div class="glass rounded-2xl p-8 glow-primary">
        <!-- Icon -->
        <div class="flex justify-center mb-8">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center glow-primary">
            <KeyRound class="w-8 h-8 text-white" />
          </div>
        </div>

        <!-- Title -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
          <p class="text-gray-400">No worries, we'll send you reset instructions</p>
        </div>

        <!-- Form -->
        <form v-if="!emailSent" @submit.prevent="handleSubmit" class="space-y-6">
          <Input
            id="email"
            v-model="email"
            type="email"
            label="Email Address"
            placeholder="admin@example.com"
            :error="error"
          >
            <template #icon>
              <Mail class="w-5 h-5 text-gray-400" />
            </template>
          </Input>

          <Button type="submit" variant="primary" class="w-full">
            Send Reset Link
          </Button>
        </form>

        <!-- Success Message -->
        <div v-else class="text-center space-y-6">
          <div class="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check class="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h3 class="text-xl font-semibold text-white mb-2">Check your email</h3>
            <p class="text-gray-400">We've sent a password reset link to {{ email }}</p>
          </div>
          <Button variant="outline" class="w-full" @click="emailSent = false">
            Resend Email
          </Button>
        </div>

        <!-- Back to Login -->
        <div class="mt-8 text-center">
          <router-link to="/login" class="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-smooth">
            <ArrowLeft class="w-4 h-4" />
            Back to login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Mail, KeyRound, Check, ArrowLeft } from 'lucide-vue-next'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const email = ref('')
const error = ref('')
const emailSent = ref(false)

const handleSubmit = () => {
  error.value = ''
  
  if (!email.value) {
    error.value = 'Email is required'
    return
  }
  
  // Simulate sending reset email
  emailSent.value = true
}
</script>
