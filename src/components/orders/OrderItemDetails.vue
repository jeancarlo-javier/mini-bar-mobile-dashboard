<template>
  <div class="bg-gray-50 p-4 border-t border-gray-200">
    <h4 class="font-semibold mb-2">Order Items:</h4>
    <ul class="space-y-2">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex justify-between items-center"
      >
        <span>{{ item.name }} (x{{ item.quantity }})</span>
        <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
      </li>
    </ul>
    <div
      class="mt-4 pt-2 border-t border-gray-200 flex justify-between items-center font-semibold"
    >
      <span>Total:</span>
      <span>${{ calculateTotal(items) }}</span>
    </div>
  </div>
</template>

<script setup>
const { items } = defineProps({
  items: Array
})

const calculateTotal = (items) => {
  return items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2)
}
</script>
