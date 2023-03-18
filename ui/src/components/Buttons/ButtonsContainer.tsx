import styled from "@emotion/styled";
import { AddNewComment } from "./AddNewComment";
import { Login } from "./Login";
import { Logout } from "./Logout";

const Container = styled.div`
  width: 95%;
  display: flex;
  position: fixed;
  justify-content: space-between;
  top: 10px;
`;

export const ButtonsContainer = () => {
  return (
    <Container>
      <AddNewComment />
      <Login />
      <Logout />
    </Container>
  );
};
