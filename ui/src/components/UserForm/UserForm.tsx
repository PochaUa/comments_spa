import Box from "@mui/material/Box";
import { ChangeEvent, FocusEvent, useCallback, useRef, useState } from "react";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { loginUser, registerUser, uploadAvatar } from "../../api/apiGateWay";
import SimpleBackdrop from "./Backdrop";
import { useAppContext } from "../../context/AppContext";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

interface Props {
  registerButton?: boolean;
  isOpen: boolean;
  closeModal: () => void;
}
export const UserForm = ({ isOpen, registerButton, closeModal }: Props) => {
  const { actions } = useAppContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    homePage: "",
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
    homePage: (val) => {
      const rulesUrl =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/;
      const validateEmail = rulesUrl.test(String(val).toLowerCase());
      return !validateEmail ? "Incorrect format url" : "";
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

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const formData = new FormData();
    for (const file of Array.from(e.target.files)) {
      formData.append(file.name, file);
    }
    uploadAvatar(formData)
      .then(({ data }) => {
        setUser({ ...user, avatar: data });
      })
      .catch((e) => console.error(e));
  };

  const cancelFile = useCallback(() => {
    setUser({ ...user, avatar: "" });
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
                helperText={fieldValidation.homePage}
                error={!!fieldValidation.homePage}
              />
              {!user.avatar ? (
                <>
                  <Button
                    onClick={handleUploadClick}
                    variant="contained"
                    component="label"
                  >
                    Upload file
                  </Button>
                  <input
                    type="file"
                    multiple={false}
                    ref={inputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </>
              ) : null}
              {user.avatar ? (
                <Box
                  sx={{
                    margin: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    src={`http://localhost:8080/static/${user.avatar
                      .split("/")
                      .at(-1)}`}
                  />
                  <Button onClick={cancelFile}>Cancel</Button>
                </Box>
              ) : null}
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
