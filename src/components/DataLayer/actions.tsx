import { IMessage } from '../../interfaces/message.interface'
import { Room } from '../../interfaces/room.interface'
import { UserSocketData } from '../../interfaces/user-socket-data.interface'
import { IUser } from '../../interfaces/user.interface'

interface SetSocketGlobalObject {
  type: 'SET_SOCKET_GLOBAL_OBJ'
  payload: any
}

interface setAuthenticated {
  type: 'SET_AUTHENTICATED'
  payload: boolean
}

interface SetUserAction {
  type: 'SET_USER'
  payload: IUser
}

interface SetSnackMessage {
  type: 'SET_SNACK_MESSAGE'
  payload: string
}

interface OpenLoginSnack {
  type: 'OPEN_LOGIN_SNACK'
  payload: boolean
}

interface SetSnackType {
  type: 'SET_SNACK_TYPE'
  payload: 'success' | 'error'
}

interface SetOpenCreateRoomModal {
  type: 'SET_OPEN_CREATE_ROOM_MODAL'
  payload: boolean
}

interface SetUserIsInsideARoom {
  type: 'SET_USER_IS_INSIDE_A_ROOM'
  payload: boolean
}

interface SetRoomMessages {
  type: 'SET_ROOM_MESSAGES'
  payload: {
    messages: IMessage[]
    limit: number
    totalMessages: number
  }
}

interface SetRoomData {
  type: 'SET_ROOM_DATA'
  payload: Room
}

interface SetRooms {
  type: 'SET_ROOMS'
  payload: Room[]
}

interface SetOpenUsersDetailsDialog {
  type: 'SET_OPEN_USERS_DETAILS_DIALOG'
  payload: boolean
}

interface SetUsersConnected {
  type: 'SET_USERS_CONNECTED'
  payload: UserSocketData[]
}

interface ClearRoomData {
  type: 'CLEAR_ROOM_DATA'
}

interface UpdateUsersConnected {
  type: 'UPDATE_USERS_CONNECTED'
  payload: number
}

export type Action =
  | SetUserAction
  | SetSocketGlobalObject
  | SetSnackMessage
  | OpenLoginSnack
  | SetSnackType
  | SetOpenCreateRoomModal
  | SetUserIsInsideARoom
  | SetRoomMessages
  | SetRoomData
  | SetRooms
  | SetOpenUsersDetailsDialog
  | SetUsersConnected
  | ClearRoomData
  | setAuthenticated
  | UpdateUsersConnected
