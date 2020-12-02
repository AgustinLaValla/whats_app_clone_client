import React from 'react'
import { IMessage } from '../../../interfaces/message.interface'

export const useHandleChatBodyScrollTop = (
  messages: IMessage[],
  limit: number,
  scrollFromTop: boolean,
  setScrollFromTop: () => void,
  roomId: string
) => {
  const [prevRoom, setPrevRoom] = React.useState<string>('')
  React.useEffect(() => {
    const chatBody = document.querySelector('.chat__body')
    if (chatBody) {
      if (limit > 15 && scrollFromTop) {
        chatBody.scrollTop = chatBody.clientHeight
        setScrollFromTop()
      }
    }

    return () => {}
  }, [messages])

  React.useEffect(() => {
    if (roomId && roomId !== prevRoom) {
      const chatBody = document.querySelector('.chat__body')
      if (chatBody) {
        chatBody.scroll({
          top: chatBody.scrollHeight,
          behavior: 'smooth'
        })
      }
      setPrevRoom(roomId);
    }
  }, [messages])
}
