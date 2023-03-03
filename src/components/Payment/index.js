import useEnrollment from '../../hooks/api/useEnrollment';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Card from './cardTypeTicket';
import CardAcc from './cardTypeAccommodation';
import ConfirmTicket from './ConfirmTicket';
import useTicketsTypes from '../../hooks/api/useTicketsTypes';

export default function ChooseTicket({showFinishPayment, setShowFinishPayment}) {
  const { ticketsTypes } = useTicketsTypes();
  const [ types, setTypes ] = useState([]);
  const [ selectedType, setSelectedType ] = useState([]);
  const [ selectedOptionHotel, setSelectedOptionHotel ] = useState([]);
  const [ total, setTotal ] = useState(0);
  const { enrollment } = useEnrollment();
  const [withEnrollment, setWithEnrollmentt] = useState(false);

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
 
  useEffect(() => {
    if (enrollment) {
      setWithEnrollmentt(true);
      setTypes(ticketsTypes);
    }
  }, [enrollment]);

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
                    setTotal={setTotal}
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
                  />
                  <CardAcc
                    key={2}
                    id={2}
                    price={350}
                    name={'Com Hotel'}
                    selectedOptionHotel={selectedOptionHotel}
                    select={onSelectAcc}
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
                  value={total + (selectedOptionHotel[0] === 2 ? 350 : 0)} 
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

const Caixa = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 145px;
  height: 145px;
  border: 1px solid #cecece;
  border-radius: 20px;
  margin-right: 25px;
  margin-top: 20px;
  background: ${(props) => props.back};
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
