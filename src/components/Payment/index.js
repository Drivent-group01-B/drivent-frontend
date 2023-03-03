import useEnrollment from '../../hooks/api/useEnrollment';
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import UserContext from '../../contexts/UserContext';
import CreditCard from './CreditCard';
import { CircleCheckFill } from 'akar-icons';

<<<<<<< Updated upstream
export default function PaymentPage() {
=======
export default function ChooseTicket({showFinishPayment, setShowFinishPayment}) {
  const { ticketsTypes } = useTicketsTypes();
  const [ types, setTypes ] = useState([]);
  const [ selectedType, setSelectedType ] = useState([]);
  const [ selectedOptionHotel, setSelectedOptionHotel ] = useState([]);
  const [ total, setTotal ] = useState(0);
>>>>>>> Stashed changes
  const { enrollment } = useEnrollment();
  const [withEnrollment, setWithEnrollmentt] = useState(false);
  const [local, setLocal] = useState(250);
  const [online, setOnline] = useState(100);
  const [isRemote, setIsremote] = useState(false);
  const [b1, setB1] = useState('#FFFFFF');
  const [b2, setB2] = useState('#FFFFFF');
  const [showCard, setShowCard] = useState(true);
  useEffect(() => {
    if (enrollment) {
      setWithEnrollmentt(true);
    }
  }, [enrollment]);
  
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {withEnrollment ? (
        <>
          <Modalidade>
            <P1>Primeiro, escolha sua modalidade de ingresso</P1>
            <Caixas>
              <Caixa back={b1} onClick={() => {setIsremote(true); setB1('#FFEED2'); setB2('#FFFFFF');}}><div>Presencial</div><Din>R$ {local}</Din></Caixa>
              <Caixa back={b2} onClick={() => {setIsremote(false); setB1('#FFFFFF'); setB2('#FFEED2');}}><div>Online</div><Din>R$ {online}</Din></Caixa>
            </Caixas>
<<<<<<< Updated upstream
            <P1>Pagamento</P1>
            {showCard ? 
              <CreditCard setShowCard={setShowCard}/>
              :
              <Confirmation>
                <CircleCheckFill strokeWidth={2} size={36} color="#36B853"/>
                <p><strong>Pagamento confirmado!</strong><br/>Prossiga para escolha de hospedagem e atividades</p>
              </Confirmation>
            }
          </Modalidade>
          
=======
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
>>>>>>> Stashed changes
        </>
      ) : <Center><P1>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</P1></Center>
      }
    </>);
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Caixa = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
box-sizing: border-box;
width: 145px;
height: 145px;
border: 1px solid #CECECE;
border-radius: 20px;
margin-right: 25px;
margin-top: 20px;
background: ${props => props.back};
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 230px;
  margin-left: 230px;
  width: 378px;
`;

const Modalidade = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
  color: #8E8E8E;
`;

const Din = styled.div`
  font-weight: 100;
  font-size: 14px;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
`;

const Confirmation = styled.div`
display: flex;
margin-top: 17px;
p{
  margin-left: 14px;
font-style: normal;
font-size: 14px;
line-height: 19px;
}
`;
