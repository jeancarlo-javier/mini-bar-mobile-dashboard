<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
    >
      <h2 class="text-xl font-bold mb-4">
        {{ editingOrder ? 'Edit Order' : 'New Order' }}
      </h2>
      <form @submit.prevent="saveOrder">
        <!-- Form inputs... -->
        <div class="mt-6 flex justify-end space-x-2">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Save Order
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['close', 'save'])

const { editingOrder } = defineProps({
  show: Boolean,
  editingOrder: Object
})

const closeModal = () => {
  emit('close')
}

const saveOrder = () => {
  emit('save', editingOrder)
}
</script>
