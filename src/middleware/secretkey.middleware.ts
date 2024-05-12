import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useOpenAiStore } from '@/stores/dom/openai.store'

export async function secretkeyMiddleware(
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const openAiStore = useOpenAiStore()
  if (!openAiStore.openaiApiKey) {
    // return next('/secret-keys')
  }
  return next()
}
