import api from './api';

export async function bookRoomById(token, roomId) {
  const body = { roomId: roomId };
  const res = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
