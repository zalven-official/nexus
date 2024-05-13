<script setup lang="ts">
// Components
import SecretKeyCard from '@/components/common/cards/SecretKeyCard.vue';

// Assets
import OpenAiImage from '@/assets/openai.png'

// Store
import { useSecretKeyStore } from '@/stores/dom/secrete-key.store'
const secretStore = useSecretKeyStore()
</script>

<template>
  <div>
    <SecretKeyCard :default-value="secretStore.openaiApiKey" :save="secretStore.saveOpenApiKey" productName="Open AI"
      title="OpenAI API Key" subtitle="Please enter your OpenAI API key to use the chatbot."
      description="Your sensitive information is protected using advanced encryption techniques. Your secret key is scrambled using a unique code that's virtually impossible to guess, and the encrypted data is further secured to ensure confidentiality. We've thoroughly tested this process to makesure your information remains private and accessible only to you."
      link="https://platform.openai.com/api-keys" color="green" :avatar="OpenAiImage" />
  </div>
</template>
