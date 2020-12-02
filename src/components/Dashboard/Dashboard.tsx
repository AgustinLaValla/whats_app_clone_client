import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Chat from '../Chat/Chat'
import CreateRoomModal from '../Sidebar/CreateRoomModal'
import UsersDetails from './UsersDetail'
import { useSocket } from './hooks/sockets'
import { useDataLayer } from '../DataLayer/DataLayer'
import './Dashboard.css'

export default function Dashboard (): JSX.Element {
  const { state, dispatch } = useDataLayer()

  useSocket()

  return (
    <div className='dashboard'>
      <div className='dashboard__body'>
        <Sidebar />
        <Chat />
        <CreateRoomModal
          open={state.openCreateRoomModal}
          dispatch={dispatch}
          userData={state.user}
          socket={state.socket}
        />
        <UsersDetails />
      </div>
    </div>
  )
}
