<script setup lang="ts">
// Dependencies
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { EyeIcon, EyeOff, Loader2 } from 'lucide-vue-next'
import type { PrimitiveProps } from 'radix-vue'

// Utils
import { onSubmitEnter, generateFallbackName } from '@/lib'

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

// types
import { type Colors, colorThemes } from './constants'

interface Props extends PrimitiveProps {
  defaultValue: string
  save: (value: { apiKey: string }) => void
  productName: string
  title: string
  subtitle: string
  description: string
  link: string
  color: Colors | 'purple'
  avatar: string
}

const props = withDefaults(defineProps<Props>(), {})

const visible = ref(false)
const isLoading = ref(false)

const formSchema = toTypedSchema(
  z.object({
    apiKey: z.string().min(2).max(500)
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    apiKey: props.defaultValue
  }
})

const { value: apiKey } = useField('apiKey')

const onSubmit = handleSubmit((values) => {
  if (isLoading.value) return
  isLoading.value = true
  props.save(values)
  isLoading.value = false
})

</script>

<template>
  <form
    :class="`my-5 h-52 w-full rounded-md bg-gradient-to-r from-transparent ${colorThemes[color].via_normal} ${colorThemes[color].to_normal} p-0.5 shadow`"
    @submit="onSubmit" @keypress.enter="onSubmitEnter($event, onSubmit)">
    <div class="relative h-full w-full items-center justify-center rounded-sm bg-background px-4 py-2">
      <div :class="`absolute inset-0 bg-gradient-to-l from-${color}-500 from-1% z-0 opacity-50`" />
      <FormField v-slot="{ componentField }" name="apiKey" class="z-10">
        <FormItem>
          <FormLabel>
            <div class="justify-right z-10 flex items-center p-3 text-xs">
              <p class="z-10 flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <Avatar class="mr-3 h-10 w-10 cursor-help">
                        <AvatarImage :src="avatar" alt="nexus-icon" />
                        <AvatarFallback>{{ generateFallbackName(productName) }}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div class="w-64 p-4">
                        <a class="text-sm font-semibold" :href="link" target="_blank">
                          {{ title }}
                        </a>
                        <p class="text-xs opacity-70">{{ subtitle }}</p>
                        <p class="text-thin p-2 text-xs opacity-50">{{ description }}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span>
                  {{ title }}
                  <br />
                  <span class="text-xs opacity-80">To get secret key, visit
                    <a class="font-bold text-primary text-opacity-100" :href="link" target="_blank">
                      {{ productName }}
                    </a>
                  </span>
                </span>
              </p>
            </div>
          </FormLabel>
          <FormControl>
            <div class="z-10 flex">
              <Input class="z-10" :type="visible ? 'text' : 'password'" placeholder="secrete key token...."
                v-bind="componentField" :default-value="apiKey" />
              <Button variant="default" size="icon" @click="visible = !visible" type="button" class="z-10">
                <EyeIcon class="h-4 w-4" v-if="visible" />
                <EyeOff class="h-4 w-4" v-else />
              </Button>
            </div>
          </FormControl>
          <FormDescription class="z-10">
            <div class="z-10 flex">
              <Button class="z-10 w-full" type="submit" :disabled="isLoading">
                <Loader2 class="mr-2 h-4 w-4 animate-spin" v-if="isLoading" />
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
