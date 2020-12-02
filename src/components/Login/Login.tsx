import React from 'react'
import LoginHeader from './LoginHeader'
import LoginForm from './LoginForm'

import './Login.css'

export default function Login () {
  return (
    <div className='login'>
      <LoginHeader />
      <LoginForm />
    </div>
  )
}
