import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import ChosenTicket from '../../../components/Payment/ChosenTicket';
import useToken from '../../../hooks/useToken';
import { getTicketByUserId } from '../../../services/ticketApi';

import PaymentPage from '../../../components/Payment';

export default function Payment() {
  const token = useToken();
  const [ticketData, setTicketData] = useState(null);

  async function fetchTicketData() {
    try {
      const res = await getTicketByUserId(token);
      setTicketData(res.data);
    } catch (error) {
      const { response } = error;
      const notify = (message, type) =>
        toast(message, {
          position: toast.POSITION.TOP_CENTER,
          pauseOnFocusLoss: false,
          delay: 3000,
          type: type,
          limit: 1,
        });

      if (response.message) {
        notify(response.message, toast.TYPE.ERROR);
      } else if (response.status === 404) {
        notify('Nenhum ingresso encontrado!', toast.TYPE.INFO);
      } else {
        notify('Erro inesperado!', toast.TYPE.ERROR);
      }
    }
  }

  useEffect(() => {
    fetchTicketData();
  }, []);

  return (
    <>
      <Container>
        <h1>Ingresso e pagamento</h1>
        <ChosenTicket ticketInfo={ticketData} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
