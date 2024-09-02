<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div
      class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <!-- Order Information -->
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div
          class="mt-2 flex items-center justify-between text-sm text-gray-500"
        >
          <h1 class="text-2xl font-bold text-gray-900">{{ order.title }}</h1>
          <div class="flex items-center">
            <span :class="statusClasses">{{ order.status }}</span>
          </div>
        </div>
        <div
          class="mt-2 flex items-center justify-between text-sm text-gray-500"
        >
          <div>
            <p>Created: {{ formatDate(order.createdAt) }}</p>
            <p>Updated: {{ formatDate(order.updatedAt) }}</p>
          </div>
        </div>
      </div>

      <!-- User Information -->
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">User Information</h2>
        <p class="mt-2 text-sm text-gray-600">{{ order.user.name }}</p>
        <p class="text-sm text-gray-600">{{ order.user.email }}</p>
      </div>

      <!-- Order Items -->
      <div class="px-6 py-4">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
        <ul class="divide-y divide-gray-200">
          <li
            v-for="item in order.items"
            :key="item.id"
            class="py-4 flex items-center justify-between"
          >
            <div class="flex items-center">
              <span class="text-sm font-medium text-gray-900">{{
                item.name
              }}</span>
              <span class="ml-2 text-sm text-gray-500"
                >${{ item.price.toFixed(2) }}</span
              >
            </div>
            <div class="flex items-center">
              <div class="relative">
                <button
                  @click="toggleDropdown(item.id)"
                  class="ml-4 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  :aria-expanded="openDropdowns[item.id] ? 'true' : 'false'"
                  :aria-controls="`dropdown-${item.id}`"
                >
                  <MoreVerticalIcon class="h-5 w-5" />
                </button>
                <div
                  v-if="openDropdowns[item.id]"
                  :id="`dropdown-${item.id}`"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                >
                  <div class="py-1" role="menu" aria-orientation="vertical">
                    <button
                      @click="togglePaidStatus(item)"
                      class="w-full text-left px-4 py-2 text-sm"
                      :class="item.paid ? 'bg-green-100' : 'bg-yellow-100'"
                      role="menuitem"
                    >
                      Mark as {{ item.paid ? 'Unpaid' : 'Paid' }}
                    </button>
                    <button
                      @click="completeItem(item)"
                      class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                    >
                      Mark as Completed
                    </button>
                    <button
                      @click="deleteItem(item.id)"
                      class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                      role="menuitem"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Add Item Button -->
      <div class="px-6 py-4 bg-gray-50">
        <button
          @click="openModal"
          class="w-full px-4 mb-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Item
        </button>
        <button
          @click="completeOrder"
          class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Complete Order
        </button>
      </div>
    </div>

    <!-- Add Item Modal -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Add New Item</h3>
          </div>
          <form @submit.prevent="addItem" class="px-6 py-4">
            <div class="mb-4">
              <label
                for="itemName"
                class="block text-sm font-medium text-gray-700"
                >Item Name</label
              >
              <input
                type="text"
                id="itemName"
                v-model="newItem.name"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div class="mb-4">
              <label
                for="itemPrice"
                class="block text-sm font-medium text-gray-700"
                >Price</label
              >
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

<script setup>
import { ref, computed } from 'vue'
import { MoreVerticalIcon } from 'lucide-vue-next'

// Mock order data
const order = ref({
  id: 1,
  title: 'Order #12345',
  createdAt: new Date('2023-05-01T10:00:00'),
  updatedAt: new Date('2023-05-02T14:30:00'),
  status: 'Active',
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com'
  },
  items: [
    { id: 1, name: 'Item 1', price: 10.99, paid: true },
    { id: 2, name: 'Item 2', price: 15.99, paid: false },
    { id: 3, name: 'Item 3', price: 5.99, paid: true }
  ]
})

const isModalOpen = ref(false)
const newItem = ref({ name: '', price: 0 })

const statusClasses = computed(() => {
  switch (order.value.status) {
    case 'Active':
      return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium'
    case 'Completed':
      return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
    case 'Cancelled':
      return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium'
    default:
      return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium'
  }
})

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const completeOrder = () => {
  order.value.status = 'Completed'
  order.value.updatedAt = new Date()
}

const togleOrderStatus = (order) => {
  order.status = order.status === 'Active' ? 'Completed' : 'Active'
  order.updatedAt = new Date()
}

const openDropdowns = ref({})

const toggleDropdown = (itemId) => {
  openDropdowns.value = {
    ...openDropdowns.value,
    [itemId]: !openDropdowns.value[itemId]
  }
}

const togglePaidStatus = (item) => {
  item.paid = !item.paid
  order.value.updatedAt = new Date()
  closeDropdown(item.id)
}

const completeItem = (item) => {
  // Implement the logic for marking an item as completed
  // For example, you could add a 'completed' property to the item
  item.completed = true
  order.value.updatedAt = new Date()
  closeDropdown(item.id)
}

const deleteItem = (itemId) => {
  order.value.items = order.value.items.filter((item) => item.id !== itemId)
  order.value.updatedAt = new Date()
  closeDropdown(itemId)
}

const closeDropdown = (itemId) => {
  openDropdowns.value[itemId] = false
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  newItem.value = { name: '', price: 0 }
}

const addItem = () => {
  const newItemId = Math.max(...order.value.items.map((item) => item.id)) + 1
  order.value.items.push({
    id: newItemId,
    name: newItem.value.name,
    price: parseFloat(newItem.value.price),
    paid: false
  })
  order.value.updatedAt = new Date()
  closeModal()
}
</script>
