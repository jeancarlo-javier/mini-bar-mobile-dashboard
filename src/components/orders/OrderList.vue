<template>
  <div class="space-y-4">
    <OrderCard :key="order.id" v-for="order in orders" :order="order" />
    <div v-if="orders?.length === 0" class="text-center text-gray-500 text-sm">No orders found</div>
  </div>
</template>

<script lang="ts" setup>
import OrderCard from './OrderCard.vue'
import type { Order } from '../../types/orderTypes'

const { orders } = defineProps({
  orders: Array<Order>
})
</script>
