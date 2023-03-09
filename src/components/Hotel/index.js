import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import UserContext from '../../contexts/UserContext';
import useHotels from '../../hooks/api/useHotels';
import CardHotel from './CardHotel';
import { getTicketByUserId } from '../../services/ticketApi';

export default function ChooseTicket({ showBooking, setShowBooking }) {
  const { userData } = useContext(UserContext);
  const { hotels } = useHotels();
  const [hotelsData, setHotelsData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [includeHotel, setIncludeHotel] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("RESERVED");

  useEffect(async () => {
    const ticket = await getTicketByUserId(userData.token);
    setIncludeHotel(ticket.includedHotel);
    setPaymentStatus(ticket.status);
  }, []);

  useEffect(() => {
    if (hotels && hotels?.length > 0) {
      setHotelsData(hotels);
    }
    console.log(hotels);
  }, [hotels]);

  const onSelectHotel = (hotel) => {
    if (selectedHotel === hotel) {
      setSelectedHotel(null);
      return;
    }
    setSelectedHotel(hotel);
  };


  if (!includeHotel) {
    return (
      <ErrorContainer>
        <h1>Sua modalidade de ingresso não inclui  hospedagem<br></br>
          Prossiga para a escolha de atividades</h1>
      </ErrorContainer>
    );
  }

  else if (paymentStatus === "RESERVED") {
    return (
      <ErrorContainer>
        <h1>Você precisa ter confirmado pagamento antes
          de fazer a escolha de hospedagem</h1>
      </ErrorContainer>

    );
  }

  else {
    return (
      <>
        {hotelsData?.length > 0 ? (
          <Container>
            <StyledTypography variant="h6">Primeiro, escolha o seu hotel</StyledTypography>
            <Cards>
              {hotelsData.map((item) => (
                <CardHotel
                  hotel={item}
                  select={onSelectHotel}
                  selectedHotel={selectedHotel}
                />
              ))}
            </Cards>
          </Container>
        ) : (<></>)}

        {hotelsData?.length > 0 && selectedHotel ? (
          <Container>
            <StyledTypography variant="h6">Ótima pedida! Agora escolha seu quarto:</StyledTypography>
          </Container>
        ) : (<></>)}

      </>
    );
  }
}

const StyledTypography = styled(Typography)`
  color: gray;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 230px;
  margin-left: 230px;
  width: 378px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 17px;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const P1 = styled.div`
  font-weight: 100;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
`;

const Din = styled.div`
  font-weight: 100;
  font-size: 14px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
`;

const Confirmation = styled.div`
  display: flex;
  margin-top: 17px;
  p {
    margin-left: 14px;
    font-style: normal;
    font-size: 14px;
    line-height: 19px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 26%;
  margin-left: 23%;
  width: 55%;

    h1{
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 23px;
      text-align: center;

      color: #8E8E8E;
  }
`;
