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
  const parsedDate = date.toISOString().slice(0, 10);

  if (parsedDate === 'Invalid Date') throw Error('Date format must be YYYY-MM-DD');

  const res = await api.get(`/activities?date=${parsedDate}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getLocations(token) {
  const res = await api.get('/activities/locations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function postSubscriptions(token, activityId) {
  const body = { activityId: activityId };
  const res = await api.post('/activities/subscriptions', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getSubscriptions(token, activityId) {
  const res = await api.get(`/activities/subscriptions/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
