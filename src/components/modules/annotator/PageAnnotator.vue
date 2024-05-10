<script setup lang="ts">
// Dependency
import { Loader2 } from 'lucide-vue-next'
// Components
import { Button } from '@/components/ui/button'
// Store 
import { useAnnotationStore } from '@/stores/dom/annotation.store';
import { ref } from 'vue';

const annotationStore = useAnnotationStore()
const image = ref()
async function markPage() {
  const result = await annotationStore.handleMarkPage()
  image.value = result?.image
}
</script>

<template>
  <div>
    <Button @click="markPage()" :disabled="annotationStore.isLoading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="annotationStore.isLoading" />
      Annotate
    </Button>
    <img alt="screenshot" :src="image" class="w-[500px]" />
  </div>
</template>