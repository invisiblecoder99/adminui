<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Settings</h1>
      <p class="text-gray-400">Manage your account settings and preferences.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Settings Navigation -->
      <div class="lg:col-span-1">
        <Card>
          <nav class="space-y-1">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth text-left',
                activeTab === tab.id
                  ? 'bg-primary/20 text-primary'
                  : 'text-gray-400 hover:text-white hover:bg-dark-elevated'
              ]"
            >
              <component :is="tab.icon" class="w-5 h-5" />
              <span class="font-medium">{{ tab.label }}</span>
            </button>
          </nav>
        </Card>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-2">
        <!-- Profile Settings -->
        <Card v-if="activeTab === 'profile'">
          <h2 class="text-xl font-bold text-white mb-6">Profile Settings</h2>
          <form class="space-y-6">
            <div class="flex items-center gap-6">
              <div class="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center">
                <User class="w-12 h-12 text-white" />
              </div>
              <div>
                <Button variant="outline" size="sm">Change Avatar</Button>
                <p class="text-xs text-gray-400 mt-2">JPG, PNG or GIF (max. 2MB)</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                v-model="profile.firstName"
                label="First Name"
                placeholder="John"
              />
              <Input
                v-model="profile.lastName"
                label="Last Name"
                placeholder="Doe"
              />
            </div>

            <Input
              v-model="profile.email"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
            />

            <Input
              v-model="profile.phone"
              type="tel"
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
            />

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <textarea
                v-model="profile.bio"
                rows="4"
                class="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <div class="flex gap-3">
              <Button variant="primary">Save Changes</Button>
              <Button variant="ghost">Cancel</Button>
            </div>
          </form>
        </Card>

        <!-- Notification Settings -->
        <Card v-if="activeTab === 'notifications'">
          <h2 class="text-xl font-bold text-white mb-6">Notification Settings</h2>
          <div class="space-y-6">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="flex items-center justify-between py-4 border-b border-dark-border last:border-0"
            >
              <div>
                <p class="text-white font-medium mb-1">{{ notification.title }}</p>
                <p class="text-gray-400 text-sm">{{ notification.description }}</p>
              </div>
              <Toggle v-model="notification.enabled" />
            </div>
          </div>
        </Card>

        <!-- Security Settings -->
        <Card v-if="activeTab === 'security'">
          <h2 class="text-xl font-bold text-white mb-6">Security Settings</h2>
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-white mb-4">Change Password</h3>
              <form class="space-y-4">
                <Input
                  type="password"
                  label="Current Password"
                  placeholder="••••••••"
                />
                <Input
                  type="password"
                  label="New Password"
                  placeholder="••••••••"
                />
                <Input
                  type="password"
                  label="Confirm New Password"
                  placeholder="••••••••"
                />
                <Button variant="primary">Update Password</Button>
              </form>
            </div>

            <div class="pt-6 border-t border-dark-border">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-white mb-1">Two-Factor Authentication</h3>
                  <p class="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                </div>
                <Toggle v-model="twoFactorEnabled" />
              </div>
            </div>

            <div class="pt-6 border-t border-dark-border">
              <h3 class="text-lg font-semibold text-white mb-4">Active Sessions</h3>
              <div class="space-y-3">
                <div
                  v-for="session in sessions"
                  :key="session.id"
                  class="flex items-center justify-between p-4 glass rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <Monitor class="w-5 h-5 text-gray-400" />
                    <div>
                      <p class="text-white font-medium">{{ session.device }}</p>
                      <p class="text-gray-400 text-xs">{{ session.location }} • {{ session.time }}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Revoke</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <!-- Appearance Settings -->
        <Card v-if="activeTab === 'appearance'">
          <h2 class="text-xl font-bold text-white mb-6">Appearance Settings</h2>
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-white mb-4">Theme</h3>
              <div class="grid grid-cols-3 gap-4">
                <button
                  v-for="theme in themes"
                  :key="theme.id"
                  @click="selectedTheme = theme.id"
                  :class="[
                    'p-4 rounded-lg border-2 transition-smooth',
                    selectedTheme === theme.id
                      ? 'border-primary bg-primary/10'
                      : 'border-dark-border hover:border-primary/50'
                  ]"
                >
                  <div :class="['w-full h-20 rounded-lg mb-3', theme.preview]"></div>
                  <p class="text-white text-sm font-medium">{{ theme.name }}</p>
                </button>
              </div>
            </div>

            <div class="pt-6 border-t border-dark-border">
              <h3 class="text-lg font-semibold text-white mb-4">Display Settings</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-white font-medium">Compact Mode</p>
                    <p class="text-gray-400 text-sm">Reduce spacing between elements</p>
                  </div>
                  <Toggle v-model="compactMode" />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-white font-medium">Animations</p>
                    <p class="text-gray-400 text-sm">Enable smooth transitions and effects</p>
                  </div>
                  <Toggle v-model="animations" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Bell, Shield, Palette, Monitor } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Toggle from '@/components/ui/Toggle.vue'

const activeTab = ref('profile')

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette }
]

const profile = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1 (555) 000-0000',
  bio: 'Full-stack developer passionate about creating beautiful user experiences.'
})

const notifications = ref([
  { id: 1, title: 'Email Notifications', description: 'Receive email about your account activity', enabled: true },
  { id: 2, title: 'Push Notifications', description: 'Get push notifications in your browser', enabled: true },
  { id: 3, title: 'Order Updates', description: 'Notifications about order status changes', enabled: false },
  { id: 4, title: 'Weekly Reports', description: 'Receive weekly summary of your activity', enabled: true },
  { id: 5, title: 'Marketing Emails', description: 'Receive updates about new features and offers', enabled: false }
])

const twoFactorEnabled = ref(false)

const sessions = ref([
  { id: 1, device: 'Chrome on MacBook Pro', location: 'New York, US', time: 'Active now' },
  { id: 2, device: 'Safari on iPhone', location: 'New York, US', time: '2 hours ago' }
])

const selectedTheme = ref('dark')

const themes = [
  { id: 'dark', name: 'Dark', preview: 'bg-gradient-to-br from-dark-bg to-dark-elevated' },
  { id: 'midnight', name: 'Midnight', preview: 'bg-gradient-to-br from-gray-900 to-black' },
  { id: 'purple', name: 'Purple', preview: 'bg-gradient-to-br from-purple-900 to-indigo-900' }
]

const compactMode = ref(false)
const animations = ref(true)
</script>
