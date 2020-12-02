import { IMessage } from '../../interfaces/message.interface'
import { Room } from '../../interfaces/room.interface'
import { UserSocketData } from '../../interfaces/user-socket-data.interface'
import { IUser } from '../../interfaces/user.interface'
import { Action } from './actions'

export interface DataLayerState {
  authenticated: boolean
  socket: SocketIOClient.Socket
  user: IUser
  snackMessage: string
  openLoginSnack: boolean
  snackType: 'success' | 'error'
  openCreateRoomModal: boolean
  inside: boolean
  roomMessages: {
    messages: IMessage[]
    limit: number
    totalMessages: number
  }
  roomData: Room
  rooms: Room[]
  openUsersDetailsDialog: boolean
  usersConnected: UserSocketData[]
}

export const initalState: DataLayerState = {
  authenticated: false,
  socket: null,
  user: null,
  snackMessage: null,
  openLoginSnack: false,
  snackType: 'success',
  openCreateRoomModal: false,
  inside: false,
  roomMessages: {
    messages: [],
    limit: 0,
    totalMessages: 0
  },
  roomData: null,
  rooms: [],
  openUsersDetailsDialog: false,
  usersConnected: []
}

export const reducer = (
  state: DataLayerState,
  action: Action
): DataLayerState => {
  switch (action.type) {
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        authenticated: action.payload
      }

    case 'SET_SOCKET_GLOBAL_OBJ':
      return {
        ...state,
        socket: action.payload
      }

    case 'SET_USER':
      return {
        ...state,
        user: { ...action.payload }
      }

    case 'SET_SNACK_MESSAGE':
      return {
        ...state,
        snackMessage: action.payload
      }

    case 'OPEN_LOGIN_SNACK':
      return {
        ...state,
        openLoginSnack: action.payload
      }

    case 'SET_SNACK_TYPE':
      return {
        ...state,
        snackType: action.payload
      }

    case 'SET_OPEN_CREATE_ROOM_MODAL':
      return {
        ...state,
        openCreateRoomModal: action.payload
      }

    case 'SET_USER_IS_INSIDE_A_ROOM':
      return {
        ...state,
        inside: action.payload
      }

    case 'SET_ROOM_MESSAGES':
      return {
        ...state,
        roomMessages: { ...action.payload }
      }

    case 'SET_ROOM_DATA':
      return {
        ...state,
        roomData: { ...action.payload }
      }

    case 'SET_ROOMS':
      return {
        ...state,
        rooms: [...action.payload]
      }

    case 'SET_OPEN_USERS_DETAILS_DIALOG':
      return {
        ...state,
        openUsersDetailsDialog: action.payload
      }

    case 'SET_USERS_CONNECTED':
      return {
        ...state,
        usersConnected: [...action.payload]
      }

    case 'CLEAR_ROOM_DATA':
      return {
        ...state,
        roomData: null
      }

    case 'UPDATE_USERS_CONNECTED':
      return {
        ...state,
        usersConnected: state.usersConnected.filter(user => user.userId !== action.payload)
      }

    default:
      return state
  }
}
