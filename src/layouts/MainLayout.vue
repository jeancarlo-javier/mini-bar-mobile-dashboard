<template>
  <div :class="{ 'pt-[64px]': isLoggedIn }" class="main-layout">
    <NavigationBar :title="navigationTitle" :isHome="isHome" :backToLastPage="backToLastPage" />
    <div :class="{ 'h-[calc(100vh-64px)]': isLoggedIn }">
      <slot />
    </div>
  </div>
</template>

<style>
.main-layout {
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import NavigationBar from '../components/NavigationBar.vue'
import { useRoute } from 'vue-router'
import navigationTitles from '../utils/navigationTitleList'
import { useAuth } from '../composables/auth'

const route = useRoute()
const { isLoggedIn } = useAuth()

const isHome = ref<boolean>(true)
const navigationTitle = ref<string>(navigationTitles.home.title)
const backToLastPage = ref<boolean>(false)

watch(route, (to) => {
  isHome.value = to.path === '/'
  navigationTitle.value = navigationTitles[to.name as keyof typeof navigationTitles].title
  backToLastPage.value = navigationTitles[to.name as keyof typeof navigationTitles].backToLastPage
})
</script>
