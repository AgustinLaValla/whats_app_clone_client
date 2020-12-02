import React from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { useDataLayer } from '../DataLayer/DataLayer'
import axios from 'axios'
import { url } from '../../utils/utils'
import { HttpMessagesResponse } from '../../interfaces/message-response.interface'
import './Chat.css'

export default function Chat (): JSX.Element {
  const { state, dispatch } = useDataLayer()
  const [scrollFromTop, setScrollFromTop] = React.useState<boolean>(false);

  const handleScroll = (ev: React.UIEvent<HTMLElement>) => {
    const scrollTop = ev.currentTarget.scrollTop
    const total = state.roomMessages.totalMessages
    const limit = state.roomMessages.limit
    if (scrollTop === 0 && limit < total) {
      setScrollFromTop(true);
      axios
        .get<HttpMessagesResponse>(
          `${url}/messages/${state.roomData.id}/${limit + 15}`
        )
        .then(({ data }) => {
          dispatch({
            type: 'SET_ROOM_MESSAGES',
            payload: {
              messages: data.messages.reverse(),
              limit: limit + 15,
              totalMessages: data.total
            }
          })
        })
        .catch(error => console.log(error.response?.data?.message))
    }
  }

  return (
    <div className='chat'>
      {state.inside && <ChatHeader room={state.roomData} />}

      <ChatBody
        inside={state.inside}
        roomMessages={state.roomMessages}
        handleScroll={handleScroll}
        userData={state.user}
        scrollFromTop={scrollFromTop}
        setScrollFromTop={() => setScrollFromTop(false)}
        roomId={state.roomData?.id}
      />

      {state.inside && (
        <ChatFooter roomData={state.roomData} socket={state.socket} />
      )}
    </div>
  )
}
