import api from './api';

export async function getTicketByUserId(token) {
  const res = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
