<template>
  <div class="grid grid-cols-2 gap-3 p-3 bg-white fixed bottom-0 w-full left-0">
    <button
      @click="openModal"
      class="w-full text-lg p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Add Item
    </button>
    <button
      @click="completeOrder"
      class="w-full text-lg p-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      Complete Order
    </button>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['open-modal', 'complete-order'])

const openModal = () => {
  emit('open-modal')
}

const completeOrder = () => {
  emit('complete-order')
}
</script>
