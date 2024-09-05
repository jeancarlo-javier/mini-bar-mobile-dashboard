import axios from 'axios'

interface LoginParams {
  email: string
  password: string
}

export async function login({ email, password }: LoginParams): Promise<void> {
  try {
    const response = await axios.post(
      '/api/login',
      new URLSearchParams({
        grant_type: 'password',
        username: email,
        password: password
      }),
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    // Store the token in local storage
    localStorage.setItem('token', response.data.access_token)

    // Redirect to the home page
    window.location.replace('/')
  } catch (error) {
    console.error('Error during login:', error)
  }
}

export async function logout(): Promise<void> {
  try {
    // Remove the token from local storage
    localStorage.removeItem('token')

    // Redirect to the login page
    window.location.replace('/login')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}
