import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { theme } from './mui/custom-theme'
import { useCheckUserStatus } from './utils/hooks'
import SnackError from './components/SnackError/SnackError'
import './App.css'

function App () {
  useCheckUserStatus()
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact={true} path='/' component={Dashboard} />
        <Route exact={true} path='/login' component={Login} />
        <Route exact={true} path='/signup' component={Signup} />
        <Redirect to="/"/>
      </Switch>
      <SnackError />
    </ThemeProvider>
  )
}

export default App
