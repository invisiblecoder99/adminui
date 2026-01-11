<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-text-primary mb-2">Users Management</h1>
      <p class="text-text-secondary">Manage your users and their permissions.</p>
    </div>

    <!-- Users Table -->
    <DataTable
      :columns="columns"
      :data="users"
      :selectable="true"
    >
      <template #header-actions>
        <Button variant="primary" size="sm" @click="showAddUserModal = true">
          <Plus class="w-4 h-4 mr-2" />
          Add User
        </Button>
      </template>

      <template #cell-user="{ row }">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span class="text-white font-medium text-sm">{{ getInitials(row.name) }}</span>
          </div>
          <div>
            <p class="text-text-primary font-medium">{{ row.name }}</p>
            <p class="text-text-secondary text-xs">{{ row.email }}</p>
          </div>
        </div>
      </template>

      <template #cell-role="{ row }">
        <Badge :variant="getRoleBadgeVariant(row.role)">
          {{ row.role }}
        </Badge>
      </template>

      <template #cell-status="{ row }">
        <div class="flex items-center gap-2">
          <div :class="['w-2 h-2 rounded-full', row.status === 'Active' ? 'bg-success' : 'bg-surface-3']"></div>
          <span :class="row.status === 'Active' ? 'text-success' : 'text-text-muted'">
            {{ row.status }}
          </span>
        </div>
      </template>

      <template #actions="{ row }">
        <div class="flex items-center gap-2 justify-end">
          <button
            @click="editUser(row)"
            class="p-2 rounded-lg hover:bg-surface-2 transition-smooth text-text-muted hover:text-primary"
          >
            <Edit class="w-4 h-4" />
          </button>
          <button
            @click="viewUser(row)"
            class="p-2 rounded-lg hover:bg-surface-2 transition-smooth text-text-muted hover:text-secondary"
          >
            <Eye class="w-4 h-4" />
          </button>
          <button
            @click="deleteUser(row)"
            class="p-2 rounded-lg hover:bg-surface-2 transition-smooth text-text-muted hover:text-error"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </template>
    </DataTable>

    <!-- Add/Edit User Modal -->
    <Modal v-model="showAddUserModal" title="Add New User" size="md">
      <form @submit.prevent="handleAddUser" class="space-y-4">
        <Input
          v-model="newUser.name"
          label="Full Name"
          placeholder="John Doe"
        />
        <Input
          v-model="newUser.email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
        />
        <div>
          <label class="block text-sm font-medium text-text-secondary mb-2">Role</label>
          <select
            v-model="newUser.role"
            class="w-full px-4 py-3 bg-surface-1 border border-surface-3 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Guest">Guest</option>
          </select>
        </div>
      </form>
      <template #footer>
        <Button variant="ghost" @click="showAddUserModal = false">Cancel</Button>
        <Button variant="primary" @click="handleAddUser">Add User</Button>
      </template>
    </Modal>

    <!-- User Detail Modal -->
    <Modal v-model="showUserDetail" :title="selectedUser?.name" size="lg">
      <div v-if="selectedUser" class="space-y-6">
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span class="text-white font-bold text-2xl">{{ getInitials(selectedUser.name) }}</span>
          </div>
          <div>
            <h3 class="text-xl font-bold text-text-primary">{{ selectedUser.name }}</h3>
            <p class="text-text-secondary">{{ selectedUser.email }}</p>
            <div class="flex gap-2 mt-2">
              <Badge :variant="getRoleBadgeVariant(selectedUser.role)">{{ selectedUser.role }}</Badge>
              <Badge :variant="selectedUser.status === 'Active' ? 'success' : 'neutral'">{{ selectedUser.status }}</Badge>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-surface-2/50 border border-surface-3 p-4 rounded-lg">
            <p class="text-text-secondary text-sm mb-1">Joined Date</p>
            <p class="text-text-primary font-medium">{{ selectedUser.joined }}</p>
          </div>
          <div class="bg-surface-2/50 border border-surface-3 p-4 rounded-lg">
            <p class="text-text-secondary text-sm mb-1">Last Active</p>
            <p class="text-text-primary font-medium">{{ selectedUser.lastActive }}</p>
          </div>
        </div>
      </div>
      <template #footer>
        <Button variant="ghost" @click="showUserDetail = false">Close</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Edit, Eye, Trash2 } from 'lucide-vue-next'
import DataTable from '@/components/tables/DataTable.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Modal from '@/components/ui/Modal.vue'
import Input from '@/components/ui/Input.vue'

const columns = [
  { key: 'user', label: 'User' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'joined', label: 'Joined' },
  { key: 'lastActive', label: 'Last Active' }
]

const users = ref([
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Jan 15, 2024',
    lastActive: '2 hours ago'
  },
  {
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'User',
    status: 'Active',
    joined: 'Feb 20, 2024',
    lastActive: '1 day ago'
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'User',
    status: 'Inactive',
    joined: 'Mar 10, 2024',
    lastActive: '1 week ago'
  },
  {
    name: 'Emily Brown',
    email: 'emily@example.com',
    role: 'Guest',
    status: 'Active',
    joined: 'Apr 5, 2024',
    lastActive: '5 minutes ago'
  },
  {
    name: 'David Lee',
    email: 'david@example.com',
    role: 'Admin',
    status: 'Active',
    joined: 'May 1, 2024',
    lastActive: '30 minutes ago'
  }
])

const showAddUserModal = ref(false)
const showUserDetail = ref(false)
const selectedUser = ref(null)

const newUser = ref({
  name: '',
  email: '',
  role: 'User'
})

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

const getRoleBadgeVariant = (role) => {
  const variants = {
    Admin: 'primary',
    User: 'info',
    Guest: 'default'
  }
  return variants[role] || 'default'
}

const editUser = (user) => {
  console.log('Edit user:', user)
}

const viewUser = (user) => {
  selectedUser.value = user
  showUserDetail.value = true
}

const deleteUser = (user) => {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    const index = users.value.findIndex(u => u.email === user.email)
    if (index > -1) {
      users.value.splice(index, 1)
    }
  }
}

const handleAddUser = () => {
  users.value.push({
    ...newUser.value,
    status: 'Active',
    joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    lastActive: 'Just now'
  })
  
  newUser.value = { name: '', email: '', role: 'User' }
  showAddUserModal.value = false
}
</script>
