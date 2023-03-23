import Box from "@mui/material/Box";
import { FocusEvent, useCallback, useState } from "react";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { loginUser, registerUser } from "../../api/apiGateWay";
import SimpleBackdrop from "./Backdrop";
import { useAppContext } from "../../context/AppContext";

interface Props {
  registerButton?: boolean;
  isOpen: boolean;
  closeModal: () => void;
}
export const UserForm = ({ isOpen, registerButton, closeModal }: Props) => {
  const { actions } = useAppContext();
  const [user, setUser] = useState({
    username: "",
    password: "",
    homePage: "",
    email: "",
    avatar: "",
  });
  const [fieldValidation, setFieldValidation] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const [fieldTouched, setFieldTouched] = useState({
    username: false,
    password: false,
    email: false,
  });
  const rules: { [key: string]: (p: string) => string } = {
    username: (val) =>
      val.length < 3 ? "Name must be more than 3 characters" : "",
    password: (val) =>
      val.length < 5 ? "password must be more than 5 characters" : "",
    email: (val) => {
      const rulesEmail =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      const validateEmail = rulesEmail.test(String(val).toLowerCase());
      return !validateEmail ? "Incorrect format E-mail" : "";
    },
  };
  const handleChange = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      if (Object.keys(rules).includes(name)) {
        setFieldTouched((prevState) => ({
          ...prevState,
          [name]: true,
        }));
        setFieldValidation((prevState) => ({
          ...prevState,
          [name]: rules[name](value),
        }));
      }

      setUser((prevState) => {
        return { ...prevState, [name]: value };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const resetAndClose = useCallback(() => {
    setUser({
      username: "",
      password: "",
      homePage: "",
      email: "",
      avatar: "",
    });
    closeModal();
  }, []);

  const register = useCallback(() => {
    setLoading(true);
    registerUser(user)
      .then((user) => {
        actions.setUser(user.data);
        localStorage.setItem("user", JSON.stringify(user.data));
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
        closeModal();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const login = useCallback(() => {
    setLoading(true);
    const loginInfo = { username: user.username, password: user.password };
    loginUser(loginInfo)
      .then((user) => {
        if (Object.values(user).length) {
          actions.setUser(user.data);
          localStorage.setItem("user", JSON.stringify(user.data));
        } else {
          actions.setUser({});
          localStorage.setItem("user", JSON.stringify({}));
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
        closeModal();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Dialog open={isOpen}>
      <SimpleBackdrop loading={loading} />
      <Box sx={{ padding: 3, margin: 3 }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { marginBottom: 5, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={user.username}
            name="username"
            onChange={handleChange}
            required
            label="Username"
            helperText={fieldValidation.username}
            error={!!fieldValidation.username}
          />
          <TextField
            value={user.password}
            name="password"
            onChange={handleChange}
            required
            label="Password"
            helperText={fieldValidation.password}
            error={!!fieldValidation.password}
          />
          {registerButton ? (
            <>
              <TextField
                value={user.email}
                name="email"
                onChange={handleChange}
                required
                label="E-mail"
                helperText={fieldValidation.email}
                error={!!fieldValidation.email}
              />
              <TextField
                value={user.homePage}
                name="homePage"
                onChange={handleChange}
                label="Home page"
              />
              <TextField
                value={user.avatar}
                name="avatar"
                onChange={handleChange}
                label="Avatar"
              />
            </>
          ) : null}
          <Box
            sx={{ display: "flex", justifyContent: "space-between", margin: 3 }}
          >
            <Fab aria-label="Close" onClick={resetAndClose}>
              <CloseIcon />
            </Fab>
            <Fab
              color="primary"
              aria-label="done"
              onClick={registerButton ? register : login}
              disabled={
                registerButton
                  ? !(
                      fieldTouched.username &&
                      fieldTouched.password &&
                      fieldTouched.email
                    ) || Object.values(fieldValidation).some((elem) => elem)
                  : !(fieldTouched.username && fieldTouched.password) ||
                    Object.values(fieldValidation).some((elem) => elem)
              }
            >
              <DoneIcon />
            </Fab>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
