import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { UserModel } from "../../types";
import { useCallback, useState } from "react";
import { AddComment } from "../Commets/AddComment";

export const AddNewComment = ({ userInfo }: { userInfo: UserModel | {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  const changeIsOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <>
      <Button onClick={changeIsOpen} variant="contained" endIcon={<SendIcon />}>
        Add comment
      </Button>
      <AddComment
        isOpen={isOpen}
        closeModal={changeIsOpen}
        // @ts-ignore
        userInfo={userInfo}
      />
    </>
  );
};
