import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import { toast } from 'react-toastify';

export default function ConfirmTicket({ ticketTypeId }) {
  const { userData } = useContext(UserContext);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };

  function bookTicket() {
    // const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/tickets`, {ticketTypeId}, config);

    // promise.then((res) => {
    // FAZER A TROCA DE PÁGINA   
    // });

    // promise.catch((error) => {
    //     toast.error('Erro inesperado! ', {
    //         position: toast.POSITION.TOP_CENTER,
    //         pauseOnFocusLoss: false,
    //         delay: 3000,
    //         limit: 1,
    //       });
    // });
  }

  return (
    <Container>
      <p>Fechado! O total ficou em <strong>R$ 600,00</strong>. Agora é só confirmar:</p>
      <ConfirmButton onClick={() => bookTicket()}>RESERVAR INGRESSO</ConfirmButton>
    </Container>
  );
}

const Container = styled.div`
    p{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-top: 43px;
    margin-bottom: 20px;
    }
`;

const ConfirmButton = styled.button`
  width: 182px;
  height: 37px;
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
`;
