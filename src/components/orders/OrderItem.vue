<template>
  <li class="py-2 flex items-center justify-between">
    <div class="w-full border p-4 rounded-md">
      <div class="flex justify-between items-center mb-2">
        <span class="text-lg font-medium text-gray-900">{{ itemTitle }}</span>
        <span class="text-sm text-gray-500">S./ {{ item.amount.toFixed(2) }}</span>
      </div>
      <div>
        <div class="grid grid-cols-2 gap-1">
          <button
            type="button"
            class="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Mark as Paid
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { OrderItemType } from '../../types/orderTypes'

const { item } = defineProps<{
  item: OrderItemType
}>()

const itemTitle = computed(() => {
  let title = item.product.name
  if (item.quantity > 1) {
    title += ` x ${item.quantity}`
  }

  return title
})
</script>
