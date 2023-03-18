import { CommentModel, FetchingState } from "../../types";

export interface CommentsState extends FetchingState {
  comments: CommentModel[];
}
