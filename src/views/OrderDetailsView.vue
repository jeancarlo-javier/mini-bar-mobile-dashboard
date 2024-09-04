<template>
  <div class="h-full bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div v-if="orderDetails" class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Order Information -->
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div class="mt-2 flex items-center justify-between text-sm text-gray-500">
          <h1 class="text-2xl font-bold text-gray-900">
            Order #{{ orderDetails.id }} - Table {{ orderDetails.tableNumber }}
          </h1>
          <div class="flex items-center">
            <span :class="statusClasses">{{ orderStatus }}</span>
          </div>
        </div>
        <div class="mt-2 flex items-center justify-between text-sm text-gray-500">
          <p>Created at: {{ formatTime(orderDetails.orderTime) }}</p>
          <p>{{ orderDetails.user.name }}</p>
        </div>
      </div>

      <!-- Order Items -->
      <div class="px-6 pt-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-1">Order Items</h2>
        <ul v-if="orderItems.length > 0">
          <OrderItem v-for="item in orderItems" :key="item.id" :item="item" />
        </ul>
        <div v-else class="text-center text-gray-500 text-sm p-2 bg-gray-100 rounded-lg">No items found</div>
      </div>
      <hr class="my-4" />
      <div class="px-6 pb-4 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-900 mb-1">Total:</h2>
        <p class="text-lg font-semibold text-gray-900">S./ {{ orderDetails.total.toFixed(2) }}</p>
      </div>
      <!-- Add Item Button -->
    </div>
    <div v-else class="flex items-center justify-center">
      <div class="text-center">...loading</div>
    </div>

    <OrderBottomActions @open-modal="openModal" />

    <!-- Add Item Modal -->
    <Teleport to="body">
      <AddProductItems :isModalOpen="isModalOpen" @close="closeModal" @add-items="addItems" />
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import type { Order, OrderItemType } from '../types/orderTypes'
import type { ProductItemDb } from '../types/productTypes'
import { FETCH_ORDER_DETAILS, FETCH_ORDER_ITEMS, ADD_ITEMS_TO_ORDER } from '../store/store'
import { formatTime } from '../utils/dates'
import OrderItem from '../components/orders/OrderItem.vue'
import OrderBottomActions from '../components/orders/OrderBottomActions.vue'
import AddProductItems from '../components/orders/AddProductItems.vue'

const store = useStore()
const route = useRoute()

const isModalOpen = ref(false)
const newItem = ref({ name: '', price: 0 })

const orderDetails = computed<Order | null>(() => store.state.orderDetails)
const orderItems = computed<OrderItemType[]>(() => store.state.orderDetails.items)

const orderStatus = computed<string>(() => {
  if (orderDetails.value?.status === 'pending') return 'Active'
  if (orderDetails.value?.status === 'completed') return 'Completed'
  if (orderDetails.value?.status === 'cancelled') return 'Cancelled'
  return 'Unknown'
})

onMounted(async () => {
  const orderId = parseInt(route.params.orderId as string)

  await store.dispatch(FETCH_ORDER_DETAILS, orderId)
  await store.dispatch(FETCH_ORDER_ITEMS, orderId)
})

const statusClasses = computed(() => {
  if (!orderDetails.value) return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium'

  switch (orderDetails.value.status) {
    case 'pending':
      return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium'
    case 'completed':
      return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
    case 'cancelled':
      return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium'
    default:
      return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium'
  }
})

// const completeOrder = () => {
//   // store.dispatch(COMPLETE_ORDER, order.value.id)
//   // order.value.status = 'Completed'
//   // order.value.updatedAt = new Date()
// }

// const togleOrderStatus = (order) => {
//   order.status = order.status === 'Active' ? 'Completed' : 'Active'
//   order.updatedAt OrderItemTypee()
// }

// const openDropdowns = ref({})

// const toggleDropdown = (itemId) => {
//   // openDropdowns.value = {
//   //   ...openDropdowns.value,
//   //   [itemId]: !openDropdowns.value[itemId]
//   // }OrderItemType
// }

// const togglePaidStatus = (item) => {
//   // item.paid = !item.paid
//   // order.value.updatedAt = new Date()
//   // closeDropdown(item.id)
// }

// const completeItem = (item) => {
//   // Implement the logic for marking an item as completed
//   // For example, you could add a 'completed' property to the item
//   // item.completed = true
//   // order.value.updatedAt = new Date()
//   // closeDropdown(item.id)
// }

// const deleteItem = (itemId) => {
//   // order.value.items = order.value.items.filter((item) => item.id !== itemId)
//   // order.value.updatedAt = new Date()
//   // closeDropdown(itemId)
// }

// const closeDropdown = (itemId) => {
//   // openDropdowns.value[itemId] = false
// }

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  newItem.value = { name: '', price: 0 }
}

const addItems = async (items: Array<ProductItemDb>) => {
  const orderId = parseInt(route.params.orderId as string)
  await store.dispatch(ADD_ITEMS_TO_ORDER, {
    orderId,
    items
  })
  closeModal()
}
</script>
