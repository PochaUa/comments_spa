import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Props } from "./types";

export const Login = ({ setUser }: Props) => {
  return (
    <Button variant="contained" endIcon={<LoginIcon />}>
      Login
    </Button>
  );
};
