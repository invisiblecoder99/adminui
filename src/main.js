import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/css/main.css'

// Import views
import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import ForgotPassword from './views/auth/ForgotPassword.vue'
import Dashboard from './views/Dashboard.vue'
import Users from './views/Users.vue'
import Settings from './views/Settings.vue'
import NotFound from './views/NotFound.vue'

// Define routes
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, meta: { layout: 'auth' } },
  { path: '/register', component: Register, meta: { layout: 'auth' } },
  { path: '/forgot-password', component: ForgotPassword, meta: { layout: 'auth' } },
  { path: '/dashboard', component: Dashboard },
  { path: '/users', component: Users },
  { path: '/settings', component: Settings },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
