import React from 'react'
import { ReactComponent as WhatsAppSvg } from './icons/whatsapp.svg'

export default function EmptyRoom () {
  return (
    <div className='chat__empty'>
      <div className='emptyRoom__wrapper'>
        <WhatsAppSvg width='150' height='150' />
        <p>Select or create a Room to chat with your friends</p>
      </div>
    </div>
  )
}
