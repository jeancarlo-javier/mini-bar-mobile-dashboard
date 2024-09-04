<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 p-4">
    <!-- Header -->
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold">Overview</h1>
        <p class="text-sm text-gray-500">Welcome back, Alex</p>
      </div>
      <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
        <UserIcon class="w-6 h-6 text-gray-500" />
      </div>
    </header>

    <!-- Quick Stats -->
    <div class="grid grid-cols-2 gap-4 mb-8">
      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-sm text-gray-500 mb-1">Total Balance</p>
        <p class="text-xl font-semibold">$2,450.00</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-sm text-gray-500 mb-1">Monthly Savings</p>
        <p class="text-xl font-semibold">$550.00</p>
      </div>
    </div>

    <!-- Recent Activity -->
    <!-- <div class="mb-8">
      <h2 class="text-lg font-semibold mb-4">Recent Activity</h2>
      <ul class="bg-white rounded-lg shadow divide-y divide-gray-100">
        <li v-for="(activity, index) in recentActivities" :key="index" class="p-4 flex items-center">
          <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
            <component :is="activity.icon" class="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <p class="font-medium">{{ activity.title }}</p>
            <p class="text-sm text-gray-500">{{ activity.time }}</p>
          </div>
        </li>
      </ul>
    </div> -->

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <ul class="flex justify-around p-4">
        <li v-for="(item, index) in navItems" :key="index" class="text-center">
          <a href="#" class="text-gray-500 hover:text-gray-800">
            <component :is="item.icon" class="w-6 h-6 mx-auto" />
            <span class="text-xs mt-1 block">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  UserIcon,
  HomeIcon,
  PieChartIcon,
  BellIcon,
  SettingsIcon
  // CreditCardIcon,
  // TrendingUpIcon,
  // ShoppingCartIcon
} from 'lucide-vue-next'
// import { useStore } from 'vuex'

// const store = useStore()

// const recentActivities = ref([
//   { title: 'Payment Received', time: '2 hours ago', icon: CreditCardIcon },
//   { title: 'Stock Update', time: '4 hours ago', icon: TrendingUpIcon },
//   { title: 'New Order #1234', time: 'Yesterday', icon: ShoppingCartIcon }
// ])

const navItems = ref([
  { label: 'Home', icon: HomeIcon },
  { label: 'Analytics', icon: PieChartIcon },
  { label: 'Notifications', icon: BellIcon },
  { label: 'Settings', icon: SettingsIcon }
])
</script>
