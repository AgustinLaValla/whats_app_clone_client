import React from 'react'
import { IMessage } from '../../interfaces/message.interface'
import RelativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(RelativeTime);

interface MessageProps {
  message: IMessage
  class_name?: string
}

export default function Message ({ message, class_name }: MessageProps): JSX.Element {
  return (
    <p className={`chat__message ${class_name}`}>
      <span className='chat__name'>{message.sender.username}</span>
      <p className='chat__text'>{message.message}</p>
      <span className='chat__timestamp'>{dayjs(message.createdAt).fromNow()}</span>
    </p>
  )
}
