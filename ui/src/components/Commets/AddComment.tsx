import { ChangeEvent, FocusEvent, useCallback, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { UserModel } from "../../types";
import { addComment, getComments, uploadFile } from "../../api/apiGateWay";
import SimpleBackdrop from "../UserForm/Backdrop";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useAppContext } from "../../context/AppContext";
import Button from "@mui/material/Button";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  userInfo: UserModel;
}

export const AddComment = ({ isOpen, closeModal, userInfo }: Props) => {
  const { actions } = useAppContext();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [comment, setComment] = useState({
    userId: userInfo.id,
    file: "",
    text: "",
    parentId: null,
  });
  const [fieldValidation, setFieldValidation] = useState({
    text: "",
  });
  const [loading, setLoading] = useState(false);

  const [fieldTouched, setFieldTouched] = useState({
    text: false,
  });
  const rules: { [key: string]: (p: string) => string } = {
    text: (val) =>
      val.length < 3 ? "Text must be more than 3 characters" : "",
  };

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
    uploadFile(formData)
      .then(({ data }) => {
        setComment({ ...comment, file: data });
      })
      .catch((e) => console.error(e));
  };

  const cancelFile = useCallback(() => {
    setComment({ ...comment, file: "" });
  }, []);

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

      setComment((prevState) => {
        return { ...prevState, [name]: value };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [comment]
  );
  const resetAndClose = useCallback(() => {
    setComment({
      userId: userInfo.id,
      file: "",
      text: "",
      parentId: null,
    });
    closeModal();
  }, []);
  const addNewComment = useCallback(() => {
    setLoading(true);
    addComment(comment)
      .catch((e) => {
        console.error(e);
      })
      .then(() => getComments().then((res) => actions.setComments(res.data)))
      .finally(() => {
        setLoading(false);
        resetAndClose();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  return (
    <Dialog open={isOpen}>
      <SimpleBackdrop loading={loading} />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between" }}
            disableGutters
          >
            <Typography
              variant="h6"
              sx={{
                letterSpacing: ".3rem",
                color: "inherit",
              }}
            >
              {userInfo.username}
            </Typography>
            <Box>
              <Avatar alt="Remy Sharp" src={userInfo.avatar} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
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
            value={comment.text}
            name="text"
            onChange={handleChange}
            multiline
            required
            label="Text"
            helperText={fieldValidation.text}
            error={!!fieldValidation.text}
          />
          {!comment.file ? (
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
          {comment.file ? (
            <Box
              sx={{
                margin: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={`http://localhost:8080/static/${comment.file
                  .split("/")
                  .at(-1)}`}
                style={{ maxWidth: "240px", maxHeight: "320px" }}
              />
              <Button onClick={cancelFile}>Cancel</Button>
            </Box>
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
              onClick={addNewComment}
              disabled={
                !fieldTouched.text ||
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
