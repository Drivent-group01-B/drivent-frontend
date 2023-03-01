import styled from 'styled-components';

export default function ChosenTicket({ ticketInfo }) {
  ticketInfo = { ticketType: 'Presencial', includesHotel: true, price: 600.0 };
  return (
    <>
      <Container>
        <p className="title">Ingresso escolhido</p>
        <TicketInfo>
          <div>
            <p className="info">
              {`${ticketInfo.ticketType}`} {ticketInfo.includesHotel && ' + Com hotel'}
            </p>
            <p className="price">{ticketInfo.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
          </div>
        </TicketInfo>
      </Container>
    </>
  );
}

const Container = styled.div`
  .title {
    font-size: 20px;
    line-height: 23px;

    color: #8e8e8e;

    margin-top: 37px;
    margin-bottom: 17px;
  }
`;

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
