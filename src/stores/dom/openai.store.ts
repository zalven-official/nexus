/// <reference types="chrome" />
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useOpenAiStore = defineStore('openAi', () => {
  const openaiApiKey = ref('')

  return { openaiApiKey }
})