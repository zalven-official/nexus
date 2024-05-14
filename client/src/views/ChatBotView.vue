<script setup lang="ts">
// Dependencies
import { onMounted, onUnmounted, ref } from 'vue'
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
    title: 'Write a thank-you note',
    description: 'to my interviewer',
    message:
      "Write 2-3 sentences to thank my interviewer, reiterating my excitement for the job opportunity while keeping it cool. Don't make it too formal."
  },
  {
    title: 'Design a programming game',
    description: 'teach basics in a fun way',
    message:
      "Can you help me design a game concept that teaches basic programming skills? Start by asking me which programming language I'd like to focus on."
  },
  {
    title: 'Plan a trip',
    description: 'to expirience Seoul like a local',
    message:
      "I'm planning a 4-day trip to Seoul.Can you suggest an itinerary that doesn't involve popular tourist attractions?"
  },
  {
    title: 'Help me pick',
    description: 'an outfit that will look good on camera',
    message:
      'I have a photoshoot tomorrow. Can you recommend me some colors and outfit options that will look good on camera?'
  }
])

async function submit(value: { message: string }) {
  voyagerStore.sendMessage(value)
}
onMounted(() => {
  voyagerStore.connect(123, 456)
})

onUnmounted(() => {
  voyagerStore.disconnect()
})

</script>

<template>
  <div>
    <ChatbotInterface :messages="messages" :sample-messages="sampleMessages" :save="submit" />
  </div>
</template>
