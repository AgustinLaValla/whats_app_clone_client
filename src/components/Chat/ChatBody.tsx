import React from 'react'
import Message from './Message'
import EmptyRoom from './EmptyRoom'
import { IMessage } from '../../interfaces/message.interface'
import { useHandleChatBodyScrollTop } from './hooks/useHandleChatBodyScrollTop'
import { IUser } from '../../interfaces/user.interface'

interface ChatBodyProps {
  inside: boolean
  roomMessages: {
    messages: IMessage[]
    limit: number
    totalMessages: number
  }
  userData: IUser
  handleScroll: (ev: React.UIEvent<HTMLElement>) => any
  scrollFromTop: boolean
  setScrollFromTop: () => void,
  roomId: string
}

export default function ChatBody ({
  inside,
  roomMessages,
  userData,
  handleScroll,
  scrollFromTop,
  setScrollFromTop,
  roomId
}: ChatBodyProps) {
  
  useHandleChatBodyScrollTop(
    roomMessages.messages,
    roomMessages.limit,
    scrollFromTop,
    setScrollFromTop,
    roomId
  )

  return inside ? (
    <div className='chat__body' onScroll={handleScroll}>
      {roomMessages.messages.map(message => (
        <Message
          key={message.id}
          message={message}
          class_name={
            userData && userData.id === message.sender.id
              ? 'chat__receiver'
              : undefined
          }
        />
      ))}
    </div>
  ) : (
    <EmptyRoom />
  )
}
