import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDataLayer } from '../DataLayer/DataLayer'
import axios from 'axios'
import { url, getToken, getDecodedToken } from '../../utils/utils'
import { useHistory } from 'react-router-dom'

interface ComponentProps {
  handleClose: () => void
  anchorEl: HTMLElement | null
}

interface HttpResponse {
  ok: boolean
  message: string
}

export default function ChatHeaderMenu ({
  handleClose,
  anchorEl
}: ComponentProps): JSX.Element {
  const { state, dispatch } = useDataLayer()
  const history = useHistory()
  const fileInput = React.useRef<HTMLInputElement>();

  const seeUsersDetails = () =>
    dispatch({ type: 'SET_OPEN_USERS_DETAILS_DIALOG', payload: true })

  const leaveRoom = () => {
    if (getDecodedToken().exp * 1000 <= Date.now()) {
      history.push('/login')
      localStorage.clear()
      return
    }

    axios.put<HttpResponse>(
        `${url}/rooms/leave/${state.roomData.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      )
      .then(({data}) => {

        const roomId = state.roomData.id

        if(state.openUsersDetailsDialog) dispatch({type: 'SET_OPEN_USERS_DETAILS_DIALOG', payload: false})
        dispatch({type: 'SET_USER_IS_INSIDE_A_ROOM', payload: false})
        dispatch({ type: 'CLEAR_ROOM_DATA' })

        state.socket.emit('leave-room', {
          roomId: roomId,
          userId: state.user.id
        })

        state.socket.emit('reload-room', { roomId })

      })
      .catch(error => console.log(error.response?.data?.message))
  }

  const uploadImage = (file:File) => {
    if(file.type.indexOf('image') < 0) return alert('Only images are allowed');

    if(!file || !state.user || !state.roomData) return;

    const form = new FormData();
    form.append('file', file, file.name);

    axios.put(
      `${url}/rooms/${state.roomData.id}/change-image`,
      form,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    ).then(({data}) => {
      console.log('Picture successfully updated')
      if(state.socket) {
        state.socket.emit('reload-room', { roomId: state.roomData.id })
      }
    })
    .catch(error => console.log(error.response?.data.message));
    ;
  }
 
  return (
    <Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl}>
      <MenuItem onClick={seeUsersDetails}>Users Details</MenuItem>
      <MenuItem onClick={() => fileInput.current.click()}>Change Room Picture</MenuItem>
      <input ref={fileInput} type="file" hidden={true} onChange={ev => uploadImage(ev.target.files[0])}/>
      <MenuItem onClick={leaveRoom}>Leave room</MenuItem>
    </Menu>
  )
}
