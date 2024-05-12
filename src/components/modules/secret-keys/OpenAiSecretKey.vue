<script setup lang="ts">
// Dependencies
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { EyeIcon, EyeOff, Loader2, InfoIcon } from 'lucide-vue-next'

// Components
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'

// Utils
import { onSubmitEnter } from '@/lib'

// Store
import { useSecretKeyStore } from '@/stores/dom/secrete-key.store'

const secretStore = useSecretKeyStore()
const visible = ref(false)
const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
  apiKey: z.string().min(2).max(50),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    apiKey: secretStore.openaiApiKey,
  },
})

const { value: apiKey } = useField('apiKey');

const onSubmit = handleSubmit((values) => {
  if (isLoading.value) return
  isLoading.value = true
  secretStore.saveOpenApiKey(values)
  isLoading.value = false
})
</script>

<template>
  <form class="h-48 w-full rounded-md bg-gradient-to-r from-transparent via-green-700 to-green-500 p-0.5 my-5"
    @submit="onSubmit" @keypress.enter="onSubmitEnter($event, onSubmit)">

    <div class="relative  h-full w-full items-center justify-center bg-background rounded-sm p-4">
      <div className="absolute inset-0 bg-gradient-to-l from-green-500 from-1% opacity-50 z-0" />
      <FormField v-slot="{ componentField }" name="apiKey" class="z-10">
        <FormItem>
          <FormLabel>
            <div class="flex justify-between items-center p-3 z-10 text-xs">
              <p class="flex z-10">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <InfoIcon class="w-4 h-4 mr-2 z-10 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div class="w-64 p-4">
                        <p class="text-sm font-semibold">Open API Key</p>
                        <p class="text-xs opacity-70">Please enter your OpenAI API key to use the chatbot.</p>
                        <p class="text-xs text-thin opacity-50 p-2">
                          Your sensitive information is protected using advanced encryption techniques. Your secret key
                          is
                          scrambled using a
                          unique code that's virtually impossible to guess, and the encrypted data is further secured to
                          ensure
                          confidentiality. We've thoroughly tested this process to make sure your information remains
                          private and accessible only to you.
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <!-- <div class="flex justify-start">
                <p class="text-xs text-thin opacity-50">
                  Your sensitive information is protected using advanced encryption techniques. Your secret key is
                  scrambled
                  using a
                  unique code that's virtually impossible to guess, and the encrypted data is further secured to ensure
                  confidentiality. We've thoroughly tested this process to make sure your information remains private
                  and
                  accessible
                  only to you.
                </p>
              </div> -->
                Open AI Secret Key
              </p>
              <p class="text-xs opacity-80">To get API key, visit
                <a class="font-bold text-primary text-opacity-100" href="https://platform.openai.com/api-keys"
                  target="_blank">
                  Open AI
                </a>
              </p>
            </div>
          </FormLabel>
          <FormControl>
            <div class="flex z-10">
              <Input class="z-10" :type="visible ? 'text' : 'password'" placeholder="open api key..."
                v-bind="componentField" :default-value="apiKey" />
              <Button variant="default" size="icon" @click="visible = !visible" type="button" class="z-10">
                <EyeIcon class="w-4 h-4" v-if="visible" />
                <EyeOff class="w-4 h-4" v-else />
              </Button>
            </div>
          </FormControl>
          <FormDescription class="z-10">
            <div class="flex z-10">
              <Button class="w-full z-10" type="submit" :disabled="isLoading">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
                SUBMIT
              </Button>
            </div>
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
  </form>
</template>