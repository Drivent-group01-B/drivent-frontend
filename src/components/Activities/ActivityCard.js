import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Bi from 'react-icons/bi';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import useToken from '../../hooks/useToken';
import { getSubscriptions, postSubscriptions } from '../../services/activitiesApi';
import { toast } from 'react-toastify';


export default function ActivityCard({ id, title, startAt, endAt, vacancies, setAtt }) {
  const token = useToken();
  const [subscribed, setSubscribed] = useState(false);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);
  const duration = dayjs(endAt).diff(startAt, 'm');
  const full = vacancies <= 0;
  //ARRUMAR A HORA -3H
  startAt = dayjs(startAt).add(3, 'h').format('HH:mm');
  endAt = dayjs(endAt).add(3, 'h').format('HH:mm');
  
  useEffect(async() => {
    try {
      const sub = await getSubscriptions(token, id);
      if(sub)
      {
        setSubscribed(true);
      }
    } catch (error) {
    }  
  }, [loadingSubscriptions]);

  async function postSubscription(activitiesId)
  {
    try {
      setLoadingSubscriptions(true);
      const subscriptions = await postSubscriptions(token, activitiesId);
      setAtt(subscriptions.id);
    } catch (error) {
      toast.error(error.message);
      setLoadingSubscriptions(false);
    }
    setLoadingSubscriptions(false); 
  }

  return (
    <Card duration={duration} backcolor={subscribed}>
      <Content>
        <p className="title">{title}</p>
        <p className="time">
          {startAt} - {endAt}
        </p>
      </Content>
      <TotalVacancies full={full && !subscribed}>
        {false ? (<>loading</>) : subscribed ? (
          <>
            <Bi.BiCheckCircle size="18px" /> Inscrito
          </>
        ) : full ? (
          <>
            <Bi.BiXCircle size="18px" /> Esgotado
          </>
        ) : (
          <>
            <Bi.BiDoorOpen size="18px" onClick={() => postSubscription(id)} /> {vacancies} vagas
          </>
        )}
      </TotalVacancies>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  min-height: 80px;
  height: ${({ duration }) => (duration / 60) * 80}px;

  padding: 10px;

  background: #f1f1f1;
  border-radius: 5px;

  background: ${({ backcolor }) => (backcolor ? '#D0FFDB' : '#F1F1F1')}; 

  display: grid;
  grid-template-columns: 6fr 2fr;
`;

const Content = styled.div`
  padding-right: 10px;
  font-size: 12px;
  line-height: 14px;
  color: #343434;

  .title {
    font-weight: 700;
  }

  .time {
    font-weight: 400;
    margin-top: 6px;
  }
`;

const TotalVacancies = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-left: 1px solid #cfcfcf;

  color: ${({ full }) => (full ? '#CC6666' : '#078632')};

  font-size: 9px;
`;
