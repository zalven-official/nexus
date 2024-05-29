<script setup lang="ts">
// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

// Utils
import { generateFallbackName, readableTime } from '@/lib'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import nexusIcon from '@/assets/nexus.png'
import { countSpecialCharacters } from '@/lib'

defineProps<ChatCompletionMessageParam>()
</script>

<template>
  <div class="m-2 my-5 mt-12 flex items-start">
    <Avatar class="shadow-sm">
      <AvatarImage :src="nexusIcon" alt="sender-avatar" class="object-fill" />
      <AvatarFallback>{{ generateFallbackName('NEXUS') }}</AvatarFallback>
    </Avatar>
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" class="m-0 border-none p-0">
        <AccordionTrigger class="m-0 p-0 text-left">
          <div class="max-w-72">
            <p class="w-full p-2 text-xs capitalize opacity-50">{{ role }}</p>
          </div>
        </AccordionTrigger>
        <p class="rounded-lg bg-secondary p-3 text-sm shadow-sm" v-if="typeof content === 'string'">
          {{ content }}
        </p>
        <p class="rounded-lg bg-secondary p-3 text-sm shadow-sm" v-if="Array.isArray(content)">
          <span v-for="(message, index) in content" v-bind:key="index">
            <span v-if="message.type === 'text'">{{ message.text.replace(/\n/g, '<br />') }}</span>
            <span v-if="message.type === 'image_url'">
              <img
                :src="message.image_url.url"
                alt="sender-message-image"
                class="w-full rounded-md p-1 shadow"
              />
            </span>
            <br />
          </span>
        </p>
        <AccordionContent>
          <p class="w-full p-2 text-xs opacity-50">{{ readableTime(new Date()) }}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
