import React from 'react'
import { ReactComponent as WhatsappLogo } from '../Login/icons/whatsapp-icon.svg'
import { useHistory } from 'react-router-dom';

export default function SignupHeader () {
  const history = useHistory();
  const goToDashboard = () => history.push('/');
  return (
    <div className='login__header'>
      <div className='login__logoContainer'>
        <WhatsappLogo width='55' height='55' onClick={goToDashboard} style={{cursor: 'pointer'}}/>
        <span className='login__logoTitle' onClick={goToDashboard}>Whatsapp web</span>
      </div>
    </div>
  )
}
