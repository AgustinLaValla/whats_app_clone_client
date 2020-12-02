import React from 'react';
import axios from 'axios';
import { url } from '../../../utils/utils';
import { useDataLayer } from '../../DataLayer/DataLayer';
import { HttpRoomsResponse }  from '../../../interfaces/rooms-response.interface';

export const useGetRooms = () => {
  const { state, dispatch } = useDataLayer();

  React.useEffect(() => {
    axios.get<HttpRoomsResponse>(`${url}/rooms`).then(({ data }) => {
      dispatch({type: 'SET_ROOMS', payload: data.rooms})
    })

    return () => {}
  }, []);

  return state.rooms;
}
