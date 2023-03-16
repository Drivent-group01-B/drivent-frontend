/* eslint-disable space-before-function-paren */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

import useToken from '../../hooks/useToken';
import { useBooking } from '../../hooks/api/useBooking';
import { bookRoomById, updateRoomById } from '../../services/bookingApi';
import { getHotelRoomsWithDetails, getHotels, getRoomsByHotelId } from '../../services/hotelApi';

import Rooms from './Rooms';
import CardHotel from './CardHotel';
import ConfirmationButton from '../../components/ConfirmationButton';
import useTicket from '../../hooks/api/useTicket';

const RoomCategories = { 1: 'Single', 2: 'Double', 3: 'Triple' };

export default function Hotel() {
  const token = useToken();
  const { ticket, ticketLoading } = useTicket();
  const { booking, bookingLoading, getBooking } = useBooking();
  const [hotelsData, setHotelsData] = useState(null);

  const [bookedHotel, setBookedHotel] = useState(null);
  const [bookedRoom, setBookedRoom] = useState(null);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [updateRoom, setUpdateRoom] = useState(false);

  useEffect(async () => {
    if (booking) {
      const hotel = await getRoomsByHotelId(token, booking.Room.hotelId);
      const rooms = await getHotelRoomsWithDetails(token, booking.Room.hotelId);
      setBookedHotel(hotel);
      setRooms(rooms);
      setBookedRoom(rooms.rooms.find((room) => room.id === booking.Room.id));
      return;
    }

    fetchHotelsData();
  }, [bookingLoading, ticketLoading, updateRoom]);

  const onSelectHotel = (hotel) => {
    if (selectedHotel === hotel) {
      setSelectedHotel(null);
      return;
    }

    fetchHotelWithRoomsData(hotel.id);
    setSelectedHotel(hotel);
  };

  async function fetchHotelsData() {
    try {
      const response = await getHotels(token);
      setHotelsData(response);
    } catch (error) {
      toast.error('Erro inesperado!', error.message);
    }
  }

  async function fetchHotelWithRoomsData(hotelId) {
    try {
      const response = await getHotelRoomsWithDetails(token, hotelId);
      setRooms(response);
    } catch (error) {
      toast.error('Erro inesperado!', error.message);
    }
  }

  async function createBookingRoom() {
    try {
      await bookRoomById(token, selectedRoom);
      getBooking();
      toast('Reservado!');
    } catch (error) {
      toast.error('Erro inesperado!');
    }
  }

  async function updateBookingRoom() {
    try {
      await updateRoomById(token, selectedRoom, booking.id);
      setUpdateRoom(false);
      toast('Quarto alterado com sucesso!');
    } catch (error) {
      toast.error('Erro inesperado!');
    }
  }

  if (bookedHotel && bookedRoom && !updateRoom) {
    return (
      <Container>
        <StyledTypography variant="h6">Você já escolheu seu quarto:</StyledTypography>
        <Caixas>
          <Card>
            <Image url={bookedHotel.image} />
            <Title>{bookedHotel.name}</Title>
            <ContainerText>
              <strong>Quarto reservado</strong>
              <span>
                {bookedRoom.name} ({RoomCategories[bookedRoom.capacity]})
              </span>
            </ContainerText>
            <ContainerText>
              <strong>Pessoas no seu quarto </strong>
              <span>
                {bookedRoom._count.Booking === 1 ? 'Você sozinho' : `Você e mais ${bookedRoom._count.Booking - 1}`}
              </span>
            </ContainerText>
          </Card>
        </Caixas>
        <UpdateButton onClick={() => setUpdateRoom(true)}>TROCAR DE QUARTO</UpdateButton>
      </Container>
    );
  } else if (!ticket?.TicketType.includesHotel) {
    return (
      <ErrorContainer>
        <h1>
          Sua modalidade de ingresso não inclui hospedagem<br></br>
          Prossiga para a escolha de atividades
        </h1>
      </ErrorContainer>
    );
  } else if (ticket?.status !== 'PAID') {
    return (
      <ErrorContainer>
        <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h1>
      </ErrorContainer>
    );
  }

  return (
    <>
      {hotelsData ? (
        <Container>
          <StyledTypography variant="h6">Primeiro, escolha o seu hotel</StyledTypography>
          <Cards>
            {hotelsData.map((item) => (
              <CardHotel
                key={item.id}
                hotel={item}
                select={onSelectHotel}
                selectedHotel={selectedHotel}
                getRooms={fetchHotelWithRoomsData}
              />
            ))}
          </Cards>
        </Container>
      ) : (
        <></>
      )}

      {hotelsData && selectedHotel ? (
        <Container>
          <StyledTypography variant="h6">Ótima pedida! Agora escolha seu quarto:</StyledTypography>
          {hotelsData && <Rooms selectedRoom={selectedRoom} rooms={rooms} setSelectedRoom={setSelectedRoom} />}
          {updateRoom ? (
            <ConfirmationButton onClick={updateBookingRoom}>TROCAR QUARTO</ConfirmationButton>
          ) : (
            <ConfirmationButton onClick={createBookingRoom}>RESERVAR QUARTO</ConfirmationButton>
          )}
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}

const Caixas = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: flex-start;
  width: 196px;
  height: 264px;
  border-radius: 10px;
  margin-right: 25px;
  margin-top: 15px;
  padding: 15px;
  background: #ffeed2;
`;
const Image = styled.div`
  width: 168px;
  height: 109px;
  align-self: center;
  border-radius: 5px;
  background-image: url(${(props) => props.url});
  background-size: cover;
`;

const Title = styled.div`
  width: 80%;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #343434;
  margin-top: 8px;
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 79%;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #3c3c3c;
  margin-top: 10px;
`;

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

const UpdateButton = styled.button`
  width: 182px;
  height: 37px;
  margin-top: 43px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  border: none;
  outline: none;
  &:hover {
    filter: brightness(0.9);
  }
`;
