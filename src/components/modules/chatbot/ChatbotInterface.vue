<script setup lang="ts">
// Depndencies
import { useForm } from 'vee-validate'
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import {
  PlayCircleIcon,
  PauseCircleIcon,
  RotateCwSquareIcon,
  SendHorizonalIcon
} from 'lucide-vue-next'
import { ref } from 'vue'

// Utils
import { generateFallbackName } from '@/lib'

// Assets
import nexusIcon from '@/assets/nexus.png'

// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'

import { Button } from '@/components/ui/button'
import MessageBox from '@/components/common/messages/MessageBox.vue'
import { FormControl, FormField, FormItem } from '@/components/ui/form'

// Types
import type { IMessage, IMessageSample } from '@/components/common/messages'

const formSchema = toTypedSchema(
  zod.object({
    message: zod.string().min(2).max(50)
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})

const messages = ref<IMessage[]>([])
const sampleMessages = ref<IMessageSample[]>([
  {
    title: 'Write a thank-you note',
    description: 'to my interviewer',
    message: 'Write 2-3 sentences to thank my interviewer, reiterating my excitement for the job opportunity while keeping it cool. Don\'t make it too formal.'
  },
  {
    title: 'Design a programming game',
    description: 'teach basics in a fun way',
    message: 'Can you help me design a game concept that teaches basic programming skills? Start by asking me which programming language I\'d like to focus on.',
  },
  {
    title: 'Plan a trip',
    description: 'to expirience Seoul like a local',
    message: 'I\'m planning a 4-day trip to Seoul.Can you suggest an itinerary that doesn\'t involve popular tourist attractions?'
  },
  {
    title: 'Help me pick',
    description: 'an outfit that will look good on camera',
    message: 'I have a photoshoot tomorrow. Can you recommend me some colors and outfit options that will look good on camera?'
  }
])

</script>

<template>
  <form @submit="onSubmit" @keyup.enter="onSubmit">
    <Card>
      <CardHeader>
        <CardDescription class="flex items-center">
          <Avatar>
            <AvatarImage :src="nexusIcon" alt="nexus-icon" class="bg-white" />
            <AvatarFallback>{{ generateFallbackName('Nexus') }}</AvatarFallback>
          </Avatar>
          <p class="mx-3">Nexus Voyager Agent</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MessageBox :messages="messages" :sampleMessages="sampleMessages" />
      </CardContent>
      <CardFooter>
        <div class=" grid w-full gap-2">
          <FormField v-slot="{ componentField }" name="message">
            <FormItem class="relative">
              <FormControl>
                <Textarea type="text" placeholder="Type your message here." v-bind="componentField"
                  class="row-span-1 resize-none pr-10" :rows="1" :grow="true" />
              </FormControl>
              <Button type="submit" class="absolute bottom-1.5 right-1" size="xs">
                <SendHorizonalIcon class="w-3" />
              </Button>
            </FormItem>
          </FormField>
          <p class="text-xs font-thin opacity-50 px-5 text-center">
            The chatbot can make mistakes, so it's important to verify critical information.
          </p>
          <!-- <div class="flex items-center justify-center gap-x-5">
            <Button variant="ghost" size="icon">
              <RotateCwSquareIcon class="w-5" />
            </Button>
            <Button variant="default" size="icon">
              <PauseCircleIcon class="w-10" />
            </Button>
            <Button variant="ghost" size="icon">
              <PlayCircleIcon class="w-5" />
            </Button>
          </div> -->
        </div>
      </CardFooter>
    </Card>
  </form>
</template>
