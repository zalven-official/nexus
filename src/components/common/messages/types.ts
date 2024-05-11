export interface IMessage {
  image: string
  label: string
  message: string
  datetime: Date,
  sender: boolean
}

export interface IMessageBox {
  messages: IMessage[]
}