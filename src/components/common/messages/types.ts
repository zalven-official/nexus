import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

export interface IMessageSample {
  title: string
  description: string
  message: string
}

export interface IMessageBox {
  messages: ChatCompletionMessageParam[]
  sampleMessages: IMessageSample[]
}
