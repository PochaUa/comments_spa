import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

export const Logout = () => {
  return (
    <Button variant="contained" endIcon={<LogoutIcon />}>
      Logout
    </Button>
  );
};
