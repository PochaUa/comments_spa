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
  z-index: 10;
`;

export const ButtonsContainer = () => {
  const {
    state: { user },
  } = useAppContext();

  return (
    <Container>
      {Object.keys(user).includes(
        "username" && "id" && "password" && "homePage" && "email" && "avatar"
      ) ? (
        <>
          <AddNewComment userInfo={user} />
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
