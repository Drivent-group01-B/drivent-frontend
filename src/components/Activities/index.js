import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useTicket from '../../hooks/api/useTicket';

export default function Activities() {
  const { ticket } = useTicket();

  if (!ticket?.TicketType.includesHotel) {
    return (
      <ErrorContainer>
        <h1>
        Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
        </h1>
      </ErrorContainer>
    );
  } else if (ticket?.status !== 'PAID') {
    return (
      <ErrorContainer>
        <h1>
        Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.
        </h1>
      </ErrorContainer>
    );
  } else {
    return <></>;
  }
}

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