export interface IMessage {
  image: string
  label: string
  message: string
  datetime: Date
  sender: boolean
}

export interface IMessageSample {
  title: string
  description: string
  message: string
}

export interface IMessageBox {
  messages: IMessage[]
  sampleMessages: IMessageSample[]
}
