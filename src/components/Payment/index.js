import useEnrollment from '../../hooks/api/useEnrollment';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Card from './cardTypeTicket';
import CardAcc from './cardTypeAccommodation';
import ConfirmTicket from './ConfirmTicket';
import useTicketsTypes from '../../hooks/api/useTicketsTypes';
import useTicket from '../../hooks/api/useTicket';

export default function ChooseTicket({ showFinishPayment, setShowFinishPayment, setValue }) {
  const { ticketsTypes } = useTicketsTypes();
  const [ types, setTypes ] = useState([]);
  const [ selectedType, setSelectedType ] = useState();
  const [ selectedOptionHotel, setSelectedOptionHotel ] = useState();
  const [ total, setTotal ] = useState(0);
  const { enrollment } = useEnrollment();
  const [withEnrollment, setWithEnrollmentt] = useState(false);
  const { ticket, ticketError, ticketLoading } = useTicket();
  const [ ticketData, setTicketData ] = useState();
  const [ valueNotRemoteTicket, setValueNotRemoteTicket ] = useState(0);
  const [ valueRemoteTicket, setValueRemoteTicket ] = useState(0);
  const [ valueNotRemoteWithHotelTicket, setValueNotRemoteWithHotelTicket ] = useState(0);

  const onSelectType = (id, price) => {
    if(selectedType === id) {
      setSelectedType();
      setSelectedOptionHotel();
      setTotal(0);
      return;
    }
    setSelectedType(id);
    setTotal(parseInt(price));
  };

  const onSelectAcc = (id) => {
    if(selectedOptionHotel === id) {
      setSelectedOptionHotel();
      return;
    }
  
    setSelectedOptionHotel(id);  
  };

  const updateTotal = () => {
    if(selectedType === 1) {
      if(selectedOptionHotel === 2) {
        setTotal(parseInt(valueNotRemoteWithHotelTicket));
      }else{
        setTotal(parseInt(valueNotRemoteTicket));
      }
    }
  };

  const getTicketTypeId = () => {
    let selectedRemote, includedHotel;

    if(selectedType === 1) {
      selectedRemote = false;
      if(selectedOptionHotel === 1) {
        includedHotel = false;
      }
      if(selectedOptionHotel === 2) {
        includedHotel = true;
      }
    }

    if(selectedType === 2) {
      selectedRemote = true;
    }

    let ticketTypeId = 0;

    ticketsTypes.map(item => {
      if(selectedRemote === item.isRemote) {
        if(includedHotel === item.includesHotel) {
          ticketTypeId = item.id;
        }
      }
    });

    return ticketTypeId;
  };
 
  useEffect(() => {
    if (enrollment) {
      setWithEnrollmentt(true);
    }
    if(ticketsTypes) {
      setTypes(ticketsTypes);
      ticketsTypes.map(item => {
        if(item.isRemote) {
          setValueRemoteTicket(item.price);
        }
        if(!item.isRemote && !item.includesHotel) {
          setValueNotRemoteTicket(item.price);
        }
        if(!item.isRemote && item.includesHotel) {
          setValueNotRemoteWithHotelTicket(item.price);
        }
      });
    }
    if(ticket) {
      if(ticket.status === 'PAID') {
        setShowFinishPayment(true);
        return;
      }
      setTicketData(ticket);
      setSelectedType([ticket.TicketType]);
      if(!ticket.isRemote) {
        setSelectedOptionHotel(ticket.includedHotel ? [2] : [1] );
        setTotal(ticket.TicketType.price+ticket.TicketType.hotelTax);
      }
    }
  }, [enrollment, ticketsTypes, ticket]);

  return (
    <>
      {withEnrollment ? (
        <>
          <Container>
            <P1>Primeiro, escolha sua modalidade de ingresso</P1>
            <Caixas>
              <Card
                key={1}
                id={1}
                name={'Presencial'}
                price={valueNotRemoteTicket}
                selectedType={selectedType}
                select={onSelectType}
              />
              <Card
                key={2}
                id={2}
                name={'Online'}
                price={valueRemoteTicket}
                selectedType={selectedType}
                select={onSelectType}
              />     
            </Caixas>
          </Container>
          <Container>
            {selectedType && selectedType === 1 ? (
              <>
                <P1>Ótimo! Agora escolha sua modalidade de hospedagem</P1>
                <Caixas>
                  <CardAcc
                    key={1}
                    id={1}
                    price={0}
                    name={'Sem Hotel'}
                    selectedOptionHotel={selectedOptionHotel}
                    select={onSelectAcc}
                    updateTotal={updateTotal}
                  />
                  <CardAcc
                    key={2}
                    id={2}
                    price={valueNotRemoteWithHotelTicket-valueNotRemoteTicket}
                    name={'Com Hotel'}
                    selectedOptionHotel={selectedOptionHotel}
                    select={onSelectAcc}
                    updateTotal={updateTotal}
                  />
                </Caixas>
              </>
            ):(<></>)}
            
          </Container>
          <Container>
            {selectedType === 2 || selectedOptionHotel ? (
              <ConfirmTicket 
                getTicketTypeId={getTicketTypeId}
                ticketData={ticketData}
                value={total}
                showFinishPayment={showFinishPayment}
                setShowFinishPayment={setShowFinishPayment}/>
            ):(<></>)}
            
          </Container>
        </>
      ) : (
        <Center>
          <P1>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</P1>
        </Center>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
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

const Caixas = styled.div`
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
