import { ref, onMounted } from 'vue'
import { getOrders } from '../api/orders'
import { Order } from '../types/orderTypes'

export const useOrders = () => {
  const orders = ref<Order[]>([])

  onMounted(async () => {
    const response = await getOrders()
    orders.value = response || []
  })

  return orders
}
