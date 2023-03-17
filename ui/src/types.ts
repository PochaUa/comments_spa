export enum Fetching {
  NOT_FETCHED,
  SUCCESS,
  FAILED,
  FETCHING,
}

export interface FetchingState {
  fetching: Fetching;
}

export interface CommentsModel {
  user: object;
  timestamp: number;
  text: string;
  subComment: object;
}
