<template>
  <div class="h-full bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div v-if="orderDetails" class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Order Information -->
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div class="mt-2 flex items-center justify-between text-sm text-gray-500">
          <h1 class="text-2xl font-bold text-gray-900">Order #{{ orderDetails.id }}</h1>
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
        <ul>
          <OrderItem v-for="item in orderItems" :key="item.id" :item="item" />
        </ul>
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
    <OrderBottomActions />

    <!-- Add Item Modal -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Add New Item</h3>
          </div>
          <form @submit.prevent="addItem" class="px-6 py-4">
            <div class="mb-4">
              <label for="itemName" class="block text-sm font-medium text-gray-700">Item Name</label>
              <input
                type="text"
                id="itemName"
                v-model="newItem.name"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div class="mb-4">
              <label for="itemPrice" class="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                id="itemPrice"
                v-model="newItem.price"
                required
                step="0.01"
                min="0"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                @click="closeModal"
                class="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { FETCH_ORDER_DETAILS, FETCH_ORDER_ITEMS } from '../store/store'
import { formatTime } from '../utils/dates'
import OrderItem from '../components/orders/OrderItem.vue'
import OrderBottomActions from '../components/orders/OrderBottomActions.vue'
import type { Order, OrderItemType } from '../types/orderTypes'

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

const completeOrder = () => {
  // store.dispatch(COMPLETE_ORDER, order.value.id)
  // order.value.status = 'Completed'
  // order.value.updatedAt = new Date()
}

// const togleOrderStatus = (order) => {
//   order.status = order.status === 'Active' ? 'Completed' : 'Active'
//   order.updatedAt OrderItemTypee()
// }

const openDropdowns = ref({})

const toggleDropdown = (itemId) => {
  // openDropdowns.value = {
  //   ...openDropdowns.value,
  //   [itemId]: !openDropdowns.value[itemId]
  // }OrderItemType
}

const togglePaidStatus = (item) => {
  // item.paid = !item.paid
  // order.value.updatedAt = new Date()
  // closeDropdown(item.id)
}

const completeItem = (item) => {
  // Implement the logic for marking an item as completed
  // For example, you could add a 'completed' property to the item
  // item.completed = true
  // order.value.updatedAt = new Date()
  // closeDropdown(item.id)
}

const deleteItem = (itemId) => {
  // order.value.items = order.value.items.filter((item) => item.id !== itemId)
  // order.value.updatedAt = new Date()
  // closeDropdown(itemId)
}

const closeDropdown = (itemId) => {
  // openDropdowns.value[itemId] = false
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  newItem.value = { name: '', price: 0 }
}

const addItem = () => {
  // const newItemId = Math.max(...order.value.items.map((item) => item.id)) + 1
  // order.value.items.push({
  //   id: newItemId,
  //   name: newItem.value.name,
  //   price: parseFloat(newItem.value.price),
  //   paid: false
  // })
  // order.value.updatedAt = new Date()
  closeModal()
}
</script>
