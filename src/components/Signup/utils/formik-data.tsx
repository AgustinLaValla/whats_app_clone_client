import { FormikValues } from 'formik'
import { AuthResponse } from '../../../interfaces/auth-response.interface'
import axios from 'axios'
import { url } from '../../../utils/utils'
import { History } from 'history'

export const initialValues: any = { username: '', email: '', password: '' }

export const validate = (values: FormikValues) => {
  let errors: any = {}

  if (!values.username) {
    errors.username = 'Username is required'
  } else if(values.username.length < 3) {
    errors.username = 'Username should be at least three characters'
  }

  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
    errors.email = 'Invalid email format'
  }

  if (!values.password) {
    errors.password = 'Password is Required'
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/.test(values.password)) {
    errors.password =
      'Password should have at least one number, one lowercase and one uppercase letter, six characters that are letters, numbers or the underscore'
  }

  return errors
}



export const onSubmit = (
    dispatch: React.Dispatch<any>,
    history: History
  ) => async (values: FormikValues) => {
    try {
      const { data } = await axios.post<AuthResponse>(`${url}/user`, values)
      localStorage.setItem('token', data.token)
      localStorage.setItem('userData', JSON.stringify(data.user))
      dispatch({ type: 'SET_SNACK_TYPE', payload: 'success' })
      dispatch({ type: 'SET_SNACK_MESSAGE', payload: 'You are logged in now!' })
      dispatch({ type: 'OPEN_LOGIN_SNACK', payload: true })
      dispatch({ type: 'SET_AUTHENTICATED', payload: true })
      dispatch({ type: 'SET_USER', payload: data.user })
      history.push('/')
    } catch (error) {
      console.log(error.response)
      dispatch({ type: 'SET_SNACK_TYPE', payload: 'error' })
      dispatch({
        type: 'SET_SNACK_MESSAGE',
        payload: error.response?.data.message
      })
      dispatch({ type: 'OPEN_LOGIN_SNACK', payload: true })
    }
  }