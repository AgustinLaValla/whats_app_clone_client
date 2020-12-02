import React from 'react'
import { UserSocketData } from '../../../interfaces/user-socket-data.interface'
import { useDataLayer } from '../../DataLayer/DataLayer'
import socketIoClient from 'socket.io-client'
import axios from 'axios'
import { url } from '../../../utils/utils'
import { HttpMessagesResponse } from '../../../interfaces/message-response.interface'
import { HttpRoomsResponse } from '../../../interfaces/rooms-response.interface'
import { HttpRoomResponse } from '../../../interfaces/room-response.interface'


interface RoomData {
  roomId: string
  users: UserSocketData[]
}

export const useSocket = () => {
  const { state, dispatch } = useDataLayer()
  React.useEffect(() => {
    if (state.user && !state.socket) {
      let newSocket: SocketIOClient.Socket
      newSocket = socketIoClient(`${url}`)
      dispatch({ type: 'SET_SOCKET_GLOBAL_OBJ', payload: newSocket })
      newSocket.emit('online', {
        userId: state.user.id,
        username: state.user.username
      })
    }
    return () => {
      if (state.socket) {
        if(state.roomData) {
          state.socket.emit('leave-room', { roomId: state.roomData.id, userId: state.user.id })
        }
        state.socket.emit('logout')
        state.socket.removeAllListeners()
        state.socket.close()
      }
    }
  }, [state.authenticated])

  React.useEffect(() => {
    const setLiteners = async () => {
      await state.socket.removeAllListeners()

      state.socket.on(
        'usersOnline',
        ({ onlineUsers }: { [key: string]: number[] }) => {})

      state.socket.on(
        'room-data',
        ({ roomData }: { [key: string]: RoomData }) => {
          dispatch({ type: 'SET_USERS_CONNECTED', payload: roomData.users })
        }
      )

      state.socket.on('reload-rooms', () =>
        axios.get<HttpRoomsResponse>(`${url}/rooms`).then(({ data }) => {
          dispatch({ type: 'SET_ROOMS', payload: data.rooms })
        })
      )

      state.socket.on('reload-room', ({ roomId }) => {
        axios
          .get<HttpRoomResponse>(`${url}/rooms/${roomId}`)
          .then(({ data }) => {
            dispatch({ type: 'SET_ROOM_DATA', payload: data.room })
          })
      })

      state.socket.on('user-is-disconnected', ({userId}) =>{
        if(state.usersConnected) {
          dispatch({type:'UPDATE_USERS_CONNECTED', payload: userId})
        }
      })
    }

    if (state.socket) {
      setLiteners()
    }
  }, [state.socket])

  React.useEffect(() => {
    if (state.user && state.socket) {
      state.socket.removeListener('reload-messages')
      const limit = state.roomMessages.limit
      const reloadMessages = ({ roomId }: { [k: string]: string }) => {
        axios
          .get<HttpMessagesResponse>(`${url}/messages/${roomId}/${limit + 1}`)
          .then(({ data }) => {
            dispatch({
              type: 'SET_ROOM_MESSAGES',
              payload: {
                messages: data.messages.reverse(),
                limit: limit + 1,
                totalMessages: data.total
              }
            })
          })
          .catch(error => console.log(error.response?.data?.message))
      }

      state.socket.on('reload-messages', reloadMessages)
    }
  }, [state.roomMessages])

}
