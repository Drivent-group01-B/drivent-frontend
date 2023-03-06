/* eslint-disable space-before-function-paren */
import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';

//PAYMENT SUCCEED 4242424242424242
//PAYMENT FAILED 4000000000009995
//NEED AUTH 4000002500003155

export default function CheckoutForm({ setConfirmPayment }) {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) {
      return <>Carregando</>;
    }

    try {
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://${window.location.host}/dashboard/payment`,
        },
        redirect: 'if_required',
      });

      setConfirmPayment(true);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <p className="title">Pagamento</p>

      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <SendButton disabled={!stripe}>FINALIZAR PAGAMENTO</SendButton>
        {error && <div>{error}</div>}
      </form>
    </>
  );
}

const SendButton = styled.button`
  width: 182px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;

  font-size: 14px;
  text-align: center;

  margin-top: 54px;
  border: none;
  outline: none;
`;
