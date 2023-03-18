import { CommentModel } from "../../types";
import { Comment } from "./Comment";

interface Props {
  comments: CommentModel[];
}
export const CommentsList = ({ comments }: Props) => {
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};
