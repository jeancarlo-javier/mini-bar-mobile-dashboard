import axios from 'axios'
import type { OrderItemDb, OrderItemType } from '../types/orderTypes'
import type { ProductItemDb } from '../types/productTypes'

const apiUrl = import.meta.env.VITE_ENV === 'production' ? import.meta.env.VITE_BACKEND_URL : '/api'

const formatOrderItem = (item: OrderItemDb): OrderItemType => {
  return {
    id: item.id,
    product: item.product,
    orderTime: item.order_time,
    quantity: item.quantity,
    amount: item.amount,
    status: item.status,
    paid: item.paid,
    orderId: item.order_id
  }
}

export async function getOrderItems(orderId: number): Promise<OrderItemType[] | void> {
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }

  try {
    const response = await axios.get(`${apiUrl}/orders/${orderId}/items`, { headers })

    if (response.status !== 200) {
      throw new Error('Failed to fetch order items')
    }

    const items = response.data as OrderItemDb[]
    const formattedItems = items.map((item) => formatOrderItem(item))

    return formattedItems
  } catch (error) {
    console.error('Error fetching order items:', error)
  }
}

export async function addItemsToOrder(orderId: number, items: Array<ProductItemDb>): Promise<OrderItemType[] | void> {
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }

  try {
    const response = await axios.post(`${apiUrl}/orders/${orderId}/items`, JSON.stringify(items), { headers })
    if (response.status !== 201) throw new Error('Failed to add items to order')

    const data = response.data as OrderItemDb[]
    const formattedItems = data.map((item) => formatOrderItem(item))

    return formattedItems
  } catch (error) {
    console.error('Error adding items to order:', error)
  }
}

export async function toggleItemStatusByType(
  itemId: number,
  statusType: 'item_status' | 'item_payment_status'
): Promise<void> {
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }

  try {
    const response = await axios.patch(`${apiUrl}/items/${itemId}/toggle-status`, { status: statusType }, { headers })

    if (response.status !== 200) {
      throw new Error('Failed to toggle item status')
    }
  } catch (error) {
    console.error('Error toggling item status:', error)
  }
}

export async function cancelItem(orderId: number): Promise<void> {
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }

  try {
    const response = await axios.patch(`${apiUrl}/items/${orderId}/cancel`, {}, { headers })

    if (response.status !== 200) {
      throw new Error('Failed to cancel item.')
    }
  } catch (error) {
    console.error('Error canceling items:', error)
  }
}
