<template>
  <nav
    v-if="isLoggedIn"
    :class="{
      'h-full': isMobileMenuOpen,
      'bg-white border-b border-gray-200 fixed top-0 z-10 w-full': true
    }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <button
            v-if="!isHome && !backToLastPage"
            @click="goHome"
            class="mr-2 p-1 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <HomeIcon class="h-6 w-6" />
          </button>
          <button
            v-if="backToLastPage"
            @click="goBack"
            class="mr-2 p-1 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            v-bind:disabled="!backToLastPage"
          >
            <ArrowLeftIcon class="h-6 w-6" />
          </button>
          <span class="text-xl font-semibold text-gray-900">{{ title }}</span>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <button
              @click="toggleUserMenu"
              class="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserIcon class="h-6 w-6" />
            </button>
          </div>
        </div>
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <MenuIcon v-if="!isMobileMenuOpen" class="h-6 w-6" />
            <XIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.href"
          :class="[
            currentRoute === item.id
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'block px-3 py-2 rounded-md text-base font-medium'
          ]"
          @click="closeMenu"
        >
          {{ item.name }}
        </router-link>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <UserIcon class="h-10 w-10 rounded-full text-gray-400" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none text-gray-900">
              {{ user.name }}
            </div>
            <div class="text-sm font-medium leading-none text-gray-500">
              {{ user.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 px-2 space-y-1">
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            @click="handleLogout"
          >
            {{ isLoggedIn ? 'Logout' : 'Login' }}
          </a>
        </div>
      </div>
    </div>

    <!-- User menu (desktop) -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-full"
    >
      <div
        v-if="isUserMenuOpen"
        class="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-lg p-6 overflow-y-auto"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">User Menu</h2>
          <button
            @click="closeMenu"
            class="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <XIcon class="h-6 w-6" />
          </button>
        </div>
        <div class="space-y-1">
          <a
            v-for="item in menuItems"
            :key="item.name"
            :href="item.href"
            :class="[
              route.name === item.id
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'block px-3 py-2 rounded-md text-base font-medium'
            ]"
            @click="closeMenu"
          >
            {{ item.name }}
          </a>
        </div>
        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="flex items-center px-3 mb-3">
            <div class="flex-shrink-0">
              <UserIcon class="h-10 w-10 rounded-full text-gray-400" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-gray-900">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-500">
                {{ user.email }}
              </div>
            </div>
          </div>
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            role="menuitem"
            @click="handleLogout"
          >
            {{ isLoggedIn ? 'Logout' : 'Login' }}
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MenuIcon, XIcon, UserIcon, HomeIcon, ArrowLeftIcon } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'
import { watch } from 'vue'
import { useAuth } from '../composables/auth'

interface Props {
  title: string
  isHome: boolean
  backToLastPage: boolean
}

defineProps<Props>()

const router = useRouter()
const route = useRoute()

const { isLoggedIn, logout } = useAuth()

const user = ref({
  name: 'John Doe',
  email: 'john@example.com'
})
const menuItems = ref([
  { id: 'home', name: 'Home', href: '/' },
  { id: 'orders', name: 'Orders', href: '/orders' },
  { id: 'order-items', name: 'Order Items', href: '/order-items' }
])
const currentRoute = ref(route.name)

const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)

watch(route, (to) => {
  currentRoute.value = to.name
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  isUserMenuOpen.value = false
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
  isMobileMenuOpen.value = false
}

const closeMenu = () => {
  isMobileMenuOpen.value = false
  isUserMenuOpen.value = false
}

const goHome = () => {
  // Implement your navigation logic here
  router.push('/')
  closeMenu()
}

const goBack = () => {
  router.go(-1)
  closeMenu()
}

const handleLogout = () => {
  // Implement your logout logic here
  isLoggedIn.value = !isLoggedIn.value
  logout()
  closeMenu()
}
</script>
