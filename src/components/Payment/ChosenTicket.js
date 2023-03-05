import styled from 'styled-components';

export default function ChosenTicket({ ticketData }) {
  const calculateTotal = () => {
    let total = 0;
    if(ticketData.includedHotel) {
      total = parseInt(ticketData.TicketType.price) + parseInt(ticketData.TicketType.hotelTax);
    }else{
      total = parseInt(+ticketData.TicketType.price);
    }
    return total;
  };

  return (
    <>
      <Container>
        <p className="title">Ingresso escolhido</p>
        <TicketInfo>
          <div>
            <p className="info">
              {`${ticketData.TicketType.isRemote ? 'Online' : 'Presencial'}`} {ticketData.includedHotel && ' + Com hotel'}
            </p>
            <p className="price">{(calculateTotal()).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
          </div>
        </TicketInfo>
      </Container>
    </>
  );
}

const Container = styled.div``;

const TicketInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 290px;
  height: 108px;

  background: #ffeed2;
  border-radius: 20px;
  text-align: center;

  .info {
    font-size: 16px;
    line-height: 19px;

    color: #454545;
  }

  .price {
    font-size: 14px;
    line-height: 16px;

    color: #898989;
  }
`;
