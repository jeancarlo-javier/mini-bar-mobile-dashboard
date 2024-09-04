<template>
  <div class="bg-gray-100 h-full p-4 sm:p-6 relative">
    <div class="mb-4">
      <h2 class="text-xl font-bold mb-2 text-center">Active Orders</h2>
      <OrderList :orders="activeOrders" @edit-order="openOrderModal" />
    </div>
    <div class="mb-4">
      <h2 class="text-xl font-bold mb-2 text-center">Completed Orders</h2>
      <OrderList :orders="completedOrders" @edit-order="openOrderModal" />
    </div>
    <div class="mb-4">
      <h2 class="text-xl font-bold mb-2 text-center">Cancelled Orders</h2>
      <OrderList :orders="cancelledOrders" @edit-order="openOrderModal" />
    </div>
    <NewOrder @new-order="openOrderModal" />
    <OrderModal v-if="showOrderModal" @close="closeOrderModal" @save="saveOrder" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import NewOrder from '../components/orders/NewOrder.vue'
import OrderList from '../components/orders/OrderList.vue'
import OrderModal from '../components/orders/OrderModal.vue'
import { CREATE_ORDER, FETCH_ORDERS, CLEAR_ORDER_DETAILS } from '../store/store'
import type { OrderCreate } from '../types/orderTypes'

const store = useStore()

const showOrderModal = ref<boolean>(false)

// const orders = computed(() => store.state.orders)
const activeOrders = computed(() => store.getters.ordersByStatus('pending'))
const completedOrders = computed(() => store.getters.ordersByStatus('completed'))
const cancelledOrders = computed(() => store.getters.ordersByStatus('cancelled'))

onMounted(async () => {
  store.dispatch(FETCH_ORDERS)
})

onUnmounted(() => {
  store.commit(CLEAR_ORDER_DETAILS)
})

const openOrderModal = (): void => {
  showOrderModal.value = true
}

const closeOrderModal = () => {
  showOrderModal.value = false
}

const saveOrder = (newOrder: OrderCreate) => {
  store.dispatch(CREATE_ORDER, newOrder)
  closeOrderModal()
}
</script>
