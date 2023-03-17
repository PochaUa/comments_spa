import { Dispatch } from "react";
import { Fetching, CommentsModel } from "../../types";
import { CommentsState } from "./types";

enum CommentsActions {
  ADD_COMMENT = "ADD_COMMENT",
  UPDATE_COMMENT = "UPDATE_COMMENT",
  SET_STATE = "SET_STATE",
  SET_COMMENTS = "SET_COMMENTS",
}

interface DispatchParameters {
  type: CommentsActions;
  payload: {};
}

interface SetStateDispatch extends DispatchParameters {
  type: CommentsActions.SET_STATE;
  payload: Pick<CommentsState, "fetching">;
}

interface SetCommentDispatch extends DispatchParameters {
  type: CommentsActions.SET_COMMENTS;
  payload: Pick<CommentsState, "comments">;
}

type Dispatchers = SetStateDispatch | SetCommentDispatch;

export const getActions = (dispatch: Dispatch<Dispatchers>) => ({
  setState(state: Fetching) {
    dispatch({
      type: CommentsActions.SET_STATE,
      payload: { fetching: state },
    });
  },
  setComments(comments: CommentsModel[]) {
    dispatch({ type: CommentsActions.SET_COMMENTS, payload: { comments } });
  },
});

export const reducer = (
  state: CommentsState,
  { type, payload }: Dispatchers
): CommentsState => {
  switch (type) {
    case CommentsActions.SET_STATE:
    case CommentsActions.SET_COMMENTS:
      return { ...state, ...payload };
    default:
      return state;
  }
};
