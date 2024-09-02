<template>
  <div class="main-layout">
    <NavigationBar :title="navigationTitle" :isHome="isHome" />
    <div class="h-[calc(100vh-64px)]">
      <slot />
    </div>
  </div>
</template>

<style>
.main-layout {
  padding-top: 64px;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import NavigationBar from '../components/NavigationBar.vue'
import { useRoute } from 'vue-router'
import navigationTitles from '../utils/navigationTitleList'

const route = useRoute()

const isHome = ref<boolean>(true)
const navigationTitle = ref<string>(navigationTitles.home)

watch(route, (to) => {
  isHome.value = to.path === '/'
  navigationTitle.value = navigationTitles[to.name as keyof typeof navigationTitles]
})
</script>
