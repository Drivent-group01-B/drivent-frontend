/* eslint-disable space-before-function-paren */
import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';

//PAYMENT SUCCEED 4242424242424242
//PAYMENT FAILED 4000000000009995
//NEED AUTH 4000002500003155

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [confirmPayment, setConfirmPayment] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) {
      return <>Carregando</>;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://${window.location.host}/dashboard/payment`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setError(error.message);
    } else {
      setConfirmPayment(true);
    }
  }

  return (
    <>
      {confirmPayment ? (
        <p>Pagamento finalizado</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <SendButton disabled={!stripe}>FINALIZAR PAGAMENTO</SendButton>
          {error && <div>{error}</div>}
        </form>
      )}
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
  line-height: 16px;
  text-align: center;

  margin-top: 54px;
  border: none;
  outline: none;
`;
