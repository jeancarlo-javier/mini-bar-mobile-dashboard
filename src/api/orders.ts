import axios from 'axios'
import type { Order, OrderCreate, OrderDb } from '../types/orderTypes'

const formatOrder = (order: OrderDb): Order => {
  return {
    id: order.id,
    user: order.user,
    orderTime: order.order_time,
    lastOrderTime: order.last_order_time,
    status: order.status,
    tableNumber: order.table_number,
    total: order.total,
    items: []
  }
}

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
    const formattedOrders: Order[] = orders.map((order) => formatOrder(order))

    return formattedOrders
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

export async function getOrderDetails(orderId: number): Promise<Order | void> {
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }

  try {
    const response = await axios.get(`/api/orders/${orderId}`, { headers })

    if (response.status !== 200) {
      throw new Error('Failed to fetch order details')
    }

    const order = response.data as OrderDb
    const formattedOrder = formatOrder(order)

    return formattedOrder
  } catch (error) {
    console.error('Error fetching order details:', error)
  }
}

export async function createOrder(order: OrderCreate): Promise<Order | void> {
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }

  try {
    const response = await axios.post('/api/orders', order, { headers })

    if (response.status !== 201) throw new Error('Failed to create order')

    const data = response.data as OrderDb
    const formattedOrder = formatOrder(data)

    return formattedOrder
  } catch (error) {
    console.error('Error creating order:', error)
  }
}

export async function completeOrder(orderId: number): Promise<void> {
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }

  try {
    const response = await axios.patch(`/api/orders/${orderId}/complete`, {}, { headers })

    if (response.status !== 200) {
      throw new Error('Failed to complete order')
    }
  } catch (error) {
    console.error('Error completing order:', error)
  }
}
