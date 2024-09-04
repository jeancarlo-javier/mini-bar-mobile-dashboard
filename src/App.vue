<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import MainLayout from './layouts/MainLayout.vue'
import { FETCH_PRODUCTS, FETCH_USER_DATA } from './store/store'

const store = useStore()

onMounted(async () => {
  store.dispatch(FETCH_USER_DATA)
  store.dispatch(FETCH_PRODUCTS)
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
