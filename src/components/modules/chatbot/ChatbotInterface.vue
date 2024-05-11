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
import { generateFallbackName } from '@/lib';

// Assets
import nexusIcon from '@/assets/nexus.png'

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'

import { Button } from '@/components/ui/button'
import MessageBox from '@/components/common/messages/MessageBox.vue'
import {
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'

// Types
import type { IMessage } from '@/components/common/messages'

const formSchema = toTypedSchema(zod.object({
  message: zod.string().min(2).max(50),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})

const messages = ref<IMessage[]>([
  {
    image: nexusIcon,
    label: 'Zalven Dayao',
    message: 'Hello!',
    datetime: new Date('2024-05-11T10:30:00'),
    sender: true,
  },
  {
    image: 'receiver-img.jpg',
    label: 'Receiver',
    message: 'How are you?',
    datetime: new Date('2024-05-11T10:32:00'),
    sender: false,
  },
  {
    image: nexusIcon,
    label: 'Zalven Dayao',
    message: 'I\'m Fine , How bout you?',
    datetime: new Date('2024-05-11T10:32:00'),
    sender: true,
  },
  {
    image: 'receiver-img.jpg',
    label: 'Receiver',
    message: 'I\'m Also fine, Thank you!',
    datetime: new Date('2024-05-11T10:32:00'),
    sender: false,
  },
  {
    image: nexusIcon,
    label: 'Zalven Dayao',
    message: `
      Type Safety: Using PropType from Vue provides robust type checking for your props, making your component more reliable and easier to debug.
      Flexibility: Optional props like userImage, otherUserImage allow for customization.
      Reactivity: Leveraging the onMessageSent event and Vue's reactivity system makes it easy to handle new messages and update the UI.
      Clear Separation of Concerns: The MessageBox focuses on displaying messages, while message sending logic is handled in the parent component.
    `,
    datetime: new Date('2024-05-11T10:32:00'),
    sender: true,
  },
])

</script>

<template>
  <form @submit="onSubmit" @keyup.enter="onSubmit">
    <Card>
      <CardHeader>
        <CardDescription class="flex items-center">
          <Avatar>
            <AvatarImage :src="nexusIcon" alt="nexus-icon" class="bg-white" />
            <AvatarFallback>{{ generateFallbackName("Nexus") }}</AvatarFallback>
          </Avatar>
          <p class="mx-3"> Nexus Voyager Agent</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MessageBox :messages="messages" />
      </CardContent>
      <CardFooter>
        <div class="grid w-full gap-2">
          <FormField v-slot="{ componentField }" name="message">
            <FormItem class="relative">
              <FormControl>
                <Textarea type="text" placeholder="Type your message here." v-bind="componentField"
                  class="resize-none pr-10 row-span-1" :rows="1" :grow="true" />
              </FormControl>
              <Button type="submit" class="absolute bottom-1.5 right-1" size="xs">
                <SendHorizonalIcon class="w-3" />
              </Button>
            </FormItem>
          </FormField>
          <div class="flex justify-center items-center gap-x-5">
            <Button variant="ghost" size="icon">
              <RotateCwSquareIcon class="w-5" />
            </Button>
            <Button variant="default" size="icon">
              <PauseCircleIcon class="w-10" />
            </Button>
            <Button variant="ghost" size="icon">
              <PlayCircleIcon class="w-5" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  </form>
</template>
