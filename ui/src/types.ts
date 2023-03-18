export enum Fetching {
  NOT_FETCHED,
  SUCCESS,
  FAILED,
  FETCHING,
}

export interface FetchingState {
  fetching: Fetching;
}

export interface CommentModel {
  id: number;
  user: { name: string; avatar: string };
  timestamp: number;
  text: string;
  img: string;
  subComments: CommentModel[];
}
