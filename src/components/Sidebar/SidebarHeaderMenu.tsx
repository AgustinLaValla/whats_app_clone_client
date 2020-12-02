import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDataLayer } from '../DataLayer/DataLayer'
import axios from 'axios'
import { url, getToken } from '../../utils/utils'
import { useHistory } from 'react-router-dom'

interface ComponentProps {
  handleClose: () => void
  anchorEl: HTMLElement | null
}

export function SidebarHeaderMenu ({
  handleClose,
  anchorEl
}: ComponentProps): JSX.Element {
  const { state, dispatch } = useDataLayer()
  const fileInput = React.useRef<HTMLInputElement>()
  const history = useHistory()

  const openCreateRoomModal = () => {
    dispatch({ type: 'SET_OPEN_CREATE_ROOM_MODAL', payload: true })
    handleClose()
  }

  const changeProfilePic = (file: File) => {
    if (!state.user || !file) return

    if (file.type.indexOf('image') < 0) return alert('Only images are allowed')

    const form = new FormData()

    form.append('file', file, file.name)

    axios
      .put(`${url}/user/change-profile-pic`, form, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      .then(({ data }) => {
        if (state.socket) {
          localStorage.setItem('userData', JSON.stringify(data.user))
          dispatch({ type: 'SET_SNACK_TYPE', payload: 'success' })
          dispatch({
            type: 'SET_SNACK_MESSAGE',
            payload: 'Pictures Changed!'
          })
          dispatch({ type: 'OPEN_LOGIN_SNACK', payload: true })
          dispatch({ type: 'SET_USER', payload: data.user })
          if (state.socket) {
            state.socket.emit('reload-room', { roomId: state.roomData.id })
          }
        }
      })
      .catch(error => console.log(error.response?.data.message))
  }

  const logout = () => {
    localStorage.clear()
    if(state.roomData) {
      state.socket.emit('leave-room', { roomId: state.roomData.id, userId: state.user.id })
    }
    dispatch({ type: 'SET_AUTHENTICATED', payload: false })
    dispatch({ type: 'SET_USER', payload: null })
    history.push('/login')
  }

  return (
    <Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl}>
      <MenuItem onClick={openCreateRoomModal}>Create Room</MenuItem>
      {state.user && (
        <MenuItem onClick={() => fileInput.current.click()}>
          Change Profile Picture
        </MenuItem>
      )}
      <input
        type='file'
        ref={fileInput}
        onChange={ev => changeProfilePic(ev.target.files[0])}
        hidden={true}
      />
      {state.authenticated ? (
        <MenuItem onClick={logout}>Logout</MenuItem>
      ) : (
        <MenuItem onClick={() => history.push('/login')}>Login</MenuItem>
      )}
    </Menu>
  )
}
