<script setup lang="ts">
// Dependencies
import { ref } from 'vue'

// Components
import ChatbotInterface from '@/components/modules/chatbot/ChatbotInterface.vue'
import Button from '@/components/ui/button/Button.vue'

// Store
import { useVoyagerStore } from '@/stores/voyager/voyager.store'

// Types
import type { IMessageSample } from '@/components/common/messages'
import { type AgentState } from '@/stores/voyager/voyager.store'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

const voyagerStore = useVoyagerStore()

const messages = ref<ChatCompletionMessageParam[]>([])
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

function stream(value: AgentState) {
  messages.value = value.scratchpad
}

async function submit(value: { message: string }) {
  await voyagerStore.sendMessage({ question: value.message, page: 0 }, stream)
}
</script>

<template>
  <div>
    <ChatbotInterface :messages="messages" :sample-messages="sampleMessages" :save="submit" />
  </div>
</template>
