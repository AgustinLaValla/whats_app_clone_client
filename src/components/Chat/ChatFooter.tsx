import React from 'react'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { useHistory } from 'react-router-dom'
import { getUserData, url, getToken } from '../../utils/utils'
import { IUser } from '../../interfaces/user.interface'
import { Room } from '../../interfaces/room.interface'
import axios from 'axios'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

interface ChatFooterProps {
  roomData: Room | null
  socket: SocketIOClient.Socket
}

export default function ChatFooter ({
  roomData,
  socket
}: ChatFooterProps): JSX.Element {
  const [inputValue, setInputValue] = React.useState<string>('')
  const [showPicker, setShowPicker] = React.useState<boolean>(false)
  const history = useHistory()
  const submitBtnRef = React.useRef<HTMLInputElement>();

  const sendMessage = async (ev?: any): Promise<any> => {
    if (ev) {
      ev.preventDefault()
    }
    const userData: IUser = getUserData()
    const token: string = getToken()

    if (!Object.keys(userData).length) {
      return history.push('/login')
    }

    if (!inputValue) return

    setInputValue('')

    try {
      await axios.post(
        `${url}/messages`,
        {
          senderId: userData.id,
          message: inputValue,
          roomId: roomData?.id
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      socket.emit('reload-messages', { roomId: roomData?.id })
    } catch (error) {
      console.log(error.response?.data.message)
    }
  }

  const closePicker = (key: string) => {
    if (key === 'Escape') {
      setShowPicker(prev => (prev ? !prev : prev))
    }
  }

  const onSelectEmoji = ev => {
    setInputValue(prev => prev + ev.native)
  }

  React.useEffect(() => {
    setShowPicker(false);
  }, [roomData])

  return (
    <div className='chat__footer' onKeyDown={ev => closePicker(ev.key)}>
      <InsertEmoticonIcon
        onClick={() => setShowPicker(prev => !prev)}
        style={{ cursor: 'pointer' }}
      />
      <form>
        {showPicker && (
          <Picker
            style={{
              position: 'absolute',
              bottom: '123px',
              width: 350
            }}
            set='google'
            onSelect={onSelectEmoji}
          />
        )}
        <input
          type='text'
          placeholder='Type a message'
          value={inputValue}
          onChange={ev => setInputValue(ev.target.value)}
          onKeyDown={ev => (ev.key === 'Enter' ? submitBtnRef.current.click() : null)}
        />
        <button type="submit" ref={submitBtnRef} onClick={sendMessage}>Send a message</button>
      </form>
    </div>
  )
}
