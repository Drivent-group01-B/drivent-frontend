import { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function CardHotel({ hotel, select, selectedHotel }) {
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    if (selectedHotel) {
      if (selectedHotel === hotel) {
        setSelected(true);
      } else {
        setSelected(false);
      }
      return;
    }
    setSelected(false);
  }, [selectedHotel]);

  const getTypesAcc = () => {
    const includesSingle = hotel?.Rooms.some((item) => item.capacity === 1);
    const includesDouble = hotel?.Rooms.some((item) => item.capacity === 2);
    const includesTriple = hotel?.Rooms.some((item) => item.capacity === 3);

    let result = '';

    if (includesSingle) {
      result += 'Single';
      result += includesDouble && includesTriple ? ', Double e Triple' : '';
      result += includesDouble ? ' e Double' : '';
      result += includesTriple ? ' e Triple' : '';
      return result;
    }
    if (includesDouble) {
      result += 'Double';
      result += includesTriple ? ' e Triple' : '';
      return result;
    }
    if (includesTriple) {
      result += 'Triple';
    }

    return result;
  };

  const getVacancy = () => {
    const vacanciesCount = hotel?.Rooms.reduce((sum, item) => sum + parseInt(item.capacity), 0);
    return vacanciesCount;
  };

  return (
    <>
      <Card back={isSelected} onClick={() => select(hotel)}>
        <Image url={hotel.image} />
        <Title>{hotel.name}</Title>
        <ContainerText>
          <strong>Tipos de acomodação: </strong>
          <span>{getTypesAcc()}</span>
        </ContainerText>
        <ContainerText>
          <strong>Vagas disponíveis: </strong>
          <span>{getVacancy()}</span>
        </ContainerText>
      </Card>
    </>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
  width: 196px;
  height: 264px;
  border-radius: 10px;
  margin-right: 25px;
  background: ${(props) => (props.back ? '#FFEED2' : '#EBEBEB')};
  cursor: pointer;
`;

const Image = styled.div`
  width: 168px;
  height: 109px;
  align-self: center;
  border-radius: 5px;
  background-image: url(${(props) => props.url});
  background-size: cover;
`;

const Title = styled.div`
  width: 80%;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #343434;
`;

const ContainerText = styled.div`
  width: 80%;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #3c3c3c;
`;
