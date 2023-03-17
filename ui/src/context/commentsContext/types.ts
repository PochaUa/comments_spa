import { CommentsModel, FetchingState } from "../../types";

export interface CommentsState extends FetchingState {
  comments: CommentsModel[];
}
