/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="chrome" />
// Dependencies
import { defineStore } from 'pinia'

// Store
import { useAnnotationStore, type BBox } from '@/stores/dom/annotation.store'
import { useSecretKeyStore } from '../dom/secret-key.store'
import * as hub from 'langchain/hub'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatOpenAI } from '@langchain/openai'

// Types
import type { IMessage, IMessageSample } from '@/components/common/messages'
import { computed, ref } from 'vue'

import { StateGraph, END } from '@/core/graph.core'

// Define Graph State
interface VoyagerPayload {
  question: string
  page: number
  maxSteps?: number
}

interface Prediction {
  action: string
  args?: string[]
}

// This represents the state of the agent as it proceeds through execution
interface AgentState {
  input: string // User request
  img: string // b64 encoded screenshot
  bboxes: BBox[] // The bounding boxes from the browser annotation function
  prediction: Prediction // The Agent's output
  scratchpad: string[] // A system message(or messages) containing the intermediate steps
  observation: string // The most recent response from a tool
}

export const useVoyagerStore = defineStore('voyager', () => {
  const annotationStore = useAnnotationStore()
  const secretKeyStore = useSecretKeyStore()

  // Tools ----------------------------------------------------------------------

  async function click(state: AgentState) {
    console.log('workflow: click')
    return state
  }
  async function typeText(state: AgentState) {
    console.log('workflow: typeText')
    return state
  }

  async function scroll(state: AgentState) {
    console.log('workflow: scroll')
    return state
  }

  async function wait(state: AgentState) {
    console.log('workflow: wait')
    return state
  }

  async function goBack(state: AgentState) {
    console.log('workflow: addEdge')
    return state
  }

  async function toGoogle(state: AgentState) {
    console.log('workflow: toGoogle')
    return state
  }

  // Agent Definitions ----------------------------------------------------------------------
  async function annotate(state: AgentState): Promise<AgentState> {
    const result = await annotationStore.handleMarkPage()
    return result ? { ...state, ...result } : state
  }

  async function formatDescriptions(state: AgentState) {
    const labels = state.bboxes.map((bbox, i) => {
      const text = bbox.ariaLabel?.trim() || bbox.text.trim()
      const el_type = bbox.type ? `<${bbox.type}/>` : ''
      return `${i} (${el_type}): "${text}"`
    })
    return { ...state, bbox_descriptions: `Valid Bounding Boxes:\n${labels.join('\n')}` }
  }
  async function formatPrompt() {
    const prompt = await hub.pull<ChatPromptTemplate>('wfh/web-voyager')
    return prompt
  }

  async function chatModel() {
    const model = new ChatOpenAI({
      temperature: 0.1,
      model: 'gpt-4o',
      apiKey: secretKeyStore.openaiApiKey
    })
    return model
  }

  async function stringOutputParser(state: AgentState) {}
  async function parser(sate: String) {}

  // agent
  async function voyagerAgent(state: AgentState) {
    const annotations = await annotate(state)
    const description = await formatDescriptions(annotations)
    const prompt = await formatPrompt()
    const model = await chatModel()
    const runnable = await prompt.pipe(model).invoke(description)

    console.log(runnable)
    return state
  }

  // Tool Selector: Any time the agent completes, this function is called to route the output to a tool or to the end user.
  async function selectTool(state: AgentState) {
    console.log('workflow: selectTool')
    return END
  }

  // Update Scratchpad: After a tool is invoked, we want to update the scratchpad so the agent is aware of its previous steps
  async function updateScratchpad(state: AgentState) {
    console.log('workflow: updateScratchpad')
    return state
  }

  async function sendMessage(value: VoyagerPayload) {
    const workflow = new StateGraph<AgentState>(
      {
        input: value.question,
        img: '',
        bboxes: [],
        prediction: { action: '' },
        scratchpad: [],
        observation: ''
      },
      200
    )

    // Graph builder ----------------------------------------------------------------------
    workflow.addNode('agent', voyagerAgent)
    workflow.setEntryPoint('agent')

    workflow.addNode('update_scratchpad', updateScratchpad)
    workflow.addEdge('update_scratchpad', 'agent')

    workflow.addNode('Click', click)
    workflow.addEdge('Click', 'update_scratchpad')

    workflow.addNode('Type', typeText)
    workflow.addEdge('Type', 'update_scratchpad')

    workflow.addNode('Scroll', scroll)
    workflow.addEdge('Scroll', 'update_scratchpad')

    workflow.addNode('Wait', wait)
    workflow.addEdge('Wait', 'update_scratchpad')

    workflow.addNode('GoBack', goBack)
    workflow.addEdge('GoBack', 'update_scratchpad')

    workflow.addNode('Google', toGoogle)
    workflow.addEdge('Google', 'update_scratchpad')

    workflow.addConditionalEdge('agent', selectTool)

    const app = workflow.compile()
    await app()
  }

  return { sendMessage }
})
