<template>
  <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full relative">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Add New Item</h3>
      </div>
      <form @submit.prevent="submitForm">
        <div class="bg-gray-100">
          <AddProductList :initialProducts="products" @edit-items="editItems" />
          <FormError :message="errorMessage || ''" type="error" class="mt-4" />
        </div>
        <div class="flex justify-end px-6 py-4">
          <button
            type="button"
            @click="closeModal"
            class="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Item
          </button>
        </div>
      </form>
      <LoaderBlurBox v-if="loading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRef } from 'vue'
import { useStore } from 'vuex'
import type { ProductItem, ProductItemDb } from '../../types/productTypes'
import FormError from '../FormError.vue'
import AddProductList from '../AddProductList.vue'
import LoaderBlurBox from '../LoaderBlurBox.vue'

const loading = ref(false)

const props = defineProps<{
  isModalOpen: boolean
}>()

const modalOpenRef = toRef(props, 'isModalOpen')

watch(modalOpenRef, () => {
  loading.value = false
})

const store = useStore()

const emit = defineEmits(['close', 'add-items'])

const items = ref<Array<ProductItemDb>>([])
const errorMessage = ref<string | null>(null)

const products = computed(() => store.state.products)

const editItems = (newItems: Array<ProductItem>) => {
  const formatedItems: Array<ProductItemDb> = []

  // Remove products that don't have a quantity
  newItems.forEach((item) => {
    if (item.quantity > 0) {
      formatedItems.push({
        product_id: item.id,
        quantity: item.quantity
      })
    }
  })

  items.value = formatedItems
}

const reset = () => {
  items.value = []
  errorMessage.value = null
  loading.value = false
}

const closeModal = () => {
  emit('close')
  reset()
}

const submitForm = () => {
  loading.value = true

  if (items.value.length === 0) {
    loading.value = false
    return (errorMessage.value = 'Please add at least one item.')
  }

  emit('add-items', items.value)
}
</script>
