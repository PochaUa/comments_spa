import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCallback } from "react";
import { useAppContext } from "../../context/AppContext";

export const Logout = () => {
  const { actions } = useAppContext();

  const handleClick = useCallback(() => {
    actions.setUser({});
    localStorage.setItem("user", JSON.stringify({}));
  }, []);
  return (
    <Button onClick={handleClick} variant="contained" endIcon={<LogoutIcon />}>
      Logout
    </Button>
  );
};
