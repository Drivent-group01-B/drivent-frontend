import styled from 'styled-components';

export default function ConfirmationButton({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  width: 182px;
  height: 37px;

  margin-top: 43px;

  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;

  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;

  border: none;
  outline: none;

  &:hover {
    filter: brightness(0.9);
  }
`;
