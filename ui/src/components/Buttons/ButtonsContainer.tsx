import styled from "@emotion/styled";
import { AddNewComment } from "./AddNewComment";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Register } from "./Register";
import { useUserContext } from "../../context/userContext";

const Container = styled.div`
  width: 95%;
  display: flex;
  position: fixed;
  justify-content: space-between;
  top: 10px;
`;

export const ButtonsContainer = () => {
  const { user, setUser } = useUserContext();

  return (
    <Container>
      {Object.keys(user).length ? (
        <>
          <AddNewComment />
          <Logout setUser={setUser} />
        </>
      ) : (
        <>
          <Login setUser={setUser} />
          <Register setUser={setUser} />
        </>
      )}
    </Container>
  );
};
