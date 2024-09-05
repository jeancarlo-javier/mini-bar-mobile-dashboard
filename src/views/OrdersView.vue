<template>
  <div class="bg-gray-100 h-full p-4 sm:p-6 relative">
    <div class="mb-4">
      <h2 class="text-xl font-bold mb-2 text-center">Active Orders</h2>
      <OrderList :orders="activeOrders" :loadingOrders="loadingOrders" @edit-order="openOrderModal" />
    </div>
    <div class="mb-4">
      <h2 class="text-xl font-bold mb-2 text-center">Completed Orders</h2>
      <OrderList :orders="completedOrders" :loadingOrders="loadingOrders" @edit-order="openOrderModal" />
    </div>
    <div class="mb-4">
      <h2 class="text-xl font-bold mb-2 text-center">Cancelled Orders</h2>
      <OrderList :orders="cancelledOrders" :loadingOrders="loadingOrders" @edit-order="openOrderModal" />
    </div>
    <NewOrder @new-order="openOrderModal" />
    <CreateOrderModal v-if="showOrderModal" @close="closeOrderModal" @save="createOrder" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { OrderCreate, Order } from '../types/orderTypes'
import { CREATE_ORDER, FETCH_ORDERS, CLEAR_ORDER_DETAILS } from '../store/store'
import NewOrder from '../components/orders/NewOrder.vue'
import OrderList from '../components/orders/OrderList.vue'
import CreateOrderModal from '../components/orders/CreateOrderModal.vue'

const store = useStore()
const router = useRouter()

const showOrderModal = ref<boolean>(false)

const activeOrders = computed(() => store.getters.ordersByStatus('pending'))
const completedOrders = computed(() => store.getters.ordersByStatus('completed'))
const cancelledOrders = computed(() => store.getters.ordersByStatus('cancelled'))

const loadingOrders = ref(true)

onMounted(async () => {
  await store.dispatch(FETCH_ORDERS)
  loadingOrders.value = false
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

const createOrder = async (orderCreateData: OrderCreate) => {
  const createdOrder = (await store.dispatch(CREATE_ORDER, orderCreateData)) as Order
  router.push({ name: 'order-details', params: { orderId: createdOrder.id } })
  closeOrderModal()
}
</script>
