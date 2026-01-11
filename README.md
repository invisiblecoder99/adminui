# AdminUI - Dark-themed Tech Admin Panel ⚡

A visually stunning, dark-themed, elegant tech admin panel built with Vue 3, featuring impressive UI/UX design with glassmorphism effects, smooth animations, and modern aesthetics.

![AdminUI Dashboard](https://github.com/user-attachments/assets/2e821317-ecf0-4978-89ac-3866511437a6)

## ✨ Features

### 🔐 Authentication Pages
- **Login Page** - Glassmorphism card design with animated input fields and social login buttons
- **Register Page** - Password strength indicator with real-time validation
- **Forgot Password** - Clean, minimal design matching the theme

### 🏠 Dashboard
- **Stats Cards** - Glowing borders, gradient backgrounds, animated counters, and trend indicators
- **Interactive Charts** - Line charts, bar charts, and donut charts with dark theme colors
- **Activity Timeline** - Recent activities with avatars and timestamps
- **Quick Actions** - Icon buttons with smooth hover effects

### 🎛️ Navigation
- **Collapsible Sidebar** - Smooth animations with icon-only mode when collapsed
- **Glowing Active State** - Indicators with subtle transitions
- **Hover Effects** - Beautiful transitions on all interactive elements
- **User Profile Section** - Avatar display at bottom of sidebar

### 📊 Data Management
- **Advanced Data Table** - Search, filter, pagination, and bulk actions
- **User Management** - Avatar display, role badges, status indicators, and action buttons
- **Modals** - Slide-in panels for detailed views and forms

### ⚙️ Settings
- **Profile Settings** - Avatar upload, form inputs with validation
- **Notification Settings** - Beautiful toggle switches for preferences
- **Security Settings** - Password change, 2FA toggle, and active sessions management
- **Appearance Settings** - Theme customization options

### 🎨 Design Specifications

#### Color Palette (Dark Theme)
- **Background**: Deep dark (#0a0a0f, #12121a, #1a1a2e)
- **Cards**: Glassmorphism with transparency
- **Primary**: Electric purple (#8b5cf6, #a855f7)
- **Secondary**: Cyan (#06b6d4, #22d3ee)
- **Accent**: Pink (#ec4899, #f472b6)

#### Effects
- ✨ Glassmorphism with backdrop blur
- 🌈 Subtle gradients throughout
- 💫 Glow effects on hover and focus
- 🔄 Smooth transitions (300ms ease)

## 🚀 Tech Stack

- **Vue 3** - Composition API
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Beautiful, consistent icons
- **Vue Router** - Client-side routing
- **Chart.js** - Interactive data visualizations
- **Vite** - Fast build tool and dev server

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/invisiblecoder99/adminui.git

# Navigate to project directory
cd adminui

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🖼️ Screenshots

### Login Page
![Login Page](https://github.com/user-attachments/assets/b93462cf-ab32-4d6b-804d-49416e49fecc)

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/2e821317-ecf0-4978-89ac-3866511437a6)

### Users Management
![Users Page](https://github.com/user-attachments/assets/7a1a76d5-a1a6-4c70-996c-24ba23ec8eba)

### Settings
![Settings Page](https://github.com/user-attachments/assets/b45d5798-3d7f-45e9-b809-0a27d7e94be3)

### Register Page
![Register Page](https://github.com/user-attachments/assets/4313e821-45be-433b-8145-2a97cd03998d)

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.vue
│   │   ├── Header.vue
│   │   └── MainLayout.vue
│   ├── ui/
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   ├── Card.vue
│   │   ├── Badge.vue
│   │   ├── Toggle.vue
│   │   ├── Modal.vue
│   │   ├── Dropdown.vue
│   │   └── Toast.vue
│   ├── dashboard/
│   │   ├── StatsCard.vue
│   │   ├── ActivityTimeline.vue
│   │   └── Charts.vue
│   └── tables/
│       └── DataTable.vue
├── views/
│   ├── auth/
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   └── ForgotPassword.vue
│   ├── Dashboard.vue
│   ├── Users.vue
│   ├── Settings.vue
│   └── NotFound.vue
├── router/
├── assets/
│   └── css/
│       └── main.css
├── App.vue
└── main.js
```

## 🎯 Key Features Implemented

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth page transitions
- ✅ Form validation with error feedback
- ✅ Loading states and animations
- ✅ Interactive components with hover effects
- ✅ Accessible (keyboard navigation, ARIA labels)
- ✅ Clean, well-organized code
- ✅ Modern dark theme with glassmorphism
- ✅ Animated counters on stats cards
- ✅ Password strength indicator
- ✅ Search and filter functionality
- ✅ Pagination for data tables
- ✅ Modal dialogs for forms and details
- ✅ Toast notifications system
- ✅ Collapsible sidebar navigation

## 🛠️ Development

The project uses modern Vue 3 Composition API with:
- Reactive state management
- Computed properties
- Lifecycle hooks
- Component composition

All components are modular and reusable, making it easy to extend and customize.

## 📝 License

ISC

## 👨‍💻 Author

Made with ❤️ by invisiblecoder99

---

**Note**: This admin panel is designed to be stunning and impressive - perfect for modern web applications requiring a professional, dark-themed interface! ✨