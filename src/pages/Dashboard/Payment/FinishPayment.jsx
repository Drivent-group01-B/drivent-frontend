import { useEffect, useState } from 'react';

import { Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import * as Ai from 'react-icons/ai';
import Loader from 'react-loader-spinner';

import ChosenTicket from '../../../components/Payment/ChosenTicket';
import CreditCard from '../../../components/Payment/CreditCard';
import useToken from '../../../hooks/useToken';
import { getTicketByUserId } from '../../../services/ticketApi';

export default function FinishPayment() {
  const token = useToken();

  const [ticketData, setTicketData] = useState(null);
  const [showCard, setShowCard] = useState(true);
  const [loading, setLoading] = useState(true);

  async function fetchTicketData() {
    //simula busca no backend
    const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      //aguarda simulaçao
      await resolveAfter3Sec;

      const res = await getTicketByUserId(token);
      setTicketData(res.data);
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

      //REMOVER DEPOIS
      setTicketData(true);
    }
  }

  useEffect(() => {
    fetchTicketData();
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
            <ChosenTicket ticketInfo={ticketData} />
            {showCard ? (
              <CreditCard setShowCard={setShowCard} ticketData={ticketData} />
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

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
`;
