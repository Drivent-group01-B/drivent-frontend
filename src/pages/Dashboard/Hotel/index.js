import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import { getHotels } from '../../../services/hotelApi';
import Rooms from '../../../components/Hotel/Rooms';
import ConfirmationButton from '../../../components/ConfirmationButton';
import { bookRoomById } from '../../../services/bookingApi';

export default function Hotel() {
  const { ticket } = useTicket();
  const token = useToken();

  const [hotels, setHotels] = useState(null);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);

  async function fetchHotelsData() {
    try {
      const response = await getHotels(token);
      setHotels(response);
      setLoadingHotels(false);
    } catch (error) {
      toast.error('Erro inesperado!', error.message);
    }
  }

  async function createBookingRoom() {
    try {
      await bookRoomById(token, selectedRoom);
      toast('Reservado!');
    } catch (error) {
      console.log(error);
      toast.error('Erro inesperado!');
    }
  }

  useEffect(() => {
    fetchHotelsData();
  }, []);

  if (!ticket) {
    return <>Sem ingresso ainda</>;
  }

  if (loadingHotels) {
    return <>Carregando...</>;
  }

  return (
    <Container>
      <Typography variant="h4">Escolha de hotel e quarto</Typography>
      <p className="section-title">Ótima pedida! Agora escolha seu quarto:</p>
      {hotels && (
        <Rooms token={token} hotelId={hotels[0].id} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
      )}
      <ConfirmationButton onClick={createBookingRoom}>RESERVAR QUARTO</ConfirmationButton>
    </Container>
  );
}

const Container = styled.div`
  font-family: 'Roboto';
  font-style: normal;

  .section-title {
    font-size: 20px;
    line-height: 23px;

    color: #8e8e8e;

    margin: 30px 0 25px;
  }
`;
