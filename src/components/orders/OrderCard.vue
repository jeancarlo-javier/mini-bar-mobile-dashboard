<template>
  <div
    class="bg-white rounded-lg shadow-md p-4 mb-4 max-w-sm mx-auto cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-[1.03] active:scale-95"
    @click="goToDetails"
  >
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold text-gray-800">{{ `Order #${order.id}` }}</h2>
      <span class="text-sm text-gray-600">Table {{ order.tableNumber }}</span>
    </div>

    <div class="flex justify-between items-center mb-2">
      <span class="text-sm text-gray-600">{{ order.user.name }}</span>
      <span class="text-sm text-gray-600">{{ formatTime(order.orderTime) }}</span>
    </div>

    <div class="border-t border-gray-200 my-2"></div>

    <div class="flex justify-between items-center mb-2">
      <span class="font-semibold text-gray-800">Total: ${{ order.total.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import type { Order } from '../../types/orderTypes'

// const emit = defineEmits(['view-details'])
const router = useRouter()

interface Props {
  order: Order
}

const { order } = defineProps<Props>()

const formatTime = (time: Date) => {
  return new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const goToDetails = () => {
  console.log(order)
  router.push({ name: 'order-details', params: { orderId: order.id } })
}
</script>
