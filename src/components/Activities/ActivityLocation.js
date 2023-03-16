import styled from 'styled-components';

export default function ActivityLocation({ title, children }) {
  return (
    <Container>
      <p className="title">{title}</p>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  & > .title {
    text-align: center;
    font-size: 17px;
    line-height: 20px;
    margin-bottom: 13px;
    margin-top: 60px;

    text-align: center;

    color: #7b7b7b;
  }
`;

const Wrapper = styled.div`
  padding: 14px;
  border: 1px solid #d7d7d7;
  width: 290px;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;
