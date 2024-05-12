/// <reference types="chrome" />
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { stringToHash, encodeString, decodeString, readableDateTime } from '@/lib'
import { useToast } from '@/components/ui/toast'

enum SecretKeyTypes {
  OPENAI_API_KEY = 'f3YvP0t3mlohGm78OsC5keljWtyOu5AYzix'
}

export const useSecretKeyStore = defineStore('secret-key', () => {
  const openaiApiKey = ref()
  const isLoading = ref(false)
  const { toast } = useToast()


  const openai_api_key = stringToHash(SecretKeyTypes.OPENAI_API_KEY)
  const canContinue = computed(() => openaiApiKey.value)

  async function getSecretKeys() {
    isLoading.value = true
    const data = await chrome.storage.sync.get(openai_api_key)
    const token = data[openai_api_key] as string
    openaiApiKey.value = decodeString(token)
    isLoading.value = false
  }

  async function saveOpenApiKey(value: { apiKey: string }) {
    await chrome.storage.sync.set({ [openai_api_key]: encodeString(value.apiKey) })
    toast({
      title: 'Successfully Saved Open AI Token',
      description: readableDateTime(new Date()),
    });
  }

  return {
    isLoading,
    openaiApiKey,
    canContinue,
    getSecretKeys,
    saveOpenApiKey,
  }
})