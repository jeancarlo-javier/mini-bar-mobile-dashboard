<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
      <h2 class="text-xl font-bold mb-4">
        {{ editingOrder ? 'Edit Order' : 'New Order' }}
      </h2>
      <form @submit.prevent="saveOrder">
        <div>
          <label class="text-md font-medium text-gray-7005 block mb-2">Table Number</label>
          <SelectableButtons :items="options" @update:selectedItem="handleSelection" />
        </div>
        <!-- errorMessage -->
        <FormError :message="errorMessage || ''" type="error" class="mt-4" />
        <hr class="mt-6" />
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
            class="bg-green-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Create Order
          </button>
        </div>
      </form>
      <LoaderBlurBox v-if="loading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SelectableButtons from '../inputs/SelectableButtons.vue'
import { OrderCreate } from '../../types/orderTypes'
import FormError from '../FormError.vue'
import LoaderBlurBox from '../LoaderBlurBox.vue'

const emit = defineEmits(['close', 'save'])

const loading = ref(false)

const options = [1, 2, 3, 4, 5, 6]
const selectedTableNumber = ref<number | null>(null)
const editingOrder = ref<OrderCreate | null>(null)
const errorMessage = ref<string | null>(null)

function handleSelection(value: number) {
  selectedTableNumber.value = value
}

const closeModal = () => {
  emit('close')
}

const saveOrder = () => {
  loading.value = true

  if (!selectedTableNumber.value) {
    loading.value = false
    return (errorMessage.value = 'Table number is required')
  }

  const order: OrderCreate = {
    table_number: selectedTableNumber.value
  }

  editingOrder.value = order

  emit('save', editingOrder.value)
}
</script>
