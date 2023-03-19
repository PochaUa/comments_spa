import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Props } from "./types";

export const Logout = ({ setUser }: Props) => {
  return (
    <Button variant="contained" endIcon={<LogoutIcon />}>
      Logout
    </Button>
  );
};
