/// <reference types="chrome" />
// Dependencies
import { defineStore } from 'pinia'

// Store
import { useAnnotationStore } from '@/stores/dom/annotation.store'
import { useSecretKeyStore } from '../dom/secrete-key.store'

// Types
import type { IMessage, IMessageSample } from '@/components/common/messages'
import { computed, ref } from 'vue'

export const useVoyagerStore = defineStore('voyager', () => {
  const annotationStore = useAnnotationStore()
  const secretKeyStore = useSecretKeyStore()

  const chatRoomId = ref<number | null>(null)
  const chatUserId = ref<number | null>(null)

  const websocket = ref<WebSocket | null>(null)

  function connect(roomId: number, userId: number) {
    chatRoomId.value = roomId
    chatUserId.value = userId
    websocket.value = new WebSocket(`ws://127.0.0.1:8000/api/v1/ws/${roomId}/${userId}`)

    websocket.value.onopen = () => {
      console.log('WebSocket connection established')
    }

    websocket.value.onmessage = (event: MessageEvent) => {
      console.log(event.data)
    }

    websocket.value.onclose = () => {
      console.log('WebSocket connection closed')
      websocket.value = null
    }

    websocket.value.onerror = (error: Event) => {
      console.error('WebSocket error:', error)
    }
  }

  async function sendMessage(value: { message: string }) {
    if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
      websocket.value.send(JSON.stringify(value))
    } else {
      console.error('WebSocket is not open')
    }
  }

  function disconnect() {
    if (websocket.value) {
      websocket.value.close()
    }
  }

  return { connect, sendMessage, disconnect }
})
