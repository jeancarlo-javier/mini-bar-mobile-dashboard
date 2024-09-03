<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <form @submit.prevent="handleSubmit" class="bg-gray-800 shadow-lg rounded-lg px-8 pt-8 pb-8 mb-4">
        <div class="mb-6 text-center">
          <h1 class="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p class="text-gray-400">Sign in to your account</p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-300 text-sm font-bold mb-2" for="email"> Email </label>
          <div class="relative">
            <input
              v-model="email"
              class="appearance-none rounded-lg w-full py-3 px-4 bg-gray-700 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <MailIcon class="absolute right-3 top-3 text-gray-400" size="20" />
          </div>
          <p v-if="emailError" class="text-red-500 text-xs italic mt-1">
            {{ emailError }}
          </p>
        </div>

        <div class="mb-6">
          <label class="block text-gray-300 text-sm font-bold mb-2" for="password"> Password </label>
          <div class="relative">
            <input
              v-model="password"
              class="appearance-none rounded-lg w-full py-3 px-4 bg-gray-700 text-white mb-1 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              required
            />
            <button
              @click="togglePassword"
              type="button"
              class="absolute right-3 top-3 text-gray-400 focus:outline-none"
            >
              <EyeIcon v-if="!showPassword" size="20" />
              <EyeOffIcon v-else size="20" />
            </button>
          </div>
          <p v-if="passwordError" class="text-red-500 text-xs italic mt-1">
            {{ passwordError }}
          </p>
        </div>

        <!-- <div class="flex items-center justify-between mb-6">
          <label class="flex items-center text-gray-300 text-sm" for="remember">
            <input
              v-model="rememberMe"
              class="mr-2 leading-tight"
              type="checkbox"
              id="remember"
            />
            <span>Remember me</span>
          </label>
          <a class="text-sm text-blue-400 hover:text-blue-300" href="#">
            Forgot Password?
          </a>
        </div> -->

        <div class="mb-6">
          <button
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
            type="submit"
          >
            Sign In
          </button>
        </div>

        <!-- <p class="text-center text-gray-400 text-sm">
          Don't have an account?
          <a href="#" class="text-blue-400 hover:text-blue-300">Sign up</a>
        </p> -->
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MailIcon, EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { login } from '../api/auth'

const email = ref('')
console.log('🚀 ~ email:', email)
const password = ref('')
// const rememberMe = ref(true)
const showPassword = ref(false)
const emailError = ref('')
const passwordError = ref('')

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleSubmit = async () => {
  emailError.value = ''
  passwordError.value = ''

  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return
  }

  if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters long'
    return
  }

  // Here you would typically handle the login process
  await login({ email: email.value, password: password.value })
}
</script>
