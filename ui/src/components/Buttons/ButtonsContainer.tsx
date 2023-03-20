import styled from "@emotion/styled";
import { AddNewComment } from "./AddNewComment";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Register } from "./Register";
import { useAppContext } from "../../context/AppContext";

const Container = styled.div`
  width: 95%;
  display: flex;
  position: fixed;
  justify-content: space-between;
  top: 10px;
`;

export const ButtonsContainer = () => {
  const { state } = useAppContext();

  return (
    <Container>
      {Object.keys(state.user).length ? (
        <>
          <AddNewComment />
          <Logout />
        </>
      ) : (
        <>
          <Login />
          <Register />
        </>
      )}
    </Container>
  );
};
