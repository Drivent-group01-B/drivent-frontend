import api from './api';

export async function getHotels(token) {
  const res = await api.get('/hotels', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getRoomsByHotelId(token, hotelId) {
  const res = await api.get('/hotels/:hotelId', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getHotelsWithRooms(token, hotelId) {
  const res = await api.get(`/hotels/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getHotelRoomsWithDetails(token, hotelId) {
  const res = await api.get(`/hotels/${hotelId}/rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
