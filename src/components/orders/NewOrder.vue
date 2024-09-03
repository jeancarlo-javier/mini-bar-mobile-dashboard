<template>
  <div class="p-3 flex bg-white flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 fixed bottom-0 w-full left-0">
    <button
      @click="onNewOrder"
      class="bg-indigo-600 text-white p-2 w-full rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
      v-if="userRole === 'admin'"
    >
      <PlusIcon class="h-5 w-5 inline-block mr-1" /> New Order
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { PlusIcon } from 'lucide-vue-next'

const emit = defineEmits(['new-order'])

const userRole = ref('admin')

const onNewOrder = () => {
  emit('new-order')
}
</script>
