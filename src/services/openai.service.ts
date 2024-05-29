import OpenAI from 'openai'
import { decodeString, encodeString } from '@/lib/index'
import type { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources/index.mjs'

export class OpenAIClient {
  private static instance: OpenAIClient

  private client: OpenAI
  private token: string

  private readonly CHAT_MODEL_NAME: string = 'gpt-4o'

  private constructor(token: string) {
    this.token = encodeString(token)
    this.client = new OpenAI({ apiKey: decodeString(this.token), dangerouslyAllowBrowser: true })
  }

  public static getInstance(token: string): OpenAIClient {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient(token)
    }
    return OpenAIClient.instance
  }

  public async completion(
    messages: ChatCompletionMessageParam[],
    chatModelName: string = this.CHAT_MODEL_NAME,
    temperature: number = 0.2,
    maxTokens: number = 150
  ): Promise<ChatCompletion | undefined> {
    try {
      const response = await this.client.chat.completions.create({
        messages: messages,
        model: chatModelName,
        temperature: temperature,
        max_tokens: maxTokens
      })
      return response
    } catch (err) {
      throw new Error(`n error occurred: ${err}`)
    }
  }
}
