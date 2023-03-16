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