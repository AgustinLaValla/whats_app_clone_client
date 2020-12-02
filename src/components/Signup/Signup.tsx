import React from 'react'
import SignupForm from './SignupForm'
import SignupHeader from './SignupHeader'
import '../Login/Login.css'

export default function Signup (): JSX.Element {
  return (
    <div className='login'>
      <SignupHeader />
      <SignupForm />
    </div>
  )
}
