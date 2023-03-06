/* eslint-disable indent */
import { useEffect, useState } from 'react';

import { Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import * as Ai from 'react-icons/ai';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import useToken from '../../../hooks/useToken';
import { getTicketByUserId } from '../../../services/ticketApi';
import StripeCheckout from '../../../components/Payment/StripeCheckout';
import { createPaymentIntent, processPayment } from '../../../services/paymentsApi';
import ChosenTicket from '../../../components/Payment/ChosenTicket';

const promise = loadStripe(
  'pk_test_51MhIOvDP6lzKO7ie5pdvUVVL1nvf4XEhqGoX3vmsk8Vm5EXuzTle8LDqrrvobK5BthrHtIXmvRMglY666tWBi0cV006MheWUPD'
);

export default function FinishPayment() {
  const token = useToken();

  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [confirmPayment, setConfirmPayment] = useState(false);

  async function fetchTicketData() {
    try {
      const res = await getTicketByUserId(token);
      setTicketData(res);
    } catch (error) {
      const { response } = error;
      const notify = (message, type) =>
        toast(message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnFocusLoss: false,
          delay: 3000,
          type: type,
          limit: 1,
        });

      if (response.message) {
        notify(response.message, toast.TYPE.ERROR);
      } else if (response.status === 404) {
        notify('Nenhum ingresso encontrado!', toast.TYPE.INFO);
      } else {
        notify('Erro inesperado!', toast.TYPE.ERROR);
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchPaymentSecret() {
    try {
      const res = await createPaymentIntent(token, 200);
      setClientSecret(res.clientSecret);
    } catch (error) {
      toast.error('Erro inesperado!');
    }
  }

  async function fetchPayment() {
    if (ticketData) {
      await processPayment(token, ticketData.id);
    }
  }

  useEffect(() => {
    fetchPayment();
  }, [confirmPayment]);

  useEffect(() => {
    fetchTicketData();
    fetchPaymentSecret();
  }, []);

  if (loading) {
    return (
      <SpinnerContainer>
        <Loader color="grey" height={40} width={40} type="Oval" />
      </SpinnerContainer>
    );
  }

  return (
    <>
      {ticketData ? (
        <>
          <Container>
            <ChosenTicket ticketData={ticketData} />
            {ticketData?.status === 'RESERVED' ? (
              clientSecret && (
                <Elements
                  stripe={promise}
                  options={{ clientSecret: clientSecret }}
                  setConfirmPayment={setConfirmPayment}
                >
                  <StripeCheckout />
                </Elements>
              )
            ) : (
              <Confirmation>
                <Ai.AiFillCheckCircle size={41} color="#36B853" />
                <p>
                  <strong>Pagamento confirmado!</strong>
                  <br />
                  Prossiga para escolha de hospedagem e atividades
                </p>
              </Confirmation>
            )}
          </Container>
        </>
      ) : (
        <>
          <Typography variant="h4" style={{ fontWeight: 700 }}>
            Parece que você ainda não reservou nenhum ingresso =(
          </Typography>
        </>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: 20px;
    line-height: 23px;

    color: #8e8e8e;

    margin: 37px 0 17px;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

const Confirmation = styled.div`
  display: flex;
  margin-top: 17px;
  p {
    margin-left: 14px;
    font-style: normal;
    font-size: 14px;
    line-height: 19px;
  }
`;
