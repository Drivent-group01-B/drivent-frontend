import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useRooms from '../../hooks/api/useRooms';

export default function CardHotel({ hotel, select, selectedHotel, getRooms }) {
  const { rooms } = useRooms(hotel.id);
  const [isSelected, setSelected] = useState(false);
  const [ vacancy, setVacancy ] = useState();
  const [ accTypes, setAccTypes ] = useState('');

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

    if(rooms && rooms?.rooms?.length > 0) {
      getTypesAcc();
      getVacancy();
    }
  }, [selectedHotel, rooms]);

  const getTypesAcc = () => {
    const includesSingle = rooms?.rooms.some((item) => item?.capacity === 1 && item?._count.Booking < item?.capacity);
    const includesDouble = rooms?.rooms.some((item) => item?.capacity === 2 && item?._count.Booking < item?.capacity);
    const includesTriple = rooms?.rooms.some((item) => item?.capacity === 3 && item?._count.Booking < item?.capacity);

    let result = '';

    if (includesSingle) {
      result += 'Single';
      result += includesDouble && includesTriple ? ', Double e Triple' : '';
      result += includesDouble ? ' e Double' : '';
      result += includesTriple ? ' e Triple' : '';
      setAccTypes(result);
      return;
    }
    if (includesDouble) {
      result += 'Double';
      result += includesTriple ? ' e Triple' : '';
      setAccTypes(result);
      return;
    }
    if (includesTriple) {
      result += 'Triple';
    }

    setAccTypes(result);
  };

  const getVacancy = () => {
    const vacanciesCount = parseInt(rooms?.availability?.total) - parseInt(rooms?.availability?.occupied);
    setVacancy(vacanciesCount);
  };

  return (
    <>
      <Card back={isSelected} onClick={() => select(hotel)}>
        <Image url={hotel.image} />
        <Title>{hotel.name}</Title>
        <ContainerText>
          <strong>Tipos de acomodação: </strong>
          <span>{accTypes}</span>
        </ContainerText>
        <ContainerText>
          <strong>Vagas disponíveis: </strong>
          <span>{vacancy}</span>
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
