<script setup lang="ts">
// Dependencies
import { LogInIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

// Components
import OpenAiSecretKey from '@/components/modules/secret-keys/OpenAiSecretKey.vue'
import Button from '@/components/ui/button/Button.vue'

// Store
import { useSecretKeyStore } from '@/stores/dom/secret-key.store'
const router = useRouter()
const secretKeyStore = useSecretKeyStore()
</script>

<template>
  <div class="relative mb-20 pt-14">
    <OpenAiSecretKey />
    <div class="fixed bottom-0 right-0 z-50 w-full">
      <div class="relative flex h-full w-full justify-end p-5">
        <div class="absolute h-10 w-full" />
        <div class="z-10">
          <Button
            class="w-32 shadow"
            @click="router.push('/chatbot')"
            :disabled="!secretKeyStore.canContinue"
          >
            Continue
            <LogInIcon class="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
