import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useRooms(hotelId) {
  const token = useToken();

  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: getRooms,
  } = useAsync(() => hotelApi.getHotelRoomsWithDetails(token, hotelId));

  return {
    rooms,
    roomsLoading,
    roomsError,
    getRooms,
  };
}
