import { Dispatch } from "react";
import { Fetching, CommentModel, UserModel } from "../../types";
import { AppState } from "./types";

enum AppActions {
  ADD_COMMENT = "ADD_COMMENT",
  UPDATE_COMMENT = "UPDATE_COMMENT",
  SET_STATE = "SET_STATE",
  SET_COMMENTS = "SET_COMMENTS",
  SET_USER = "SET_USER",
}

interface DispatchParameters {
  type: AppActions;
  payload: {};
}

interface SetStateDispatch extends DispatchParameters {
  type: AppActions.SET_STATE;
  payload: Pick<AppState, "fetching">;
}

interface SetCommentDispatch extends DispatchParameters {
  type: AppActions.SET_COMMENTS;
  payload: Pick<AppState, "comments">;
}

interface SetUserDispatch extends DispatchParameters {
  type: AppActions.SET_USER;
  payload: UserModel | {};
}

type Dispatchers = SetStateDispatch | SetCommentDispatch | SetUserDispatch;

export const getActions = (dispatch: Dispatch<Dispatchers>) => ({
  setState(state: Fetching) {
    dispatch({
      type: AppActions.SET_STATE,
      payload: { fetching: state },
    });
  },
  setComments(comments: CommentModel[]) {
    dispatch({ type: AppActions.SET_COMMENTS, payload: { comments } });
  },
  setUser(user: UserModel | {}) {
    dispatch({ type: AppActions.SET_USER, payload: { user } });
  },
});

export const reducer = (
  state: AppState,
  { type, payload }: Dispatchers
): AppState => {
  switch (type) {
    case AppActions.SET_STATE:
    case AppActions.SET_COMMENTS:
    case AppActions.SET_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
};
