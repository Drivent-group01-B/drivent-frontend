import api from './api';

export async function createPaymentIntent(token, amount) {
  const res = await api.post(
    'payments/create-payment-intent',
    { amount: amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
