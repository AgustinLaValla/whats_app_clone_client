import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarSearcher from './SidebarSearcher'
import './Sidebar.css'
import SidebarChats from './SidebarChats'
import { useGetRooms } from './hooks/useGetRooms';
import { Room } from '../../interfaces/room.interface'

export default function Sidebar (): JSX.Element {
  const rooms: Room[] = useGetRooms();
  return (
    <div className='sidebar'>
      <SidebarHeader />
      <SidebarSearcher />
      <SidebarChats rooms={rooms}/>
    </div>
  )
}
