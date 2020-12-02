import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatHeaderMenu from './ChatHeaderMenu'
import { Room } from '../../interfaces/room.interface'
import dayjs from 'dayjs'

interface ChatHeaderProps {
  room: Room | null
}

export default function ChatHeader ({ room }: ChatHeaderProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>(null);

  return (
    <div className='chat__header'>
      <Avatar src={room?.roomPicture ? 'data:image/png;base64,' + new Buffer(room.roomPicture).toString('base64')  : undefined}/>

      <div className='chat__headerInfo'>
        <h3>{room ? room.name : 'Loading...'}</h3>
        <p>
          {room
            ? `created on ${dayjs(room.createdAt).format('YYYY-MM-DD HH:MM')}`
            : ''}
        </p>
      </div>

      <div className='chat__headerRight'>
        <IconButton onClick={ev => setAnchorEl(ev.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
      </div>

      <ChatHeaderMenu anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}/>
    </div>
  )
}
