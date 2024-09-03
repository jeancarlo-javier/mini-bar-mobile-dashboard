import axios from 'axios'
import { Order, OrderCreate, OrderDb } from '../types/orderTypes'

const formatOrder = (order: OrderDb): Order => {
  return {
    id: order.id,
    user: order.user,
    orderTime: order.order_time,
    status: order.status,
    tableNumber: order.table_number,
    total: order.total
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

export async function createOrder(order: OrderCreate): Promise<Order | void> {
  const headers = {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiamVhbmNhcmxvamF2aWVyNDNAZ21haWwuY29tIiwiZXhwIjoxNzI1NDE2MDM1fQ.ee8WO3A4urpN4FkvckFc0qwUJpNx_Yolojjg-aPT8jM',
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
