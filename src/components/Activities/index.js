import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useTicket from '../../hooks/api/useTicket';
import Typography from '@material-ui/core/Typography';
import { getActivities, getDaysOfActivities } from '../../services/activitiesApi';
import useToken from '../../hooks/useToken';

export default function Activities() {
  const { ticket } = useTicket();
  const token = useToken();
  const [days, setDays] = useState([]);

  useEffect(async() => {
    const days = await getDaysOfActivities(token);
    setDays(days);
  }, []);

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
    return (
      <Container>
        <StyledTypography variant="h6">Primeiro, filtre pelo dia do evento:</StyledTypography>
        <ContainetCard>
          {days?.map((day) => {
            <CardDay><p>{day}</p></CardDay>
          })}
        </ContainetCard>
      </Container>
    );
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

const StyledTypography = styled(Typography)`
  color: gray;
  margin: 36px 0 18px !important;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ContainetCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 17px;  
`;

const CardDay = styled.div`
  width: 131px;
  height: 37px;  
  display: flex;
  justify-content: center;
  align-items: center;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }
`;
