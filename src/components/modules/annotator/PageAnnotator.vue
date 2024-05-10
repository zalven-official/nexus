<script setup lang="ts">
// Dependency
import { Loader2 } from 'lucide-vue-next'
// Components
import { Button } from '@/components/ui/button'
// Store 
import { useAnnotationStore } from '@/stores/dom/annotation.store';

const annotationStore = useAnnotationStore()
</script>

<template>
  <div>
    <Button @click=annotationStore.handleMarkPage :disabled="annotationStore.isLoading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="annotationStore.isLoading" />
      Annotate
    </Button>
    <Button @click=annotationStore.handleUnmarkPage :disabled="annotationStore.isLoading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="annotationStore.isLoading" />
      Clear
    </Button>
  </div>
</template>