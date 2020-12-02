import React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import { SidebarHeaderMenu } from './SidebarHeaderMenu';
import { useDataLayer } from '../DataLayer/DataLayer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {create_styles } from '../../mui/mui.styles';

const useStyles = makeStyles(theme => ({...create_styles(theme)}));

export default function SidebarHeader (): JSX.Element {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const {state: {user}, dispatch} = useDataLayer();

  const profilePic = user && user.profilePic ? 'data:image/png;base64,' + new Buffer(user.profilePic.data).toString('base64') : undefined

  const openCreateRoomModal = () => 
    dispatch({ type: 'SET_OPEN_CREATE_ROOM_MODAL', payload: true })


  return (
    <div className='sidebar__header'>
      <Avatar src={profilePic} />
      <div className='sidebar__headerRight'>
        <Tooltip title="Create a room" classes={{tooltip: classes.tooltip}}>
          <IconButton onClick={openCreateRoomModal}>
            <GroupAddIcon />
          </IconButton>
        </Tooltip>
        <IconButton onClick={ev => setAnchorEl(ev.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
      </div>
      <SidebarHeaderMenu
        anchorEl={anchorEl}
        handleClose={() => setAnchorEl(null)}
      />
    </div>
  )
}
