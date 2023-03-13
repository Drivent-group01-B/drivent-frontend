/* eslint-disable space-before-function-paren */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import CardHotel from './CardHotel';
import { getTicketByUserId } from '../../services/ticketApi';
import useToken from '../../hooks/useToken';
import Rooms from './Rooms';
import { toast } from 'react-toastify';
import { bookRoomById } from '../../services/bookingApi';
import ConfirmationButton from '../../components/ConfirmationButton';
import { getHotelRoomsWithDetails, getHotels } from '../../services/hotelApi';
import { getBooking } from '../../services/bookingApi';
import { useBooking } from '../../hooks/api/useBooking';

export default function ChooseTicket({ showBooking, setShowBooking }) {
  const token = useToken();
  const { booking } = useBooking();
  const [hotelsData, setHotelsData] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [includedHotel, setIncludedHotel] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('RESERVED');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [bookingHotel, setBookingHotel] = useState(null);
  const [roomQtd, setRoomQtd] = useState();
  const [userBookedRoom, setUserBookedRoom] = useState();

  useEffect(async () => {
    const ticket = await getTicketByUserId(token);
    setIncludedHotel(ticket.TicketType.includesHotel);
    setPaymentStatus(ticket.status);

    if (ticket && ticket.TicketType.includesHotel) {
      fetchHotelsData();
    }

    // const h = hotelsData.find((hotel) => hotel.id === booking.Room.hotelId);
    // setBookingHotel(h);
    // console.log(h);

    // const hotels = await getHotels(token);
    // const booking = await getBooking(token);

    // const response = await getHotelRoomsWithDetails(token, h.id);
    // setRoomQtd(response);
    // setBookingData(booking);
  }, []);
  // bookingData, includedHotel, paymentStatus;

  useEffect(async () => {
    let userBookedHotel;
    if (hotelsData && booking) {
      userBookedHotel = hotelsData.find((hotel) => hotel.id === booking.Room.hotelId);
      console.log(userBookedHotel);
      setBookingHotel(userBookedHotel);
      await fetchHotelWithRoomsData(userBookedHotel.id);
    }
  }, [hotelsData]);

  useEffect(() => {
    let userBookedRoom;
    if (rooms) {
      userBookedRoom = rooms.find((room) => room.id === booking.Room.id);
      // setSelectedRoom(userBookedRoom);
      console.log(userBookedRoom);
    }
  }, [rooms]);

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
      console.log(response);
    } catch (error) {
      toast.error('Erro inesperado!', error.message);
    }
  }

  async function fetchHotelsData() {
    try {
      const response = await getHotels(token);
      setHotelsData(response);
      // console.log(response);
    } catch (error) {
      toast.error('Erro inesperado!', error.message);
    }
  }

  async function createBookingRoom() {
    try {
      await bookRoomById(token, selectedRoom);
      toast('Reservado!');
    } catch (error) {
      toast.error('Erro inesperado!');
    }
  }

  if (bookingHotel) {
    return (
      <Container>
        <StyledTypography variant="h6">Você já escolheu seu quarto:</StyledTypography>
        <Caixas>
          <Card>
            <Image url={bookingHotel.image} />
            <Title>{bookingHotel.name}</Title>
            <ContainerText>
              <strong>Quarto reservado</strong>
              <span>
                {booking.Room.name} (
                {booking.Room.capacity === 1 ? 'Single' : booking.Room.capacity === 2 ? 'Double' : 'Triple'})
              </span>
            </ContainerText>
            <ContainerText>
              <strong>Pessoas no seu quarto </strong>
              {/* <span>{roomQtd.availability.occupied === 1 ? 'Você sozinho' : `Você e mais ${2 - 1}`}</span> */}
            </ContainerText>
          </Card>
        </Caixas>
      </Container>
    );
  } else if (!includedHotel) {
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
          <ConfirmationButton onClick={createBookingRoom}>RESERVAR QUARTO</ConfirmationButton>
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
