export enum Fetching {
  NOT_FETCHED,
  SUCCESS,
  FAILED,
  FETCHING,
}

export interface FetchingState {
  fetching: Fetching;
}

export interface UserModel {
  id: number;
  username: string;
  password: string;
  homePage: string;
  email: string;
  avatar: string;
}

export interface CommentModel {
  id: number;
  userId: number;
  user: Omit<UserModel, "password">;
  file: string;
  createdAt: string;
  text: string;
  parentId: number | null;
  subComments: CommentModel[];
}
