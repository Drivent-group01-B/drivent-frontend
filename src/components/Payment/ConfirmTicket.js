import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { createTicket } from '../../services/ticketApi.js';

export default function ConfirmTicket({ ticketData, ticketTypeId, includedHotel, value, showFinishPayment, setShowFinishPayment }) {
  const { userData } = useContext(UserContext);
  const config = { headers: { Authorization: `Bearer ${userData.token}` } };

  async function bookTicket() {
    let newTicket = {};
    if(ticketData) {
      delete ticketData.TicketType;
      newTicket = { ...ticketData };
    }
    newTicket = { ...newTicket, ticketTypeId, includedHotel };
    try {
      const ticket = await createTicket(newTicket, config);
      if(ticket) {
        setShowFinishPayment(!showFinishPayment);
        toast('Ticket reservado com sucesso!');
      }
    } catch (error) {
      toast('Erro inesperado!');
    }
  }

  return (
    <Container>
      <p>Fechado! O total ficou em <strong>R${value}</strong>. Agora é só confirmar:</p>
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
