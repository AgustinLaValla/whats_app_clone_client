import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Room } from '../../interfaces/room.interface'
import axios, { AxiosResponse } from 'axios'
import { url, setHttpHeaders } from '../../utils/utils'
import { IUser } from '../../interfaces/user.interface'
import { HttpMessagesResponse } from '../../interfaces/message-response.interface'
import { HttpRoomResponse } from '../../interfaces/room-response.interface'
import { useHistory } from 'react-router-dom'

interface SidebarChatProps {
  room: Room
  dispatch: React.Dispatch<any>
  socket: SocketIOClient.Socket
  userData: IUser
  roomData: Room
}

export default function SidebarChat ({
  room,
  dispatch,
  socket,
  userData,
  roomData
}: SidebarChatProps): JSX.Element {
  const history = useHistory()
  const enterTheRoom = async () => {
    if (!userData) {
      history.push('/login')
      return
    }

    if (roomData) {
      socket.emit('leave-room', { roomId: roomData.id, userId: userData.id })
      dispatch({ type: 'CLEAR_ROOM_DATA' })
    }

    dispatch({ type: 'SET_USER_IS_INSIDE_A_ROOM', payload: true })

    const enterToRoomRequest = axios.put(
      `${url}/rooms/${room.id}`,
      {},
      setHttpHeaders(history, dispatch)
    )
    const messagesRequest = axios.get<HttpMessagesResponse>(
      `${url}/messages/${room.id}/15`
    )
    const roomRequest = axios.get<HttpRoomResponse>(`${url}/rooms/${room.id}`)

    axios
      .all<AxiosResponse<any>>([
        enterToRoomRequest,
        roomRequest,
        messagesRequest
      ])
      .then(
        axios.spread((...responses) => {
          const [
            enterToRoomResponse,
            roomResponse,
            messagesResponse
          ] = responses
          dispatch({ type: 'SET_ROOM_DATA', payload: roomResponse.data.room })
          dispatch({
            type: 'SET_ROOM_MESSAGES',
            payload: {
              messages: messagesResponse.data.messages.reverse(),
              limit: 15,
              totalMessages: messagesResponse.data.total
            }
          })
          socket.emit('entered', {
            roomId: room.id,
            userId: userData.id,
            username: userData.username
          })
        })
      )
      .catch(error => console.log(error))
  }
  return (
    <div className='sidebarChat' onClick={enterTheRoom}>
      <img
        className='sidebarChar__logo'
        src={room.roomPicture ? 'data:image/png;base64,' + new Buffer(room.roomPicture).toString('base64') : '/img/chat.png'}
        alt='char_logo'
      />
      <div className='sidebarChat__info'>
        <h2>{room.name}</h2>
      </div>
    </div>
  )
}
