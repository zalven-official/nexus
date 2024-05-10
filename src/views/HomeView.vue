<script setup lang="ts">
/// <reference types="chrome" />

import { Button } from '@/components/ui/button'
import { onMounted } from 'vue';

onMounted(async () => {
  let [tab] = await chrome.tabs.query({ active: true })
  console.log(tab)
})
</script>


<template>
  <div>
    dsdsd
    <Button>Click me</Button>
  </div>
</template>
