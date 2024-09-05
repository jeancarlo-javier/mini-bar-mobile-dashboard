<template>
  <li class="flex items-center justify-between shadow-sm border rounded-md">
    <div class="w-full">
      <div class="flex justify-between items-center p-3 bg-gray-100">
        <span class="text-lg font-medium text-gray-900">{{ itemTitle }}</span>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500 px-2 py-1 bg-white rounded-full shadow-sm">{{ formatedTime }}</span>
          <span class="text-sm text-gray-500 px-2 py-1 bg-white rounded-full shadow-sm">S./ {{ itemTotal }}</span>
        </div>
      </div>
      <div>
        <div class="flex gap-3 p-3">
          <button type="button">
            <Trash class="w-5 h-5 text-red-400" stroke-width="2px" />
          </button>
          <button
            type="button"
            class="flex-1 px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            :class="itemPaymentStatusClass"
            @click="togglePaidStatus(item.id)"
          >
            {{ item.paid ? 'Mark as Unpaid' : 'Mark as Paid' }}
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            :class="itemStatusClass"
            @click="togleItemStatus(item.id)"
          >
            {{ itemStatusText }}
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { OrderItemType } from '../../types/orderTypes'
import { formatTime } from '../../utils/dates'
import { Trash } from 'lucide-vue-next'

const emit = defineEmits(['toggle-item-paid-status', 'toggle-item-status'])

const { item } = defineProps<{
  item: OrderItemType
}>()

const formatedTime = computed(() => formatTime(item.orderTime))

const itemStatusText = computed(() => {
  if (item.status === 'pending') return 'Pending'
  if (item.status === 'attended') return 'Attended'
  if (item.status === 'cancelled') return 'Cancelled'
  return 'Unknown'
})

const itemStatusClass = computed(() => {
  if (item.status === 'pending') return 'border-amber-500 text-amber-500'
  if (item.status === 'attended') return 'bg-green-100 text-green-800 border-green-400 '
  if (item.status === 'cancelled') return 'bg-gray-100 text-gray-800 border-gray-400 '
  return ''
})

const itemPaymentStatusClass = computed(() => {
  if (item.paid) return 'bg-green-100 text-green-600 border-green-400 '
  return 'text-green-600 border-green-400 '
})

const itemTitle = computed(() => {
  let title = item.product.name
  if (item.quantity > 1) {
    title += ` x ${item.quantity}`
  }

  return title
})

const itemTotal = computed(() => {
  const total = item.amount
  return total.toFixed(2)
})

const togleItemStatus = (itemId: number) => {
  emit('toggle-item-status', itemId)
}

const togglePaidStatus = (itemId: number) => {
  emit('toggle-item-paid-status', itemId)
}
</script>
