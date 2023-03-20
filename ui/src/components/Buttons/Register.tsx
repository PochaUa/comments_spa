import Button from "@mui/material/Button";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useCallback, useState } from "react";
import { UserForm } from "../UserForm/UserForm";

export const Register = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeIsOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);
  return (
    <>
      <Button
        onClick={changeIsOpen}
        variant="contained"
        endIcon={<AppRegistrationIcon />}
      >
        Register
      </Button>
      <UserForm isOpen={isOpen} registerButton closeModal={changeIsOpen} />
    </>
  );
};
