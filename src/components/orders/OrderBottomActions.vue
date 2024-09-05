<template>
  <div class="grid gap-3 grid-cols-2 p-3 bg-white fixed bottom-0 w-full left-0">
    <button
      @click="openModal"
      class="w-full text-lg p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Add Item
    </button>
    <button
      @click="openConfirmModal"
      :disabled="!allowCompleteOrder"
      class="w-full text-lg p-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      :class="{ 'opacity-50': !allowCompleteOrder }"
    >
      Complete Order
    </button>
    <Teleport to="body">
      <ConfirmModal v-if="isModalOpen" @close="closeConfirmModal" @confirm="completeOrder" />
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ConfirmModal from '../modals/ConfirmModal.vue'

const emit = defineEmits(['open-modal', 'complete-order'])

const isModalOpen = ref(false)

const { allowCompleteOrder } = defineProps<{
  allowCompleteOrder: boolean
}>()

const openModal = () => {
  emit('open-modal')
}

const completeOrder = async () => {
  emit('complete-order')
  isModalOpen.value = false
}

const openConfirmModal = () => {
  isModalOpen.value = true
}

const closeConfirmModal = () => {
  isModalOpen.value = false
}
</script>
