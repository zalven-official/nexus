<script setup lang="ts">
// Depndencies
import { PlayCircleIcon } from 'lucide-vue-next'
import { ref } from 'vue'

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import MessageBox from '@/components/common/messages/MessageBox.vue'

// Types
import type { IMessage } from '@/components/common/messages'


const sampleMessageBox = ref<IMessage[]>([
  {
    image: 'receiver-img.jpg',
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
    image: 'receiver-img.jpg',
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
    image: 'receiver-img.jpg',
    label: 'Zalven Dayao',
    message: 'Great! Have a nice day',
    datetime: new Date('2024-05-11T10:32:00'),
    sender: true,
  },
]
)
</script>

<template a te>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      <MessageBox :messages="sampleMessageBox" />
    </CardContent>
    <CardFooter>
      <div class="grid w-full gap-2">
        <Textarea placeholder="Type your message here." />
        <div class="flex justify-between items-center">
          <Button size="icon">
            <PlayCircleIcon class="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <PlayCircleIcon class="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <PlayCircleIcon class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>
