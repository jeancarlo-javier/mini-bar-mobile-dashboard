import axios from 'axios'
import { User } from '../types/userTypes'

interface ErrorWithStatus extends Error {
  status?: number
}

export async function getUserData(): Promise<User | void> {
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }

  try {
    const response = await axios.get('/api/me', {
      headers
    })

    if (response.status !== 200) {
      throw new Error('Failed to fetch user data')
    }

    const userData = response.data

    return userData
  } catch (error) {
    console.error('Error fetching user data:', error)
    if (typeof error === 'object' && error !== null && 'status' in error) {
      const err = error as ErrorWithStatus
      if (err.status === 401) {
        localStorage.removeItem('token')
      }
    }
  }
}
