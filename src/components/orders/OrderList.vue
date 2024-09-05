<template>
  <div class="space-y-4">
    <div v-if="orders.length > 0 && !loadingOrders">
      <OrderCard :key="order.id" v-for="order in orders" :order="order" />
    </div>
    <div v-else-if="loadingOrders" class="flex items-center justify-center">
      <Loader />
    </div>
    <div v-else class="text-center text-gray-500 text-sm">No orders found</div>
  </div>
</template>

<script lang="ts" setup>
import type { Order } from '../../types/orderTypes'
import OrderCard from './OrderCard.vue'
import Loader from '../LoaderIcon.vue'

const { orders } = defineProps({
  orders: {
    type: Array<Order>,
    default: () => []
  },
  loadingOrders: {
    type: Boolean,
    default: false
  }
})
</script>
