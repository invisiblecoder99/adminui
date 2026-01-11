<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-pink/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <!-- Register Card -->
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
          <h1 class="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p class="text-gray-400">Sign up to get started with AdminUI</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-5">
          <Input
            id="name"
            v-model="form.name"
            type="text"
            label="Full Name"
            placeholder="John Doe"
            :error="errors.name"
          >
            <template #icon>
              <User class="w-5 h-5 text-gray-400" />
            </template>
          </Input>

          <Input
            id="email"
            v-model="form.email"
            type="email"
            label="Email Address"
            placeholder="john@example.com"
            :error="errors.email"
          >
            <template #icon>
              <Mail class="w-5 h-5 text-gray-400" />
            </template>
          </Input>

          <div>
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
            
            <!-- Password Strength Indicator -->
            <div v-if="form.password" class="mt-2">
              <div class="flex gap-1 mb-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  :class="[
                    'h-1 flex-1 rounded-full transition-smooth',
                    i <= passwordStrength ? strengthColor : 'bg-gray-700'
                  ]"
                ></div>
              </div>
              <p :class="['text-xs', strengthColor.replace('bg-', 'text-')]">
                {{ strengthText }}
              </p>
            </div>
          </div>

          <Input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            :error="errors.confirmPassword"
          >
            <template #icon>
              <Lock class="w-5 h-5 text-gray-400" />
            </template>
          </Input>

          <label class="flex items-start gap-2 cursor-pointer group">
            <input type="checkbox" v-model="form.terms" class="sr-only peer" />
            <div class="w-5 h-5 border-2 border-gray-600 rounded peer-checked:bg-primary peer-checked:border-primary transition-smooth flex items-center justify-center mt-0.5">
              <Check v-if="form.terms" class="w-3 h-3 text-white" />
            </div>
            <span class="text-sm text-gray-400 group-hover:text-white transition-smooth">
              I agree to the <a href="#" class="text-primary hover:text-primary-light">Terms of Service</a> and <a href="#" class="text-primary hover:text-primary-light">Privacy Policy</a>
            </span>
          </label>
          <p v-if="errors.terms" class="text-sm text-red-500 -mt-2">{{ errors.terms }}</p>

          <Button type="submit" variant="primary" class="w-full">
            Create Account
          </Button>
        </form>

        <!-- Sign In Link -->
        <p class="mt-8 text-center text-sm text-gray-400">
          Already have an account?
          <router-link to="/login" class="text-primary hover:text-primary-light font-medium transition-smooth">
            Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Lock, User, Check, Zap } from 'lucide-vue-next'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: ''
})

const passwordStrength = computed(() => {
  const password = form.value.password
  let strength = 0
  
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
  
  return strength
})

const strengthColor = computed(() => {
  const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-emerald-500']
  return colors[passwordStrength.value - 1] || 'bg-gray-700'
})

const strengthText = computed(() => {
  const texts = ['Weak', 'Fair', 'Good', 'Strong']
  return texts[passwordStrength.value - 1] || ''
})

const handleRegister = () => {
  // Reset errors
  errors.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: ''
  }
  
  // Validation
  let isValid = true
  
  if (!form.value.name) {
    errors.value.name = 'Name is required'
    isValid = false
  }
  
  if (!form.value.email) {
    errors.value.email = 'Email is required'
    isValid = false
  }
  
  if (!form.value.password) {
    errors.value.password = 'Password is required'
    isValid = false
  } else if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
    isValid = false
  }
  
  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
    isValid = false
  }
  
  if (!form.value.terms) {
    errors.value.terms = 'You must accept the terms'
    isValid = false
  }
  
  if (isValid) {
    // Simulate registration
    router.push('/dashboard')
  }
}
</script>
