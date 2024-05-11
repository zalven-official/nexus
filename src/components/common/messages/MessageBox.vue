<script setup lang="ts">
// Components
import ReceiverMessage from '@/components/common/messages/components/ReceiverMessage.vue'
import SenderMessage from '@/components/common/messages/components/SenderMessage.vue'
import { ScrollArea } from '@/components/ui/scroll-area'

// Types
import type { IMessageBox } from './types'

defineProps<IMessageBox>()
</script>

<template>
  <ScrollArea class="h-[300px] w-full rounded-md border p-4">
    <template v-for="(message, index) in messages" :key="index">
      <template v-if="message.sender">
        <SenderMessage :image="message.image" :label="message.label" :sender="message.sender"
          :datetime="message.datetime" :message="message.message" />
      </template>
      <template v-else>
        <ReceiverMessage :image="message.image" :label="message.label" :sender="message.sender"
          :datetime="message.datetime" :message="message.message" />
      </template>
    </template>
  </ScrollArea>
</template>
