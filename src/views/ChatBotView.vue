<script setup lang="ts">
// Dependencies
import { ref } from 'vue'
// Components
import ChatbotInterface from '@/components/modules/chatbot/ChatbotInterface.vue'

// Store
import { useVoyagerStore } from '@/stores/voyager/voyager.store'

// Types
import type { IMessage, IMessageSample } from '@/components/common/messages'

const voyagerStore = useVoyagerStore()

const messages = ref<IMessage[]>([])
const sampleMessages = ref<IMessageSample[]>([
  {
    title: 'Search latest langchain blog post',
    description: 'lanchain blogpost',
    message: 'What are the latest blog posts from langchain?'
  },
  {
    title: 'Web voyager research',
    description: 'Webvoyager paper (arxiv) search',
    message: 'Could you explain the WebVoyager paper (on arxiv)?'
  }
])

async function submit(value: { message: string }) {
  voyagerStore.sendMessage({
    question: value.message,
    page: 0
  })
}
</script>

<template>
  <div>
    <ChatbotInterface :messages="messages" :sample-messages="sampleMessages" :save="submit" />
  </div>
</template>
