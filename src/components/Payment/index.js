import useEnrollment from '../../hooks/api/useEnrollment';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Card from './cardTypeTicket';
import CardAcc from './cardTypeAccommodation';
import ConfirmTicket from './ConfirmTicket';
import useTicketsTypes from '../../hooks/api/useTicketsTypes';
import useTicket from '../../hooks/api/useTicket';

export default function ChooseTicket({ showFinishPayment, setShowFinishPayment }) {
  const { ticketsTypes } = useTicketsTypes();
  const [ types, setTypes ] = useState([]);
  const [ selectedType, setSelectedType ] = useState([]);
  const [ selectedOptionHotel, setSelectedOptionHotel ] = useState([]);
  const [ total, setTotal ] = useState(0);
  const { enrollment } = useEnrollment();
  const [withEnrollment, setWithEnrollmentt] = useState(false);
  const { ticket, ticketError } = useTicket();

  const onSelectType = (type) => {
    if(selectedType[0]?.id === type?.id) {
      setSelectedType([]);
      setSelectedOptionHotel([]);
      setTotal(0);
      return;
    }
    setSelectedType([type]);
    setTotal(parseInt(type?.price));
  };

  const onSelectAcc = (id) => {
    if(selectedOptionHotel[0] === id) {
      setSelectedOptionHotel([]);
      return;
    }
  
    setSelectedOptionHotel([id]);  
  };

  const updateTotal = () => {
    if(selectedOptionHotel[0] === 2) {
      setTotal(parseInt(selectedType[0]?.price)+350);
    }else {
      setTotal(parseInt(selectedType[0]?.price));
    }
  };
 
  useEffect(() => {
    if (enrollment) {
      setWithEnrollmentt(true);
    }
    if(ticketsTypes) {
      setTypes(ticketsTypes);
    }
    if(ticket) {
      console.log(ticket);
    }
  }, [enrollment, ticketsTypes, ticket]);

  return (
    <>
      {withEnrollment ? (
        <>
          <Container>
            <P1>Primeiro, escolha sua modalidade de ingresso</P1>
            <Caixas>
              {types?.length > 0 ? (
                types.map((type) => (
                  <Card
                    key={type.id}
                    id={type.id}
                    name={type.name}
                    price={type.price}
                    isRemote={type.isRemote}
                    includesHotel={type.includesHotel}
                    selectedType={selectedType}
                    select={onSelectType}
                    type={type}
                  />
                ))): 
                <P1>Ingressos não disponíveis ainda...</P1>
              }
            </Caixas>
          </Container>
          <Container>
            {selectedType?.length > 0 && selectedType[0].includesHotel ? (
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
                    price={350}
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
            {((selectedType?.length > 0 && 
            selectedType[0].includesHotel && 
            selectedOptionHotel?.length > 0) || 
            (selectedType?.length > 0 && selectedType[0].isRemote)
            ) ? (
                <ConfirmTicket ticketTypeId={selectedType[0]?.id}
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
