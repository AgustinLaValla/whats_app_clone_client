import React from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import axios from 'axios'
import { url, getToken } from '../../utils/utils'
import { HttpRoomsResponse } from '../../interfaces/rooms-response.interface'
import { useDataLayer } from '../DataLayer/DataLayer'

export default function SidebarSearcher (): JSX.Element {
  const { state, dispatch } = useDataLayer()

  const searchRoom = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value.length > 0) {
      axios
        .post<HttpRoomsResponse>(
          `${url}/rooms/search-room`,
          { roomName: ev.target.value },
          {
            headers: {
              Authorization: `Bearer ${getToken}`
            }
          }
        )
        .then(({ data }) => {
          dispatch({ type: 'SET_ROOMS', payload: data.rooms })
        })
    } else {
      axios.get<HttpRoomsResponse>(`${url}/rooms`).then(({ data }) => {
        dispatch({ type: 'SET_ROOMS', payload: data.rooms })
      })
    }
  }

  return (
    <div className='sidebar__search'>
      <div className='sidebar__searchContainer'>
        <SearchOutlinedIcon />
        <input
          placeholder='Search a Room and start to Chat'
          type='text'
          onChange={searchRoom}
        />
      </div>
    </div>
  )
}
