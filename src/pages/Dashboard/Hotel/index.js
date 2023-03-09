import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import { getHotels } from '../../../services/hotelApi';
import Rooms from '../../../components/Hotel/Rooms';

export default function Hotel() {
  const { ticket } = useTicket();
  const token = useToken();

  const [hotels, setHotels] = useState(null);
  const [loadingHotels, setLoadingHotels] = useState(true);

  async function fetchHotelsData() {
    try {
      const response = await getHotels(token);
      setHotels(response);
      setLoadingHotels(false);
    } catch (error) {
      toast.error('Erro inesperado!', error.message);
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
      {hotels && <Rooms token={token} hotelId={hotels[0].id} />}
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
