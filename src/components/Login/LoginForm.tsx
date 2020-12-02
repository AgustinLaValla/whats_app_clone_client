import React from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { create_styles } from '../../mui/mui.styles'
import { useFormik } from 'formik'
import { initialValues, onSubmit, validate } from './utils/formik-data'
import { useDataLayer } from '../DataLayer/DataLayer'
import { useHistory, Link } from 'react-router-dom'

export const useStyles = makeStyles(theme => ({ ...create_styles(theme) }))

export default function LoginForm (): JSX.Element {
  const classes = useStyles()
  const history = useHistory()

  const { state, dispatch } = useDataLayer()
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched
  } = useFormik({
    initialValues,
    validate,
    onSubmit: onSubmit(dispatch, history)
  })

  return (
    <Paper className={classes.loginPaper} elevation={5}>
      <form className='login__formBox' onSubmit={handleSubmit}>
        <h3 className='login__title'>Login and Enjoy!</h3>
        <div className='form-group'>
          <TextField
            fullWidth={true}
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.email && touched.email)}
            helperText={
              Boolean(errors.email && touched.email) ? errors.email : null
            }
            label='Email'
            color='secondary'
            autoComplete='false'
          />
        </div>
        <div className='form-group'>
          <TextField
            type='password'
            fullWidth={true}
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.password && touched.password)}
            helperText={
              Boolean(errors.password && touched.password)
                ? errors.password
                : null
            }
            label='password'
            color='secondary'
            autoComplete='false'
          />
        </div>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.loginButton}
        >
          Login
        </Button>
        <Link to="/signup" className='login_link'>
          <a >Don't you have an account? Click to Register</a>
        </Link>
      </form>
    </Paper>
  )
}
