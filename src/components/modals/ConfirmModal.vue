<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Confirm Action</h2>
      <p class="text-md text-gray-700 mb-6">Are you sure you want to complete this order?</p>
      <div class="flex justify-end space-x-2">
        <button
          type="button"
          @click="onClose"
          class="bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="onConfirm"
          class="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close', 'confirm'])

const onClose = () => {
  emit('close')
}

const onConfirm = () => {
  emit('confirm')
}
</script>
