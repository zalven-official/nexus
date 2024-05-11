<script setup lang="ts">
// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Types
import type { IMessage } from '../types';

// Utils
import { generateFallbackName, readableTime } from '@/lib';

defineProps<IMessage>()
</script>

<template>
  <div class="flex items-start  my-5 w-full justify-end">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" class="border-none p-0 m-0">
        <AccordionTrigger class="flex justify-end m-0 p-0 text-right">
          <div class="max-w-72 text-right">
            <p class="w-full text-xs opacity-50 p-2 text-right ">{{ label }}</p>
          </div>
        </AccordionTrigger>
        <p class="text-sm bg-secondary p-3 rounded-lg shadow-sm"> {{ message }}</p>
        <AccordionContent>
          <p class="w-full text-xs text-right opacity-50 p-2">{{ readableTime(datetime) }}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <Avatar class="shadow-sm">
      <AvatarImage :src="image" alt="sender-avatar" />
      <AvatarFallback>{{ generateFallbackName(label) }}</AvatarFallback>
    </Avatar>
  </div>
</template>