import axios from 'axios'
import { Order, OrderDb } from '../types/orderTypes'

export async function getOrders(): Promise<Order[] | void> {
  try {
    const response = await axios.get('/api/orders', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 200) {
      throw new Error('Failed to fetch orders')
    }

    const orders = response.data as OrderDb[]
    const formattedOrders: Order[] = orders.map((order) => ({
      id: order.id,
      user: order.user,
      orderTime: order.order_time,
      status: order.status,
      tableNumber: order.table_number,
      total: order.total
    }))

    return formattedOrders
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}
