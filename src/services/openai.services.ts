import { OpenAI } from 'openai'
import { decodeString, encodeString } from '@/lib'

interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export class OpenAIClient {
  private static instance: OpenAIClient

  private client: OpenAI
  private apiKey: string

  // Available models: "gpt-4-1106-preview", "gpt-3.5-turbo-1106", or "davinci-codex"
  private readonly CHAT_MODEL_NAME: string = 'gpt-3.5-turbo-1106'
  private readonly VISUAL_MODEL_NAME: string = 'gpt-4o'

  private constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true })
    this.apiKey = encodeString(apiKey)
  }

  public static getInstance(apiKey: string): OpenAIClient {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient(apiKey)
    }
    return OpenAIClient.instance
  }

  public async apiCall(
    messages: Message[],
    chatModelName: string = this.CHAT_MODEL_NAME,
    temperature: number = 0.5,

    maxTokens: number = 150
  ): Promise<string | undefined> {
    // if (model_name === "gpt-4-1106-preview")
    //     model_name = "gpt-3.5-turbo-1106"

    // Execute the chat completion using the chosen model
    try {
      const response = await this.client.chat.completions.create({
        model: chatModelName,
        messages: messages,

        // Additional configurations can be passed as parameters here
        temperature: temperature,
        max_tokens: maxTokens
      })

      // Since we're not using 'with_raw_response', 'response' is now the completion object
      // if response.choices and hasattr(response.choices[0], 'message'):
      if (response.choices && 'message' in response.choices[0]) {
        const decision_message = response.choices[0].message
        // Make sure we have 'content' in the message
        return decision_message?.content ? decision_message.content.trim() : undefined
      }
      return undefined
    } catch (err) {
      throw new Error(`n error occurred: ${err}`)
    }
  }

  // Function to analyze an image using OpenAI API
  public async analyzeImage(
    base64Image: string,
    additionalCcontext: string = "What's in this image?",
    visualModelName: string = this.VISUAL_MODEL_NAME
  ) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${decodeString(this.apiKey)}`
    }
    const payload = {
      model: `${visualModelName}`,
      messages: [
        {
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: `${additionalCcontext}`
            },
            {
              type: 'image_url',
              image_url: {
                url: `${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 300
    }
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error:', error)
      return undefined
    }
  }
}
