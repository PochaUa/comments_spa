import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

export const Login = () => {
  return (
    <Button variant="contained" endIcon={<LoginIcon />}>
      Login
    </Button>
  );
};
