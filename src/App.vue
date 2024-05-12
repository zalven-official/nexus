<script setup lang="ts">
// Dependencies
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'


// Components
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DarkModeButton from '@/components/common/theme/DarkModeButton.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'

// Utils
import { generateFallbackName } from '@/lib'

// Assets
import nexusIcon from '@/assets/nexus.png'

// Store
import { useSecretKeyStore } from './stores/dom/secrete-key.store'


const secretKeyStore = useSecretKeyStore()
const router = useRouter()

async function fetch() {
  await secretKeyStore.getSecretKeys()
}

onMounted(() => {
  fetch()
})

</script>

<template>
  <main class="w-[30rem]" v-if="!secretKeyStore.isLoading">
    <Card class="relative">
      <CardHeader class="h-16 fixed backdrop-blur-sm bg-secondary/30 w-full z-50 py-0 p-4 top-0 m-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background from-1%  z-0" />
        <CardDescription class="flex justify-between items-center z-10">
          <Avatar class="w-10 h-10" @click="router.push('/')">
            <AvatarImage :src="nexusIcon" alt="nexus-icon" />
            <AvatarFallback>{{ generateFallbackName('Nexus') }}</AvatarFallback>
          </Avatar>
          <DarkModeButton class="ml-auto" />
        </CardDescription>
      </CardHeader>
      <CardContent class="h-full min-h-[450px]">
        <div class="pt-15 overflow-y-auto overflow-x-hidden">
          <router-view></router-view>
        </div>
      </CardContent>
    </Card>
    <Toaster />
  </main>
</template>