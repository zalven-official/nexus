<script setup lang="ts">
// Dependencies
import { RouterView } from 'vue-router'

// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DarkModeButton from '@/components/common/theme/DarkModeButton.vue'
// Utils
import { generateFallbackName, onSubmitEnter } from '@/lib'

// Assets
import nexusIcon from '@/assets/nexus.png'


</script>

<template>
  <main class="w-[30rem]">
    <Card class="relative">
      <CardHeader class="h-16 absolute backdrop-blur-sm bg-secondary/30 w-full z-50 py-0 p-4">
        <CardDescription class="flex justify-between items-center">
          <Avatar class="w-10 h-10">
            <AvatarImage :src="nexusIcon" alt="nexus-icon" />
            <AvatarFallback>{{ generateFallbackName('Nexus') }}</AvatarFallback>
          </Avatar>
          <DarkModeButton class="ml-auto" />
        </CardDescription>
      </CardHeader>
      <CardContent class="pt-10 h-full min-h-[450px]">
        <router-view></router-view>
      </CardContent>
    </Card>
  </main>
</template>