/// <reference types="chrome" />
// Dependencies
import { defineStore } from 'pinia'
// Chatabot
import { createOpenAIFunctionsAgent, AgentExecutor } from 'langchain/agents'
import { DynamicTool, DynamicStructuredTool } from '@langchain/core/tools'
import type { ChatPromptTemplate } from '@langchain/core/prompts'
import { BaseMessage } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'

// Store
import { useAnnotationStore, type BBox } from '@/stores/dom/annotation.store'
import { useSecretKeyStore } from '../dom/secret-key.store'

// Types
import type { IMessage, IMessageSample } from '@/components/common/messages'
import { computed, ref } from 'vue'

// Services
import { OpenAIClient } from '@/services/openai.services'

// Define Graph State
interface VoyagerPayload {
  question: string
  page: number
  apiKey?: string | null
  maxSteps?: number
}

interface Prediction {
  action: string
  args?: string[]
}

// This represents the state of the agent as it proceeds through execution
interface AgentState {
  page: any // Chrome Page
  input: string // User request
  img: string // b64 encoded screenshot
  bboxes: BBox[] // The bounding boxes from the browser annotation function
  prediction: Prediction // The Agent's output
  scratchpad: BaseMessage[] // A system message(or messages) containing the intermediate steps
  observation: string // The most recent response from a tool
}

export const useVoyagerStore = defineStore('voyager', () => {
  const annotationStore = useAnnotationStore()
  const secretKeyStore = useSecretKeyStore()

  const state = ref<VoyagerPayload>()

  // Tools ----------------------------------------------------------------------
  async function click(state: AgentState) { }
  async function typeText(state: AgentState) { }
  async function scroll(state: AgentState) { }
  async function wait(state: AgentState) { }
  async function goBack(state: AgentState) { }
  async function toGoogle(state: AgentState) { }

  async function sendMessage(value: VoyagerPayload) {
    const openai = OpenAIClient.getInstance(secretKeyStore.openaiApiKey)
    const annotated = await annotationStore.handleMarkPage()
    if (annotated?.image) {
      const analyzedImage = await openai.analyzeImage(annotated.image)
      console.log(analyzedImage)
    }
  }

  return { sendMessage }
})
