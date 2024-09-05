<template>
  <li class="flex items-center justify-between shadow-sm border rounded-md relative">
    <div class="w-full">
      <div class="p-3 bg-gray-100">
        <div class="flex justify-between items-center">
          <span class="text-lg font-medium text-gray-900">{{ itemTitle }}</span>
          <div class="w-3 h-3 rounded-full border shadow-sm" :class="roundedStatusClass" />
        </div>
        <div class="flex items-center justify-between space-x-2 mt-1">
          <span class="text-sm text-gray-500">Created at: {{ formatedTime }}</span>
          <span class="text-sm text-gray-500 font-medium">S./ {{ itemTotal }}</span>
        </div>
      </div>
      <div v-if="orderStatus === 'pending'" class="flex gap-3 p-3">
        <button v-if="item.status !== 'attended' && !item.paid" type="button" @click="openConfirmModal">
          <Trash class="w-5 h-5 text-red-400" stroke-width="2px" />
        </button>
        <button
          type="button"
          class="flex-1 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          :class="itemPaymentStatusClass"
          @click="togglePaidStatus(item.id)"
        >
          {{ item.paid ? 'Mark as Unpaid' : 'Mark as Paid' }}
        </button>
        <button
          type="submit"
          class="flex-1 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          :class="itemStatusClass"
          @click="togleItemStatus(item.id)"
        >
          {{ itemStatusText }}
        </button>
      </div>
    </div>
    <LoaderBlurBox v-if="loading" />
    <Teleport to="body">
      <ConfirmModal v-if="isModalOpen" @close="closeConfirmModal" @confirm="cancelItem" />
    </Teleport>
  </li>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Trash } from 'lucide-vue-next'
import type { OrderItemType, OrderStatus } from '../../types/orderTypes'
import LoaderBlurBox from '../LoaderBlurBox.vue'
import { formatTime } from '../../utils/dates'
import ConfirmModal from '../modals/ConfirmModal.vue'

const emit = defineEmits(['toggle-item-paid-status', 'toggle-item-status', 'cancel-item'])
const loading = ref(false)

const { item } = defineProps<{
  item: OrderItemType
  orderStatus: OrderStatus
}>()

const isModalOpen = ref(false)

watch(
  () => item.paid,
  () => {
    loading.value = false
  }
)

watch(
  () => item.status,
  () => {
    loading.value = false
  }
)

const formatedTime = computed(() => formatTime(item.orderTime))

const itemStatusText = computed(() => {
  if (item.status === 'pending') return 'Pending'
  if (item.status === 'attended') return 'Attended'
  if (item.status === 'canceled') return 'canceled'
  return 'Unknown'
})

const itemStatusClass = computed(() => {
  if (item.status === 'pending') return 'border-amber-500 text-amber-500'
  if (item.status === 'attended') return 'bg-green-100 text-green-600 border-green-400 '
  if (item.status === 'canceled') return 'bg-gray-100 text-gray-800 border-gray-400 '
  return ''
})

const itemPaymentStatusClass = computed(() => {
  if (item.paid) return 'bg-green-100 text-green-600 border-green-400 '
  return 'text-amber-500 border-amber-400 '
})

const roundedStatusClass = computed(() => {
  if (item.status === 'canceled') return 'bg-gray-500'
  if (item.status !== 'attended' && !item.paid) return 'bg-red-500'
  if (item.status === 'attended') return item.paid ? 'bg-green-500' : 'bg-amber-500'
  if (item.status === 'pending') return 'bg-amber-500'
  return 'bg-gray-500'
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
  loading.value = true
  emit('toggle-item-status', itemId)
}

const togglePaidStatus = (itemId: number) => {
  loading.value = true
  emit('toggle-item-paid-status', itemId)
}

const cancelItem = () => {
  emit('cancel-item', item.id)
  isModalOpen.value = false
  loading.value = true
}

const openConfirmModal = () => {
  isModalOpen.value = true
}

const closeConfirmModal = () => {
  isModalOpen.value = false
}
</script>
