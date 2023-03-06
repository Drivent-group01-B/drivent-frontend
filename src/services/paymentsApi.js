import api from './api';

export async function createPaymentIntent(token, amount) {
  const res = await api.post(
    '/payments/create-payment-intent',
    { amount: amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function processPayment(token, ticketId) {
  const res = await api.post(`/payments/process?ticketId=${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
