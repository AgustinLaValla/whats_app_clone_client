import React from 'react'
import { Room } from '../../interfaces/room.interface'
import SidebarChat from './SidebarChat'
import { useDataLayer } from '../DataLayer/DataLayer'

interface SidebarProps {
  rooms: Room[]
}

export default function SidebarChats ({ rooms }: SidebarProps): JSX.Element {
  const { state, dispatch } = useDataLayer()

  return (
    <div className='sidebar__chats'>
      {rooms.map(room => (
        <SidebarChat
          key={room.id}
          room={room}
          dispatch={dispatch}
          socket={state.socket}
          userData={state.user}
          roomData={state.roomData}
        />
      ))}
    </div>
  )
}
