import styled from 'styled-components';

export default function ChosenTicket({ ticketData }) {
  return (
    <>
      <Container>
        <p className="title">Ingresso escolhido</p>
        <TicketInfo>
          {ticketData && (
            <div>
              <p className="info">
                {`${ticketData.TicketType.name}`} {ticketData.TicketType.includesHotel && ' + Com hotel'}
              </p>
              <p className="price">
                {ticketData.TicketType.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          )}
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
