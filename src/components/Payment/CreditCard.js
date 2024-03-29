import React, { useContext, useEffect, useState } from 'react';
import Cards from 'react-credit-cards';

import { formatCreditCardNumber, formatCVC, formatExpirationDate } from './utils';

import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import useTicket from '../../hooks/api/useTicket';

export default function CreditCard( { ticketData, setShowCard } ) {
  const { userData } = useContext(UserContext);
  const [state, setState] = useState({ number: '', name: '', expiry: '', cvc: '', issuer: '', focused: '' });
  const [form, setForm] = useState({ ticketId: '', value: '', cardIssuer: '', cardLastDigits: '' });

  function handleCallback({ issuer }, isValid) {
    if (isValid) {
      setState({ ...state, issuer: issuer });
    }
  }

  function handleInputFocus({ target }) {
    setState({ ...state, focused: target.name });
  }

  function handleInputChange({ target }) {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    setState({ ...state, [target.name]: target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setForm({
      ticketId: ticketData.id /*ticket.id*/,
      cardData: {
        issuer: state.issuer,
        number: state.number,
        name: state.name,
        expirationDate: state.expiry,
        cvv: state.cvc,
      },
    });
    const config = { headers: { Authorization: `Bearer ${userData.token}` } };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/payments/process`, form, config)
      .then(() => {
        setShowCard(false);
      })
      .catch((err) => {
        toast.error('Erro inesperado! ', {
          position: toast.POSITION.TOP_CENTER,
          pauseOnFocusLoss: false,
          delay: 3000,
          limit: 1,
        });
      });
  }

  return (
    <>
      <Container>
        <p className="title">Pagamento</p>
        <Payment id="payment">
          <Cards
            number={state.number}
            name={state.name}
            expiry={state.expiry}
            cvc={state.cvc}
            focused={state.focused}
            issuer={state.issuer}
            callback={handleCallback}
          />
          <Form>
            <CardNumber>
              <NormalInput
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                maxLength={19}
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <p>E.g.: 49..., 51..., 36..., 37...</p>
            </CardNumber>
            <div className="form-group">
              <NormalInput
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <TwoInputs>
              <div className="col-6">
                <ValidInput
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="col-6">
                <CVCInput
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
            </TwoInputs>
            <input type="hidden" name="issuer" value={state.issuer} />
          </Form>
        </Payment>
        <div className="form-actions">
          <SendButton type="submit" onClick={handleSubmit}>
            FINALIZAR PAGAMENTO
          </SendButton>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Payment = styled.div`
  display: flex;
  width: fit-content;

  input {
    padding-left: 10px;
    border: 1px solid #a5a5a5;
    border-radius: 10px;
  }

  input::placeholder {
    color: #a5a5a5;
  }

  font-style: normal;
  font-weight: 400;
  color: #8e8e8e;
`;
const NormalInput = styled.input`
  height: 45px;
  width: 300px;
  font-size: 18px;
  border-radius: 4px;
`;
const ValidInput = styled.input`
  height: 45px;
  width: 190px;
  font-size: 18px;
  margin-top: 12px;
  margin-right: 10px;
  border-radius: 4px;
`;
const CVCInput = styled.input`
  height: 45px;
  width: 100px;
  font-size: 18px;
  margin-top: 12px;

  border-radius: 4px;
`;
const CardNumber = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  p {
    font-size: 15px;
    line-height: 23px;
  }
`;

const TwoInputs = styled.div`
  display: flex;
`;

const SendButton = styled.button`
  width: 182px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  margin-top: 54px;
  border: none;
  outline: none;
`;

const Form = styled.form`
  margin-left: 35px;
`;
