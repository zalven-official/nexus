<script setup lang="ts">
// Dependencies
import { SendIcon } from 'lucide-vue-next'

// Components
import ReceiverMessage from '@/components/common/messages/components/ReceiverMessage.vue'
import SenderMessage from '@/components/common/messages/components/SenderMessage.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Utils
import { generateFallbackName } from '@/lib'

// Types
import type { IMessageBox } from './types'

// Assets
import nexusIcon from '@/assets/nexus.png'

defineProps<IMessageBox>()
</script>

<template>
  <ScrollArea class="h-[350px] w-full rounded-md border p-4">
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
        <Card class="group flex w-full items-center justify-between p-3 hover:bg-secondary"
          v-for="(message, index) in sampleMessages" :key="index">
          <div class="max-w-72 mr-3 ">
            <p class="text-sm font-bold truncate">{{ message.title }}</p>
            <p class="text-sm opacity-50 truncate">{{ message.description }}</p>
          </div>
          <Button variant="outline" size="icon" class="opacity-0 cursor-default select-none group-hover:opacity-100">
            <SendIcon class="h-4 w-4" />
          </Button>
        </Card>
      </div>
    </template>
  </ScrollArea>
</template>
