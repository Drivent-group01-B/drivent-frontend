import dayjs from 'dayjs';
import api from './api';

export async function getDaysOfActivities(token) {
  const res = await api.get('/activities/days', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getActivities(token) {
  const res = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getActivitiesByDate(token, date) {
  const parsedDate = dayjs(date).format('YYYY-MM-DD');

  if (parsedDate === 'Invalid Date') throw Error('Date format must be YYYY-MM-DD');

  const res = await api.get(`activities?date=${parsedDate}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
