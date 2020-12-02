import React from 'react'
import Modal from '@material-ui/core/Modal'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios';
import { url, getToken, getDecodedToken } from '../../utils/utils';
import { create_styles } from '../../mui/mui.styles';
import { useHistory } from 'react-router-dom'
import { IUser } from '../../interfaces/user.interface'
import { Room } from '../../interfaces/room.interface'

const useStyles = makeStyles(theme => ({...create_styles(theme)}))

interface CreateRoomModalProps {
  open: boolean
  dispatch: React.Dispatch<any>
  userData: IUser
  socket: SocketIOClient.Socket
}

export default function CreateRoomModal ({ open, dispatch, userData, socket}: CreateRoomModalProps): JSX.Element {
  const classes = useStyles()
  const [roomName, setRoomName] = React.useState('')
  const history = useHistory();

  const handleClose = () =>
    dispatch({ type: 'SET_OPEN_CREATE_ROOM_MODAL', payload: false })

  const createRoom = () => {
    if(!userData || getDecodedToken().exp * 1000 <= Date.now()) {
      history.push('/login');
      return;
    }
    const token = getToken();
    axios.post(`${url}/rooms`, { name:roomName }, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(() => {
          socket.emit('reload-rooms');
          handleClose();
        })
        .catch(error => console.log(error.response?.data.message))
  }

  return (
    <Modal open={open} className={classes.modal} onClose={handleClose}>
      <Box className={classes.paper}>
        <h3>Create a room to chat with your friends</h3>
        <Box className={classes.createRoomInputContainer}>
          <TextField
            value={roomName}
            onChange={ev => setRoomName(ev.target.value)}
            label={'Room Name'}
            fullWidth={true}
          />
        </Box>
        <Button 
            variant="contained" 
            color="primary" 
            disabled={roomName.length < 4}
            onClick={createRoom}
            size="large"
            className={classes.createRoomButton}
        >   Create Room
        </Button>
      </Box>
    </Modal>
  )
}
