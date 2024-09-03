<template>
  <div
    v-if="message"
    :class="['flex items-center p-3 rounded-md text-sm', typeClasses[type], customClass]"
    role="alert"
  >
    <component :is="iconComponent" class="w-5 h-5 mr-2 flex-shrink-0" />
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AlertCircle, AlertTriangle, Info } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    message: string
    type?: 'error' | 'warning' | 'info'
    customClass?: string
  }>(),
  {
    type: 'error',
    customClass: ''
  }
)

const typeClasses = {
  error: 'bg-red-50 text-red-700 border border-red-200',
  warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200'
}

const iconComponent = computed(() => {
  switch (props.type) {
    case 'warning':
      return AlertTriangle
    case 'info':
      return Info
    default:
      return AlertCircle
  }
})
</script>
