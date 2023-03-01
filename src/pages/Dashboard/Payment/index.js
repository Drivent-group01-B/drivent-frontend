import styled from 'styled-components';
import ChosenTicket from '../../../components/Payment/ChosenTicket';

export default function Payment() {
  return (
    <Container>
      <h1>Ingresso e pagamento</h1>
      <ChosenTicket />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
