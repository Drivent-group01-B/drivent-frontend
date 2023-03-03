import api from './api';

export async function getTicketByUserId(token) {
  const res = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getTicketsTypes(token) {
  const res = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
