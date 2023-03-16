import styled from 'styled-components';
import * as Bi from 'react-icons/bi';
import dayjs from 'dayjs';

export default function ActivityCard({ title, startAt, endAt, vacancies }) {
  const duration = dayjs(endAt).diff(startAt, 'hour');

  startAt = dayjs(startAt).format('HH:MM');
  endAt = dayjs(endAt).format('hh:mm');

  return (
    <Card duration={duration}>
      <Content>
        <p className="title">{title}</p>
        <p className="time">
          {startAt} - {endAt}
        </p>
      </Content>
      <TotalVacancies>
        <Bi.BiDoorOpen size="18px" /> {vacancies} vagas
      </TotalVacancies>
    </Card>
  );
}

const Card = styled.div`
  width: 265px;
  min-height: 80px;
  height: ${({ duration }) => duration * 80}px;

  padding: 10px;

  background: #f1f1f1;
  border-radius: 5px;

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

  color: #078632;
  font-size: 9px;
`;
