import styled from 'styled-components';
import * as Bi from 'react-icons/bi';

export default function ActivityCard({ title, startAt, endAt, vacancies }) {
  return (
    <Card>
      <Content>
        <p className="title">Minecraft: montando o PC ideal</p>
        <p className="time">09:00 - 10:00</p>
      </Content>
      <TotalVacancies>
        <Bi.BiDoorOpen size="18px" /> 27 vagas
      </TotalVacancies>
    </Card>
  );
}

const Card = styled.div`
  width: 265px;
  height: 79px;

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
