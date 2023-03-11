/* eslint-disable space-before-function-paren */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHotels from '../../hooks/api/useHotels';
import CardHotel from './CardHotel';
import { getTicketByUserId } from '../../services/ticketApi';
import useToken from '../../hooks/useToken';
import Rooms from './Rooms';
import { toast } from 'react-toastify';
import { bookRoomById } from '../../services/bookingApi';
import ConfirmationButton from '../../components/ConfirmationButton';
import { getHotelRoomsWithDetails, getHotels } from '../../services/hotelApi';

export default function ChooseTicket({ showBooking, setShowBooking }) {
  const token = useToken();
  const { hotels } = useHotels();

  const [hotelsData, setHotelsData] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [includeHotel, setIncludeHotel] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('RESERVED');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState(null);

  useEffect(async () => {
    const ticket = await getTicketByUserId(token);
    setIncludeHotel(ticket.includedHotel);
    setPaymentStatus(ticket.status);

    if (ticket) {
      fetchHotelsData();
    }
  }, []);

  const onSelectHotel = (hotel) => {
    if (selectedHotel === hotel) {
      setSelectedHotel(null);
      return;
    }

    fetchHotelWithRoomsData(hotel.id);
    setSelectedHotel(hotel);
  };

  async function fetchHotelWithRoomsData(hotelId) {
    try {
      const response = await getHotelRoomsWithDetails(token, hotelId);
      setRooms(response);
    } catch (error) {
      toast.error('Erro inesperado!', error.message);
    }
  }

  async function fetchHotelsData() {
    try {
      const response = await getHotels(token);
      setHotelsData(response);
    } catch (error) {
      toast.error('Erro inesperado!', error.message);
    }
  }

  async function createBookingRoom() {
    try {
      await bookRoomById(token, selectedRoom.id);
      toast('Reservado!');
    } catch (error) {
      toast.error('Erro inesperado!');
    }
  }

  if (!includeHotel) {
    return (
      <ErrorContainer>
        <h1>
          Sua modalidade de ingresso não inclui hospedagem<br></br>
          Prossiga para a escolha de atividades
        </h1>
      </ErrorContainer>
    );
  } else if (paymentStatus === 'RESERVED') {
    return (
      <ErrorContainer>
        <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h1>
      </ErrorContainer>
    );
  } else {
    return (
      <>
        {hotelsData ? (
          <Container>
            <StyledTypography variant="h6">Primeiro, escolha o seu hotel</StyledTypography>
            <Cards>
              {hotelsData.map((item) => (
                <CardHotel key={item.id} hotel={item} select={onSelectHotel} selectedHotel={selectedHotel} />
              ))}
            </Cards>
          </Container>
        ) : (
          <></>
        )}

        {hotelsData && selectedHotel ? (
          <Container>
            <StyledTypography variant="h6">Ótima pedida! Agora escolha seu quarto:</StyledTypography>
            {hotels && <Rooms selectedRoom={selectedRoom} rooms={rooms} setSelectedRoom={setSelectedRoom} />}
            <ConfirmationButton onClick={createBookingRoom}>RESERVAR QUARTO</ConfirmationButton>
          </Container>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const StyledTypography = styled(Typography)`
  color: gray;
  margin: 36px 0 18px !important;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* justify-content: flex-start; */
  /* margin-top: 17px; */
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 26%;
  margin-left: 23%;
  width: 55%;

  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;

    color: #8e8e8e;
  }
`;
