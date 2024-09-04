<template>
  <div class="flex space-x-2">
    <button
      v-for="item in items"
      :key="item"
      :class="['px-4 py-2 rounded-lg', selectedItem === item ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700']"
      type="button"
      @click="() => selectItem(item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  items: Array<number>
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:selectedItem', value: number): void
}>()

const selectedItem = ref<number | null>(null)

function selectItem(item: number) {
  selectedItem.value = item
  emit('update:selectedItem', selectedItem.value)
}
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
