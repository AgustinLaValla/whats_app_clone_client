import { IUser } from '../interfaces/user.interface'
import { Token } from '../interfaces/token.interface'
import jwtDecode from 'jwt-decode'
import { History } from 'history'

// export const url = 'http://localhost:4000'
export const url = 'https://whats-app-clone-server.herokuapp.com'

export const getToken = (): string => localStorage.getItem('token') || ''

export const getDecodedToken = (): Token => jwtDecode(getToken())

export const getUserData = (): IUser =>
  JSON.parse(localStorage.getItem('userData') || '{}')

export const setHttpHeaders = (
  history: History,
  dispatch: React.Dispatch<any>
) => {
  const decodedToken: Token = getDecodedToken()

  if (decodedToken.exp * 1000 <= Date.now()) {
    localStorage.clear()
    dispatch({ type: 'SET_AUTHENTICATED', payload: false })
    dispatch({ type: 'SET_USER', payload: null })
    history.push('/login')
    return
  }

  return {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }
}
