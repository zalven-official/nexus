<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader2, SendHorizonalIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import type { PrimitiveProps } from 'radix-vue'
import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

// Utils
import { onSubmitEnter } from '@/lib'

// Assets
import { Textarea } from '@/components/ui/textarea'

import { Button } from '@/components/ui/button'
import MessageBox from '@/components/common/messages/MessageBox.vue'
import { FormControl, FormField, FormItem } from '@/components/ui/form'

// Types
import type { IMessageSample } from '@/components/common/messages'

interface Props extends PrimitiveProps {
  messages: ChatCompletionMessageParam[]
  sampleMessages: IMessageSample[]
  save: (value: { message: string }) => Promise<void>
}

const props = withDefaults(defineProps<Props>(), {})
const isLoading = ref(false)
const formSchema = toTypedSchema(
  zod.object({
    message: zod.string()
  })
)
const form = useForm({
  validationSchema: formSchema
})

const { value: message } = useField('message')
const onSubmit = form.handleSubmit(async (values) => {
  if (isLoading.value) return
  isLoading.value = true
  await props
    .save(values)
    .then(() => {
      message.value = ''
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<template>
  <form
    @submit="onSubmit"
    @keypress.enter="onSubmitEnter($event, onSubmit)"
    class="overflow-y-hidden"
  >
    <MessageBox :messages="messages" :sampleMessages="sampleMessages" v-model="message" />
    <FormField v-slot="{ componentField }" name="message">
      <FormItem class="relative px-5">
        <FormControl>
          <Textarea
            type="text"
            placeholder="Type your message here."
            v-bind="componentField"
            class="row-span-1 mb-5 resize-none pr-10"
            :rows="1"
            :grow="true"
          />
        </FormControl>
        <Button type="submit" class="absolute bottom-1.5 right-7" size="xs" :disabled="!message">
          <Loader2 class="h-4 w-4 animate-spin" v-if="isLoading" />
          <SendHorizonalIcon class="w-3" v-else />
        </Button>
      </FormItem>
    </FormField>
    <p class="m-5 px-5 text-center text-xs font-thin opacity-50">
      The chatbot can make mistakes, so it's important to verify critical information.
    </p>
  </form>
</template>
