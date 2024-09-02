<template>
  <div class="space-y-4">
    <OrderCard
      v-for="order in filteredOrders"
      :key="order.id"
      :order="order"
      :expanded="expandedOrders.includes(order.id)"
      @toggle-details="toggleOrderDetails(order.id)"
      @edit-order="openOrderModal(order)"
      @mark-as-paid="markAsPaid(order)"
    />
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, defineProps } from 'vue'
import OrderCard from './OrderCard.vue'

const { orders: propsOrders } = defineProps({
  orders: Array
})

const orders = ref(propsOrders || [])
const expandedOrders = ref([])
const statusFilter = ref('')
const searchQuery = ref('')

const emit = defineEmits(['edit-order', 'mark-as-paid'])

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesStatus =
      !statusFilter.value || order.status === statusFilter.value
    const matchesSearch =
      !searchQuery.value ||
      order.user.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.tableNumber.toString().includes(searchQuery.value)
    return matchesStatus && matchesSearch
  })
})

const toggleOrderDetails = (orderId) => {
  const index = expandedOrders.value.indexOf(orderId)
  if (index === -1) {
    expandedOrders.value.push(orderId)
  } else {
    expandedOrders.value.splice(index, 1)
  }
}

const openOrderModal = (order) => {
  emit('edit-order', order)
}

const markAsPaid = (order) => {
  emit('mark-as-paid', order)
}
</script>
