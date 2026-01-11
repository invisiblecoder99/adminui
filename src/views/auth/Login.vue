<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-pink/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <!-- Login Card -->
    <div class="w-full max-w-md relative z-10">
      <div class="glass rounded-2xl p-8 glow-primary">
        <!-- Logo -->
        <div class="flex justify-center mb-8">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center glow-primary">
            <Zap class="w-8 h-8 text-white" />
          </div>
        </div>

        <!-- Title -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p class="text-gray-400">Sign in to your account to continue</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <Input
            id="email"
            v-model="form.email"
            type="email"
            label="Email Address"
            placeholder="admin@example.com"
            :error="errors.email"
          >
            <template #icon>
              <Mail class="w-5 h-5 text-gray-400" />
            </template>
          </Input>

          <Input
            id="password"
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="••••••••"
            :error="errors.password"
          >
            <template #icon>
              <Lock class="w-5 h-5 text-gray-400" />
            </template>
          </Input>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" v-model="form.remember" class="sr-only peer" />
              <div class="w-5 h-5 border-2 border-gray-600 rounded peer-checked:bg-primary peer-checked:border-primary transition-smooth flex items-center justify-center">
                <Check v-if="form.remember" class="w-3 h-3 text-white" />
              </div>
              <span class="text-sm text-gray-400 group-hover:text-white transition-smooth">Remember me</span>
            </label>
            <router-link to="/forgot-password" class="text-sm text-primary hover:text-primary-light transition-smooth">
              Forgot password?
            </router-link>
          </div>

          <Button type="submit" variant="primary" class="w-full">
            Sign In
          </Button>
        </form>

        <!-- Social Login -->
        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-dark-border"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-dark-card text-gray-400">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-3">
            <button class="flex justify-center items-center px-4 py-3 glass rounded-lg hover:bg-dark-elevated transition-smooth group">
              <svg class="w-5 h-5 text-gray-400 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button class="flex justify-center items-center px-4 py-3 glass rounded-lg hover:bg-dark-elevated transition-smooth group">
              <svg class="w-5 h-5 text-gray-400 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
            <button class="flex justify-center items-center px-4 py-3 glass rounded-lg hover:bg-dark-elevated transition-smooth group">
              <svg class="w-5 h-5 text-gray-400 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Sign Up Link -->
        <p class="mt-8 text-center text-sm text-gray-400">
          Don't have an account?
          <router-link to="/register" class="text-primary hover:text-primary-light font-medium transition-smooth">
            Sign up for free
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Lock, Check, Zap } from 'lucide-vue-next'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  remember: false
})

const errors = ref({
  email: '',
  password: ''
})

const handleLogin = () => {
  // Reset errors
  errors.value = { email: '', password: '' }
  
  // Simple validation
  if (!form.value.email) {
    errors.value.email = 'Email is required'
    return
  }
  if (!form.value.password) {
    errors.value.password = 'Password is required'
    return
  }
  
  // Simulate login
  router.push('/dashboard')
}
</script>
