import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export const AddNewComment = () => {
  return (
    <Button variant="contained" endIcon={<SendIcon />}>
      Add comment
    </Button>
  );
};
