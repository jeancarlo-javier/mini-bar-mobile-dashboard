import axios from 'axios'
import type { Order, OrderCreate, OrderDb, OrderItemType, OrderItemDb } from '../types/orderTypes'
import type { ProductItemDb } from '../types/productTypes'

const formatOrder = (order: OrderDb): Order => {
  return {
    id: order.id,
    user: order.user,
    orderTime: order.order_time,
    status: order.status,
    tableNumber: order.table_number,
    total: order.total,
    items: []
  }
}

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

export async function getOrderItems(orderId: number): Promise<OrderItemType[] | void> {
  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }

  try {
    const response = await axios.get(`/api/orders/${orderId}/items`, { headers })

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
    const response = await axios.post(`/api/orders/${orderId}/items`, JSON.stringify(items), { headers })
    if (response.status !== 201) throw new Error('Failed to add items to order')

    const data = response.data as OrderItemDb[]
    const formattedItems = data.map((item) => formatOrderItem(item))

    return formattedItems
  } catch (error) {
    console.error('Error adding items to order:', error)
  }
}
