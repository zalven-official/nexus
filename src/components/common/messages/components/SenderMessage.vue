<script setup lang="ts">
// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

// Types
import type { IMessage } from '../types'

// Utils
import { generateFallbackName, readableTime } from '@/lib'

defineProps<IMessage>()
</script>

<template>
  <div class="m-2 my-5 flex items-start">
    <Avatar class="shadow-sm">
      <AvatarImage :src="image" alt="sender-avatar" class="object-fill" />
      <AvatarFallback>{{ generateFallbackName(label) }}</AvatarFallback>
    </Avatar>
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" class="m-0 border-none p-0">
        <AccordionTrigger class="m-0 p-0 text-left">
          <div class="max-w-72">
            <p class="w-full p-2 text-xs opacity-50">{{ label }}</p>
          </div>
        </AccordionTrigger>
        <p class="rounded-lg bg-secondary p-3 text-sm shadow-sm">{{ message }}</p>
        <AccordionContent>
          <p class="w-full p-2 text-xs opacity-50">{{ readableTime(datetime) }}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
