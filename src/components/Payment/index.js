import useEnrollment from '../../hooks/api/useEnrollment';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export default function ChooseTicket() {
  const { enrollment } = useEnrollment();
  const [withEnrollment, setWithEnrollmentt] = useState(false);
  const [local, setLocal] = useState(250);
  const [online, setOnline] = useState(100);
  const [isRemote, setIsremote] = useState(false);
  const [b1, setB1] = useState('#FFFFFF');
  const [b2, setB2] = useState('#FFFFFF');

  useEffect(() => {
    if (enrollment) {
      setWithEnrollmentt(true);
    }
  }, [enrollment]);

  return (
    <>
      {withEnrollment ? (
        <>
          <Modalidade>
            <P1>Primeiro, escolha sua modalidade de ingresso</P1>
            <Caixas>
              <Caixa
                back={b1}
                onClick={() => {
                  setIsremote(true);
                  setB1('#FFEED2');
                  setB2('#FFFFFF');
                }}
              >
                <div>Presencial</div>
                <Din>R$ {local}</Din>
              </Caixa>
              <Caixa
                back={b2}
                onClick={() => {
                  setIsremote(false);
                  setB1('#FFFFFF');
                  setB2('#FFEED2');
                }}
              >
                <div>Online</div>
                <Din>R$ {online}</Din>
              </Caixa>
            </Caixas>
          </Modalidade>
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
