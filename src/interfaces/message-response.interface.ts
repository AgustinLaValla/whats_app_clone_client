import { IMessage } from './message.interface';

export interface HttpMessagesResponse {
    ok: boolean
    messages: IMessage[]
    total: number
  }
  