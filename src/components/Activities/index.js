/* eslint-disable space-before-function-paren */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useTicket from '../../hooks/api/useTicket';
import Typography from '@material-ui/core/Typography';
import ActivityLocation from './ActivityLocation';
import ActivityCard from './ActivityCard';
import { getActivitiesByDate, getDaysOfActivities, getLocations } from '../../services/activitiesApi';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import dayjs from 'dayjs';

export default function Activities() {
  const token = useToken();
  const { ticket, ticketLoading } = useTicket();
  const [days, setDays] = useState([]);
  const [activities, setActivities] = useState(null);
  const [locations, setLocations] = useState(null);
  const [att, setAtt] = useState(1);

  useEffect(async () => {
    const days = await getDaysOfActivities(token);
    setDays(days);
  }, [att]);

  if (ticketLoading) {
    return <>Carregando</>;
  }

  async function fetchActivitiesByDate(date) {
    try {
      const activitiesData = await getActivitiesByDate(token, new Date(date));

      const locationsData = await getLocations(token);
      setLocations(locationsData);
      setActivities(activitiesData);
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (ticket?.TicketType.isRemote) {
    return (
      <ErrorContainer>
        <h1>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</h1>
      </ErrorContainer>
    );
  } else if (ticket?.status !== 'PAID') {
    return (
      <ErrorContainer>
        <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.</h1>
      </ErrorContainer>
    );
  } else {
    return (
      <Container>
        <StyledTypography variant="h6">Primeiro, filtre pelo dia do evento:</StyledTypography>
        <ContainerCard>
          {days.map((day) => (
            <CardDay key={day.id} onClick={() => fetchActivitiesByDate(day.dateEvent.slice(0, 10))}>
              <p>
                {dayjs(day.dateEvent).locale('pt-br').format('ddd')}, {dayjs(day.dateEvent).format('DD/MM')}
              </p>
            </CardDay>
          ))}
        </ContainerCard>

        <LocationsContainer>
          {locations &&
            locations.map((location) => (
              <ActivityLocation key={location.id} title={location.name}>
                {activities &&
                  activities.map(
                    (act) =>
                      act.locationId === location.id && (
                        <ActivityCard
                          key={act.id}
                          id={act.id}
                          title={act.name}
                          startAt={act.start_at}
                          endAt={act.end_at}
                          vacancies={act.vacancies}
                          setAtt={setAtt}
                        />
                      )
                  )}
              </ActivityLocation>
            ))}
        </LocationsContainer>
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

  font-family: 'Roboto';
`;

const LocationsContainer = styled(Container)`
  flex-direction: row;
  overflow: auto;

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

  &:hover {
    cursor: pointer;
  }
`;
