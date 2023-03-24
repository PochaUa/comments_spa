import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { CommentModel } from "../../types";
import { CommentsList } from "./CommentsList";
import { useState } from "react";

interface Props {
  comment: CommentModel;
}
export const Comment = ({ comment }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "90%", margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            src={`http://localhost:8080/static/${comment?.user?.avatar
              .split("/")
              .at(-1)}`}
          />
        }
        title={comment?.user?.username}
        subheader={comment.createdAt}
      />
      {comment.file ? (
        <CardMedia
          component="img"
          sx={{ maxHeight: "320px", maxWidth: "240px" }}
          image={`http://localhost:8080/static/${comment.file
            .split("/")
            .at(-1)}`}
        />
      ) : null}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={handleExpandClick}>
          {Array.isArray(comment.subComments) && comment.subComments.length
            ? `${comment.subComments.length} more comments`
            : "Reply"}
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {Array.isArray(comment.subComments) && comment.subComments.length ? (
            <CommentsList comments={comment.subComments} />
          ) : (
            <TextField multiline rows={4} sx={{ width: "100%" }} />
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};
