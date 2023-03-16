import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useTicket from '../../hooks/api/useTicket';
import Typography from '@material-ui/core/Typography';
import ActivityLocation from './ActivityLocation';
import ActivityCard from './ActivityCard';

const activitiesRes = [
  {
    id: 9,
    name: 'LOL: Controle de wave ',
    vacancies: 2,
    start_at: '2023-03-29T08:00:00.000Z',
    end_at: '2023-03-29T09:00:00.000Z',
    eventId: 5,
    locationId: 6,
    createdAt: '2023-03-16T19:03:44.215Z',
    updatedAt: '2023-03-16T19:03:44.215Z',
    subscribed: false,
  },
  {
    id: 10,
    name: 'Valorant: Spots do Sova',
    vacancies: 0,
    start_at: '2023-03-29T09:00:00.000Z',
    end_at: '2023-03-29T10:00:00.000Z',
    eventId: 5,
    locationId: 6,
    createdAt: '2023-03-16T19:03:44.215Z',
    updatedAt: '2023-03-16T19:03:44.215Z',
    subscribed: false,
  },
  {
    id: 12,
    name: 'Fortnite: Double Pump',
    vacancies: 27,
    start_at: '2023-03-29T13:00:00.000Z',
    end_at: '2023-03-29T14:30:00.000Z',
    eventId: 5,
    locationId: 6,
    createdAt: '2023-03-16T19:03:44.215Z',
    updatedAt: '2023-03-16T19:03:44.215Z',
    subscribed: true,
  },
  {
    id: 11,
    name: 'Valorant: Pixel de Viper',
    vacancies: 10,
    start_at: '2023-03-29T09:00:00.000Z',
    end_at: '2023-03-29T11:00:00.000Z',
    eventId: 5,
    locationId: 4,
    createdAt: '2023-03-16T19:03:44.215Z',
    updatedAt: '2023-03-16T19:03:44.215Z',
    subscribed: false,
  },
];

const locationsRes = [
  {
    id: 6,
    name: 'Auditório Ascent',
  },
  {
    id: 5,
    name: 'Sala Pearl',
  },
  {
    id: 4,
    name: 'Sala Fracture',
  },
];

export default function Activities() {
  const { ticket, ticketLoading } = useTicket();

  if (ticketLoading) {
    return <>Carregando</>;
  }

  return (
    <>
      <LocationsContainer>
        {locationsRes.map((location) => (
          <ActivityLocation key={location.id} title={location.name}>
            {activitiesRes.map(
              (act) =>
                act.locationId === location.id && (
                  <ActivityCard
                    key={act.id}
                    title={act.name}
                    startAt={act.start_at}
                    endAt={act.end_at}
                    vacancies={act.vacancies}
                    subscribed={act.subscribed}
                  />
                )
            )}
          </ActivityLocation>
        ))}
      </LocationsContainer>
    </>
  );

  // if (!ticket?.TicketType.includesHotel) {
  //   return (
  //     <ErrorContainer>
  //       <h1>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</h1>
  //     </ErrorContainer>
  //   );
  // } else if (ticket?.status !== 'PAID') {
  //   return (
  //     <ErrorContainer>
  //       <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.</h1>
  //     </ErrorContainer>
  //   );
  // } else {
  //   return (
  //     <Container>
  //       <StyledTypography variant="h6">Primeiro, filtre pelo dia do evento:</StyledTypography>
  //       <ContainerCard>
  //         <CardDay>
  //           <p>27/03</p>
  //         </CardDay>
  //         <CardDay>
  //           <p>27/03</p>
  //         </CardDay>
  //         <CardDay>
  //           <p>27/03</p>
  //         </CardDay>
  //       </ContainerCard>
  //     </Container>
  //   );
  // }
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

  font-family: 'Roboto';
`;

const LocationsContainer = styled(Container)`
  flex-direction: row;
  overflow: auto;
  /* height: 100%; */

  &::-webkit-scrollbar {
    background: #f1f1f1;
    height: 12px;
    margin-top: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cfcfcf;
    border-radius: 10px;

    &:hover {
      background: #9d9d9d;
    }
  }
`;

const ContainerCard = styled.div`
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
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }
`;