import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import ChosenTicket from '../../../components/Payment/ChosenTicket';
import useToken from '../../../hooks/useToken';
import { getTicketByUserId } from '../../../services/ticketApi';

export default function Payment() {
  const token = useToken();
  const [ticketInfo, setTicketInfo] = useState(null);

  async function fetchTicketData() {
    try {
      const res = await getTicketByUserId(token);
      setTicketInfo(res.data);
    } catch (error) {
      toast.error('Algo deu errado');
      // console.log(error);
    }
  }

  useEffect(() => {
    fetchTicketData();
  }, []);

  return (
    <>
      <Container>
        <h1>Ingresso e pagamento</h1>
        <ChosenTicket ticketInfo={ticketInfo} />
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss={false}
        theme="light"
        limit={1}
      />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
