<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number,
  grow?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  as: 'textarea',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

function adjustTextareaHeight(event: InputEvent) {
  if (!props.grow) return
  const textarea = event.target as HTMLTextAreaElement;
  if (textarea) {
    textarea.style.height = 'auto'; // Now TypeScript recognizes textarea as HTMLTextAreaElement
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}

</script>

<template>
  <Primitive v-model="modelValue" :as="as" :as-child="asChild" @input="adjustTextareaHeight"
    :class="cn('flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)" />
</template>
