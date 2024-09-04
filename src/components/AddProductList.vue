<template>
  <div class="">
    <ul class="space-y-4">
      <li v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md p-4">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
            <p class="text-gray-600">S./ {{ product.price.toFixed(2) }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <button
              type="button"
              @click="decrementQuantity(product)"
              class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300"
              :disabled="product.quantity <= 0"
            >
              <MinusIcon class="w-4 h-4" />
            </button>
            <span class="text-gray-800 w-8 text-center">{{ product.quantity }}</span>
            <button
              type="button"
              @click="incrementQuantity(product)"
              class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <PlusIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { PlusIcon, MinusIcon } from 'lucide-vue-next'
import { ProductItem, Product } from '../types/productTypes'

const emit = defineEmits(['edit-items'])

const props = defineProps<{
  initialProducts: Array<Product>
}>()

const products = ref<Array<ProductItem>>(
  props.initialProducts.map((product) => ({
    ...product,
    quantity: 0
  }))
)

const incrementQuantity = (product: ProductItem) => {
  product.quantity++

  emit('edit-items', products.value)
}

const decrementQuantity = (product: ProductItem) => {
  if (product.quantity > 0) {
    product.quantity--
  }

  emit('edit-items', products.value)
}
</script>
