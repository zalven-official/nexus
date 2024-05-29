/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="chrome" />
// Dependencies
import { defineStore } from 'pinia'
import type { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources/index.mjs'

// Store
import { useAnnotationStore, type BBox } from '@/stores/dom/annotation.store'
import { useSecretKeyStore } from '../dom/secret-key.store'

// Types
import { OpenAIClient } from '@/services'
import { StateGraph, END } from '@/core/graph.core'

// Define Graph State
export interface VoyagerPayload {
  question: string
  page: number
  maxSteps?: number
}

export interface Prediction {
  action: string
  args?: string | string[]
}

// This represents the state of the agent as it proceeds through execution
export interface AgentState {
  input: string // User request
  img: string // b64 encoded screenshot
  bboxes: BBox[] // The bounding boxes from the browser annotation function
  prediction: Prediction // The Agent's output
  scratchpad: ChatCompletionMessageParam[] // A system message(or messages) containing the intermediate steps
  observation: string // The most recent response from a tool
}

export const useVoyagerStore = defineStore('voyager', () => {
  const annotationStore = useAnnotationStore()
  const secretKeyStore = useSecretKeyStore()
  const openai = OpenAIClient.getInstance(secretKeyStore.openaiApiKey)

  // Tools ----------------------------------------------------------------------

  async function click(state: AgentState) {
    console.log('workflow: click', state)
    return state
  }
  async function typeText(state: AgentState) {
    console.log('workflow: typeText', state)
    return state
  }

  async function scroll(state: AgentState) {
    console.log('workflow: scroll', state)
    return state
  }

  async function wait(state: AgentState) {
    console.log('workflow: wait', state)
    return state
  }

  async function goBack(state: AgentState) {
    console.log('workflow: addEdge', state)
    return state
  }

  async function toGoogle(state: AgentState) {
    console.log('workflow: toGoogle', state)
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

  function formatPrompt(): ChatCompletionMessageParam[] {
    const prompt = `Imagine you are a robot browsing the web, just like humans. Now you need to complete a task. In each iteration, you will receive an Observation that includes a screenshot of a webpage and some texts. This screenshot will\nfeature Numerical Labels placed in the TOP LEFT corner of each Web Element. Carefully analyze the visual\ninformation to identify the Numerical Label corresponding to the Web Element that requires interaction, then follow\nthe guidelines and choose one of the following actions:\n\n1. Click a Web Element.\n2. Delete existing content in a textbox and then type content.\n3. Scroll up or down.\n4. Wait \n5. Go back\n7. Return to google to start over.\n8. Respond with the final answer\n\nCorrespondingly, Action should STRICTLY follow the format:\n\n- Click [Numerical_Label] \n- Type [Numerical_Label]; [Content] \n- Scroll [Numerical_Label or WINDOW]; [up or down] \n- Wait \n- GoBack\n- Google\n- ANSWER; [content]\n\nKey Guidelines You MUST follow:\n\n* Action guidelines *\n1) Execute only one action per iteration.\n2) When clicking or typing, ensure to select the correct bounding box.\n3) Numeric labels lie in the top-left corner of their corresponding bounding boxes and are colored the same.\n\n* Web Browsing Guidelines *\n1) Don't interact with useless web elements like Login, Sign-in, donation that appear in Webpages\n2) Select strategically to minimize time wasted.\n\nYour reply should strictly follow the format:\n\nThought: {{Your brief thoughts (briefly summarize the info that will help ANSWER)}}\nAction: {{One Action format you choose}}\nThen the User will provide:\nObservation: {{A labeled screenshot Given by User}}\n`
    return [{ role: 'system', content: prompt }]
  }

  async function chatModel(stystemMessage: ChatCompletionMessageParam[], state: AgentState) {
    const result = await openai.completion(
      [...stystemMessage, ...state.scratchpad],
      'gpt-4-vision-preview'
    )
    return result
  }

  function stringOutputParser(message?: ChatCompletion) {
    if (!message) return END
    if (message.choices && 'message' in message.choices[0]) {
      const decision_message = message.choices[0].message
      const result = decision_message?.content ? decision_message.content.trim() : END
      return result.replace(/{{|}}/g, '').trim()
    }
    return END
  }

  function parse(text: string): Prediction {
    const actionPrefix = 'Action: '
    const lines = text.trim().split('\n')

    if (!lines[lines.length - 1].startsWith(actionPrefix)) {
      return { action: 'retry', args: `Could not parse LLM Output: ${text}` }
    }
    const actionBlock = lines[lines.length - 1]
    const actionStr = actionBlock.substring(actionPrefix.length)
    const splitOutput = actionStr.split(' ', 2)
    let action: string
    let actionInput: string | string[] | undefined
    if (splitOutput.length === 1) {
      action = splitOutput[0].trim()
      actionInput = undefined
    } else {
      action = splitOutput[0].trim()
      actionInput = splitOutput[1]
        .trim()
        .split(';')
        .map((inp) => inp.trim().replace(/^\[|\]$/g, ''))
    }
    return { action, args: actionInput }
  }

  // agent
  async function voyagerAgent(state: AgentState) {
    console.log('workflow: voyagerAgent')
    const annotations = await annotate(state)
    const description = await formatDescriptions(annotations)
    state.scratchpad.push({
      role: 'user',
      content: [
        { type: 'image_url', image_url: { url: description.img } },
        { type: 'text', text: description.bbox_descriptions },
        { type: 'text', text: description.input }
      ]
    })
    const completion = await chatModel(formatPrompt(), state)
    const message = stringOutputParser(completion)
    const parsed = parse(message)
    state.prediction = parsed
    return state
  }

  // Tool Selector: Any time the agent completes, this function is called to route the output to a tool or to the end user.
  async function selectTool(state: AgentState) {
    console.log('workflow: selectTool')
    const action = state.prediction.action
    if (action === 'ANSWER') return END
    if (action === 'retry') return 'agent'
    return action
  }

  // Update Scratchpad: After a tool is invoked, we want to update the scratchpad so the agent is aware of its previous steps
  async function updateScratchpad(state: AgentState) {
    console.log('workflow: updateScratchpad')
    return state
  }

  const workflow = new StateGraph<AgentState>(2)

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

  async function sendMessage(value: VoyagerPayload, callback?: (value: AgentState) => void) {
    const proceed = workflow.compile(
      {
        input: value.question,
        img: '',
        bboxes: [],
        prediction: { action: '' },
        scratchpad: [],
        observation: ''
      },
      callback
    )
    await proceed()
  }

  return { sendMessage }
})
