<script setup lang="ts">
// Dependencies
import { SendHorizonalIcon } from 'lucide-vue-next'

// Components
import ReceiverMessage from '@/components/common/messages/components/ReceiverMessage.vue'
import SenderMessage from '@/components/common/messages/components/SenderMessage.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

// Utils
import { generateFallbackName } from '@/lib'

// Types
import type { IMessageBox } from './types'

// Assets
import nexusIcon from '@/assets/nexus.png'

defineProps<IMessageBox>()

defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()
</script>

<template>
  <ScrollArea class="h-[450px] w-full rounded-md p-4 pt-5">
    <template v-if="messages.length > 0">
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
    </template>
    <template v-else>
      <div class="flex h-[200px] w-full flex-col justify-center text-center">
        <div>
          <Avatar>
            <AvatarImage :src="nexusIcon" alt="nexus-icon" class="bg-white" />
            <AvatarFallback>{{ generateFallbackName('Nexus') }}</AvatarFallback>
          </Avatar>
        </div>
        <p class="w-full font-bold text-primary opacity-50">How can I help you today?</p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-3 rounded">
        <Card @click="$emit('update:modelValue', message.message)"
          class="group flex w-full items-center justify-between p-3 hover:bg-secondary"
          v-for="(message, index) in sampleMessages" :key="index">
          <div class="mr-3 max-w-72">
            <p class="truncate text-sm font-bold">{{ message.title }}</p>
            <p class="truncate text-sm opacity-50">{{ message.description }}</p>
          </div>
          <div
            class="flex cursor-default select-none items-center justify-center rounded border border-primary p-1 opacity-0 group-hover:opacity-50">
            <SendHorizonalIcon class="h-4 w-4" />
          </div>
        </Card>
      </div>
    </template>
  </ScrollArea>
</template>
