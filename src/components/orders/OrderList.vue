<template>
  <div class="space-y-4">
    <OrderCard :key="order.id" v-for="order in orders" :order="order" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import OrderCard from './OrderCard.vue'
import type { Order } from '../../types/orderTypes'

const { orders } = defineProps({
  orders: Array<Order>
})

// const markAsPaid = (order) => {
//   emit('mark-as-paid', order)
// }
</script>
