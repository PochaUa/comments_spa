import { CommentModel, FetchingState, UserModel } from "../../types";

export interface AppState extends FetchingState {
  comments: CommentModel[];
  user: UserModel | {};
}
