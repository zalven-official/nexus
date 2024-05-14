<script setup lang="ts">
import { ref, watch, type HTMLAttributes, nextTick } from 'vue'
import { type PrimitiveProps } from 'radix-vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
  grow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'textarea'
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})

const reference = ref()
function adjustTextareaHeight(target: EventTarget) {
  if (!props.grow) return
  const textarea = target as HTMLTextAreaElement
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }
}

watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      adjustTextareaHeight(reference.value)
    })
  }
)
</script>

<template>
  <textarea
    v-model="modelValue"
    :as="as"
    :as-child="asChild"
    ref="reference"
    :class="
      cn(
        'flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  />
</template>
