<script setup lang="ts">
// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { marked } from 'marked'

function parseMarkdown(text: string) {
  return marked(text)
}
// Utils
import { generateFallbackName, readableTime } from '@/lib'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

// Assets
import nexusIcon from '@/assets/nexus.png'

defineProps<ChatCompletionMessageParam>()
</script>

<template>
  <div class="my-5 flex w-full items-start justify-end">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" class="m-0 border-none p-0">
        <AccordionTrigger class="m-0 flex justify-end p-0 text-right">
          <div class="max-w-72 text-right">
            <p class="w-full p-2 text-right text-xs opacity-50">{{ role }}</p>
          </div>
        </AccordionTrigger>

        <p class="rounded-lg bg-secondary p-3 text-sm shadow-sm" v-if="typeof content === 'string'">
          {{ content }}
        </p>
        <p class="rounded-lg bg-secondary p-3 text-sm shadow-sm" v-if="Array.isArray(content)">
          <span v-for="(message, index) in content" v-bind:key="index">
            <span v-if="message.type === 'text'" v-html="marked.parse(message.text)"></span>
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
          <p class="w-full p-2 text-right text-xs opacity-50">{{ readableTime(new Date()) }}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <Avatar class="shadow-sm">
      <AvatarImage :src="nexusIcon" alt="sender-avatar" />
      <AvatarFallback>{{ generateFallbackName('Bot') }}</AvatarFallback>
    </Avatar>
  </div>
</template>
