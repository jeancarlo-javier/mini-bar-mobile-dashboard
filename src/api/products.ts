import axios from 'axios'
import { Product } from '../types/productTypes'

const apiUrl = import.meta.env.VITE_ENV === 'production' ? import.meta.env.VITE_BACKEND_URL : '/api'

export async function getProducts(): Promise<Product[] | void> {
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }

  try {
    const response = await axios.get(`${apiUrl}/products`, {
      headers
    })

    if (response.status !== 200) {
      throw new Error('Failed to fetch products')
    }

    const products = response.data as Product[]
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}
