<script setup lang="ts">
// Dependencies
import { LogInIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

// Components
import OpenAiSecretKey from '@/components/modules/secret-keys/OpenAiSecretKey.vue'
import Button from '@/components/ui/button/Button.vue'

// Store
import { useSecretKeyStore } from '@/stores/dom/secrete-key.store'
const router = useRouter()
const secretKeyStore = useSecretKeyStore()
</script>

<template>
  <div class="mb-25 relative pt-14">
    <OpenAiSecretKey />
    <div class="fixed bottom-0 right-0 z-50 w-full">
      <div class="relative flex h-full  w-full p-5 justify-end">
        <div className="absolute inset-0 bg-gradient-to-t from-background from-1%  z-0" />
        <div class="absolute w-full h-10" />
        <div class="z-10">
          <Button class="w-32 shadow" @click="router.push('/chatbot')" :disabled="!secretKeyStore.canContinue">
            Continue
            <LogInIcon class="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
