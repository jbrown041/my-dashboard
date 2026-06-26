// useNavStore — tracks sidebar open/collapsed state
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavStore = defineStore('nav', () => {
  const isCollapsed = ref(false)
  function toggle() {
    isCollapsed.value = !isCollapsed.value
  }
  return { isCollapsed, toggle }
})
