import React from 'react';
import { useDataLayer } from '../components/DataLayer/DataLayer';
import { useHistory } from 'react-router-dom';
import { IUser } from '../interfaces/user.interface';
import { Token } from '../interfaces/token.interface';
import { getDecodedToken } from '../utils/utils';

export const useCheckUserStatus = () => {
  const { state, dispatch } = useDataLayer();
  const history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: Token = getDecodedToken();
      if (decodedToken.exp * 1000 > Date.now()) {
        const userData: IUser = JSON.parse(localStorage.getItem('userData') || '{}');
        if (!Object.keys(userData).length) return;
        dispatch({ type: 'SET_USER', payload: userData });
        dispatch({type: 'SET_AUTHENTICATED', payload: true})
        history.push('/');
      } else {
        localStorage.clear();
        dispatch({type: 'SET_AUTHENTICATED', payload: true})
      }
    }
    return () => {
      if(state.socket) {
        if(state.roomData) {
          state.socket.emit('leave-room', { roomId: state.roomData.id, userId: state.user.id })
        }
        state.socket.disconnect()
      }
    }
  }, []);
}
