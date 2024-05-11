<script setup lang="ts">
// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Types
import type { IMessage } from '../types';

// Utils
import { generateFallbackName } from '@/lib';

defineProps<IMessage>()
</script>

<template>
  <div>
    <Avatar>
      <AvatarImage :src="image" alt="@radix-vue" />
      <AvatarFallback>{{ generateFallbackName(label) }}</AvatarFallback>
    </Avatar>
  </div>
</template>