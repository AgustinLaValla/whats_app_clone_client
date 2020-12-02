import createStyles from '@material-ui/core/styles/createStyles'

export const create_styles = theme =>
  createStyles({
    loginPaper: {
      position: 'absolute',
      left: '50%',
      lineHeight: '50%',
      transform: 'translate(-50%, -40%)'
    },

    loginButton: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 600
    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      outline: 'none',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center'
    },
    createRoomInputContainer: {
      display: 'block',
      width: '90%',
      margin: '20px auto'
    },
    createRoomButton: {
      width: '90%'
    },

    usersDetails: {
      maxHeight: 350,
      scrollY: 'auto',
      position: 'relative'
    },

    usersDetailsCloseIcon: {
      position: 'absolute',
      right: 15,
      top: 10,
      cursor: 'pointer'
    },

    usersDetailsStatus: {
      paddingLeft: 20
    },
    tooltip: {
      fontSize: 18
    }
  })
