import { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Card({ id, price, name, selectedOptionHotel, select, updateTotal }) {
  const [ isSelected, setSelected ] = useState(false);

  useEffect(() => {
    if(selectedOptionHotel === id) {
      setSelected(true);
    }else{
      setSelected(false);
    }
    updateTotal();
  }, [selectedOptionHotel]);

  return (
    <>
      <Caixa back={isSelected} onClick={() => select(id)}>        
        <div>{name}</div>
        <Din>+{ price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }</Din>
      </Caixa>
    </>
  );
}

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
  background: ${(props) => props.back ? '#FFEED2' : '#FFFFFF'};
  cursor: pointer;
`;

const Din = styled.div`
  font-weight: 100;
  font-size: 14px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
`;
