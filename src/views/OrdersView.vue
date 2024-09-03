<template>
  <div class="bg-gray-100 h-full p-4 sm:p-6 relative">
    <OrderList :orders="orders" @edit-order="openOrderModal" @mark-as-paid="markAsPaid" />
    <NewOrder @new-order="openOrderModal" />
    <OrderModal v-if="showOrderModal" :editing-order="currentOrder" @close="closeOrderModal" @save="saveOrder" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NewOrder from '../components/orders/NewOrder.vue'
import OrderList from '../components/orders/OrderList.vue'
import OrderModal from '../components/orders/OrderModal.vue'
// import { useOrders } from '../composables/orders'
import type { Order } from '../types/orderTypes'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
// import { RefreshCcw } from 'lucide-vue-next'

const store = useStore()

const showOrderModal = ref<boolean>(false)
const currentOrder = ref<Order | null>(null)

const orders = computed(() => store.state.orders)

onMounted(() => {
  store.dispatch('fetchOrders')
})

// watch(fetchedOrders, (newOrders) => {
//   orders.value = newOrders
// })

const openOrderModal = (order: Order | null = null) => {
  // currentOrder.value = order ? { ...order } : { user: '', tableNumber: null, status: 'pending', items: [] }
  showOrderModal.value = true
}

const closeOrderModal = () => {
  showOrderModal.value = false
  currentOrder.value = null
}

const saveOrder = (order) => {
  // if (order.id) {
  //   const index = orders.value.findIndex((o) => o.id === order.id)
  //   orders.value[index] = { ...order }
  // } else {
  //   order.id = orders.value.length + 1
  //   orders.value.push(order)
  // }
  closeOrderModal()
}

const markAsPaid = (order: Order) => {
  // order.paymentStatus = 'paid'
}
</script>
