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
            class="flex-1 px-4 py-2 border border-green-400 rounded-md text-sm font-medium text-green-400 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Mark as paid
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 border border-amber-400 text-amber-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Pending
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

const { item } = defineProps<{
  item: OrderItemType
}>()

const formatedTime = computed(() => formatTime(item.orderTime))

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
</script>
