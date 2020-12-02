import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CloseIcon from '@material-ui/icons/Close';
import { create_styles } from '../../mui/mui.styles';
import { useDataLayer }  from '../DataLayer/DataLayer'; 
import { IUser } from '../../interfaces/user.interface';

const useStyles = makeStyles(theme => ({...create_styles(theme)}))

export default function UsersDetail(): JSX.Element {
    const classes = useStyles();
    
    const { state, dispatch } = useDataLayer();

    const handleClose = () => dispatch({type:'SET_OPEN_USERS_DETAILS_DIALOG', payload: false})

    const checkUserStatus = (id:number) => {
        const isUserConnected = state.usersConnected.find(user => user.userId === id);
        return isUserConnected ? 'Connected' : 'Disconnected'
    }

    const getProfilePic = (user: IUser) => {
        return user.profilePic 
            ? 'data:image/png;base64,' + new Buffer(user.profilePic.data).toString('base64') 
            : undefined
    }

    return (
        <Dialog open={state.openUsersDetailsDialog} onClose={handleClose} className={classes.usersDetails}>
            <CloseIcon className={classes.usersDetailsCloseIcon} onClick={handleClose}/>
            <DialogTitle style={{textAlign: 'center'}}>Users</DialogTitle>
            {
                state.roomData && 
                state.roomData.users &&
                state.roomData.users.map(user => (
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={getProfilePic(user)}/>
                            </ListItemAvatar>
                            <ListItemText primary={user.username}/>
                            <span style={{marginLeft:'20px'}} className={checkUserStatus(user.id)}>
                                {checkUserStatus(user.id)}
                            </span>
                        </ListItem>
                    </List>
                ))
            }
        </Dialog>
    )
}
