import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { useCallback, useState } from "react";
import { UserForm } from "../UserForm/UserForm";

export const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeIsOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <>
      <Button
        onClick={changeIsOpen}
        variant="contained"
        endIcon={<LoginIcon />}
      >
        Login
      </Button>
      <UserForm isOpen={isOpen} closeModal={changeIsOpen} />
    </>
  );
};
