<template>
  <div class="bg-gray-100 h-full p-4 sm:p-6 relative">
    <OrderList :orders="orders" @edit-order="openOrderModal" @mark-as-paid="markAsPaid" />
    <NewOrder @new-order="openOrderModal" />
    <OrderModal
      v-if="showOrderModal"
      :editing-order="currentOrder"
      @close="closeOrderModal"
      @save="saveOrder"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NewOrder from '../components/NewOrder.vue'
import OrderList from '../components/orders/OrderList.vue'
import OrderModal from '../components/orders/OrderModal.vue'
// import { RefreshCcw } from 'lucide-vue-next'

// Lógica de estado original
const orders = ref([
  {
    id: 1,
    title: 'Order #1234',
    user: 'John Doe',
    table: 5,
    time: new Date(),
    total: 15.99,
    paymentStatus: 'pending',
    items: [
      { id: 1, name: 'Burger', quantity: 1, price: 9.99 },
      { id: 2, name: 'Fries', quantity: 1, price: 3.99 },
      { id: 3, name: 'Soda', quantity: 1, price: 2.01 }
    ]
  }
  // Más órdenes...
])

const showOrderModal = ref(false)
const currentOrder = ref(null)

const openOrderModal = (order = null) => {
  currentOrder.value = order
    ? { ...order }
    : { user: '', tableNumber: null, status: 'pending', items: [] }
  showOrderModal.value = true
}

const closeOrderModal = () => {
  showOrderModal.value = false
  currentOrder.value = null
}

const saveOrder = (order) => {
  if (order.id) {
    const index = orders.value.findIndex((o) => o.id === order.id)
    orders.value[index] = { ...order }
  } else {
    order.id = orders.value.length + 1
    orders.value.push(order)
  }
  closeOrderModal()
}

const markAsPaid = (order) => {
  order.paymentStatus = 'paid'
}
</script>
