import Button from "@mui/material/Button";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Props } from "./types";

export const Register = ({ setUser }: Props) => {
  return (
    <Button variant="contained" endIcon={<AppRegistrationIcon />}>
      Register
    </Button>
  );
};
