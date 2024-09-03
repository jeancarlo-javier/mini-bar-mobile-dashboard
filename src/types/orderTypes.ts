import type { User } from './userTypes'

export interface Order {
  id: number
  user: User
  orderTime: Date
  status: string
  tableNumber: number
  total: number
}

export interface OrderDb {
  id: number
  user: User
  order_time: Date
  status: string
  table_number: number
  total: number
}
