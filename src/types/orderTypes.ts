import type { User } from './userTypes'
import type { Product } from './productTypes'

export interface OrderItemDb {
  id: number
  product: Product
  order_time: Date
  quantity: number
  amount: number
  status: 'pending' | 'attended' | 'cancelled'
  paid: boolean
  order_id: number
}

export interface OrderItemType {
  id: number
  product: Product
  orderTime: Date
  quantity: number
  amount: number
  status: 'pending' | 'attended' | 'cancelled'
  paid: boolean
  orderId: number
}

export type OrderStatus = 'pending' | 'completed' | 'cancelled'

export interface Order {
  id: number
  user: User
  orderTime: Date
  lastOrderTime: Date
  status: OrderStatus
  tableNumber: number
  total: number
  items: Array<OrderItemType>
}

export interface OrderDb {
  id: number
  user: User
  order_time: Date
  last_order_time: Date
  status: OrderStatus
  table_number: number
  total: number
}

export interface OrderCreate {
  table_number: number
}
