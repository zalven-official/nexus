/// <reference types="chrome" />
// Dependencies
import { defineStore } from 'pinia'

// Store
import { useAnnotationStore } from '@/stores/dom/annotation.store'
import { useSecretKeyStore } from '../dom/secrete-key.store'


export const useVoyagerStore = defineStore('voyager', () => {
  const annotationStore = useAnnotationStore()
  const secretKeyStore = useSecretKeyStore()

  console.log(secretKeyStore)
})