import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import * as Bs from 'react-icons/bs';

import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import { getHotels, getHotelsWithRooms } from '../../../services/hotelApi';

export default function Hotel() {
  const { ticket } = useTicket();
  const token = useToken();

  const [hotels, setHotels] = useState(null);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [hotelsWithRooms, setHotelsWithRooms] = useState(null);

  async function fetchHotelsData() {
    try {
      const response = await getHotels(token);
      setHotels(response);
      setLoadingHotels(false);
    } catch (error) {
      toast.error('Erro inesperado!', error.message);
    }
  }

  async function fetchHotelWithRoomsData() {
    try {
      const response = await getHotelsWithRooms(token, hotels[0].id);
      setHotelsWithRooms(response);
    } catch (error) {
      toast.error('Erro inesperado!', error.message);
    }
  }

  useEffect(() => {
    fetchHotelsData();
  }, []);

  useEffect(() => {
    fetchHotelWithRoomsData();
  }, [loadingHotels]);

  if (!ticket) {
    return <>Sem ingresso ainda</>;
  }
  return (
    <Container>
      <Typography variant="h4">Escolha de hotel e quarto</Typography>
      <div style={{ display: 'flex', gap: '20px' }}>
        {hotels &&
          hotels.map((hotel) => (
            <HotelCard key={hotel.id}>
              <img src={hotel.image} alt="hotel" />
              <p className="name">{hotel.name}</p>
            </HotelCard>
          ))}
      </div>
      <p className="section-title">Ótima pedida! Agora escolha seu quarto:</p>
      <RoomsContainer>
        {hotelsWithRooms &&
          hotelsWithRooms.Rooms.map((room) => (
            <Room key={room.id}>
              <p className="room-name">{room.name}</p>
              <div className="capacity">
                {Array.from({ length: room.capacity }).map((_, i) => (
                  <Bs.BsPerson key={i} size="20px" />
                ))}
              </div>
            </Room>
          ))}
      </RoomsContainer>
    </Container>
  );
}

const HotelCard = styled.div`
  width: 196px;
  height: 264px;
  padding: 14px;

  background: #ebebeb;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  img {
    height: 109px;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const RoomsContainer = styled.div`
  display: flex;
  row-gap: 8px;
  column-gap: 17px;

  flex-wrap: wrap;
`;

const Room = styled.div`
  width: 190px;
  padding: 10px 16px;

  border: 1px solid #cecece;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: '#454545';

  &:hover {
    cursor: pointer;
  }

  .room-name {
    font-size: 20px;
    line-height: 23px;
    font-weight: 700;

    margin-right: 6px;
  }

  .capacity {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
`;

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
