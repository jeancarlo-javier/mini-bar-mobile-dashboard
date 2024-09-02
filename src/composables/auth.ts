import { ref, Ref } from 'vue'
import { isAuthenticated } from '../utils/auth'
import { logout as logoutAuth, login as loginAuth } from '../api/auth'

interface Auth {
  isLoggedIn: Ref<boolean>
  login: ({ email, password }: { email: string; password: string }) => void
  logout: () => void
}

export const useAuth = (): Auth => {
  const isLoggedIn = ref(isAuthenticated())

  async function login({ email, password }: { email: string; password: string }): Promise<void> {
    await loginAuth({ email, password })
    isLoggedIn.value = true
  }

  async function logout(): Promise<void> {
    await logoutAuth()
    isLoggedIn.value = false
  }

  return { isLoggedIn, login, logout }
}
